/// <reference path="../TriggeredUIControl.ts" />
class SelectControl extends TriggeredUIControl<Constructor> {

    getter: () => any;
    setter: (any) => any;
    values: string[] = [];
    valuesGetter?: () => string[];

    getClassName(): string {
        return super.getClassName() + " select";
    }

    constructor(setter: (any) => any, getter: () => any, min?: number, max?: number, step?: number, valuesGetter?: () => string[]) {
        super(Constructor.instance, "select");
        if (valuesGetter){
            this.valuesGetter = valuesGetter;
        } else {
            for (let i = (min || 0); i <= (max || 100); i += (step || 10)) {
                let option: HTMLOptionElement = document.createElement("option")
                option.value = i.toString();
                option.innerText = i.toString();
                this.container.appendChild(option);
            }
        }
        this.getter = getter;
        this.setter = setter;
        this.container.value = getter();
        this.container.onchange = () => {
            let value = (this.container as HTMLSelectElement).value;
            this.setter(value);
            this.changed();
        }
    }

    update() {
        if (this.valuesGetter) {
            let values = this.valuesGetter();
            if (values.length <= 1){
                this.hide();
                return
            } else {
                this.show();
            }
            if (this.values.length <  values.length){
                this.values = values;
                this.container.innerHTML = '';
                for (let i = 0; i < this.values.length; i++) {
                    let option: HTMLOptionElement = document.createElement("option")
                    option.value = i;
                    option.innerText = this.values[i];
                    this.container.appendChild(option);
                }
            }
        }

        // let value = this.getter();
        // (this.container as HTMLSelectElement).value = value;
    }

}