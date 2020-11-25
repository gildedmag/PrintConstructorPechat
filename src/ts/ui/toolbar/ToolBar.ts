/// <reference path="../UIControl.ts" />
class ToolBar extends UIControl {

    getClassName(): string {
        return super.getClassName() + " toolbar";
    }

    constructor(...controls: UIControl[]) {
        super();
        this.append(...controls);
    }

}