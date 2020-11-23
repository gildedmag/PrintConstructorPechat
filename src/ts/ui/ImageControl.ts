/// <reference path="UIControl.ts" />
class ImageControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " image";
    }

    constructor(value?: string) {
        super("img");
        this.container.src = (value || "");
    }

    setValue(value: string){
        this.container.src = value;
    }

}