/// <reference path="UIControl.ts" />
class IconControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " icon";
    }

    constructor(icon: Icon | string) {
        super();
        this.container.innerHTML = icon;
    }

}