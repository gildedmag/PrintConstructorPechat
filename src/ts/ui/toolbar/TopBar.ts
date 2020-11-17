/// <reference path="ToolBar.ts" />

class TopBar extends ToolBar {

    getClassName(): string {
        return super.getClassName() + " top";
    }

    constructor() {
        super();
        this.append(
            new Spacer(),
            new Button(() => this.c.undo(), Icon.UNDO),
            new Button(() => this.c.redo(), Icon.REDO),
            new Spacer(),
        );
    }

}