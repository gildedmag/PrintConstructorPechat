/// <reference path="Popover.ts" />

class AddToCartPopover extends Popover {

    constructor() {
        super(
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
                    () => ConstructorUI.instance.order.getTotalCostWithDiscount()
                ),
            ),
            new Row(
                new LabelControl("Discount"),
                new Spacer(),
                new TriggeredLabelControl(
                    ConstructorUI.instance.order,
                    () => {
                        let discount = ConstructorUI.instance.order.getTotalDiscount();
                        return (discount ? discount : "");
                    }
                ).addClass('discount')
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

}