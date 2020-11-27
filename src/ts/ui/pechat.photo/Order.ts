class Order extends Trigger<Order> {

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

    getQuantity(){
        return this.quantity;
    }

    setSelectedOptions(value: pechat.ConstructorModelOption[]) {
        this.selectedOptions = value;
        this.changed();
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

        let main_json = c.getState();
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


        let option_temporary_var = "";
        this.selectedOptions.forEach(option => {
            option_temporary_var += "+++++" + option.name;
        })

        let body = new FormData();
        body.append('json', main_json);
        body.append('animation', main_json);
        body.append('price', this.getPrice().toString());
        body.append('priceOriginal', "0");
        body.append('category', this.model.category_id);
        body.append('constructor_model_id', constructor_model_id);
        body.append('text_type', this.model.name);
        body.append('holst_1', holst_1);
        body.append('holst_2', holst_2);
        body.append('holst_3', holst_3);
        body.append('holst_4', holst_4);
        body.append('preview', preview);
        body.append('option', option_temporary_var);
        body.append('quantity', this.quantity.toString());

        fetch('https://pechat.photo/index.php?route=constructor/constructor/add_product_by_constructor', {
            method: 'POST',
            body: body,
        }).then(response => {
            response.json().then(productId => {
                console.log("productId", productId);

                body = new FormData();
                body.append('product_id', productId)
                body.append('quantity', this.quantity.toString())

                fetch('https://pechat.photo/index.php?route=constructor/constructor/rendering', {
                    method: 'POST',
                    body: body
                });

                fetch('https://pechat.photo/index.php?route=checkout/cart/add', {
                    method: 'POST',
                    body: body
                });
            });
        });


    }

}