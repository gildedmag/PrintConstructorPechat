/// <reference path="../UIControl.ts" />
class SelectPropertyControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " property-control select";
    }

    constructor(label: string, setter: (any) => any, getter: () => any, min?: number, max?: number, step?: number) {
        super();
        this.append(
            new Row(
                new LabelControl(label),
                new Spacer(),
                new SelectControl(setter, getter, min, max, step)
            )
        );
    }

}