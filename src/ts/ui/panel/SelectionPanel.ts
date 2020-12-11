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
                () => this.c.getSelection().getAlpha() * 100,
                10,
                100,
                10
            ),
            new SelectRangePropertyControl(
                "Shadow",
                value => this.c.getSelection().setShadow(value / 10),
                () => this.c.getSelection().getShadow() * 10
            ),
        );
        if (!this.c.hasImageSelection()) {
            this.append(
                new SelectionColorControl(
                    "Color",
                    value => this.c.getSelection().setColor(value),
                    () => this.c.getSelection().getColor().toHex()
                )
            )
        }
        if (this.c.hasTextSelection()) {
            this.append(
                new SelectRangePropertyControl(
                    "Font Size",
                    value => this.c.getSelection().setFontSize(value),
                    () => this.c.getSelection().getFontSize(),
                    8,
                    120,
                    8
                ),
                new SelectRangePropertyControl(
                    "Letter Spacing",
                    value => this.c.getSelection().setLetterSpacing(value),
                    () => this.c.getSelection().getLetterSpacing(),
                    -200,
                    2000,
                    50
                ),
                new SelectRangePropertyControl(
                    "Line Height",
                    value => this.c.getSelection().setLineHeight(value),
                    () => this.c.getSelection().getLineHeight(),
                    0.5,
                    3,
                    0.25
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
                new Row(
                    new LabelControl("Font"),
                    new Spacer(),
                    this.textPropertyToggleButton("Bold"),
                    this.textPropertyToggleButton("Italic"),
                    this.textPropertyToggleButton("Underline"),
                    this.textPropertyToggleButton("Linethrough"),
                ),
                new Row(
                    new LabelControl("Alignment"),
                    new Spacer(),
                    this.textAlignmentButton(TextAlignment.LEFT, Icon.ALIGN_LEFT),
                    this.textAlignmentButton(TextAlignment.CENTER, Icon.ALIGN_CENTER),
                    this.textAlignmentButton(TextAlignment.RIGHT, Icon.ALIGN_RIGHT),
                    this.textAlignmentButton(TextAlignment.JUSTIFY, Icon.ALIGN_JUSTIFY),
                )
            );
        }

    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    }

    textAlignmentButton(alignment: TextAlignment, icon: Icon) {
        return new ToggleButton(
            () => this.c.getSelection().setTextAlignment(alignment),
            () => this.c.hasTextSelection() && this.c.getSelection().getTextAlignment() == alignment,
            icon
        )
    }

    textPropertyToggleButton(property: string): ToggleButton {
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