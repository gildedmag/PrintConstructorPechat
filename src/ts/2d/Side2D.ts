/// <reference path="./Side2DState.ts" />
class Side2D extends View<Side2D> implements  Indexed, Serializable<Side2D, Side2DState>, Equalable<Side2D> {

    static maxZoom: number = 10;
    static minZoom: number = 0.001;

    /** @hidden */
    canvas: fabric.Canvas;
    elements: Element2D[] = [];
    selection: Element2D;
    canvasElement: HTMLCanvasElement;
    mainContainer: HTMLElement;
    image: HTMLImageElement;

    name: string;
    price: number = 0;

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

    history: HistoryList<Equalable<any>>;

    needsHistoryUpdate;
    id: number

    /** product image for 2d constructor **/
    productPicture: string;

    /** clipping mask **/
    mask: string;

    /**
     *
     * @param {HTMLElement} htmlElement
     * @param {number} width side width in centimeters
     * @param {number} height side height in centimeters
     * @param {number} roundCorners round corners in percents
     * @param name
     * @param price
     * @param productPicture
     */
    constructor(htmlElement: HTMLElement, width: number, height: number, roundCorners?: number, name?: string, price?: number, productPicture?: string, mask?: string) {
        super(htmlElement);
        this.id = Math.random() * 1e18;
        this.history = new HistoryList();
        this.width = width;
        this.height = height;
        this.name = name;
        this.price = price || 0;
        this.productPicture = productPicture;
        this.mask = mask;
        this.canvasElement = document.createElement(Constants.CANVAS);
        this.initializeContainer(width, height, productPicture);
        this.canvas = new fabric.Canvas(this.canvasElement, null);
        this.canvasElement.style.background = Constructor.instance.background;
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        this.canvas.selection = false;
        this.canvas.on(Constants.MOUSE_UP, () => {
            this.hideGuides();
            this.saveState();
        });
        this.canvas.on(Constants.TEXT_EDITING_ENTERED, () => {
            Constructor.onTextEditingEnteredHandler();
        });
        this.canvas.on(Constants.SELECTION_CLEARED, () => {
            //Constructor.instance.onDeselectHandler(this.selection);
            this.selection = null;
            this.changed();
            Constructor.instance.changed();
        });
        this.canvas.on(Constants.SELECTION_UPDATED, () => {
            this.changed();
            Constructor.instance.changed();
        });
        this.canvas.on(Constants.SELECTION_CREATED, () => {
            this.changed();
            Constructor.instance.changed();
        });
        this.canvas.on(Constants.AFTER_RENDER, () => {
            Constructor.instance.onElementModificationHandler && Constructor.instance.onElementModificationHandler();
        });


        this.horizontalGuide = new HorizontalGuide(height);
        this.verticalGuide = new VerticalGuide(width);
        this.canvas.add(this.horizontalGuide);
        this.canvas.add(this.verticalGuide);
        this.canvas.controlsAboveOverlay = true;
        this.setZoom(1);
        this.hideGuides();
        this.hide();
        this.needsHistoryUpdate = false;
        this.roundCorners = roundCorners;
        if (roundCorners) this.setRoundCorners();
        this.canvasElement.style.border = Constants.LINE_STYLE_PREFIX + Color.GRAY.toHex();
        this.createWorkingArea();
    }

    private initializeContainer(width: number, height: number, productPicture: string) {
        if(Constructor.instance.is2dEditorMode()){
            // create container for 2d products
            this.mainContainer = document.createElement(Constants.DIV);
            this.mainContainer.className = "side-container";
            this.mainContainer.style.width = `${width}px`;
            this.mainContainer.style.height = `${height}px`;

            // create background image
            this.image = new Image();
            this.image.src = productPicture;

            // add product photo to container
            this.mainContainer.appendChild(this.image);

            // add canvas to container
            this.mainContainer.appendChild(this.canvasElement);

            // add main container to view
            this.container.appendChild(this.mainContainer);

            this.canvasElement.parentElement.style.top = '0%';
            this.canvasElement.parentElement.style.left = '0%';
        }else{
            this.container.appendChild(this.canvasElement);

        }
    }

    private createWorkingArea() {
       if(!Constructor.instance.is2dEditorMode()){
           return;
       }
        let canvas = new fabric.Canvas(null);
        canvas.setWidth(this.canvas.getWidth())
        canvas.setHeight(this.canvas.getHeight())
        canvas.setZoom(this.canvas.getZoom())
        canvas.loadFromJSON(this.mask,  () => {
            canvas.renderAll();

            let mask = canvas.getObjects()[0];
            mask.dirty = true;
            mask.absolutePositioned = true;
            if(!this.canvas.clipPath){
                this.canvas.clipPath = mask;
            }
            this.canvas.renderAll();

            mask.clone(function (clone) {
                canvas.add(clone.set({
                    top: clone.top - 1,
                    left: clone.left - 1,
                    selectable: false,
                    fill: 'transparent',
                    hoverCursor: 'default',
                    strokeDashArray: [5, 5],
                    strokeWidth: 3,
                    id: Constants.OBJECT_2D_BORDER,
                    strokeUniform: true
                }));
            });

            let border = canvas.getObjects()[1];
            border.set({
                strokeUniform: true
            })
            this.canvas.add(border);
        });
    }

    getName() {
        return this.name || this.getIndex().toString();
    }

    setName(value: string) {
        this.name = value;
    }

    setRoundCorners() {
        if (this.roundCorners == 100) {
            this.canvasElement.style.borderRadius = 1e5 + Constants.PX;
        } else {
            let smallestSide = Math.min(this.canvasElement.width, this.canvasElement.height);
            this.canvasElement.style.borderRadius = smallestSide / 2 * (this.roundCorners / 100) + Constants.PX;
        }
    }

    centerPosition() {
        let canvasContainer = this.canvasElement.parentElement;
        let dw = this.container.clientWidth - canvasContainer.clientWidth;
        let dh = this.container.clientHeight - canvasContainer.clientHeight;
        // canvasContainer.style.marginLeft = dw > 0 ? dw / 2 + Constants.PX : null;
        // canvasContainer.style.marginTop = dh > 0 ? dh / 2 + Constants.PX : null;
        this.setRoundCorners();
    }

    setZoom(value: number, cx: number = 0, cy: number = 0, checkZoom: boolean = true) {
        if (value >= Side2D.maxZoom && value <= Side2D.minZoom) return;
        let canvasContainer = this.canvasElement.parentElement;

        this.canvas.setZoom(value);
        this.canvas.setWidth(this.width * value);
        this.canvas.setHeight(this.height * value);
        this.canvas.renderAll();

        if(Constructor.instance.is2dEditorMode()) {

            this.mainContainer.style.width = `${this.width * value}px`
            this.mainContainer.style.height = `${this.height * value}px`

            this.mainContainer.style.top = "50%";
            this.mainContainer.style.transform = "translateY(-50%)";

            if (cx) {
                canvasContainer.scrollLeft = canvasContainer.scrollWidth * cx;
                this.mainContainer.scrollLeft = canvasContainer.scrollWidth * cx;
            }
            if (cy) {
                canvasContainer.scrollTop = canvasContainer.scrollHeight * cx;
                this.mainContainer.scrollTop = canvasContainer.scrollHeight * cx;
            }
        }else{

            let dh = this.container.clientHeight - canvasContainer.clientHeight;
            if (dh < 0) {
                canvasContainer.style.top = "5px";
                canvasContainer.style.transform = "translateY(0%)";
            } else {
                canvasContainer.style.top = "50%";
                canvasContainer.style.transform = "translateY(-50%)";
            }

            if (cx){
                canvasContainer.scrollLeft = canvasContainer.scrollWidth * cx;
            }
            if (cy){
                canvasContainer.scrollTop = canvasContainer.scrollHeight * cx;
            }
        }

        this.setRoundCorners();
    }

    getZoom(): number {
        return this.canvas ? this.canvas.getZoom() : 1;
    }

    resetZoom() {
        this.canvas.setZoom(1);
        this.canvas.setWidth(this.width);
        this.canvas.setHeight(this.height);
        this.canvas.renderAll();
        //this.centerPosition();
    }

    zoomToFit() {
        let value = Math.min(this.container.clientWidth / this.width, this.container.clientHeight / this.height);
        if (!value) {
            setTimeout(() => this.zoomToFit(), 10);
        } else {
            value *= 0.8;
            this.setZoom(value);
        }
    }

    getRatio(): number {
        return this.width / this.height;
    }

    getElement() {
        return  this.mainContainer ? this.mainContainer : this.canvas.getElement().parentElement;
    }

    getIndex(): number {
        for (let i = 0; i < Constructor.instance.sides.length; i++) {
            if (Constructor.instance.sides[i].equals(this)) {
                return i;
            }
        }
        return -1;
    }

    fixElementPosition(element: Element2D): void {
        if (!element.object.isOnScreen(true)) {
            this.resetElementPosition(element);
        }
    }

    resetElementPosition(element: Element2D): void {
        element.object.left = this.width / 2;
        element.object.top = this.height / 2;
    }

    add(element: Element2D): Element2D {
        if (this.elements.length >= 20) {
            alert("Too many objects on the canvas! Please consider removing some objects before adding new.")
            return null;
        }
        Utils.logMethodName();
        element.side = this;
        this.elements.push(element);
        this.canvas.add(element.object);
        setTimeout(() => this.fixElementPosition(element), 200);
        element.fitIntoMargins();
        element.object.setCoords();
        this.canvas.requestRenderAll();
        setTimeout(() => this.canvas.renderAll(), null);
        this.changed()
        return element;
    }

    addElement(type: ElementType): Element2D {
        Utils.logMethodName();
        return this.add(new Element2D(type, this));
    }

    setProductColor(color: string){
        let image: ChildNode = this.mainContainer.childNodes[0];
        // @ts-ignore
        image.style.backgroundColor = color;
    }

    getProductColor(){
        let image: ChildNode = this.mainContainer.childNodes[0];
        // @ts-ignore
        return image.style.backgroundColor !== "" ? image.style.backgroundColor : Constructor.instance.background;
    }

    getLayers(): Element2D[] {
        let layers = [];
        for (let i = 0; i < this.elements.length; i++) {
            layers.unshift(this.elements[i]);
        }
        return layers;
    }

    moveLayer(from: number, to: number) {
        let element: Element2D = this.getLayers()[from];
        element.toLayer(to);
        this.changed();
    }

    remove(element: Element2D) {
        this.canvas.remove(element.object);
        this.elements.splice(this.elements.indexOf(element), 1);
        this.deselect();
        this.canvas.renderAll();
        this.saveState();
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

    freeze() {
        this.elements.forEach(element => {
            element.setFrozen(true);
        });
    }

    unfreeze() {
        this.elements.forEach(element => {
            element.setFrozen(false);
        });
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
        if(Constructor.instance.is2dEditorMode()){}
        let side = new Side2D(Constructor.instance.getElement(), state.width, state.height, state.roundCorners, null, null, state.productPicture, state.mask);
        if (state.objects) {
            let json = '{"objects":' + JSON.stringify(state.objects) + '}'; //TODO: make it look not like a hack!
            let objects = Side2DStateObjects.parse(json);
            side.setState(objects);
        }
        return side;
    }

    /**
     * Remove all objects
     */
    clear() {
        Utils.logMethodName();
        this.elements = [];
        this.selection = null;
        this.canvas.clear();
        this.canvas.add(this.horizontalGuide);
        this.canvas.add(this.verticalGuide);
        this.createWorkingArea();
        this.saveState();
    }

    removeElements() {
        Utils.logMethodName();
        while (this.elements.length) {
            this.elements[0].remove();
        }
        this.saveState();
    }

    addImageFromObjectOptions(objectOptions: ObjectOptions, callback?: (any?) => any): void {
        Utils.logMethodName();
        let object = objectOptions.toObject();
        let side = this;
        (fabric.Image as any).fromObject(object, image => {
            if (image === null) {
                callback && callback()
                return
            }
            let element = new Element2D(ElementType.IMAGE);
            element.side = this;
            element.object = image;
            element.setOptions(element.object);
            side.add(element);
            callback && callback(element);
            if (objectOptions.filters) {
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
    }

    setState(state: Side2DStateObjects) {
        Utils.logMethodName();
        this.history.lock();
        this.clear();
        this.addNextObject(state.objects);
    }

    addNextObject(objectsBuffer: ObjectOptions[]) {
        if (objectsBuffer.length == 0) {
            this.saveToLocalStorage(this.getState());
            this.canvas.requestRenderAll();
            Constructor.instance.changed();
            this.history.unlock();//setTimeout(() => this.history.unlock(), 100);
            //Constructor.instance.spinner.hide();
            return;
        }
        let objectOptions = objectsBuffer.shift();
        if (objectOptions.type === 'image') {
            this.addImageFromObjectOptions(objectOptions, () => this.addNextObject(objectsBuffer));
        } else {
            let element = Element2D.prototype.deserialize(objectOptions);
            this.add(element);
            element.object.dirty = true;
            if (element.type === ElementType.TEXT) {
                setTimeout(() => element.setFontFamily(element.getFontFamily()), 0);
            }
            this.addNextObject(objectsBuffer);
        }
    }

    getLocalStorageKey(): string {
        return Constructor.settings.localStorage.keyPrefix + this.getIndex();
    }

    saveToLocalStorage(state: Side2DStateObjects) {
        if (!this.history.isLocked()) {
            Utils.logMethodName();
            let json = JSON.stringify(state);
            if (json.length < 1e5) {
                localStorage.setItem(this.getLocalStorageKey(), json);
            } else {
                console.error("state.length > " + 1e5);
            }
        }
    }

    loadFromLocalStorage() {
        if (Constructor.settings.localStorage.enabled && !Constructor.instance.isExplicitlyLoaded) {
            Utils.logMethodName();
            let key = this.getLocalStorageKey();
            let state = localStorage.getItem(key);
            if (state) {
                let objects = Side2DStateObjects.parse(state);
                this.setState(objects);
            }
        }
    }

    saveState() {
        Utils.logMethodName();
        let state = new Side2DStateObjects(this);
        // if (!state.objects[0]){//} && this.elements.length > 0){
        //     return;
        // }
        this.history.add(JSON.stringify(state));
        this.saveToLocalStorage(state);
        this.changed();
        Constructor.instance.changed();
    }

    undo() {
        if (this.history.isLocked()) {
            return;
        }
        let state = Side2DStateObjects.parse(this.history.back());
        this.history.lock();
        if (state) this.setState(state);
    }

    redo() {
        if (this.history.isLocked()) {
            return;
        }
        let state = Side2DStateObjects.parse(this.history.forward());
        this.history.lock();
        if (state) this.setState(state);
    }

     generatePreview(size: number){
        let canvas = new fabric.Canvas(null);
        canvas.setWidth(this.canvas.getWidth());
        canvas.setHeight(this.canvas.getHeight());
        canvas.setZoom(this.canvas.getZoom());

        let multiplier = size ? size / Math.max(canvas.getWidth(), canvas.getHeight()) : 1;
         canvas.loadFromJSON(this.canvas.toJSON(),   () => {
            canvas.renderAll();
             let border = canvas.getObjects().filter(obj => obj.fill === 'transparent' && obj.stroke === 'white');
             let group = new fabric.Group(canvas.getObjects())
             group.remove(border[0]);
             group.set({
                 clipPath: border[0]
             });
             canvas.clipPath = null;
             canvas.clear();
             canvas.add(group);
             canvas.setBackgroundColor(this.getProductColor(), () => {})
        });

         let bgImage = new fabric.Image(this.image, {

             left: 0,
             top: 0,
         });
         canvas.add(bgImage);
         bgImage.sendToBack();


        return canvas.toDataURL({
            format: 'image/jpeg',
            multiplier: multiplier,
            quality: 0.5
        });

    }

    exportImage(maxSize?: number, format?: ImageType, isPreview?: boolean): string {
        isPreview = false;
        let lastScale = this.canvas.getZoom();
        let w = this.canvas.getWidth();// / this.getZoom();
        let h = this.canvas.getHeight();// / this.getZoom();
        let bound = {left: 0, top: 0, width: w, height: h};
        // @ts-ignore
        let border = this.canvas.getObjects().filter(obj => obj.id === Constants.OBJECT_2D_BORDER);
        this.toggleBorderVisibility(border[0]);
        if(Constructor.instance.is2dEditorMode() && !isPreview){
            this.canvas.setZoom(1);
            bound = this.canvas.clipPath.getBoundingRect();
        }

        let multiplier = maxSize ? maxSize / Math.max(w, h) : 1;
        if (!format) format = ImageType.PNG;
        if (format == ImageType.JPG) {
            this.history.lock();
            let background = this.addElement(ElementType.RECTANGLE);
            background.setColor(Color.WHITE);
            background.object.width = w;
            background.object.height = h;
            background.object.left = w / 2;
            background.object.top = h / 2;
            if(bound.left){
                background.object.set({
                    left: bound.left,
                    top: bound.top,
                    width: bound.width * 2,
                    height: bound.height * 2,
                });
            }

            background.object.setCoords();
            background.toBack();
            this.canvas.renderAll();
            let src = this.canvas.toDataURL({
                format: 'image/jpeg',
                multiplier: multiplier,
                quality: 0.5,
                ...bound
            });
            background.remove();
            this.canvas.renderAll();
            this.history.unlock();
            this.canvas.setZoom(lastScale);
            this.toggleBorderVisibility(border[0]);
            return src;
        }
        if (format == ImageType.SVG) {
            return this.canvas.toSVG({
                width: w * multiplier,
                height: h * multiplier,
            } as any);
        }
        let data = this.canvas.toDataURL({format: Constants.PNG, multiplier: multiplier, ...bound});
        this.toggleBorderVisibility(border[0]);
        this.canvas.setZoom(lastScale);
        return data;
    }

    toggleBorderVisibility(border){
        if(border){
            border.set({
                opacity: border.opacity == 1 ? 0 : 1
            })
        }
    }

    public lock() {
        this.getLayers().forEach(element => {
            element.object.selectable = false;
        });
        this.canvas.renderAll();
    }

    public unlock() {
        this.getLayers().forEach(element => {
            element.object.selectable = true;
        });
        this.canvas.renderAll();
    }

    public getTotalPrice(): number {
        return this.isEmpty() ? 0 : this.price;
    }

    public getState(): Side2DState {
        return new Side2DState(this);
    }

    public equals(side: Side2D): boolean {
        return this.id == side.id;
    }

    public isEmpty(): boolean {
        return this.elements.length == 0;
    }

}
