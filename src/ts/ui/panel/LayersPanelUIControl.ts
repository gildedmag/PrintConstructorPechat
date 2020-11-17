/// <reference path="../TriggeredUIControl.ts" />
class LayersPanelUIControl extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " layers-panel";
    }

    constructor() {
        super(Constructor.instance);
        this.update()
    }

    update() {
        if (this.children.length != this.c.sides.length) {
            this.clear();
            for (let i = 0; i < this.trigger.sides.length; i++) {
                let side = this.trigger.sides[i];
                this.append(new LayersUIControl(side));
            }
        }
    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }


}