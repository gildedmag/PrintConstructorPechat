/// <reference path="ToolBar.ts" />
class BottomBar extends ToolBar {

    getClassName(): string {
        return super.getClassName() + " bottom";
    }

    constructor() {
        super();
        this.update();
    }

    update() {
        this.clear();
        let previewButtons = [];
        if (!Constructor.instance.is2dEditorMode()) {
            previewButtons.push(
                new ToggleButton(
                    () => {
                        if (this.c.is2D()) {
                            ConstructorUI.instance.show3D();
                        } else {
                            ConstructorUI.instance.show2D();
                        }
                        setTimeout(() => window.dispatchEvent(new Event('resize')), 100)
                    },
                    () => this.c.is3D(),
                    Icon.DICE_D6,
                    null,
                    null,
                    null
                ).addClass('mobile')
            )
            previewButtons.push(
                new Button(
                    () => {
                        ConstructorUI.instance.show3D();
                        setTimeout(() => window.dispatchEvent(new Event('resize')), 100)
                    },
                    Icon.DICE_D6,
                    Utils.isCompact() ? null : "3D-Preview",
                ).showWhen(Constructor.instance, () => this.c.is2D())
                    .addClass('desktop')
                    .addClass('preview-3d')
            );

            previewButtons.push(
                new Button(
                    () => {
                        ConstructorUI.instance.show2D();
                        setTimeout(() => window.dispatchEvent(new Event('resize')), 100)
                    },
                    Icon.DICE_D6,
                    Utils.isCompact() ? null : "Exit 3D-Preview"
                ).showWhen(Constructor.instance, () => this.c.is3D())
                    .addClass('desktop')
                    .addClass('preview-3d')
                    .addClass('preview-3d-exit')
            );
        }

        this.append(
            new Button(
                () => {
                    ConstructorUI.instance.toggleClass("collapsed");
                    ConstructorUI.instance.sidePanel.toggleVisibility();
                    ConstructorUI.instance.sideBar.buttons.forEach(button => button.toggleVisibility());
                    window.dispatchEvent(new Event('resize'));
                },
                Icon.BARS
            ).tooltip('Toggle Sidebar'),
            new Spacer(),

            new Button(() => {
                this.c.zoomIn();
            }, Icon.SEARCH_PLUS).tooltip('Zoom In'),
            new Button(() => {
                this.c.zoomOut();
            }, Icon.SEARCH_MINUS).tooltip('Zoom Out'),
            new ConditionalButton(
                () => this.c.zoomToFit(),
                () => this.c.is2D(),
                Icon.SEARCH
            ).tooltip('Zoom to Fit'),

            ...previewButtons,

            new Spacer(),

            Button.of(
                () => ConstructorUI.instance.addToCartPopover.show(),
                    new TriggeredLabelControl(
                        ConstructorUI.instance.order,
                        () => ConstructorUI.instance.order.getPricePerItem()
                    ),
                    new LabelControl('$'),
                    new IconControl(Icon.CART_PLUS),
            ).addClass('price-bottom')
                .addClass('desktop'),
                //.addClass('vertical'),

            new TriggeredLabelControl(
                ConstructorUI.instance.order,
                () => ConstructorUI.instance.order.getPricePerItem() + this.translate('$')
            ).addClass('mobile').addClass('price-bottom'),

            //new LabelControl('$').addClass('mobile').addClass('price-bottom'),

            new Button(
                () => ConstructorUI.instance.addToCartPopover.show(),
                Icon.CART_PLUS
            ).addClass('mobile').tooltip('Add to Cart')
        );
    }


}
