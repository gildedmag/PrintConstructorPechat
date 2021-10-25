/// <reference path="../2d/HelperControl.ts" />
class Frame extends Element2D {

    static scrollControlIcon = "data:image/png;base64,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";
    static scaleControlIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAI9AAACPQGsco8uAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAMlQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALJMpoAAAAEJ0Uk5TAAIEEDM1QENTV1piY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fqaoqq2vsLG8vr/Q2Nrc5ebq7O/w8fr7/P3+dMHBqgAAAeBJREFUeNrtm9dSAkEQRUcUwazknIMJEUQEMTD9/x+lhVUUEnZnhu6elz4fsOe8bM1LX6X2IdqfTvtR5Y3EHH6ZJ3z5kxoW6KQffwqWpHz407BCmt+fgX9kuP1ZWCPL68/BBjlOfx62kPfsZywowA4KPP4i7KTI4S9BACV6fxkCKVP7KxBChdZfhVCqlP4aGFCj89fBiDqVvwGGNGj8TTCmSeFvgQUtfH8brGhj+ztgSQfX3wVrup79qAUxcCKGFjBwCxigBUzcAiZoAUO3gCH3G0D3JkSeXPy9COJ/eHI/Gr9/mqq/ZuPRXVzRMluTHipmJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJIA5IH77YnPA8PH2+niKqI/0XE44Hg7QAhyPWPCOO72f8Xg/ZHI85XpGC3A7ZtPHeL+B0zkf6oFx17Pf4aQT/cTb8qiV4Mjd6qyX5Mzf4rCZaOjQ8Ow3fhMIpyZG5/2kYxuDgQPx4Cl04kE++QoZuTCM3gJnPiyzv4ChE9PwcdfUi2/6uX3sphnHr9sK9I1iZHPwqK8VK+uTT32lmPk/etWXip20Z//q8FlfKC8sp9/nyhN/4/fvM+WNxfz/aK9P/ABeyTyDEgAK6wAAAABJRU5ErkJggg==";
    static resetControlIcon = "data:image/png;base64,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";

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
        this.scrollControl = new HelperControl(this.side, this.frame, HelperControl.DEFAULTS.radius / 2);
        this.scrollControl.mouseDownEvent = point => {
            this.mouseDownX = point.x;
            this.mouseDownY = point.y;
        };
        this.scrollControl.mouseMoveEvent = point => {
            let x = point.x - this.mouseDownX + this.offsetX;
            let y = point.y - this.mouseDownY + this.offsetY;

            if (x > 0) {
                x = 0;
            } else if (this.frame.fill.source) {
                let minOffset = -this.frame.fill.source.width * this.scale + this.frame.width
                if (x < minOffset) {
                    x = minOffset;
                }
            }
            if (y > 0) {
                y = 0;
            } else if (this.frame.fill.source) {
                let minOffset = -this.frame.fill.source.height * this.scale + this.frame.height
                if (y < minOffset) {
                    y = minOffset;
                }
            }
            //console.error(x, (this.frame.fill.width - this.frame.width));
            this.frame.fill.offsetX = x;
            this.frame.fill.offsetY = y;
            side.canvas.renderAll();
        };
        this.scrollControl.mouseUpEvent = point => {
            this.frameLeft = this.frame.left;
            this.frameTop = this.frame.top;
            this.offsetX = this.frame.fill.offsetX;
            this.offsetY = this.frame.fill.offsetY;
        };
        // this.resetControl = new HelperControl(this.side, this.frame, HelperControl.DEFAULTS.radius);
        // this.resetControl.mouseDownEvent = () => {
        //     this.resetImageTransform();
        // }
        this.scaleControl = new HelperControl(this.side, this.frame, -HelperControl.DEFAULTS.radius / 2);
        this.scaleControl.mouseDownEvent = point => {
            this.mouseDownX = point.x;
            this.mouseDownY = point.y;
        };
        this.scaleControl.mouseMoveEvent = point => {
            let dy = point.y - this.mouseDownY;
            let scale = this.scale + dy / window.screen.height * 8;
            if (scale < 0.01 || scale > 4) {
                return;
            }
            let projectedRight = this.offsetX + this.frame.fill.source.width * scale;
            if (projectedRight < this.frame.width) {
                return;
            }
            let projectedBottom = this.offsetY + this.frame.fill.source.height * scale;
            if (projectedBottom < this.frame.height) {
                return;
            }
            this.lastScale = this.scale + dy / window.screen.height * 8;
            this.frame.fill.patternTransform = [this.lastScale, 0, 0, this.lastScale, 0, 0];
            side.canvas.renderAll();
        };
        this.scaleControl.mouseUpEvent = point => {
            this.scale = this.lastScale;
        };

        this.scaleControl.setIcon(Frame.scaleControlIcon);
        this.scrollControl.setIcon(Frame.scrollControlIcon);
        this.scaleControl.defaultCursor = "nesw-resize";
        this.scaleControl.dragCursor = "nesw-resize";
        //this.resetControl.setIcon(Frame.resetControlIcon);
        this.controls = [this.scrollControl, this.scaleControl];
        for (let control of this.controls) {
            this.side.canvas.add(control);
        }
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
        this.frame.originX = "center";
        this.frame.originY = "center";
        this.frameLeft = this.frame.left;
        this.frameTop = this.frame.top;
        this.frame.objectCaching = false;
        this.frame.set('strokeUniform', true);
        // this.frame.stroke = Color.GRAY.toRgba();
        // this.frame.strokeWidth = 1;
        var pattern
        if (src == null || src.length == 0) {
            pattern = "rgb(255,255,255)";
        } else {
            pattern = new fabric.Pattern({
                source: src,
                repeat: "no-repeat"
            });
        }
        this.frame.fill = pattern;
        this.frame.setCoords();

        side.canvas.renderAll();
        side.saveState();
        element.changed();
        side.canvas.preserveObjectStacking = true;
        side.canvas.uniScaleTransform = true;

        this.frame.on("mousedblclick", e => {
        });

        this.frame.on(Constants.SELECTED, () => {
            side.canvas.renderAll();
            this.updateControls(true);
        });

        this.frame.on(Constants.DESELECTED, () => {
            this.hideControls();
        });

        this.frame.on('scaling', e => {
            this.normalizeScale();
            this.hideControls();
        });

        this.frame.on('scaled', e => {
            this.normalizeScale();
            this.updateControls();
        });

        this.frame.on('mouseover', e => {
        });

        this.frame.on('mousemove', e => {
        });

        this.frame.on('moving', e => {
            this.updateControls();
        });

        this.frame.on('moved', e => {
            this.frameLeft = this.frame.left;
            this.frameTop = this.frame.top;
            this.offsetX = this.frame.fill.offsetX;
            this.offsetY = this.frame.fill.offsetY;
            this.updateControls();
        });

        this.frame.on('dragenter', e => {
            console.error('dragenter', e);
            if (this.frame.fill.source) {
                this.cachedImage = this.frame.fill;
            }
            this.frame.fill = Constants.FRAME_DEFAULT_FILL;
            side.canvas.renderAll();
        });

        this.frame.on('dragover', e => {
        });

        this.frame.on('dragleave', e => {
            console.error('dragleave', e);
            if (this.cachedImage != null) {
                this.frame.fill = this.cachedImage;
            } else if (this.frame.fill.source == null) {
                this.frame.fill = "rgb(255,255,255)";
            }
            this.frame.stroke = Color.GRAY.toRgba();
            side.canvas.renderAll();
        });

        this.frame.on('drop', (e) => {
            console.error('drop', e);
            //e.e.preventDefault();
            e.e.preventDefault();
            if (this.cachedImage) {
                this.frame.fill = this.cachedImage;
            }
            let src = e.e.dataTransfer.getData("text/plain");
            //console.error(src);

            if (!this.frame.fill || !this.frame.fill.source) {
                this.frame.fill = new fabric.Pattern({
                    source: src,
                    repeat: "no-repeat"
                });
                setTimeout(() => {
                    Constructor.instance.getActiveSide().canvas.renderAll();
                })
            } else {
                this.frame.fill.source.src = src;
            }

            this.frame.opacity = 1;
            side.canvas.renderAll();
        });

        this.frame.on('dragstart', (e) => {
            console.error('dragstart', e);
        });

        callback && callback(this.frame)

        this.updateControls();
        return element;
    }

    normalizeScale() {
        let w = this.frame.width * this.frame.scaleX;
        let h = this.frame.height * this.frame.scaleY;
        if (!this.frame.fill || !this.frame.fill.source || !this.frame.fill.source.width){
            return;
        }
        let projectedRight = this.offsetX + this.frame.fill.source.width * this.scale;
        if (projectedRight < w) {
            this.frame.set({
                'height': h / this.frame.scaleY,
                'width': w / this.frame.scaleX,
                'scaleX': 1,
                'scaleY': 1
            });
            return;
        }
        let projectedBottom = this.offsetY + this.frame.fill.source.height * this.scale;
        if (projectedBottom < h) {
            this.frame.set({
                'height': h / this.frame.scaleY,
                'width': w / this.frame.scaleX,
                'scaleX': 1,
                'scaleY': 1
            });
            return;
        }
        this.frame.set({
            'height': h,
            'width': w,
            'scaleX': 1,
            'scaleY': 1
        });
    }

    updateControls(forceShow: boolean = false) {
        for (let control of this.controls) {
            control.updatePosition(forceShow);
        }
    }

    hideControls() {
        for (let control of this.controls) {
            control.hide();
        }
    }

    isText(): boolean {
        return false
    }

    isImage(): boolean {
        return false
    }

}
