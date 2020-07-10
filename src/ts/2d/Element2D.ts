/// <reference path="../Color.ts" />
class Element2D implements Indexed, Serializable<Element2D, ObjectOptions> {

    private static commonDefaults = {
        hasBorders: false,
        cornerColor: Color.TRANSPARENT_BLACK.toRgba(),
        transparentCorners: false,
        cornerSize: 8,
        originX: Constants.CENTER,
        originY: Constants.CENTER,
        rotatingPointOffset: 30
    };

    type: ElementType;

    /** @hidden */
    object: fabric.Object;

    /** @hidden */
    side: Side2D;

    /** @hidden */
    filters: Filter[];

    /** @hidden */
    filtersCache: string[];

    private verticalGuides: number[];

    private horizontalGuides: number[];

    /** @hidden */
    constructor(type: ElementType, side?: Side2D) {
        this.type = type;
        this.side = side;
        if (type === ElementType.IMAGE) {
            this.object = new type.nativeType();
        } else {
            let defaults = Constructor.settings.elementDefaults[type.getNativeTypeName()]
            console.log("type.nativeType", type.nativeType);
            type.nativeType.fromObject(defaults, native => {
                console.log("native", native);
                this.object = native
                this.setOptions(this.object);
                try {
                    Constructor.instance.getActiveSide().canvas.requestRenderAll();
                    Constructor.instance.preview.render();
                    this.object.dirty = true;
                } catch (e) {
                    console.error(e)
                }
            });
        }
        this.setOptions(this.object);
    }

    /** @hidden */
    private setOptions(object: fabric.Object) {
        if (!object){
            return
        }
        object.on(Constants.ADDED, () => {
            this.calculateGuides();
        });
        object.on(Constants.MODIFIED, () => {
            this.calculateGuides();
        });
        object.on(Constants.SCALING, e => {
            //this.snapTransform(e);
        });
        object.on(Constants.MOVING, () => {
            this.fitIntoMargins();
            this.snapPosition();
        });
        object.on(Constants.ROTATING, () => this.snapRotation());
        object.on(Constants.SELECTED, () => {
            this.side.selection = this;
            Constructor.instance.onSelectHandler((this));
        });
        object.on(Constants.DESELECTED, () => {
            Constructor.instance.onDeselectHandler((this));
            this.side.selection = null;
        });
        object.on(Constants.REMOVED, () => {
            this.side.selection = null;
        });
        object.setOptions(Element2D.commonDefaults);
    }

    /** @hidden */
    randomizePosition() {
        let width = this.side.canvas.getWidth();
        let height = this.side.canvas.getHeight();
        let w = Math.max((width / 2) * Math.random(), width * 0.1);
        let h = Math.max((height / 2) * Math.random(), height * 0.1);
        this.object.left = (width - w) * Math.random() + w / 2;
        this.object.top = (height - h) * Math.random() + h / 2;
        this.fitIntoMargins();
        this.object.setCoords();
        this.side.canvas.renderAll();
    }

    /** @hidden */
    offset() {
        this.object.left = this.object.left + Constructor.settings.duplicateOffset;
        this.object.top = this.object.top + Constructor.settings.duplicateOffset;
        this.object.setCoords();
        this.side.canvas.renderAll();
    }

    getColor(): Color {
        return new Color(this.object.fill);
    }

    setColor(value: string | Color) {
        if (this.type != ElementType.IMAGE) {
            if (typeof value === Constants.STRING) value = new Color(value);
            let color = <Color> value;
            this.object.fill = color.toRgba();
            this.object.dirty = true;
            this.side.canvas.renderAll();

            setTimeout(() => {
                console.log("RENDER");
                Constructor.instance.getActiveSide().canvas.renderAll();
            }, 100)
            this.side.saveState();
        }
    }

    getAlpha(): number {
        let color = new Color(this.object.fill);
        return color.getAlpha();
    }

    setAlpha(value: number) {
        (<fabric.Image>this.object).opacity = value;
        this.side.saveState();
        this.side.canvas.renderAll();
    }

    setShadow(value: number) {
        if (value && value != 0) {
            let options = {
                color: Color.TRANSPARENT_BLACK.toRgba(),
                includeDefaultValues: true
            };
            this.object.setShadow(new fabric.Shadow(options));
            let shadow = this.object.shadow as any;
            shadow.offsetX = value;
            shadow.offsetY = value;
            shadow.blur = value;
        } else {
            this.object.setShadow(null);
        }
        this.side.saveState();
        this.side.canvas.renderAll();
    }

    getShadow(): number {
        let shadow = this.object.shadow as any;
        return shadow ? shadow.offsetX : 0;
    }

    setPosition(left: number, top: number) {
        this.object.left = left;
        this.object.top = top;
        this.object.setCoords();
        this.side.canvas.renderAll();
        this.side.saveState();
    }

    setFontFamily(fontFamily: string, repeat?: boolean) {
        if (this.type === ElementType.TEXT) {
            (fabric as any).charWidthsCache[fontFamily] = {};
            let object = this.object as any;
            object.fontFamily = fontFamily;
            this.object.dirty = true;
            this.side.canvas.requestRenderAll();
        }
    }

    getFontFamily(): string {
        return this.type === ElementType.TEXT ? (this.object as fabric.IText).fontFamily : null;
    }

    setFontSize(value: number) {
        if (this.type === ElementType.TEXT) {
            (this.object as fabric.IText).fontSize = value;
            this.object.dirty = true;
            this.side.canvas.requestRenderAll();
            this.side.saveState();
        }
    }

    getFontSize(): number {
        return this.type === ElementType.TEXT ? (this.object as fabric.IText).fontSize : null;
    }

    setItalic(value: boolean) {
        if (this.type === ElementType.TEXT) {
            (this.object as fabric.IText).fontStyle = value ? Constants.ITALIC : null;
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    }

    isItalic(): boolean {
        return this.type === ElementType.TEXT ? (this.object as fabric.IText).fontStyle === Constants.ITALIC : null;
    }

    setBold(value: boolean) {
        if (this.type === ElementType.TEXT) {
            (this.object as fabric.IText).fontWeight = value ? Constants.BOLD : Constants.NORMAL;
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    }

    isBold(): boolean {
        return this.type === ElementType.TEXT ? (this.object as fabric.IText).fontWeight === Constants.BOLD : null;
    }

    setTextDecoration(value: TextDecoration) {
        if (this.type === ElementType.TEXT) {
            switch (value) {
                case TextDecoration.LINETHROUGH:
                    (this.object as fabric.IText).linethrough = true;
                    break
                case TextDecoration.OVERLINE:
                    (this.object as fabric.IText).overline = true;
                    break
                case TextDecoration.UNDERLINE:
                    (this.object as fabric.IText).underline = true;
                    break
                default: {
                    (this.object as fabric.IText).linethrough = false;
                    (this.object as fabric.IText).overline = false;
                    (this.object as fabric.IText).underline = false;
                }

            }
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    }

    getTextDecoration(): string {
        if (this.type != ElementType.TEXT) {
            return null;
        }
        if ((this.object as fabric.IText).underline) {
            return TextDecoration.UNDERLINE
        }
        if ((this.object as fabric.IText).overline) {
            return TextDecoration.OVERLINE
        }
        if ((this.object as fabric.IText).linethrough) {
            return TextDecoration.LINETHROUGH
        }
        return null
    }

    setTextAlignment(value: TextAlignment) {
        if (this.type === ElementType.TEXT) {
            (this.object as fabric.IText).textAlign = value;
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    }

    getTextAlignment(): string {
        return this.type === ElementType.TEXT ? (this.object as fabric.IText).textAlign : null;
    }

    addFilter(filter: Filter, callback?: (element: Element2D) => void) {
        if (this.object instanceof fabric.Image) {
            if (!this.filters) this.filters = [];
            if (filter.isBoolean) {
                let index = this.filters.indexOf(filter);
                if (index != -1) {
                    this.filters.splice(index, 1);
                    if (this.filters.length === 0) this.filters = null;
                    this.applyFilters(callback);
                    return;
                }
            }
            this.filters.push(filter);
            this.applyFilters(callback);
        }
    }

    resetFilters(callback?: (element: Element2D) => void) {
        this.filters = null;
        if (this.object instanceof fabric.Image) {
            (<fabric.Image>this.object).filters = [];
            this.applyFilters(callback);
        }
    }

    private applyFilters(callback?: (element: Element2D) => void) {
        let image = this.object as fabric.Image;
        image.filters = [];
        if (this.filters) {
            for (let filter of this.filters) {
                image.filters.push(filter.getFilter());
            }
        }
        this.side.saveState();
        image.applyFilters();
        this.side.canvas.renderAll();
        if (callback) callback(this);
    }

    private snapRotation() {
        let angle = this.object.angle;
        angle = Math.round(angle / Constructor.settings.rotationStep) * Constructor.settings.rotationStep;
        this.object.rotate(angle)
    }

    setLocked(locked: boolean) {
        this.object.lockScalingX
            = this.object.lockScalingY
            = this.object.lockRotation
            = this.object.lockMovementX
            = this.object.lockMovementY
            = locked;
    }

    isLocked(): boolean {
        return this.object.lockScalingX;
    }

    toFront() {
        this.side.canvas.bringToFront(this.object);
        Utils.arrayMoveToEnd(this.side.elements, this.getIndex());
        this.side.deselect();
    }

    toBack() {
        this.side.canvas.sendToBack(this.object);
        Utils.arrayMoveToStart(this.side.elements, this.getIndex());
        this.side.deselect();
    }

    clone(): Element2D {
        let o = this.serialize();
        return Element2D.prototype.deserialize(o);
    }

    remove() {
        this.side.remove(this);
    }

    private calculateGuides() {
        if (this.side) {
            this.object.setCoords();
            let w = this.object.getBoundingRect().width / this.side.getZoom();
            let h = this.object.getBoundingRect().height / this.side.getZoom();
            let l = this.object.left - w / 2;
            let t = this.object.top - h / 2;
            this.horizontalGuides = [l + w / 2, l, l + w];
            this.verticalGuides = [t + h / 2, t, t + h];
        }
    }

    private static getSnapOffset(source: number[], target: number[]): SnapOffset {
        let minDelta = Constructor.settings.snapSize;
        let snapOffset: SnapOffset;
        for (let a of source) {
            for (let b of target) {
                let delta = Math.abs(b - a);
                if (delta < minDelta) {
                    minDelta = delta;
                    let i = (target.indexOf(b) - 1);
                    if (i == -1) i = 0;
                    else if (i == 0) i = -1;
                    let d = i * (target[0] - target[1]);
                    snapOffset = new SnapOffset(a, a - d);
                }
            }
        }
        return snapOffset;
    }

    private getHorizontalSnapPosition(element: Element2D): SnapOffset {
        return Element2D.getSnapOffset(element.horizontalGuides, this.horizontalGuides);
    }

    private getVerticalSnapPosition(element: Element2D): SnapOffset {
        return Element2D.getSnapOffset(element.verticalGuides, this.verticalGuides);
    }

    /** @hidden */
    fitIntoMargins() {
        if (Constructor.settings.fitIntoMargins) {
            let rect = this.object.getBoundingRect();
            let w = rect.width / 2;
            let h = rect.height / 2;
            let x = (this.side.canvas.getWidth() / this.side.getZoom() - w);
            let y = (this.side.canvas.getHeight() / this.side.getZoom() - h);
            if (this.object.left < w) {
                this.object.left = w;
            } else if (this.object.left > x) {
                this.object.left = x;
            }
            if (this.object.top < h) {
                this.object.top = h;
            } else if (this.object.top > y) {
                this.object.top = y;
            }
        }
    }

    private snapPosition() {
        if (Constructor.instance.snapToObjects) {
            this.calculateGuides();
            this.side.hideGuides();
            let xUpdated = false;
            let yUpdated = false;
            for (let element of this.side.elements) {
                if (element === this) continue;
                if (!xUpdated) {
                    let x = this.getHorizontalSnapPosition(element);
                    if (x != null) {
                        this.object.left = x.objectPosition;
                        this.side.horizontalGuide.update(x.guidePosition);
                        xUpdated = true;
                    }
                }
                if (!yUpdated) {
                    let y = this.getVerticalSnapPosition(element);
                    if (y != null) {
                        this.object.top = y.objectPosition;
                        this.side.verticalGuide.update(y.guidePosition);
                        yUpdated = true;
                    }
                }
                if (xUpdated && yUpdated) return;
            }
        }
        if (Constructor.instance.snapToGrid) {
            let gridSize = Constructor.settings.gridSize;
            this.object.left = Math.round(this.object.left / gridSize) * gridSize;
            this.object.top = Math.round(this.object.top / gridSize) * gridSize;
        }

    }

    //TODO
    private snapTransform(e: any) {
        //if (!Constructor.instance.snapToObjects) return;
        let mouseEvent: MouseEvent = <MouseEvent>(e.e);
        this.calculateGuides();
        this.side.hideGuides();
        let xUpdated = false;
        let yUpdated = false;
        for (let element of this.side.elements) {
            if (element === this) continue;
            if (!xUpdated) {
                let x = this.getHorizontalSnapPosition(element);
                if (x != null) {
                    let dx = x.objectPosition - mouseEvent.clientX;
                    this.object.width = this.object.width + dx / 2;
                    this.object.left = this.object.left - dx / 2;
                    this.object.setCoords();
                    this.side.horizontalGuide.update(x.guidePosition);
                    xUpdated = true;
                }
            }
            /*if (!yUpdated) {
                let y = this.getVerticalSnapPosition(element);
                if (y != null) {
                    this.object.height = this.object.top + y.objectPosition;
                    this.object.setCoords();
                    this.side.verticalGuide.update(y.guidePosition);
                    yUpdated = true;
                }
            }*/
            if (xUpdated && yUpdated) return;
        }
    }

    getIndex(): number {
        return this.side.elements.indexOf(this);
    }

    serialize(): ObjectOptions {
        return new ObjectOptions(this);
    }

    deserialize(object: ObjectOptions): Element2D {
        console.log(ElementType.map);
        let type = ElementType.get(object.type);
        console.dir(type);
        let element = new Element2D(type);
        let filters = object.filters;
        console.log(object)
        if (filters && filters.length > 0) {
            element.filtersCache = object.filters;
            delete object.filters;
        }
        //element.object = new type.nativeType();
        element.object.setOptions(object.toObject());
        if (type === ElementType.IMAGE) {
            let image: fabric.Image = element.object as fabric.Image;
            image.crossOrigin = "anonymous";
            image.setSrc(image.getSrc(), () => {
                if (filters) {
                    element.filters = [];
                    for (let filterName of filters) {
                        let filter = Filter.get(filterName);
                        try {
                            element.addFilter(filter, () => element.side.canvas.renderAll());
                        } catch (e) {
                            console.error(e.message);
                        }
                    }
                }
                try {
                    element.side.canvas.renderAll();
                    Constructor.instance.preview.updateSideMaterials();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
        if (type === ElementType.TEXT && element.object['text']) {
            let o: any = element.object;
            o.text = o.text.split("<br>").join("\n");
        }
        element.setOptions(element.object);
        return element;
    }

}