/// <reference path="InputControl.ts" />
class NumberInputControl<T extends Trigger<any>> extends InputControl<T> {

    static max = 999;

    getClassName(): string {
        return super.getClassName() + " number-input";
    }

    constructor(setter: (any) => any, getter: () => any, trigger?: T) {
        super('text', setter, getter, 1, NumberInputControl.max, 1, trigger);
        this.setAttribute('pattern', '[0-9]*');
        this.container.oninput = e => {
            let inputEvent = e as InputEvent;
            if (inputEvent.data ) {
                if (!inputEvent.data.match(/[0-9]+/g)) {
                    this.container.value = this.container.value.substring(0, this.container.value.length - inputEvent.data.length)
                }
            }
            if (!this.container.value || this.container.value === '0'){
                this.container.value = 1;
            }
            if (parseInt(this.container.value) > NumberInputControl.max){
                this.container.value = NumberInputControl.max;
            }
            this.setter(this.container.value);
        };
        this.container.addEventListener("paste", e => e.preventDefault());
    }

}