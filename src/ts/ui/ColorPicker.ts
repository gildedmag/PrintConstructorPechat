/// <reference path="InputControl.ts" />
class ColorPicker extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " color-picker";
    }

    private input: InputControl;
    private label: LabelControl;

    constructor() {
        super(Constructor.instance);
        this.input = new InputControl("color", () => {
            this.c.getSelection().setColor(this.input.container.value);
        });
        this.label = new LabelControl("");
        
        this.append(
            //new Column(
                this.label,
                this.input
            //)
        );
        this.update();
    }

    update() {
        let selection = this.c.getSelection();
        if (selection){
            //this.show();
            let color = selection.getColor().toHex();
            this.label.setValue(color);
            this.input.container.value = color;
        } else {
            //this.hide();
        }
    }

}