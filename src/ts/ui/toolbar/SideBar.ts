/// <reference path="VerticalToolBarUIControl.ts" />
class SideBar extends VerticalToolBarUIControl {

    buttons: SwitchButton[] = [];

    getClassName(): string {
        return super.getClassName() + " sidebar";
    }

    constructor() {
        super();
        let panel = ConstructorUI.instance.sidePanel;
        this.appendSwitch(
            panel.newElementPanel,
            Icon.SHAPES,
            () => Constructor.instance.is2D()
        );
        this.appendSwitch(
            panel.layersPanel,
            Icon.LAYER_GROUP,
            () => Constructor.instance.is2D()
        );
        this.appendSwitch(
            panel.selectionPanel,
            Icon.SLIDERS_H,
            () => Constructor.instance.hasSelection()
        );
        this.appendSwitch(
            panel.fontFamilyPanel,
            Icon.FONT,
            () => Constructor.instance.hasTextSelection()
        );
        this.appendSwitch(
            panel.filtersPanel,
            Icon.TINT,
            () => Constructor.instance.hasImageSelection()
        );
        this.appendSwitch(
            panel.modelsPanel,
            Icon.MUG_HOT,
            //Icon.SHOPPING_BAG,

        );
        this.appendSwitch(
            panel.optionsPanel,
            Icon.CLIPBOARD_LIST,
            //Icon.SHOPPING_BAG,

        );
        this.appendSwitch(
            panel.sharePanel,
            Icon.FILE_DOWNLOAD,
            //Icon.SHOPPING_BAG,

        );
        this.append(new Spacer());
        this.hideOthers(this.c.getActiveSide().isEmpty() ? panel.newElementPanel : panel.layersPanel);

    }

    private appendSwitch(control: UIControl, icon: Icon, visibility?: () => boolean) {
        let button = new SwitchButton(control, icon, visibility);
        this.buttons.push(button);
        Constructor.instance.onChange(() => button.update(), button);
        control.onVisibilityChange(trigger => {
            if (trigger.isVisible()) {
                this.hideOthers(trigger);
            }
        });
        this.append(button);
    }

    hideOthers(activeTrigger: UIControl) {
        this.buttons.forEach(button => {
            if (button.trigger != activeTrigger) {
                button.trigger.hide();
                button.removeClass("selected");
            } else {
                button.addClass("selected");
            }
        });
    }

}