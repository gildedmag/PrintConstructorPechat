/// <reference path="UIControl.ts" />

class LabelControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " label";
    }

    constructor(value?: string) {
        super();
        this.container.innerHTML = (value ? this.translate(value) : "");
    }

    setValue(value: string){
        this.container.innerHTML = this.translate(value);
    }

}