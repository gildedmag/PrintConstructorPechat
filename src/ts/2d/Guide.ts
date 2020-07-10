/** @hidden */
abstract class Guide extends fabric.Line {

    private static DEFAULTS = {
        left: 0,
        top: 0,
        stroke: Color.GUIDE.toRgba(),
        selectable: false,
        width: 1
    };

    constructor() {
        super([0, 0, 0, 0], Guide.DEFAULTS);
        this.dirty = true;
        //Constructor.instance.getActiveSide().canvas.requestRenderAll();
    }

    show() {
        this.stroke = Color.GUIDE.toRgba();
        this.bringToFront();
        this.dirty = true;
        //Constructor.instance.getActiveSide().canvas.requestRenderAll();
    }

    hide() {
        this.stroke = Color.TRANSPARENT.toRgba();
        this.dirty = true;
        //Constructor.instance.getActiveSide().canvas.requestRenderAll();
    }

}