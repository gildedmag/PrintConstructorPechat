/// <reference path="UIControl.ts" />
class Popover extends UIControl {

    //check: () => boolean;

    getClassName(): string {
        return super.getClassName() + " popover";
    }

    constructor(...controls: UIControl[]) {
        super();
        let frame = new Container().addClass("vertical");
        frame.append(...controls);
        this.append(frame);
    }

}