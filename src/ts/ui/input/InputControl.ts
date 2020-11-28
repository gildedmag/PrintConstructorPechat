/// <reference path="../TriggeredUIControl.ts" />
class InputControl<T extends Trigger<any>> extends TriggeredUIControl<T> {

    getter: () => any;
    setter: (any) => any;

    getClassName(): string {
        return super.getClassName() + " input";
    }

    constructor(type: string, setter: (any) => any, getter: () => any, min?: number, max?: number, step?: number, trigger?: T) {
        super((trigger || Constructor.instance), "input");
        this.getter = getter;
        this.setter = setter;
        let element = this.container as HTMLInputElement;
        element.type = type;
        element.min = min || 0;
        element.max = max || 100;
        element.step = step || 10;
        element.value = getter();
        element.onchange = () => {
            Trigger.preventUpdate = false;
            let value = this.container.value;
            this.setter(value);
            this.changed();
        }
        element.oninput = e => {
            console.log("Trigger.preventUpdate = true;");
            Trigger.preventUpdate = true;
            let value = this.container.value;
            this.setter(value);
        }
        // this.onChange((control) => {
        //     let value = this.container.value;
        //     console.log("this.container.value", value);
        //     this.setter(value)
        // }, this);
    }

    update() {
        if ((this.trigger === this.c && this.c.hasSelection()) || this.trigger != this.c) {
            this.updateValue();
        }
    }

    updateValue(){
        this.container.value = this.getter();
    }

}