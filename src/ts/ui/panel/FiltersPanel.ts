/// <reference path="../TriggeredUIControl.ts" />
class FiltersPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " filters vertical";
    }

    constructor() {
        super(Constructor.instance);

        this.addFilterButton(Filter.BRIGHTNESS, "Brightness");
        this.addFilterButton(Filter.DARKNESS, "Darkness");
        this.addFilterButton(Filter.BLUR, "Blur");
        this.addFilterButton(Filter.SHARPEN, "Sharpen");
        this.addFilterButton(Filter.EMBOSS, "Sharpen");
        this.addFilterButton(Filter.INVERT, "Invert");
        this.addFilterButton(Filter.GRAYSCALE, "Grayscale");

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


    addFilterButton(filter: Filter, label: string) {
        if (filter.isBoolean) {
            this.append(
                new Row(
                    new LabelControl(label),
                    new Spacer(),
                    new ToggleButton(
                        () => Constructor.instance.getSelection().addFilter(filter),
                        () => Constructor.instance.getSelection().hasFilter(filter),
                        Icon.TOGGLE_ON,
                        Icon.TOGGLE_OFF
                    ),
                )
            )
        } else {
            this.append(
                new Row(
                    new LabelControl(label),
                    new Spacer(),
                    new ConditionalButton(
                        () => Constructor.instance.getSelection().removeFilter(filter),
                        () => Constructor.instance.getSelection() && Constructor.instance.getSelection().hasFilter(filter),
                        Icon.MINUS_CIRCLE,
                    ),
                    new Button(
                        () => Constructor.instance.getSelection().addFilter(filter),
                        Icon.PLUS_CIRCLE,
                    ),
                )
            )
        }

    }

    show() {
        super.show();
        this.update();
    }


}