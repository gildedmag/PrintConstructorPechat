class ToggleButtonUIControl extends ButtonUIControl {

    action: () => void;
    check: () => boolean;
    iconOn: Icon;
    iconOff: Icon;

    getClassName(): string {
        return super.getClassName() + " toggle-button-control";
    }

    constructor(
        action: () => any,
        check: () => boolean,
        iconOn: Icon,
        iconOff: Icon
    ) {
        super(action, iconOn);
        this.action = action;
        this.check = check;
        this.iconOn = iconOn;
        this.iconOn = iconOn;
        this.iconOff = iconOff;
        this.container.onclick = () => this.action();
        this.update();
    }

    update(){
        this.container.innerHTML = this.check() ? this.iconOn : this.iconOff;
    }

}