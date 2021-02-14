/// <reference path="VerticalToolBarUIControl.ts" />
class SideBar extends VerticalToolBarUIControl {

    buttons: SwitchButton[] = [];

    getClassName(): string {
        return super.getClassName() + " sidebar";
    }

    constructor() {
        super();
        let panel = ConstructorUI.instance.sidePanel;
        this.append(
            this.createSwitch(
                panel.modelsPanel,
                Icon.MUG_HOT,
            ).tooltip('Product Types'),
            this.createSwitch(
                panel.newElementPanel,
                Icon.SHAPES,
                () => Constructor.instance.is2D()
            ).tooltip('Page'),
            this.createSwitch(
                panel.stickersPanel,
                Icon.SPLOTCH,
                () => Constructor.instance.is2D()
            ).tooltip('Stickers'),
            this.createSwitch(
                panel.layersPanel,
                Icon.LAYER_GROUP,
                () => Constructor.instance.is2D()
            ).tooltip('Layers'),
            this.createSwitch(
                panel.selectionPanel,
                Icon.SLIDERS_H,
                () => Constructor.instance.hasSelection()
            ).tooltip('Properties'),
            this.createSwitch(
                panel.fontFamilyPanel,
                Icon.FONT,
                () => Constructor.instance.hasTextSelection()
            ).tooltip('Fonts'),
            this.createSwitch(
                panel.filtersPanel,
                Icon.TINT,
                () => Constructor.instance.hasImageSelection()
            ).tooltip('Filters'),
            this.createSwitch(
                panel.optionsPanel,
                Icon.CLIPBOARD_LIST,
                () => ConstructorUI.instance.order.model && ConstructorUI.instance.order.model.constructor_model_option && ConstructorUI.instance.order.model.constructor_model_option.length > 0
            ).tooltip('Options'),
            this.createSwitch(
                panel.samplesPanel,
                Icon.INFO_CIRCLE,
            ).tooltip('Product Info'),
            this.createSwitch(
                panel.sharePanel,
                Icon.FILE_DOWNLOAD,
            ).tooltip('Export & Sharing'),
            new Spacer(),
        );
        this.hideOthers(!this.c.getActiveSide() || this.c.getActiveSide().isEmpty() ? panel.newElementPanel : panel.layersPanel);
    }

    private createSwitch(control: UIControl, icon: Icon, visibility?: () => boolean) {
        let button = new SwitchButton(control, icon, visibility);
        this.buttons.push(button);
        Constructor.instance.onChange(() => button.update(), button);
        control.onVisibilityChange(trigger => {
            if (trigger.isVisible()) {
                this.hideOthers(trigger);
            }
        });
        return button;
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
