/// <reference path="TriggeredUIControl.ts" />
class TriggeredLabelControl<T extends Trigger<any>> extends TriggeredUIControl<T> {

    getter: (TriggeredUIControl?) => any;
    control: TriggeredLabelControl<any>;

    getClassName(): string {
        return super.getClassName() + " label";
    }

    constructor(trigger: T, getter: (TriggeredUIControl?) => any) {
        super(trigger);
        this.control = this;
        this.getter = getter;
        setTimeout(this.update, 100);
        this.update();
    }

    setValue(value: string){
        this.container.innerText = value;
    }

    update() {
        let value: string = null;
        try {
            value = this.translate(this.getter(this.control));
        } catch (e){}

        if (value != null){
            this.setValue(value.toString());
        }
    }

}
