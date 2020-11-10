class ToggleButtonUIControl extends UIControl<() => {}> {

    action: () => void;
    check: () => boolean;
    iconOn: Icon;
    iconOff: Icon;

    getClassName(): string {
        return "constructor-button-control constructor-toggle-button-control";
    }

    constructor(
        action: () => void,
        check: () => boolean,
        iconOn: Icon,
        iconOff: Icon
    ) {
        super(null);
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