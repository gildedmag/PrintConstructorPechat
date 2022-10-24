/// <reference path="../TriggeredUIControl.ts" />
class FramesPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.append(
            new Row(
                new Spacer(),
                new LabelControl("Containers"),
                new Spacer()
            )
        )
        this.append(
            new Row(
                new Spacer(),
                new LayoutButton([
                    [90, 90, 5, 5],
                ]),
                new Spacer(),
                new LayoutButton([
                    [50, 50, 0, 0],
                    [50, 50, 50, 0],
                    [100, 50, 0, 50],
                ]),
                new Spacer(),
                new LayoutButton([
                    [100 / 3, 100 / 3, 0, 0],
                    [100 / 3, 100 / 3, 100 / 3, 0],
                    [100 / 3, 100 / 3, 100 / 3 * 2, 0],
                    [100, 100 / 3 * 2, 0, 100 / 3],
                ]),
                new Spacer(),
            ),
            new Row(
                new Spacer(),
                new LayoutButton([
                    [33, 33, 0, 0],
                    [33, 33, 0, 0],
                    [33, 33, 0, 33],
                    [33, 33, 0, 66],
                    [33, 33, 33, 0],
                    [33, 33, 33, 33],
                    [33, 33, 33, 66],
                    [33, 33, 66, 0],
                    [33, 33, 66, 33],
                    [33, 33, 66, 66],
                ]),
                new Spacer(),
                new LayoutButton([
                    [50, 50, 0, 0],
                    [50, 50, 50, 0],
                    [50, 50, 0, 50],
                    [50, 50, 50, 50],
                ]),
                new Spacer(),
                new LayoutButton([
                    [33, 33, 0, 0],
                    [33, 33, 33, 0],
                    [33, 33, 66, 0],
                    [66, 66, 0, 33],
                    [33, 33, 66, 0],
                    [33, 33, 66, 33],
                    [33, 33, 66, 66],
                ]),
                new Spacer(),
            ),
            new Row(
                new Spacer(),
                new LayoutButton([
                    [60, 100, 0, 0],
                    [40, 50, 60, 0],
                    [40, 50, 60, 50],
                ]),
                new Spacer(),
                new LayoutButton([
                    [100, 50, 0, 0],
                    [100, 50, 0, 50],
                ]),
                new Spacer(),
                new LayoutButton([
                    [50, 100, 0, 0],
                    [50, 100, 50, 0],
                ]),
                new Spacer(),
            )
        );

        this.append(
            new Row(
                new ConditionalButton(
                    () => this.c.getActiveSide().clear(),
                    () => !this.c.getActiveSide() || !this.c.getActiveSide().isEmpty(),
                    null,
                    "Clear Side"
                )
            )
        );


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
