import ConstructorModelOption = pechat.ConstructorModelOption;

class Order extends Trigger<Order> {

    static max = 999;

    private model: pechat.ConstructorModel;
    selectedOptions: pechat.ConstructorModelOption[] = [];
    private quantity: number = 1;
    discountPricePerItem = 0;

    constructor() {
        super();
        this.changed();
    }

    hasDiscount(): boolean {
        return this.discountPricePerItem && this.discountPricePerItem < this.getPricePerItem();
    }

    getPricePerItem(): number {
        let price = this.model ? this.model.price : 0;
        price += this.getOptionsPrice();
        price += this.getSidePrice();
        return price;
    }

    getTotalCostWithoutDiscount(): number {
        return this.getPricePerItem() * this.quantity;
    }

    getTotalCostWithDiscount(): number {
        return this.hasDiscount()
            ? this.discountPricePerItem * this.quantity
            : this.getTotalCostWithoutDiscount();
    }

    getTotalDiscount(): number {
        return this.hasDiscount()
            ? this.getTotalCostWithoutDiscount() - this.getTotalCostWithDiscount()
            : 0;
    }

    setModel(model: pechat.ConstructorModel) {
        this.model = model;
        this.changed();
    }

    setQuantity(value: number) {
        this.quantity = value;
        this.updateDiscount();
        this.changed();
    }

    incrementQuantity() {
        if (this.quantity < Order.max) {
            this.quantity++;
            this.changed();
            this.updateDiscount();
        }
    }

    decrementQuantity() {
        this.quantity--;
        this.updateDiscount();
        this.changed();
    }

    getQuantity() {
        return this.quantity;
    }

    setSelectedOptions(value: pechat.ConstructorModelOption[]) {
        this.selectedOptions = value;
        this.changed();
    }

    addSelectedOption(value: pechat.ConstructorModelOption) {
        this.selectedOptions.push(value);
        this.changed();
    }

    removeSelectedOption(value: pechat.ConstructorModelOption) {
        let index = this.selectedOptions.indexOf(value);
        if (index != -1) {
            this.selectedOptions.splice(index, 1);
            this.changed();
        }
    }

    removeSelectedOptionId(optionId: string) {
        for (let i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i].id === optionId) {
                this.selectedOptions.splice(i, 1);
                this.changed();
                return;
            }
        }
    }

    hasOption(option: ConstructorModelOption) {
        return this.selectedOptions.indexOf(option) != -1;
    }

    hasOptionId(optionId: string) {
        for (let i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i].id === optionId) {
                return true;
            }
        }
        return false;
    }

    addToCart() { //this legacy code comes partially from original php page
        let c = Constructor.instance;

        let stateJson = c.getState();
        let constructor_model_id = this.model.constructor_model_id;
        let preview = "";

        c.setActiveSide(0);
        let holst_1 = c.getActiveSide().exportImage(Constructor.settings.printWidth);
        c.setActiveSide(1);
        let holst_2 = c.getActiveSide().exportImage(Constructor.settings.printWidth);
        c.setActiveSide(2);
        let holst_3 = c.getActiveSide().exportImage(Constructor.settings.printWidth);
        c.setActiveSide(3);
        let holst_4 = c.getActiveSide().exportImage(Constructor.settings.printWidth);


        let optionsEncoded = "";
        this.selectedOptions.forEach(option => {
            optionsEncoded += "+++++" + option.id;
        });
        this.changed();

        let body = Utils.toUrlParameters({
            json: stateJson,
            animation: stateJson,
            price: this.getPricePerItem(),
            priceOriginal: "0",
            category: this.model.category_id,
            constructor_model_id: constructor_model_id,
            text_type: this.model.name,
            holst_1: holst_1,
            holst_2: holst_2,
            holst_3: holst_3,
            holst_4: holst_4,
            preview: preview,
            option: optionsEncoded,
            quantity: this.quantity
        });


        this.updateDiscount();

        let headers = new Headers({'content-type': 'application/x-www-form-urlencoded'});
        let post = 'POST';

        fetch(ConstructorUI.instance.domain + 'index.php?route=constructor/constructor/add_product_by_constructor', {
            method: post,
            headers: headers,
            body: body,
        }).then(response => {
            response.json().then(productId => {
                console.log("productId", productId);

                fetch(ConstructorUI.instance.domain + 'index.php?route=constructor/constructor/rendering', {
                    method: post,
                    headers: headers,
                    body: Utils.toUrlParameters({
                        product_id: productId
                    })
                });

                fetch(ConstructorUI.instance.domain + 'index.php?route=checkout/cart/add', {
                    method: post,
                    headers: headers,
                    body: Utils.toUrlParameters({
                        product_id: productId,
                        quantity: this.quantity
                    })
                });
            });
        });
    }

    shareLink() {
        let headers = new Headers({'content-type': 'application/x-www-form-urlencoded'});
        let post = 'POST';
        fetch(ConstructorUI.instance.domain + 'index.php?route=constructor/constructor/get_url_post', {
            method: post,
            headers: headers,
            body: Utils.toUrlParameters({
                data_u: btoa(encodeURIComponent(Constructor.instance.getState())),
                category: this.model.category_id,
                text_type: this.model.name,
                quantity: this.quantity
            })
        }).then(response => {
            response.json().then(link => {
                console.log(link);
                ConstructorUI.instance.sharePopover.setValue(link);
                ConstructorUI.instance.sharePopover.show();
            });
        });
    }

    getOptionsPrice(): number {
        let price: number = 0;
        this.selectedOptions.forEach(option => {
            price += parseInt(option.price) || 0;
        });
        return price;
    }

    getSidePrice(): number {
        let price: number = 0;
        Constructor.instance.sides.forEach(side => {
            price += side.getTotalPrice();
        });
        return price;
    }


    updateDiscount(callback?: (number) => any) {
        let body = Utils.toUrlParameters({
            constructor_model_id: this.model.constructor_model_id,
            quantity: this.quantity,
            priceWithOption: -1, //unused parameter
            priceOption: this.getOptionsPrice(),
            priceSide: this.getSidePrice(),
        });

        fetch(ConstructorUI.instance.domain + 'index.php?route=constructor/constructor/calcPriceAjax', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
            body: body
        }).then(response => {
            response.text().then(text => {
                let discount = parseInt(text);
                if (this.discountPricePerItem != discount) {
                    this.discountPricePerItem = discount;
                    this.changed();
                }
                callback && callback(this.discountPricePerItem);
            });
        });

    }

}