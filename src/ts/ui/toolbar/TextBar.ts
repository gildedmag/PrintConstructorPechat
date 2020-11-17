/// <reference path="ToolBar.ts" />

class TextBar extends ToolBar {

    getClassName(): string {
        return super.getClassName() + " text";
    }

    constructor() {
        super();
        this.update();
    }

    update() {
        this.clear();
        this.append(
            new Row(
                new LabelControl("Text"),
                new Spacer(),
                this.button("Bold"),
                this.button("Italic"),
                this.button("Underline"),
                this.button("Linethrough"),
            )
        );
    }

    button(property: string): ToggleButton {
        return new ToggleButton(
            () => {
                Constructor.instance.getSelection()["toggle" + property]();
                this.update();
            },
            () => Constructor.instance.getSelection()["is" + property](),
            Icon[property.toUpperCase()]
        );
    }

}