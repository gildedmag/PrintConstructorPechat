/// <reference path="TriggeredButton.ts" />
class ConditionalButton<T extends Trigger<any>> extends TriggeredButton<T> {

    check: () => boolean;

    getClassName(): string {
        return super.getClassName() + " button conditional";
    }

    constructor(
        action: () => any,
        check: () => boolean,
        icon: Icon | string,
        label?: string,
        trigger?: T
    ) {
        super(
            () => {
            if (!this.hasClass("disabled")){
                action();
            }
        },
            icon,
            label,
            trigger
        );
        this.check = check;
        this.update();
    }

    update() {
        this.check()
            ? this.removeClass("disabled")
            : this.addClass("disabled");
    }

}