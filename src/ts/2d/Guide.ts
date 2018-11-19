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
    }

    show() {
        (<any>this).setStroke(Color.GUIDE.toRgba());
        this.bringToFront();
    }

    hide() {
        (<any>this).setStroke(Color.TRANSPARENT.toRgba());
    }

}