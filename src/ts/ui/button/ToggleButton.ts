/// <reference path="TriggeredButton.ts" />
class ToggleButton extends TriggeredButton {

    action: () => void;
    check: () => boolean;
    iconOn: Icon | string;
    iconOff: Icon | string;

    getClassName(): string {
        return super.getClassName() + " toggle";
    }

    constructor(
        action: () => any,
        check: () => boolean,
        iconOn: Icon | string,
        iconOff?: Icon | string
    ) {
        super(action, iconOn);
        this.action = action;
        this.check = check;
        this.iconOn = iconOn;
        this.iconOn = iconOn;
        this.iconOff = iconOff || iconOn;
        this.container.onclick = () => this.action();
        this.update();
    }

    update(){
        let isOn = false;
        try {
            isOn = this.check();
        } catch (e) {
            console.log(e.message);
        }
        if (isOn){
            this.container.innerHTML = this.iconOn;
            this.addClass("active");
        } else {
            this.container.innerHTML = this.iconOff;
            this.removeClass("active");
        }
    }

}