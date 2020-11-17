/// <reference path="../TriggeredUIControl.ts" />
class NewElementPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.addButton("Circle", ElementType.CIRCLE, Icon.CIRCLE);
        this.addButton("Rectangle", ElementType.RECTANGLE, Icon.SQUARE);
        this.addButton("Triangle", ElementType.TRIANGLE, Icon.CARET_UP);
        this.addButton("Text", ElementType.TEXT, Icon.FONT);
        this.update();
    }

    show() {
        super.show();
        this.update();
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