/// <reference path="../TriggeredUIControl.ts" />
class SelectionPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " selection-panel vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.update();
    }

    show() {
        super.show();
        this.update();
    }

    update() {
        this.clear();
        if (!this.c.getSelection()) {
            return
        }
        this.append(
            new SelectRangePropertyControl(
                "Transparency",
                value => this.c.getSelection().setAlpha(value / 100),
                () => this.c.getSelection().getAlpha() * 100
            ),
            new SelectRangePropertyControl(
                "Shadow",
                value => this.c.getSelection().setShadow(value / 10),
                () => this.c.getSelection().getShadow() * 10
            ),
            new SelectionColorControl(
                "Color",
                value => this.c.getSelection().setColor(value),
                () => this.c.getSelection().getColor().toHex()
            ),
        );
        if (this.c.getSelection().type == ElementType.TEXT) {
            this.append(
                new SelectRangePropertyControl(
                    "Font Size",
                    value => this.c.getSelection().setFontSize(value),
                    () => this.c.getSelection().getFontSize(),
                    4,
                    96,
                    2
                ),
                new Row(
                    new LabelControl("Font Family"),
                    new Spacer(),
                    new Button(
                        () => ConstructorUI.instance.sidePanel.fontFamilyPanel.show(),
                        null,
                        this.c.getSelection().getFontFamily()
                    )
                ),
                new TextBar()
            );
        }

    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }


}