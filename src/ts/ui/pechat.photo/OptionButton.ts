/// <reference path="Options.ts" />


class OptionButton extends ToggleButton {

    parent: OptionGroupPanel;
    value: ConstructorModelOption;


    getClassName(): string {
        return super.getClassName() + " ";
    }

    constructor(value: ConstructorModelOption, parent: OptionGroupPanel) {
        super(
            () => this.select(),
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
            if (this.isSelected() || ConstructorUI.instance.order.selectedOptions.length == 0) {
                return true;
            }

            if (ConstructorUI.instance.order.selectedOptions[0].option_id == this.value.option_id) {
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

    select() {
        let fillsArray: number[];
        let order = ConstructorUI.instance.order;
        if (this.value.zalivka) {
            fillsArray = this.value.zalivka.split(',').map(s => parseInt(s));
            Constructor.instance.preview.setFills(null, ...fillsArray);
        }
        if (order.hasOption(this.value)) {
            ConstructorUI.instance.order.removeSelectedOption(this.value);
            if (this.value.zalivka) {
                Constructor.instance.preview.clearFills();
            }
            return;
        }
        ConstructorUI.instance.order.addSelectedOption(this.value);

        if (this.value.zalivka) {
            this.setFillsAsync(fillsArray)
        }
    }

    setFillsAsync(fillsArray: number[]) {
        if (Constructor.instance.preview.isLoaded) {
            Constructor.instance.preview.setFills(this.value.constructor_value, ...fillsArray);
        } else {
            setTimeout(() => this.setFillsAsync(fillsArray), 100);
        }
    }


    isSelected() {
        return ConstructorUI.instance.order.hasOption(this.value);
    }


}