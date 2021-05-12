/// <reference path="InputControl.ts" />
class TextInputControl<T extends Trigger<any>> extends InputControl<T> {

    getClassName(): string {
        return super.getClassName() + " text-input";
    }

    constructor(setter: (any) => any, getter: () => any, trigger?: T) {
        super('text', setter, getter, null, null, null, trigger);
        this.container.oninput = e => {
            this.setter(this.container.value);
        };
    }

}