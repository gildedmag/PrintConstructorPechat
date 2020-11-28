/// <reference path="InputControl.ts" />
class NumberInputControl extends InputControl {

    getClassName(): string {
        return super.getClassName() + " number-input";
    }

    constructor(setter: (any) => any, getter: () => any) {
        super('text', setter, getter, 1, 999, 1);
        this.setAttribute('pattern', '[0-9]*');
    }

}