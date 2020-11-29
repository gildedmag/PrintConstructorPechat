/// <reference path="Options.ts" />


class OptionButton extends UIControl {

    parent: OptionGroupPanel;
    value: ConstructorModelOption;

    constructor(value: ConstructorModelOption, parent: OptionGroupPanel) {
        super();
        this.parent = parent;
        this.value = value;

        let order = ConstructorUI.instance.order;
        let button = ToggleButton.of(
            order,
            () => this.parent.selectOption(this),
            () => order.hasOption(value),
            new IconControl(Icon.SQUARE)
                .setColor(value.constructor_value),
            new LabelControl(value.name),
            new Spacer(),
            new LabelControl(value.priceText),
        );

        button.enabledCheck = () => {
            if (this.isSelected() || !this.value.option_s || this.value.option_s.length == 0 || ConstructorUI.instance.order.selectedOptions.length == 0) {
                return true;
            }
            for (let i = 0; i < this.value.option_s.length; i++) {
                let id = this.value.option_s[i].option_value_relation_id;
                if (ConstructorUI.instance.order.hasOptionId(id)) {
                    return true;
                }
            }
            return false;
        }

        this.append(button);
    }

    isSelected() {
        return this.parent.selection === this;
    }


}