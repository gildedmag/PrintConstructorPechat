/// <reference path="UIControl.ts" />
class Row extends UIControl {

    getClassName(): string {
        return super.getClassName() + " row";
    }

    constructor(...controls: UIControl[]) {
        super();
        controls.forEach(control => {
            this.append(control);
        });
    }

}