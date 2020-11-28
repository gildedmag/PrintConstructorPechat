/// <reference path="UIControl.ts" />
class Container extends UIControl {

    getClassName(): string {
        return super.getClassName();
    }

    constructor(...controls: UIControl[]) {
        super();
        this.append(...controls);
    }

    setValue(value: string){
        this.container.innerText = value;
    }

}