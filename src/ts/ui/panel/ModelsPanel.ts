/// <reference path="../TriggeredUIControl.ts" />
/// <reference path="../pechat.photo/PrintUtils.ts" />

import PechatUtils = pechat.PrintUtils;

class ModelsPanel extends TriggeredUIControl<Constructor> {

    private options: Options;
    private static prefix = "https://pechat.photo/image/cache/";

    getClassName(): string {
        return super.getClassName() + " models-panel vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.append(
            new Row(
                new Button(() => window.location = ConstructorUI.instance.domain + '3Dconstructor', Icon.BACKWARD, 'Choose other product'),
            )
        )
    }

    update() {
    }


}