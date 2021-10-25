/// <reference path="../TriggeredUIControl.ts" />
class GalleryPanel extends TriggeredUIControl<Constructor> {

    imageContainer = new FlowControl(2, true);
    images = [];

    getClassName(): string {
        return super.getClassName() + " vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.append(this.imageContainer);
        this.update();
        setTimeout(() => this.updateImages(), 200);
    }

    updateImages() {
        for (let side of Constructor.instance.sides) {
            for (let src of side.getImageSources()) {
                if (this.images && this.images.indexOf(src) == -1) {
                    this.images.push(src);
                    let imageControl = new ImageControl(src, true);
                    this.imageContainer.append(imageControl);
                }
            }
        }
        // let selection = Constructor.instance.getSelection();
        // if (selection.object && selection.object.fill && selection.object.fill.source){
        //     for (let image of this.images) {
        //         if (image == selection.object.fill.source.src) {
        //
        //         }
        //     }
        // }
    }

    show() {
        super.show();
        this.update();
    }

    update() {
        super.update();
        this.updateImages();
        let selection = Constructor.instance.getSelection();
        if (selection instanceof Frame && !selection.src){
            if (!this.isVisible()) {
                this.show();
            }
        }
    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }

    addButton(label: string, type: ElementType, icon: Icon) {
        this.append(
            new Row(
                new Button(
                    () => this.c.addElement(type),
                    icon,
                    label
                ),
            )
        );
    }

}
