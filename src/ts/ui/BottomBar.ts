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
            new Spacer(),
            new ToggleButton(
                () => {
                    this.c.toggleMode();
                    this.update();
                },
                () => this.c.getMode() == Mode.Mode3D,
                Icon.SQUARE,
                Icon.CUBE
            )
        );
    }


}