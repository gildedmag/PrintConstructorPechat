/// <reference path="TriggeredButton.ts" />
class ToggleButton extends TriggeredUIControl<any> {

    action: () => void;
    check: () => boolean;
    enabledCheck: () => boolean;
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
        enabledCheck?: () => boolean,
        label?: string,
        trigger?: Trigger<any>
    ) {
        super(trigger || Constructor.instance);
        this.action = action;
        this.check = check;
        this.enabledCheck = enabledCheck;
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
        this.container.onclick = () => {
            if (!this.enabledCheck || this.enabledCheck()){
                action();
            }
        };
    }

    static of(trigger: Trigger<any>,
              action: () => any,
              check: () => boolean,
              ...controls: UIControl[]) {
        let button = new ToggleButton(action, check, null, null, null, null, trigger);
        button.append(...controls);
        return button;
    }

    updateEnabled() {
        if (this.enabledCheck) {
            if (this.enabledCheck()) {
                this.removeClass("disabled")
            } else {
                this.addClass("disabled");
            }
        }
    }

    update() {
        this.updateEnabled();

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