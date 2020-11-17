/// <reference path="InputControl.ts" />
class SelectionColorControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " property-control color";
    }

    constructor(label: string, setter: (any) => any, getter: () => any, max?: number, step?: number) {
        super();
        this.append(
            new Row(
                new LabelControl(label),
                new Spacer(),
                new ColorControl(setter, getter)
            )
        );
    }

    update() {

    }

}