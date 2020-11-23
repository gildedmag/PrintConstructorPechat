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
            ),
            new Spacer(),

            new Button(() => {
                this.c.zoomIn();
            }, Icon.SEARCH_PLUS),
            new Button(() => {
                this.c.zoomOut();
            }, Icon.SEARCH_MINUS),
            new Button(() => {
                this.c.zoomToFit();
            }, Icon.SEARCH),


            new ToggleButton(
                () => this.c.toggleSnapToGrid(),
                () => this.c.snapToGrid,
                Icon.BORDER_ALL
            ),
            new ToggleButton(
                () => this.c.toggleSnapToObjects(),
                () => this.c.snapToObjects,
                Icon.VECTOR_SQUARE
            ),

            new Spacer(),

            new ToggleButton(
                () => {
                    this.c.toggleMode();
                    this.update();
                },
                () => this.c.getMode() == Mode.Mode3D,
                Icon.DICE_D6
            )
        );
    }


}