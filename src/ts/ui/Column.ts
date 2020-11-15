/// <reference path="UIControl.ts" />
class Column extends UIControl {

    getClassName(): string {
        return super.getClassName() + " column";
    }

    constructor(...controls: UIControl[]) {
        super();
        this.append(new Spacer());
        controls.forEach(control => {
            this.append(control);
            this.append(new Spacer());
        });
    }

}