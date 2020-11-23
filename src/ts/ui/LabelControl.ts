/// <reference path="UIControl.ts" />
class LabelControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " label";
    }

    constructor(value?: string) {
        super();
        this.container.innerText = (value || "");
    }

    setValue(value: string){
        console.log(value);
        this.container.innerText = value;
    }

}