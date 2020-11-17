/// <reference path="UIControl.ts" />
abstract class TriggeredUIControl<T extends Trigger<T>> extends UIControl {

    trigger: T;

    constructor(trigger: T, tag?: string) {
        super(tag);
        trigger.onChange(() => this.update(), this);
        trigger.onVisibilityChange(() => this.updateVisibility());
        this.trigger = trigger;
    }

    updateVisibility() {

    }

}