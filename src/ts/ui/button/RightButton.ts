/// <reference path="../UIControl.ts" />
class RightButton extends UIControl {

    getClassName(): string {
        return super.getClassName() + " button";
    }

    constructor(action: () => void, icon: Icon | string, label?: string) {
        super();
        if (label) {
            this.append(
                new LabelControl(label),
                new Spacer(),
            );
        }
        if (icon) {
            this.append(
                new IconControl(icon)
            );
        }
        this.container.onclick = () => action();
    }

}