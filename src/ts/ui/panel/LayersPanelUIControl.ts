/// <reference path="../TriggeredUIControl.ts" />
class LayersPanelUIControl extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " layers-panel";
    }

    constructor() {
        super(Constructor.instance);
        this.update()
    }

    update(force: boolean = false) {
        if (force || this.children.length - 1 != this.c.sides.length) {
            this.clear();
            for (let i = 0; i < this.trigger.sides.length; i++) {
                let side = this.trigger.sides[i];
                this.append(new LayersUIControl(side));
            }
            this.append(
                new Row(
                    new ConditionalButton(
                        () => Constructor.instance.getActiveSide().clear(),
                        () => !Constructor.instance.getActiveSide() || !this.c.getActiveSide().isEmpty(),
                        null,
                        "Clear Side"
                    )
                )
            )
        }
    }

    updateVisibility() {
        this.trigger.is2D() ? this.show() : this.hide();
    }

}