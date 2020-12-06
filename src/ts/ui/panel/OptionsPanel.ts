/// <reference path="../TriggeredUIControl.ts" />

class OptionsPanel extends TriggeredUIControl<Constructor> {

    getClassName(): string {
        return super.getClassName() + " options-panel vertical";
    }

    constructor() {
        super(Constructor.instance);
    }

    update() {
    }


}