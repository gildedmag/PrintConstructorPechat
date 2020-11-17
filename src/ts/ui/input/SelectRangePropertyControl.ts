/// <reference path="InputControl.ts" />
class SelectRangePropertyControl extends UIControl {

    private input: UIControl;

    getClassName(): string {
        return super.getClassName() + " property-control";
    }

    constructor(label: string, setter: (any) => any, getter: () => any, min?: number, max?: number, step?: number) {
        super();
        this.input = Utils.isCompact()
            ? new SelectControl(setter, getter, min, max, step)
            : new RangeControl(setter, getter, min, max, step);
        this.append(
            new Row(
                new LabelControl(label),
                new Spacer(),
                this.input
            )
        );
    }

}