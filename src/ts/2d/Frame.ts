/// <reference path="../2d/HelperControl.ts" />
/// <reference path="../2d/Element2D.ts" />
class Frame extends Element2D {

    src: String;
    frame: fabric.Rect;
    cachedImage: any;
    scrollControl: HelperControl;
    resetControl: HelperControl;
    scaleControl: HelperControl;
    mouseDownX = 0;
    mouseDownY = 0;
    offsetX = 0;
    offsetY = 0;
    frameLeft = 0;
    frameTop = 0;
    scale = 1;
    lastScale = 1;
    controls: HelperControl[];

    resetImageTransform() {
        this.mouseDownX = 0;
        this.mouseDownY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.frameLeft = this.frame.left;
        this.frameTop = this.frame.top;
        this.frame.fill = new fabric.Pattern({
            source: this.src,
            repeat: "no-repeat"
        });
        this.side.canvas.renderAll();
    }


    /** @hidden */
    constructor(side?: Side2D, src?: string, callback?: (Element2D) => void, dimensions?: Block) {
        super(ElementType.RECTANGLE, side);
        this.src = src;
        let element = this;
        this.frame = element.object as fabric.Rect;
        if (dimensions != null) {
            this.frame.width = dimensions.width;
            this.frame.height = dimensions.height;
            this.frame.left = dimensions.left;
            this.frame.top = dimensions.top;
            this.object.setCoords();
            this.side.canvas.renderAll();
        } else {
            this.frame.width = 200;
            this.frame.height = 200;
            this.randomizePosition();
        }
        this.createImageControls();
        callback && callback(this.frame)
        this.updateControls();
        return element;
    }



    isText(): boolean {
        return false
    }

    isImage(): boolean {
        return false
    }

}
