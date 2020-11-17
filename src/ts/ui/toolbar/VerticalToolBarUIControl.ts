/// <reference path="ToolBar.ts" />
class VerticalToolBarUIControl extends ToolBar {

    getClassName(): string {
        return super.getClassName() + " vertical";
    }

}