/// <reference path="Options.ts" />


class OptionButton extends ToggleButton {

    parent: OptionGroupPanel;
    value: ConstructorModelOption;


    getClassName(): string {
        return super.getClassName() + " ";
    }

    constructor(value: ConstructorModelOption, parent: OptionGroupPanel) {
        super(
            () => parent.selectOption(this),
            () => ConstructorUI.instance.order.hasOption(value),
            null,
            null,
            null,
            null,
            ConstructorUI.instance.order
        );
        this.parent = parent;
        this.value = value;

        this.append(
            new IconControl(Icon.SQUARE)
                .setColor(value.constructor_value),
            new LabelControl(value.name),
            new Spacer(),
            new LabelControl(value.priceText),
        );
        this.addClass("row");

        this.enabledCheck = () => {
            if (this.isSelected() || !this.value.option_s || this.value.option_s.length == 0 || ConstructorUI.instance.order.selectedOptions.length == 0) {
                return true;
            }

            if (ConstructorUI.instance.order.selectedOptions.length == 1 && ConstructorUI.instance.order.selectedOptions[0].option_id == this.value.option_id) {
                return true;
            }

            let compatibleOptionIds = {};
            for (let i = 0; i < this.value.option_s.length; i++) {
                let compatibleOptionId = this.value.option_s[i].option_value_relation_id;
                compatibleOptionIds[compatibleOptionId] = true;
            }

            for (let j = 0; j < ConstructorUI.instance.order.selectedOptions.length; j++) {
                let selectedOption = ConstructorUI.instance.order.selectedOptions[j];
                if (selectedOption.option_id != this.value.option_id) {
                    if (!compatibleOptionIds[selectedOption.id]) {
                        return false;
                    }
                }
            }
            return true;
        }

    }

    isSelected() {
        return this.parent.selection === this;
    }


}