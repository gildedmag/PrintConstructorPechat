/// <reference path="../TriggeredUIControl.ts" />
class SelectControl extends TriggeredUIControl<Constructor> {

    private getter: () => any;
    private setter: (any) => any;

    getClassName(): string {
        return super.getClassName() + " select";
    }

    constructor(setter: (any) => any, getter: () => any, min?: number, max?: number, step?: number) {
        super(Constructor.instance, "select");
        for (let i = (min || 0); i <= (max || 100); i += (step || 10)) {
            let option: HTMLOptionElement = document.createElement("option")
            option.value = i.toString();
            option.innerText = i.toString();
            this.container.appendChild(option);
        }
        this.getter = getter;
        this.setter = setter;
        this.container.value = getter();
        this.container.onchange = () => {
            let value = (this.container as HTMLSelectElement).value;
            console.log("this.container.value", value);
            this.setter(value);
            this.changed();
        }
    }

    update() {
        console.log("InputControl update");
        let selection = this.c.getSelection();
        if (selection) {
            let value = this.getter();
            console.log("getter value:", value);
            (this.container as HTMLSelectElement).value = value;
        } else {
        }
    }

}