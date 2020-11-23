/// <reference path="../TriggeredUIControl.ts" />
/// <reference path="../pechat.photo/PechatUtils.ts" />

import Options = pechat.Options;
import PechatUtils = pechat.PrintUtils;

class ModelsPanel extends TriggeredUIControl<Constructor> {

    private options: Options;
    private static prefix = "https://pechat.photo/image/cache/";

    getClassName(): string {
        return super.getClassName() + " models-panel vertical";
    }

    constructor() {
        super(Constructor.instance);

    }

    update() {
    }


}