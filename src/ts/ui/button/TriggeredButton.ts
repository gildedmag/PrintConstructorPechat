/// <reference path="../UIControl.ts" />
class TriggeredButton extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " button";
    }

    constructor(action: () => void, icon: Icon | string, label?: string) {
        super(Constructor.instance);
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