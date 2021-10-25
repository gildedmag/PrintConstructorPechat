/// <reference path="../Map.ts" />
/// <reference path="../Associated.ts" />
class ElementType extends Associated<ElementType>{

    nativeType: any;

    static CIRCLE = new ElementType(fabric.Circle);
    static RECTANGLE = new ElementType(fabric.Rect);
    static TRIANGLE = new ElementType(fabric.Triangle);
    static TEXT = new ElementType(fabric.IText);
    static IMAGE = new ElementType(fabric.Image);
    static FRAME = new ElementType(fabric.Path);

    constructor(nativeType: any) {
        super(nativeType.prototype.type);
        this.nativeType = nativeType;
    }

    getNativeTypeName(): string {
        return this.nativeType.prototype.type;
    }

}