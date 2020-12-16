/// <reference path="../TriggeredUIControl.ts" />

class ModelsPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " models-panel vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.append(
            new Row(
                new Button(
                    //() => window.location = ConstructorUI.instance.domain + '3Dconstructor',
                    () => window.location = '3Dconstructor',
                    Icon.BACKWARD,
                    'Choose other product'
                ),
            )
        )
    }

}