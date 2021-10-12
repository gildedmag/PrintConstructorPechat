/// <reference path="./Side2DStateObjects.ts" />
/** @hidden */
class Side2DState extends Side2DStateObjects<Side2D> implements Equalable<Side2DState> {

    width: number;
    height: number;
    roundCorners: number;
    productPicture: string;
    mask: string;

    constructor(side: Side2D) {
        super(side);
        this.width = side.width;
        this.height = side.height;
        this.roundCorners = side.roundCorners;
        this.productPicture = side.productPicture || '';
        this.mask = side.mask || '';
    }

    equals(state: Side2DState): boolean {
        if (this.width != state.width || this.height != state.height || this.roundCorners != state.roundCorners){
            return false;
        }
        return super.equals(state);
    }

}
