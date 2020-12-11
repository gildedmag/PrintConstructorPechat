/// <reference path="../TriggeredUIControl.ts" />

class SamplesPanel extends TriggeredUIControl<Order> {

    modelId: string = null;
    samples = new LabelControl()
        .addClass('samples')
        .addClass('vertical');
    title: UIControl;

    getClassName(): string {
        return super.getClassName() + " samples-panel vertical";
    }

    constructor() {
        super(ConstructorUI.instance.order);
        this.title = new LabelControl("Real Product Photos").addClass('title');
        this.update();
    }

    update() {
        super.update();
        this.updateSamples();
        if (!this.trigger.model || this.modelId == this.trigger.model.constructor_model_id) {
            return;
        }
        this.modelId = this.trigger.model.constructor_model_id;
        let model = this.trigger.model;
        let options = ConstructorUI.instance.options;
        this.clear();
        this.append(
            new Row(
                new LabelControl(options.name).addClass('title'),
            ),
            new Row(
                new LabelControl(options.description),
            ),
            new Row(
                new LabelControl(model.name).addClass('title'),
            ),
            new Row(
                new ImageControl(model.thumb),
            ),
            new Row(
                new LabelControl(model.description)
            ),
            new Row(
                new Spacer(),
            ),
            new Row(
                this.title,
            ),
            this.samples,
        );

    }

    updateSamples() {
        if (this.samples.container.innerHTML != this.trigger.samplesHtml) {
            this.samples.setValue(this.trigger.samplesHtml);
        }
        if (this.samples.isEmpty()) {
            this.samples.hide();
            this.title.hide();
        } else {
            this.samples.show();
            this.title.show();
        }
    }


}