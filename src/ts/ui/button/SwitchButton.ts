/// <reference path="UIControl.ts" />
class SwitchButton extends TriggeredUIControl<View<any>> {

    getClassName(): string {
        return super.getClassName() + " button";
    }

    constructor(view: View<any>, icon: Icon | string) {
        super(view);
        this.container.innerHTML = icon;
        this.container.onclick = () => {
            this.trigger.show();
        }
    }

    updateVisibility() {
        this.update();
    }

    update() {
        if (this.trigger.isVisible()){
            this.addClass("active")
        } else {
            this.removeClass("active")
        }
    }

    

}