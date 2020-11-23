/// <reference path="TriggeredButton.ts" />
class ConditionalButton extends TriggeredButton {

    check: () => boolean;

    getClassName(): string {
        return super.getClassName() + " button conditional";
    }

    constructor(
        action: () => any,
        check: () => boolean,
        icon: Icon | string,
        label?: string
    ) {
        super(action, icon, label);
        this.check = check;
        this.update();
    }

    update() {
        this.setVisible(this.check());
    }

}