/// <reference path="../TriggeredUIControl.ts" />
class SwitchButton extends TriggeredUIControl<View<any>> {

    private visibility: () => boolean;

    getClassName(): string {
        return super.getClassName() + " button";
    }

    constructor(view: any, icon: Icon | string, visibility?: () => boolean) {
        super(view);
        this.visibility = visibility;
        this.container.innerHTML = icon;
        this.container.onclick = () => {
            this.trigger.show();
        }
    }

    updateVisibility() {
        this.update();
    }

    update() {
        if (this.visibility && !this.visibility()) {
            this.hide();
        } else {
            this.show();
        }
        if (this.trigger.isVisible()) {
            this.addClass("active")
        } else {
            this.removeClass("active")
        }
    }



}
