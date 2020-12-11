/// <reference path="Popover.ts" />

class AddToCartPopover extends Popover {

    constructor() {
        super(
            null,
            null,
            new Row(
                new Spacer(),
                new LabelControl("Add to Cart").addClass("title"),
                new Spacer(),
            ),
            new Row(
                new LabelControl("Quantity"),
                new Spacer(),
                new ConditionalButton(
                    () => ConstructorUI.instance.order.decrementQuantity(),
                    () => ConstructorUI.instance.order.getQuantity() > 1,
                    Icon.MINUS_CIRCLE,
                    null,
                    ConstructorUI.instance.order
                ),
                new Button(
                    () => ConstructorUI.instance.order.incrementQuantity(),
                    Icon.PLUS_CIRCLE,
                ),
                new NumberInputControl(
                    v => ConstructorUI.instance.order.setQuantity(v),
                    () => ConstructorUI.instance.order.getQuantity(),
                    ConstructorUI.instance.order
                ),
            ),
            new Row(
                new LabelControl("Price"),
                new Spacer(),
                new TriggeredLabelControl(
                    ConstructorUI.instance.order,
                    (control) => {
                        let price = ConstructorUI.instance.order.getTotalCostWithoutDiscount();
                        if (ConstructorUI.instance.order.hasDiscount()){
                            control.addClass("price-without-discount");
                        } else {
                            control.removeClass("price-without-discount");
                        }
                        return price;
                    }
                ),
                // new TriggeredLabelControl(
                //     ConstructorUI.instance.order,
                //     () => {
                //         let price = ConstructorUI.instance.order.getTotalCostWithoutDiscount();
                //         return (ConstructorUI.instance.order.hasDiscount() ? '' : price);
                //     }
                // ),
            ),
            new Row(
                new TriggeredLabelControl(
                    ConstructorUI.instance.order,
                    () => {
                        let discount = ConstructorUI.instance.order.getTotalDiscount();
                        return (discount ? 'Discount' : '');
                    }
                ),
                new Spacer(),
                new TriggeredLabelControl(
                    ConstructorUI.instance.order,
                    () => {
                        let discount = ConstructorUI.instance.order.getTotalDiscount();
                        return (discount ? discount : '');
                    }
                ).addClass('discount')
            ),
            new Row(
                new TriggeredLabelControl(
                    ConstructorUI.instance.order,
                    () => {
                        let discount = ConstructorUI.instance.order.getTotalDiscount();
                        return (discount ? 'Price with discount' : '');
                    }
                ),
                new Spacer(),
                new TriggeredLabelControl(
                    ConstructorUI.instance.order,
                    () => {
                        let price = ConstructorUI.instance.order.getTotalCostWithDiscount();
                        return ConstructorUI.instance.order.hasDiscount() ? price : '';
                    }
                ),
            ),
            new Row(),
            new Row(
                new Spacer(),
                new Button(
                    () => this.hide(),
                    null,
                    "Cancel"
                ),
                new Spacer(),
                new Spacer(),
                new Button(
                    () => {
                        ConstructorUI.instance.order.addToCart();
                        this.hide();
                    },
                    null,
                    "OK"
                ),
                new Spacer(),
            )
        );
    }


    show() {
        ConstructorUI.instance.order.updateDiscount();
        if (ConstructorUI.instance.order.isValid()){
            super.show();
        } else {
            this.hide();

        }
    }
}