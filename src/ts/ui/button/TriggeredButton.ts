/// <reference path="../UIControl.ts" />
class TriggeredButton<T extends Trigger<any>> extends TriggeredUIControl<T> {

    getClassName(): string {
        return super.getClassName() + " button";
    }

    constructor(action: () => void, icon: Icon | string, label?: string, trigger?: T) {
        super(trigger || Constructor.instance);
        if (icon) {
            this.append(
                new IconControl(icon)
            );
        }
        if (label) {
            this.append(
                new LabelControl(label),
                //new Spacer(),
            );
        }
        this.container.onclick = () => action();
    }

}