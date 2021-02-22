/// <reference path="Options.ts" />
/// <reference path="../UIControl.ts" />

class OptionGroupPanel extends UIControl {

    option: pechat.Option;
    values: OptionButton[] = [];
    flow: FlowControl;

    getClassName(): string {
        return super.getClassName() + " options-group vertical";
    }

    constructor(option: pechat.Option) {
        super();
        this.flow = new FlowControl();
        this.option = option;
        this.append(
            new Row(
                new Spacer(),
                new LabelControl(option.name).addClass("bold"),
                new Spacer(),
            )
        )
        this.append(this.flow);
    }

    addOption(option: ConstructorModelOption): OptionButton {
        let optionButton = new OptionButton(option, this);
        this.values.push(optionButton);
        this.flow.append(optionButton);
        return optionButton;
    }

}
