/// <reference path="./Side2DState.ts" />
class Side2D extends View implements Indexed, Serializable<Side2D, Side2DState>, Equalable<Side2D> {

    static OBJECT_EVENTS = [
        Constants.OBJECT_MODIFIED,
        Constants.OBJECT_MOVED,
        Constants.OBJECT_SCALED,
        Constants.OBJECT_ROTATED,
        Constants.OBJECT_SKEWED,
        Constants.OBJECT_ADDED,
        Constants.OBJECT_REMOVED
    ];

    static maxZoom: number = 10;
    static minZoom: number = 0.001;

    /** @hidden */
    canvas: fabric.Canvas;
    elements: Element2D[] = [];
    selection: Element2D;
    canvasElement: HTMLCanvasElement;

    /** width in centimeters */
    width: number;

    /** height in centimeters */
    height: number;

    /** roundCorners value (0..100) **/
    roundCorners: number;

    /** @hidden */
    horizontalGuide: HorizontalGuide;

    /** @hidden */
    verticalGuide: VerticalGuide;

    private history: HistoryList<Side2DStateObjects>;

    private needsHistoryUpdate;

    /**
     *
     * @param {HTMLElement} htmlElement
     * @param {number} width side width in centimeters
     * @param {number} height side height in centimeters
     * @param {number} roundCorners round corners in percents
     */
    constructor(htmlElement: HTMLElement, width: number, height: number, roundCorners?: number) {
        super(htmlElement);
        this.history = new HistoryList(new Side2DState(this));
        this.width = width;
        this.height = height;
        this.canvasElement = document.createElement(Constants.CANVAS);
        this.container.appendChild(this.canvasElement);
        this.canvas = new fabric.Canvas(this.canvasElement, null);
        this.canvasElement.style.background = Constructor.instance.background;
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        this.canvas.selection = false;
        this.canvas.on(Constants.MOUSE_UP, () => {
            this.hideGuides();
            this.saveState();
        });
        this.canvas.on(Constants.SELECTION_CLEARED, () => {
            //Constructor.instance.onDeselectHandler(this.selection);
            this.selection = null;
        });
        this.canvas.on(Constants.AFTER_RENDER, () => {
            Constructor.instance.onElementModificationHandler && Constructor.instance.onElementModificationHandler();
        });


        this.horizontalGuide = new HorizontalGuide(height);
        this.verticalGuide = new VerticalGuide(width);
        this.canvas.add(this.horizontalGuide);
        this.canvas.add(this.verticalGuide);
        this.setZoom(1);
        this.hideGuides();
        this.hide();
        this.needsHistoryUpdate = false;
        this.roundCorners = roundCorners;
        if (roundCorners) this.setRoundCorners();
        this.canvasElement.style.border = Constants.LINE_STYLE_PREFIX + Color.GRAY.toHex();
    }

    setRoundCorners() {
        let smallestSide = Math.min(this.canvasElement.width, this.canvasElement.height);
        this.canvasElement.style.borderRadius = smallestSide / 2 * this.roundCorners / 100 + Constants.PX;
    }

    centerPosition() {
        let canvasContainer = this.canvasElement.parentElement;
        let dw = this.container.clientWidth - canvasContainer.clientWidth;
        let dh = this.container.clientHeight - canvasContainer.clientHeight;
        canvasContainer.style.marginLeft = dw > 0 ? dw / 2 + Constants.PX : null;
        canvasContainer.style.marginTop = dh > 0 ? dh / 2 + Constants.PX : null;
        this.setRoundCorners();
    }

    setZoom(value: number) {
        if (value >= Side2D.maxZoom && value <= Side2D.minZoom) return;
        this.canvas.setZoom(value);
        this.canvas.setWidth(this.width * value);
        this.canvas.setHeight(this.height * value);
        this.canvas.renderAll();
        this.centerPosition();
    }

    getZoom(): number {
        return this.canvas ? this.canvas.getZoom() : 1;
    }

    resetZoom() {
        this.canvas.setZoom(1);
        this.canvas.setWidth(this.width);
        this.canvas.setHeight(this.height);
        this.canvas.renderAll();
        this.centerPosition();
    }

    zoomToFit() {
        this.setZoom(Math.min(this.container.clientWidth / this.width, this.container.clientHeight / this.height));
    }

    getRatio(): number {
        return this.width / this.height;
    }

    getElement() {
        return this.canvas.getElement().parentElement;
    }

    getIndex(): number {
        return Constructor.instance.sides.indexOf(this);
    }

    add(element: Element2D): Element2D {
        element.side = this;
        this.elements.push(element);
        this.canvas.add(element.object);
        element.fitIntoMargins();
        element.object.setCoords();
        //this.canvas.renderAll();
        //setTimeout(() => this.canvas.renderAll(), null);
        return element;
    }

    addElement(type: ElementType): Element2D {
        return this.add(new Element2D(type, this));
    }

    getLayers(): Element2D[] {
        let layers = [];
        for (let i = 0; i < this.elements.length; i++) {
            layers.unshift(this.elements[i]);
        }
        return layers;
    }

    remove(element: Element2D) {
        this.canvas.remove(element.object);
        this.elements.splice(this.elements.indexOf(element), 1);
    }

    getPointSize(): number {
        return 96 / 72 * this.getZoom();
    }

    getInchSize(): number {
        return 72 * this.getPointSize();
    }

    getCentimeterSize(): number {
        return this.getInchSize() / 2.54;
    }

    getMillimeterSize(): number {
        return this.getCentimeterSize() / 10;
    }

    select(element: Element2D): Element2D {
        this.deselect();
        this.selection = element;
        this.canvas.setActiveObject(element.object);
        this.canvas.renderAll();
        return element;
    }

    deselect() {
        this.selection = null;
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
    }

    hideGuides() {
        this.horizontalGuide.hide();
        this.verticalGuide.hide();
        this.canvas.renderAll();
    }

    serialize(): Side2DState {
        return new Side2DState(this);
    }

    deserialize(state: Side2DState): Side2D {
        let side = new Side2D(Constructor.instance.getElement(), state.width, state.height, state.roundCorners);
        if (state.objects) {
            for (let object of state.objects) {
                let options = ObjectOptions.fromObject(object);
                let element = Element2D.prototype.deserialize(options);
                side.add(element);
            }
        }
        return side;
    }

    /**
     * Remove all objects
     */
    clear() {
        this.elements = [];
        this.selection = null;
        this.canvas.clear();
        this.canvas.add(this.horizontalGuide);
        this.canvas.add(this.verticalGuide);
    }

    removeElements() {
        while (this.elements.length) {
            this.elements[0].remove();
        }
        this.saveState();
    }

    setState(state: Side2DStateObjects) {
        this.history.lock();
        this.clear();
        for (let objectOptions of state.objects) {
            if (objectOptions.type === 'image') {
                let object = objectOptions.toObject();
                let side = this;
                (fabric.Image as any).fromObject(object, image => {
                    let element = new Element2D(ElementType.IMAGE);
                    element.object = image;
                    image.crossOrigin = "anonymous";
                    element.setOptions(element.object);
                    side.add(element);
                    if (objectOptions.filters){
                        element.filters = [];
                        for (let filterName of objectOptions.filters) {
                            let filter = Filter.get(filterName);
                            try {
                                element.addFilter(filter, () => element.side.canvas.renderAll());
                            } catch (e) {
                                console.error(e.message);
                            }
                        }
                        element.applyFilters(imageElement => {
                            imageElement.object.dirty = true;
                            imageElement.side.canvas.requestRenderAll();
                        });
                    }
                });
            } else {
                let element = Element2D.prototype.deserialize(objectOptions);
                this.add(element);
                element.object.dirty = true;
                if (element.type === ElementType.TEXT) {
                    setTimeout(() => element.setFontFamily(element.getFontFamily()), 0);
                }
            }
        }
        this.saveToLocalStorage(state);
        this.canvas.requestRenderAll();
        this.history.unlock();
    }

    getLocalStorageKey(): string {
        return Constructor.settings.localStorage.keyPrefix + this.getIndex();
    }

    saveToLocalStorage(state: Side2DStateObjects) {
        localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(state));
    }

    loadFromLocalStorage() {
        if (Constructor.settings.localStorage.enabled) {
            let key = this.getLocalStorageKey();
            let state = localStorage.getItem(key);
            if (state) {
                let objects = Side2DStateObjects.parse(state);
                this.setState(objects);
            }
        }
    }

    saveState() {
        let state = new Side2DStateObjects(this);
        this.history.add(state);
        this.saveToLocalStorage(state);
    }

    undo() {
        let state = this.history.back();
        if (state) this.setState(state);
    }

    redo() {
        let state = this.history.forward();
        if (state) this.setState(state);
    }

    exportImage(maxSize?: number, format?: ImageType): string {
        let w = this.canvas.getWidth() / this.getZoom();
        let h = this.canvas.getHeight() / this.getZoom();
        let multiplier = maxSize ? maxSize / Math.max(w, h) : 1;
        if (!format) format = ImageType.PNG;
        if (format == ImageType.JPG) {
            let background = this.addElement(ElementType.RECTANGLE);
            background.setColor(Color.WHITE);
            background.object.width = w;
            background.object.height = h;
            background.object.left = w / 2;
            background.object.top = h / 2;
            background.object.setCoords();
            background.toBack();
            this.canvas.renderAll();
            let src = this.canvas.toDataURL({format: Constants.JPG, multiplier: multiplier});
            background.remove();
            this.canvas.renderAll();
            return src;
        }
        if (format == ImageType.SVG) {
            return this.canvas.toSVG({
                width: w * multiplier,
                height: h * multiplier,
            } as any);
        }
        return this.canvas.toDataURL({format: Constants.PNG, multiplier: multiplier});
    }

    public getState(): Side2DState {
        return new Side2DState(this);
    }

    public equals(side: Side2D): boolean {
        return this.getState().equals(side.getState());
    }

    public isEmpty(): boolean {
        return this.elements.length == 0;
    }


}