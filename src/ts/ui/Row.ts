/// <reference path="UIControl.ts" />
class Row extends UIControl {

    getClassName(): string {
        return super.getClassName() + " row";
    }

    constructor(...controls: UIControl[]) {
        super();
        this.append(...controls);
    }

}