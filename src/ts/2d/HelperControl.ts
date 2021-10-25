class HelperControl extends fabric.Rect {

    private object: fabric.Object;
    side: Side2D;
    pressed = false;
    offset = 0;
    mouseDownEvent: (pointer: { x: number, y: number }) => any;
    mouseMoveEvent: (pointer: { x: number, y: number }) => any;
    mouseUpEvent: (pointer: { x: number, y: number }) => any;
    canvasCursorCache: String;

    dragCursor = 'url("https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur"), auto';
    defaultCursor = 'url("https://www.google.com/intl/en_ALL/mapfiles/openhand.cur"), auto';

    //background = new fabric.Rect(HelperControl.DEFAULTS)


    public static DEFAULTS = {
        width: window.devicePixelRatio == 1 ? 32 : 16 * window.devicePixelRatio,
        height: window.devicePixelRatio == 1 ? 32 : 16 * window.devicePixelRatio,
        left: 0,
        top: 0,
        radius: window.devicePixelRatio == 1 ? 32 : 16 * window.devicePixelRatio,
        //fill: "rgb(255,255,255)",
        fill: "#444",
        selectable: false,
        originX: "center",
        originY: "center",
        opacity: 0.8,
        hasBorders: true,
    };

    setIcon(base64: String, scale = 1){
        return;
        scale = scale * HelperControl.DEFAULTS.radius / 128;
        this.fill = new fabric.Pattern({
            source: base64,
            repeat: "no-repeat"
        });
        this.fill.patternTransform = [scale, 0, 0, scale, 0, 0];
    }

    constructor(side: Side2D, object: fabric.Object, offset: number = 0) {
        super(HelperControl.DEFAULTS);
        this.side = side;
        this.object = object;
        this.offset = offset;
        this.visible = false;

        this.on("mouseover", e => {
            this.opacity = 1;
            if (this.pressed) {
                this.hoverCursor = this.dragCursor;
                this.side.canvas.hoverCursor = this.dragCursor;
                this.side.canvas.setCursor(this.dragCursor);
            } else {
                this.hoverCursor = this.defaultCursor;
                this.side.canvas.hoverCursor = this.defaultCursor;
                this.side.canvas.setCursor(this.defaultCursor);
            }

            this.side.canvas.renderAll();
        });
        this.on("mouseout", e => {
            if (!this.pressed) {
                side.canvas.hoverCursor = 'move';
            }
            this.opacity = 0.8;
            this.object.canvas && this.object.canvas.renderAll();
        });
        this.side.canvas.on("mouse:move", e => {
            if (this.pressed && this.mouseMoveEvent) {
                this.mouseMoveEvent(e.pointer);
                this.side.canvas.setCursor(this.dragCursor);
            }
            if (this.pressed && this.hoverCursor != this.dragCursor) {
                this.hoverCursor = this.dragCursor;
                this.side.canvas.hoverCursor = this.dragCursor;
            }
        });
        this.side.canvas.on("mouse:up", e => {
            if (this.mouseMoveEvent) {
                this.pressed = false;
                this.mouseUpEvent && this.mouseUpEvent(e.pointer);
            }
            this.side.canvas.hoverCursor = 'move';
            this.side.canvas.renderAll();
            this.side.canvas.setCursor('move');
        });
        this.on("mousedown", e => {
            this.pressed = true;
            this.hoverCursor = this.dragCursor;
            this.side.canvas.hoverCursor = this.dragCursor;
            this.side.canvas.setCursor(this.dragCursor);
            this.mouseDownEvent && this.mouseDownEvent(e.pointer);
            this.object.canvas.setActiveObject(this.object);
        });
        this.on("mouseup", e => {
            this.pressed = false;
        });
        this.updatePosition();
        this.bringToFront();
        this.side.canvas.renderAll();
    }

    show(force = false) {
        if (force || this.visible == null || !this.visible) {
            this.visible = true;
            //this.background.visible = true;
            //this.background.bringToFront();
            this.bringToFront();
            this.dirty = true;
            this.object.canvas && this.object.canvas.renderAll();
        }
    }

    hide() {
        if (this.visible) {
            this.visible = false;
            //this.background.visible = false;
            this.dirty = true;
            this.object.canvas && this.object.canvas.renderAll();
        }
    }

    updatePosition(force = false) {
        this.left = this.object.left + this.offset;// + this.object.width / 2;
        this.top = this.object.top;// + this.object.top / 2;
        this.show(force);
        this.setCoords();
    }

}