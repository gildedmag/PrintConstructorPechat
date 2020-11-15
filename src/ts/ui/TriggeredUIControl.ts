abstract class TriggeredUIControl<T extends Trigger<T>> extends UIControl {

    trigger: T;

    constructor(trigger: T) {
        super();
        trigger.onChange(() => this.update(), this);
        trigger.onVisibilityChange(() => this.updateVisibility());
        this.trigger = trigger;
    }

    updateVisibility() {

    }

}