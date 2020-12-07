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

            new ToggleButton(
                () => this.c.toggleSnapToGrid(),
                () => this.c.snapToGrid,
                Icon.BORDER_ALL,
                null,
                () => this.c.is2D(),
            ).tooltip('Snap to Grid'),
            new ToggleButton(
                () => this.c.toggleSnapToObjects(),
                () => this.c.snapToObjects,
                Icon.VECTOR_SQUARE,
                null,
                () => this.c.is2D(),
            ).tooltip('Snap to Objects'),

            new ToggleButton(
                () => {
                    if (this.c.is2D()) {
                        ConstructorUI.instance.sidePanel.optionsPanel.show();
                    } else {
                        if (this.c.getActiveSide().isEmpty()) {
                            ConstructorUI.instance.sidePanel.newElementPanel.show();
                        } else {
                            ConstructorUI.instance.sidePanel.layersPanel.show();
                        }
                    }
                    this.c.toggleMode();
                },
                () => this.c.getMode() == Mode.Mode3D,
                Icon.DICE_D6,
                null,
                null,
                Utils.isCompact() ? null : "3D"
            ).tooltip('Toggle 3D Mode'),

            new Spacer(),

            new TriggeredLabelControl(
                ConstructorUI.instance.order,
                () => ConstructorUI.instance.order.getPricePerItem()
            ).addClass('desktop'),

            new Button(
                () => ConstructorUI.instance.addToCartPopover.show(),
                Icon.CART_PLUS
            ).tooltip('Add to Cart'),
        );
    }


}