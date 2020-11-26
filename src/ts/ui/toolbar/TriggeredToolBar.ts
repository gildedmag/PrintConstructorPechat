/// <reference path="../TriggeredUIControl.ts" />
class TriggeredToolBar extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " toolbar";
    }

    constructor(...controls: UIControl[]) {
        super(Constructor.instance);
        this.append(...controls);
    }

}