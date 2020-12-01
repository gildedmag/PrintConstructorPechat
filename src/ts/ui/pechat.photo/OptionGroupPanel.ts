/// <reference path="Options.ts" />
/// <reference path="../UIControl.ts" />

class OptionGroupPanel extends UIControl {

    option: Option;
    values: OptionButton[] = [];
    selection: OptionButton;

    getClassName(): string {
        return super.getClassName() + " options-group vertical";
    }

    constructor(option: Option) {
        super();
        this.option = option;

        this.append(
            new Row(
                new Spacer()
            ),
            new Row(
                new Spacer(),
                new LabelControl(option.name).addClass("bold"),
                new Spacer(),
            )
        );
    }

    selectOption(optionButton: OptionButton) {
        let fillsArray: number[];
        if (optionButton.value.zalivka) {
            fillsArray = optionButton.value.zalivka.split(',').map(s => parseInt(s));
            Constructor.instance.preview.setFills(null, ...fillsArray);
        }
        if (this.selection) {
            ConstructorUI.instance.order.removeSelectedOption(this.selection.value);
            if (this.selection == optionButton) {
                this.selection = null;
                if (optionButton.value.zalivka) {
                    Constructor.instance.preview.clearFills();
                }
                return;
            }
        }
        this.selection = optionButton;
        ConstructorUI.instance.order.addSelectedOption(optionButton.value);

        if (optionButton.value.zalivka) {
            Constructor.instance.preview.setFills(optionButton.value.constructor_value, ...fillsArray);
        }
    }

    addOption(option: ConstructorModelOption) {
        let optionButton = new OptionButton(option, this);
        this.values.push(optionButton);
        this.append(optionButton);
    }

}