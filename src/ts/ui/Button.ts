/// <reference path="UIControl.ts" />
class Button extends UIControl {

    getClassName(): string {
        return super.getClassName() + " button";
    }

    constructor(action: () => void, icon: Icon | string) {
        super();
        this.container.innerHTML = icon;
        this.container.onclick = () => action();
    }

    update() {
    }

    

}