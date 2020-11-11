class ButtonUIControl extends UIControl {

    getClassName(): string {
        return "button-control";
    }

    constructor(action: () => void, icon: Icon) {
        super();
        this.container.innerHTML = icon;
        this.container.onclick = () => action();
    }

    update() {
    }

    

}