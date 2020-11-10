/// <reference path="Version.ts" />
/// <reference path="View.ts" />
/// <reference path="Settings.ts" />

class Constructor extends View {

    sides: Side2D[];
    activeSideIndex: number;
    preview: Preview;

    /** @hidden */
    spinner: Spinner;

    /** @hidden */
    onSelectHandler: (selection: Element2D) => void = () => {};

    /** @hidden */
    onDeselectHandler: (selection: Element2D) => void = () => {};

    /** @hidden */
    onModeChangeHandler: () => void = () => {};

    /** @hidden */
    onElementModificationHandler: () => void = () => {};

    /** @hidden */
    clipboard: Element2D;

    snapToObjects: boolean;
    snapToGrid: boolean;

    /** @hidden */
    background: string;

    /** @hidden */
    lastWidth: number;
    lastHeight: number;

    public isExplicitlyLoaded: boolean = false;

    static version = Version.version;
    static settings: Settings = new Settings();
    static instance: Constructor;
    private static zoomStep: number = 0.05;

    layersPanelControl: LayersPanelUIControl;
    toolbarControl: ToolbarUIControl;

    /**
     * Create new {@link Constructor} instance for an {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement|HTMLElement}
     * ```
     * var printConstructor = new Constructor('parent');
     * ```
     * or
     * ```
     * var parent = document.getElementById('parent');
     * var printConstructor = new Constructor(parent);
     * ```
     */
    constructor(container: HTMLElement | string) {
        super(container instanceof HTMLElement ? container : document.getElementById(container));
        this.container.style.overflow = Constants.AUTO;
        fabric.textureSize = 4096;
        Constructor.instance = this;
        this.clipboard = null;
        this.snapToObjects = false;
        this.setMode(Mode.Mode2D);
        this.sides = [];
        this.addSide(this.container.clientWidth - 50, this.container.clientHeight - 50);
        this.preview = new Preview(this);
        this.spinner = new Spinner(this.container);
        this.preview.hide();
        this.background = this.container.style.background;
        this.container.style.background = null;
        this.lastWidth = this.container.clientWidth;
        this.lastHeight = this.container.clientHeight;
        //window.onresize = () => this.autoSize();
        if (Constructor.settings.autoSize) {
            setInterval(() => {
                if (this.lastWidth != this.container.clientWidth || this.lastHeight != this.container.clientHeight) {
                    this.autoSize();
                }
            }, 500);
        }
        console.log("Constructor.version: ", Constructor.version);
        this.bindControls();
    }

    bindControls() {
        let layersContainer = document.getElementById("constructor-layers-container");
        if (layersContainer){
            this.layersPanelControl = new LayersPanelUIControl(this);
            layersContainer.appendChild(this.layersPanelControl.getElement())
        }

        let toolbarContainer = document.getElementById("constructor-toolbar");
        if (toolbarContainer){
            this.toolbarControl = new ToolbarUIControl(this);
            toolbarContainer.appendChild(this.toolbarControl.getElement())
        }

    }

    autoSize() {
        Utils.logMethodName();
        this.sides.forEach(side => side.centerPosition());
        this.preview.autoSize();
        this.lastWidth = this.container.clientWidth;
        this.lastHeight = this.container.clientHeight;
    }

    /**
     * Load 3D model with print areas and fill area from default models path, {@link Settings}
     * @param {string} modelName
     * @param {function} callback
     */
    loadModel(modelName: string, callback?: () => void) {
        Utils.logMethodName();
        this.preview.loadModel(modelName, callback);
    }

    addSide(width: number, height: number): Side2D {
        Utils.logMethodName();
        let side = new Side2D(this.container, width, height);
        this.insertSide(side);
        return side;
    }

    private insertSide(side: Side2D, ignoreLocalStorage?: boolean) {
        this.sides.push(side);
        if (!ignoreLocalStorage) side.loadFromLocalStorage();
        if (this.sides.length == 1) {
            this.activeSideIndex = 0;
            this.getActiveSide().show();
        }
    }

    /**
     * Load a preset configuration consisting of model, material and sides with dimensions.
     * Presets are stored as json-files and by default are located inside `./presets` directory.
     *
     * Suppose there is a file `./presets/t-shirt.json`:
     * ```json
     * {
     *   "model": "t-shirt",
     *   "material": "cotton",
     *   "sides": [
     *     {
     *       "width": 250,
     *       "height": 400
     *     },
     *     {
     *       "width": 210,
     *       "height": 370
     *     }
     *   ]
     * }
     * ```
     * To load this preset one must call:
     * ```js
     * printConstructor.loadPreset('t-shirt');
     * ```
     * @param {string} filename
     * @param {function} callback
     */
    loadPreset(filename: string, callback?: () => void) {
        this.loadState(Constructor.settings.urls.presets + filename + Constructor.settings.fileExtensions.presets, callback);
    }

    loadState(url: string, callback?: () => void) {
        Utils.logMethodName();
        Utils.loadJSON(url, json => {
            this.setStateInternal(json, callback);
        });
    }

    private deleteAllSides() {
        Utils.logMethodName();
        this.sides.forEach(side => {
            side.getElement().parentElement.removeChild(side.getElement());
        });
        this.sides = [];
    }

    /**
     * Remove all sides and clear browser cache
     */
    clear() {
        localStorage.clear();
        this.deleteAllSides();
    }

    /**
     * Clear all sides and browser cache
     */
    clearAllSides() {
        Utils.logMethodName();
        this.sides.forEach(side => side.clear());
        localStorage.clear();
    }

    /** @hidden */
    getElement(): HTMLElement {
        return this.container;
    }

    setActiveSide(index: number) {
        if (this.activeSideIndex != index && index < this.sides.length) {
            if (this.getMode() != Mode.Mode2D) {
                this.setMode(Mode.Mode2D);
            }
            this.getActiveSide().hide();
            this.activeSideIndex = index;
            this.getActiveSide().show();
            this.getActiveSide().canvas.requestRenderAll();
        }
    }

    getActiveSide(): Side2D {
        return this.sides[this.activeSideIndex];
    }

    setZoom(value: number) {
        this.getActiveSide().setZoom(value);
    }

    getZoom(): number {
        return this.getActiveSide().getZoom();
    }

    setShow3DMargin(value: boolean) {
        this.preview.setShowMargin(value);
    }

    zoomIn() {
        if (this.getMode() === Mode.Mode3D) {
            this.preview.controls.dollyIn(1 + Constructor.zoomStep);
            this.preview.controls.update();
        } else {
            this.getActiveSide().setZoom(this.getActiveSide().getZoom() + Constructor.zoomStep);
        }
    }

    zoomOut() {
        if (this.getMode() === Mode.Mode3D) {
            this.preview.controls.dollyOut(1 + Constructor.zoomStep);
            this.preview.controls.update();
        } else {
            this.getActiveSide().setZoom(this.getActiveSide().getZoom() - Constructor.zoomStep);
        }
    }

    zoomToFit() {
        this.getActiveSide().zoomToFit();
    }

    resetZoom() {
        this.getActiveSide().resetZoom();
    }

    getMode(): Mode {
        return (this.preview && this.preview.isVisible()) ? Mode.Mode3D : Mode.Mode2D;
    }

    setMode(mode: Mode) {
        if (this.preview) {
            Utils.logMethodName();
            if (mode == Mode.Mode2D) {
                this.preview.hide();
                this.getActiveSide().show();
                if (this.onModeChangeHandler) this.onModeChangeHandler();
            } else if (this.getActiveSide && this.preview) {
                this.getActiveSide().deselect();
                this.preview.updateSideMaterials();
                this.getActiveSide().hide();
                this.preview.show();
                this.preview.render();
                if (this.onModeChangeHandler) this.onModeChangeHandler();
            }
        }
    }

    toggleMode() {
        this.setMode(this.getMode() == Mode.Mode2D ? Mode.Mode3D : Mode.Mode2D);
    }

    onSelect(handler: ((selection: Element2D) => void)): void {
        this.onSelectHandler = handler;
    }

    onDeselect(handler: ((selection: Element2D) => void)): void {
        this.onDeselectHandler = handler;
    }

    onModeChange(handler: (() => void)) {
        this.onModeChangeHandler = handler;
    }

    onElementModification(handler: (() => void)) {
        this.onElementModificationHandler = handler;
    }

    getSelection(): Element2D {
        return this.getActiveSide().selection;
    }

    addElement(type: ElementType): Element2D {
        Utils.logMethodName();
        let element = this.getActiveSide().addElement(type);
        element.object.setOptions(Constructor.settings.elementDefaults[type.getNativeTypeName()]);
        element.randomizePosition();
        element.setColor(Color.random());
        return element;
    }

    addImage(src: string, callback?: (Element2D) => void): Element2D {
        Utils.logMethodName();
        let element = this.getActiveSide().addElement(ElementType.IMAGE);
        let image = element.object as fabric.Image;
        image.setSrc(src, () => {
            let side = Constructor.instance.getActiveSide();
            let scale = Math.min(side.width / image.width, side.height / image.height);
            if (scale < 1) image.scale(scale);
            image.setCoords();
            element.randomizePosition();
            side.canvas.renderAll();
            side.saveState();
            callback && callback(element)
        });
        return element;
    }

    getModelName(): string {
        return this.preview.modelName;
    }

    getSettings(): Settings {
        return Constructor.settings;
    }

    setSettings(settings: Settings) {
        Constructor.settings = settings;
    }

    /**
     * Remove selected side element
     */
    remove() {
        if (this.getSelection()) {
            this.getActiveSide().remove(this.getSelection());
        }
    }

    /**
     * Copy active sides's selected element.
     * This operation does not affect global system clipboard.
     */
    copy() {
        let selection = this.getSelection();
        if (selection) {
            this.clipboard = selection.clone();
        }
    }

    /**
     * Copy and remove active sides's selected element
     * This operation does not affect global system clipboard.
     */
    cut() {
        let selection = this.getSelection();
        if (selection) {
            this.clipboard = selection.clone();
            this.getActiveSide().remove(this.getSelection());
        }
    }

    /**
     * Paste previously copied element into active side
     */
    paste(): Element2D {
        if (this.clipboard) {
            let element = this.clipboard.clone();
            this.getActiveSide().add(element);
            return this.getActiveSide().select(element);
        }
    }

    /**
     * Make a copy of active sides's selected element
     */
    duplicate(): Element2D {
        let selection = this.getSelection();
        if (selection) {
            let element = selection.clone();
            this.getActiveSide().add(element);
            element.offset();
            return this.getActiveSide().select(element);
        }
    }

    /**
     * Serialize current state into JSON including sides, side elements, model and material
     * @param {boolean} prettyPrint
     * @returns {string}
     */
    getState(prettyPrint?: boolean): string {
        let state = new ConstructorState();
        this.sides.forEach(side => state.sides.push(side.serialize()));
        state.model = this.preview.modelName;
        state.fills = [];
        for (let i = 0; i < this.preview.fills.length; i++) {
            try {
                state.fills[i] = this.preview.fills[i].color.getHex();
            } catch (e) {
                state.fills[i] = null;
            }
        }
        return JSON.stringify(state, null, prettyPrint ? 4 : 0);
    }

    /**
     * Loads model and sides configuration including size and `roundCorners` (optionally)<br>
     * `roundCorners` property should be set in percent: 0..100
     * Example:
     * ```
     * applyPreset("cup", [{width: 200, height: 200 roundCorners: 40}]);
     * ```
     * @param {string} model
     * @param {Side2DState[]} sides
     * @param {() => void} callback
     */
    applyPreset(model: string, sides: Side2DState[], callback?: () => void) {
        let json = JSON.stringify({
            model: model,
            sides: sides
        });
        this.setStateInternal(json, callback);
    }

    /**
     * Load current state from JSON without resetting localStorage cache
     * @param {string} json
     * @param {() => void} callback
     */
    applyState(json: string | object, callback?: () => void) {
        this.setStateInternal(json, callback, false);
    }

    /**
     * Load current state from JSON without resetting localStorage cache
     * @param {string} json
     * @param {() => void} callback
     */
    setState(json: string | object, callback?: () => void) {
        this.setStateInternal(json, callback, true);
    }

    /**
     * Load current state from JSON
     * @param {string} json
     * @param {() => void} callback
     */
    setStateInternal(json: string | object, callback?: () => void, clearHistory?: boolean) {
        Utils.logMethodName();
        let state: any;
        if (typeof json === Constants.STRING) {
            state = JSON.parse(json as string);
        }
        if (clearHistory) localStorage.clear();
        this.deleteAllSides();
        if (state.sides) {
            state.sides.forEach(sideState => {
                let side = Side2D.prototype.deserialize(sideState);
                if (side.elements && side.elements.length > 0) {
                    //this.isExplicitlyLoaded = true;
                    this.insertSide(side, true);
                } else {
                    this.insertSide(side, clearHistory);
                }
                side.canvas.requestRenderAll();
            });
        }
        this.sides.forEach(side => side.saveState());
        if (this.preview.modelName != state.model) {
            this.loadModel(state.model, () => {
                if (state.fills) {
                    for (let i = 0; i < state.fills.length; i++) {
                        if (this.preview.fills[i]) {
                            this.preview.fills[i].color = new THREE.Color(state.fills[i]);
                        }
                    }
                }
                if (callback) callback();
            });
        } else {
            if (state.fills) {
                for (let i = 0; i < state.fills.length; i++) {
                    if (this.preview.fills[i]) {
                        this.preview.fills[i].color = new THREE.Color(state.fills[i]);
                    }
                }
            }
            if (callback) callback();
        }
    }

    undo() {
        this.getActiveSide().undo();
    }

    redo() {
        this.getActiveSide().redo();
    }

}
