/// <reference path="UIControl.ts" />
/// <reference path="../Icon.ts" />
class LayersUIControl extends TriggeredUIControl<Side2D> {

    getClassName(): string {
        return super.getClassName() + " layers vertical";
    }

    constructor(side: Side2D) {
        super(side);
        this.update();
    }

    update() {
        console.log(this.trigger.getClassName(), this.children.length, this.trigger.getLayers().length);
        if (this.children.length != this.trigger.getLayers().length) {
            this.clear();
            console.log("CLEARED");
            this.trigger.getLayers().forEach(layer => {
                this.append(new LayerUIControl(layer));
            });
        }
        this.updateVisibility();
    }

    updateVisibility() {
        if (this.isVisible() != this.trigger.isVisible()) {
            this.setVisible(this.trigger.isVisible());
        }
    }


}