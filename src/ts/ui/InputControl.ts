/// <reference path="../Utils.ts" />
/// <reference path="UIControl.ts" />
class InputControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " input";
    }

    constructor(type: string, action: () => any) {
        super("input");
        this.container.type = "color";
        this.onChange(action, this);
        this.container.onchange = () => this.changed();
    }

}