abstract class TriggeredUIControl<T extends Trigger<T>> extends UIControl {

    trigger: T;

    constructor(trigger: T) {
        super();
        trigger.onChange(() => this.update());
        trigger.onVisibilityChange(() => this.updateVisibility());
        this.trigger = trigger;
    }

    abstract updateVisibility();

}