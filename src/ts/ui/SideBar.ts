/// <reference path="VerticalToolBarUIControl.ts" />
class SideBar extends VerticalToolBarUIControl {

    buttons: SwitchButton[] = [];

    getClassName(): string {
        return super.getClassName() + " sidebar";
    }

    constructor() {
        super();
        let panel = ConstructorUI.instance.sidePanel;
        this.appendSwitch(panel.addElementsPanel, Icon.PLUS);
        this.appendSwitch(panel.layersPanel, Icon.LAYER_GROUP);
        this.appendSwitch(new Button(null, ""), Icon.TH_LARGE);
        this.append(new Spacer());
        this.hideOthers(panel.layersPanel);

    }

    private appendSwitch(control: UIControl, icon: Icon){
        let button = new SwitchButton(control, icon);
        this.buttons.push(button);
        control.onVisibilityChange(trigger => {
            if (trigger.isVisible()) {
                this.hideOthers(trigger);
            }
        });
        this.append(button);
    }

    hideOthers(activeTrigger: UIControl){
        this.buttons.forEach(button => {
            if (button.trigger != activeTrigger){
                button.trigger.hide();
                button.removeClass("selected");
            } else {
                button.addClass("selected");
            }
        });
    }

}