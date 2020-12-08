/// <reference path="Options.ts" />
/// <reference path="../UIControl.ts" />

class OptionGroupPanel extends UIControl {

    option: pechat.Option;
    values: OptionButton[] = [];

    getClassName(): string {
        return super.getClassName() + " options-group vertical";
    }

    constructor(option: pechat.Option) {
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
        ).tooltip(option.description);
    }

    addOption(option: ConstructorModelOption): OptionButton {
        let optionButton = new OptionButton(option, this);
        this.values.push(optionButton);
        this.append(optionButton);
        return optionButton;
    }

}