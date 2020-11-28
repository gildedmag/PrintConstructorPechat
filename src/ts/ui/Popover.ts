/// <reference path="UIControl.ts" />
class Popover extends UIControl {

    frame: UIControl;

    getClassName(): string {
        return super.getClassName() + " popover";
    }

    constructor(...controls: UIControl[]) {
        super();
        let frame = new Container().addClass("vertical");
        frame.append(...controls);
        this.frame = frame;
        this.hide();
        this.append(frame);
    }

    show() {
        this.container.style.display = null;
        setTimeout(() => {
            this.container.style.opacity = "1";
            this.frame.container.style.bottom = "0";
        });
    }

    hide() {
        setTimeout(() => {
            this.container.style.display = Constants.NONE;
        }, 500);
        this.container.style.opacity = "0";
        this.frame.container.style.bottom = "-100vh";
    }

}