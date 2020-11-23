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
        super(() => {
            if (!this.hasClass("disabled")){
                action();
            }
        }, icon, label);
        this.check = check;
        this.update();
    }

    update() {
        this.check()
            ? this.removeClass("disabled")
            : this.addClass("disabled");
    }

}