/// <reference path="../TriggeredUIControl.ts" />
class OrderPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " order vertical";
    }

    constructor() {
        super(Constructor.instance);

        this.append(
            new Row(
                new Spacer(),
                new ConditionalButton(
                    () => Constructor.instance.getSelection().resetFilters(),
                    () => Constructor.instance.getSelection() && Constructor.instance.getSelection().hasFilters(),
                    "Reset Filters"
                ),
                new Spacer(),
            )
        )

        this.update();
    }

}