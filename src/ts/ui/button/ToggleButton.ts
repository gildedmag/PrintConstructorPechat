/// <reference path="TriggeredButton.ts" />
class ToggleButton extends TriggeredUIControl<Constructor> {

    action: () => void;
    check: () => boolean;
    iconOn: Icon | string;
    iconOff: Icon | string;

    icon: IconControl;
    label: LabelControl;

    getClassName(): string {
        return super.getClassName() + " button toggle";
    }

    constructor(
        action: () => any,
        check: () => boolean,
        iconOn: Icon | string,
        iconOff?: Icon | string,
        label?: string
    ) {
        super(Constructor.instance);
        this.action = action;
        this.check = check;
        this.iconOn = iconOn;
        this.iconOn = iconOn;
        this.iconOff = (iconOff || iconOn);
        if (this.iconOn != this.iconOff) {
            this.addClass("active");
        }
        this.container.onclick = () => this.action();
        this.update();

        if (iconOn) {
            this.icon = new IconControl(iconOn);
            this.append(this.icon);
        }
        if (label) {
            this.label = new LabelControl(label);
            this.append(this.label);
        }
        this.container.onclick = () => action();
    }

    update() {
        let isOn = false;
        try {
            isOn = this.check();
        } catch (e) {
            console.log(e.message);
        }
        if (isOn) {
            if (this.icon && this.iconOn != this.iconOff) {
                this.icon.setValue(this.iconOn);
                //this.addClass("active");
            } else {
                this.addClass("active");
            }
        } else {
            if (this.icon && this.iconOn != this.iconOff) {
                 this.icon.setValue(this.iconOff);
            } else if (this.iconOn == this.iconOff) {
                this.removeClass("active");
            }
        }
    }

}