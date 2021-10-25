/// <reference path="UIControl.ts" />
/// <reference path="TriggeredUIControl.ts" />
class ImageControl extends TriggeredUIControl<Constructor> {

    src: String;
    container: HTMLImageElement;

    getClassName(): string {
        return super.getClassName() + " image button sticker";
    }

    constructor(value?: string, clickable?: boolean) {
        super(Constructor.instance, "img");
        this.src = value;
        this.container.src = (value || "");
        if (clickable) {
            this.container.onclick = () => {
                let selection = Constructor.instance.getSelection();
                if (selection != null && selection.object != null) {
                    if (selection.object.fill != null && selection.object.fill.source != null) {
                        selection.object.fill.source.src = value;
                    } else {
                        selection.object.fill = new fabric.Pattern({
                            source: value,
                            repeat: "no-repeat"
                        });
                    }
                    Constructor.instance.getActiveSide().canvas.renderAll();
                    setTimeout(() => {
                        Constructor.instance.getActiveSide().canvas.renderAll();
                    }, 100)
                } else {
                    Constructor.instance.addFrame(this.container.src);
                }
                Constructor.instance.changed();
            };
        }
    }

    update() {
        //super.update();
        if (this.src) {
            let selection = Constructor.instance.getSelection();
            if (selection
                && selection.object
                && selection.object.fill
                && selection.object.fill.source
                && this.src == selection.object.fill.source.src
            ) {
                this.select();
            } else {
                this.deselect();
            }
        }
    }

    setValue(value: string) {
        this.container.src = value;
    }

}
