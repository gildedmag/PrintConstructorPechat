/// <reference path="UIControl.ts" />
/// <reference path="TriggeredUIControl.ts" />
/// <reference path="../Icon.ts" />
class LayersPanelUIControl extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " layers-panel";
    }

    constructor(c: Constructor) {
        super(c);
        this.update()
    }

    update(){
        this.clear();
        for (let i = 0; i < this.trigger.sides.length; i++) {
            let side = this.trigger.sides[i];
            this.append(new LayersUIControl(side));
        }
    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }



}