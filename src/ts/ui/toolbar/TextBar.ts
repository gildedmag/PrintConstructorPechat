/// <reference path="ToolBar.ts" />

class TextBar extends ToolBar {

    getClassName(): string {
        return super.getClassName() + " text";
    }

    constructor() {
        super();
        this.update();
    }

    update() {
        this.clear();
        this.append(
            
        );
    }



}