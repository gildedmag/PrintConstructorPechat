import ConstructorModelOption = pechat.ConstructorModelOption;

class Order extends Trigger<Order> {

    static max = 999;

    private model: pechat.ConstructorModel;
    private selectedOptions: pechat.ConstructorModelOption[] = [];
    private quantity: number = 1;

    constructor() {
        super();
    }

    getPrice(): number {
        let price = this.model ? this.model.price : 0;
        this.selectedOptions.forEach(option => {
            price += parseFloat(option.price);
        })
        return price * this.quantity;
    }

    setModel(model: pechat.ConstructorModel) {
        this.model = model;
        this.changed();
    }


    setQuantity(value: number) {
        this.quantity = value;
        this.changed();
    }

    incrementQuantity() {
        if (this.quantity < Order.max) {
            this.quantity++;
            this.changed();
        }
    }

    decrementQuantity() {
        this.quantity--;
        this.changed();
    }

    getQuantity() {
        return this.quantity;
    }

    setSelectedOptions(value: pechat.ConstructorModelOption[]) {
        this.selectedOptions = value;
        this.changed();
    }

    hasOption(option: ConstructorModelOption) {
        return this.selectedOptions.indexOf(option) != -1;
    }

    checkPrice() {
        // let body = {
        //     json: main_json,
        //     animation: main_json,
        //     price: price,
        //     priceOriginal: main_price,
        //     category: category,
        //     constructor_model_id: constructor_model_id,
        //     text_type: "test",
        //     holst_1: holst_1,
        //     holst_2: holst_2,
        //     holst_3: holst_3,
        //     holst_4: holst_4,
        //     preview: preview,
        //     option: option_temporary_var,
        //     quantity: this.quantity
        // };
    }

    addToCart() { //this legacy code comes partially from original php page

        let c = Constructor.instance;
        let ui = ConstructorUI.instance;

        let stateJson = c.getState();
        let constructor_model_id = this.model.constructor_model_id;
        let main_price = this.getPrice();
        let preview = "";
        let price = this.getPrice();

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
        })
        console.log(optionsEncoded);
        let quantity = this.quantity;

        let body = Utils.toUrlParameters({
            json: stateJson,
            animation: stateJson,
            price: this.getPrice(),
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
            quantity: quantity
        });

        this.getPriceDiscount();

        let headers = new Headers({'content-type': 'application/x-www-form-urlencoded'});
        let post = 'POST';

        fetch('https://pechat.photo/index.php?route=constructor/constructor/add_product_by_constructor', {
            method: post,
            headers: headers,
            body: body,
        }).then(response => {
            response.json().then(productId => {
                console.log("productId", productId);

                fetch('https://pechat.photo/index.php?route=constructor/constructor/rendering', {
                    method: post,
                    headers: headers,
                    body: Utils.toUrlParameters({
                        product_id: productId
                    })
                });

                fetch('https://pechat.photo/index.php?route=checkout/cart/add', {
                    method: post,
                    headers: headers,
                    body: Utils.toUrlParameters({
                        product_id: productId,
                        quantity: quantity
                    })
                });
            });
        });


    }

    shareLink() {
        let headers = new Headers({'content-type': 'application/x-www-form-urlencoded'});
        let post = 'POST';
        fetch('https://pechat.photo/index.php?route=constructor/constructor/get_url_post', {
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

    getPriceDiscount() {
        let priceWithOption = this.getPrice()
        let priceOption = 0;
        let priceSide = 0;

        let body = Utils.toUrlParameters({
            constructor_model_id: this.model.constructor_model_id,
            quantity: this.quantity,
            priceWithOption: priceWithOption,
            priceOption: priceOption,
            priceSide: priceSide,
        });

        fetch('https://pechat.photo/index.php?route=constructor/constructor/calcPriceAjax', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/x-www-form-urlencoded'}),
            body: body
        }).then(response => {
            response.text().then(discount => console.log("discout", discount));
        })

        // $.ajax({
        //     type: 'POST',
        //     dataType: 'text',
        //     async: false,
        //     url: "/index.php?route=constructor/constructor/calcPriceAjax",
        //     data: {
        //         constructor_model_id: $('#priceTotal').attr('data-constructor-model-id'),
        //         quantity: quantity,
        //         priceWithOption: priceWithOption,
        //         priceOption: priceOption,
        //         priceSide: priceSide
        //     },
        //     success: function (data) {
        //         priceDiscount = data;
        //     }
        // });

    }

}