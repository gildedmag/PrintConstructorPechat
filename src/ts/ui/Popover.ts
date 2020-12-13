/// <reference path="UIControl.ts" />
class Popover extends UIControl {

    static instance: Popover;

    frame: UIControl;
    keyListener: EventListenerOrEventListenerObject;
    permanent = true;

    getClassName(): string {
        return super.getClassName() + " popover";
    }

    constructor(title?: string, content?: string, show?: boolean, ...controls: UIControl[]) {
        super();
        let frame = new Container().addClass("vertical");

        if (controls.length === 0 && (title || content)){

            this.permanent = false;

            if (title){
                frame.append(
                    new Row(
                        new Spacer(),
                        new LabelControl(title).addClass("title"),
                        new Spacer(),
                    )
                );
            }

            if (content){
                frame.append(
                    new Row(
                        new Spacer(),
                        new LabelControl(content).allowUserSelect(),
                        new Spacer(),
                    ),
                );
            }

            frame.append(
                new Row(
                    new Spacer(),
                    new Button(
                        () => {
                            this.hide();
                        },
                        null,
                        "OK"
                    ),
                    new Spacer(),
                )
            );

            this.container.onclick = e => {
                if (e.target === this.container){
                    this.hide();
                }
            }

            this.frame = frame;
            this.append(frame);
            document.body.appendChild(this.container);
            this.show();
        } else {
            frame.append(...controls);
            this.container.onclick = e => {
                if (e.target === this.container){
                    this.hide();
                }
            }

            this.frame = frame;
            if (show != true) this.hide();
            this.append(frame);
        }

    }

    show() {
        Popover.instance = this;
        this.container.style.display = null;
        setTimeout(() => {
            this.container.style.opacity = "1";
            this.frame.container.style.bottom = "0";
        });
    }

    hide() {
        if (this.permanent){
            setTimeout(() => {
                this.container.style.display = Constants.NONE;
            }, 500);
            this.container.style.opacity = "0";
            this.frame.container.style.bottom = "-100vh";
        } else {
            document.body.removeChild(this.container);
        }
        Popover.instance = null;
    }

}