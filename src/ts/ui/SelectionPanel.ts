/// <reference path="UIControl.ts" />
/// <reference path="TriggeredUIControl.ts" />
/// <reference path="../Icon.ts" />
class SelectionPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " selection-panel vertical";
    }

    constructor(c: Constructor) {
        super(c);
        this.update()
    }

    update(){
        this.clear();
        let selection = this.c.getSelection();
        if (!selection){
            return;
        }
        console.log("SELECTION PANEL UPDATE");
        this.append(
            new Row(
                new LabelControl("Transparency"),
                new Spacer(),
                new AlphaPicker()
            ),
            new Row(
                new LabelControl("Color"),
                new Spacer(),
                new ColorPicker()
            ),
        );
    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }



}