/// <reference path="InputControl.ts" />
class RangeControl extends InputControl {

    getClassName(): string {
        return super.getClassName() + " input";
    }

    constructor(setter: (any) => any, getter: () => any, min?: number, max: number, step: number) {
        super("range", setter, getter, min, max, step);

    }

}