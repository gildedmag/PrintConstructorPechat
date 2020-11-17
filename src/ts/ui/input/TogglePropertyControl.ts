/// <reference path="../UIControl.ts" />
class TogglePropertyControl extends UIControl {

    getClassName(): string {
        return super.getClassName() + " property-control toggle";
    }

    constructor(icons: Icon, label: string, setter: (any) => any, getter: () => any) {
        super();
        this.append(
            new Row(
                new LabelControl(label),
                new Spacer(),
                new ToggleButton(setter, getter, label, label)
            )
        );
    }

}