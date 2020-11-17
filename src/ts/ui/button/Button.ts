/// <reference path="../UIControl.ts" />
class Button extends UIControl {

    getClassName(): string {
        return super.getClassName() + " button";
    }

    constructor(action: () => void, icon: Icon | string, label?: string) {
        super();
        if (icon) {
            this.append(
                new IconControl(icon)
            );
        }
        if (label) {
            this.append(
                new LabelControl(label),
                new Spacer(),
            );
        }
        this.container.onclick = () => action();
    }

}