/// <reference path="InputControl.ts" />
class ColorControl extends InputControl {

    getClassName(): string {
        return super.getClassName() + " color";
    }

    constructor(setter: (any) => any, getter: () => any) {
        super("color", setter, getter);
    }

}