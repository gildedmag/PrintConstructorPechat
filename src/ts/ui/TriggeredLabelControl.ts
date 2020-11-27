/// <reference path="TriggeredUIControl.ts" />
class TriggeredLabelControl<T extends Trigger<any>> extends TriggeredUIControl<T> {

    getter: () => any;

    getClassName(): string {
        return super.getClassName() + " label";
    }

    constructor(trigger: T, getter: () => any) {
        super(trigger);
        this.getter = getter;
        this.update();
    }

    setValue(value: string){
        this.container.innerText = value;
    }

    update() {
        let value: object = null;
        try {
            value = this.getter();
        } catch (e){}

        if (value != null){
            this.setValue(value.toLocaleString());
        }
    }

}