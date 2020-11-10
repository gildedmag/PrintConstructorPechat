class ButtonUIControl extends UIControl<() => void> {

    getClassName(): string {
        return "constructor-button-control";
    }

    constructor(model: () => void, icon: Icon) {
        super(model);
        this.container.innerHTML = icon;
        this.container.onclick = () => model();
    }

}