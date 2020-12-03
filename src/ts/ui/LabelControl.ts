/// <reference path="UIControl.ts" />
class LabelControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " label";
    }

    constructor(value?: string) {
        super();
        this.container.innerHTML = (value || "");
    }

    setValue(value: string){
        this.container.innerHTML = value;
    }

}