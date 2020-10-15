"use strict";
var ValueMap = (function () {
    function ValueMap() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.map = {};
        if (values.length % 2 != 0)
            throw new TypeError();
        for (var i = 0; i < values.length; i += 2) {
            var key = values[i];
            var value = values[i + 1];
            this.map.put(key, value);
        }
    }
    ValueMap.prototype.put = function (key, value) {
        this.map[key] = value;
        new ValueMap();
    };
    ValueMap.prototype.get = function (key) {
        return this.map[key];
    };
    return ValueMap;
}());
var Associated = (function () {
    function Associated(name) {
        this.name = name;
        Object.getPrototypeOf(this).constructor.map.put(name, this);
    }
    Associated.get = function (name) {
        return this.map.get(name);
    };
    Associated.prototype.getName = function () {
        return this.name;
    };
    Associated.map = new ValueMap();
    return Associated;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Color = (function (_super) {
    __extends(Color, _super);
    function Color() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        if (args.length === 1) {
            if (typeof args[0] === Constants.STRING)
                _this = _super.apply(this, args) || this;
            else
                _this = _super.call(this, args[0].toRgba()) || this;
        }
        else
            _this = _super.call(this, Color.componentsToRgbaString.apply(Color, args)) || this;
        return _this;
    }
    Color.prototype.toHex = function () {
        return '#' + _super.prototype.toHex.call(this);
    };
    Color.prototype.toNumber = function () {
        var c = this.getSource();
        return (c[3] << 24) + (c[2] << 16) + (c[1] << 8) + c[0];
    };
    Color.prototype.toRgba = function () {
        return _super.prototype.toRgba.call(this);
    };
    Color.random = function () {
        return new Color(Utils.randomInt(256), Utils.randomInt(256), Utils.randomInt(256), 1);
    };
    Color.componentsToRgbaString = function () {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        var s = components.length < 4 ? "rgb(" : "rgba(";
        return s + components.join(",") + ")";
    };
    Color.prototype.serialize = function () {
        return this.toRgba();
    };
    Color.deserialize = function (value) {
        return new Color(value);
    };
    Color.prototype.equals = function (color) {
        if (this.getSource().length != color.getSource().length) {
            return false;
        }
        for (var i = 0; i < this.getSource().length; i++) {
            if (this.getSource()[i] != color.getSource()[i]) {
                return false;
            }
        }
        return true;
    };
    Color.WHITE = new Color(255, 255, 255);
    Color.BLACK = new Color(0, 0, 0);
    Color.GRAY = new Color(127, 127, 127);
    Color.BACKGROUND_GRAY = new Color(221, 221, 221);
    Color.LIGHT_GRAY = new Color(240, 240, 240);
    Color.DARK_GRAY = new Color(70, 70, 70);
    Color.TRANSPARENT = new Color(0, 0, 0, 0);
    Color.TRANSPARENT_BLACK = new Color(0, 0, 0, 0.5);
    Color.GUIDE = new Color(0, 255, 0, 0.5);
    return Color;
}(fabric.Color));
var Constants;
(function (Constants) {
    Constants["STRING"] = "string";
    Constants["AUTO"] = "auto";
    Constants["SCROLL"] = "scroll";
    Constants["CENTER"] = "center";
    Constants["BLOCK"] = "block";
    Constants["NONE"] = "none";
    Constants["CANVAS"] = "canvas";
    Constants["DIV"] = "div";
    Constants["IMG"] = "img";
    Constants["LINE_STYLE_PREFIX"] = "1px solid ";
    Constants["PX"] = "px";
    Constants["STYLE"] = "style";
    Constants["TEXT_CSS"] = "text/css";
    Constants["APPLICATION_JSON"] = "application/json";
    Constants["SOLID"] = "solid";
    Constants["ABSOLUTE"] = "absolute";
    Constants["TRANSPARENT"] = "transparent";
    Constants["GET"] = "GET";
    Constants["ADDED"] = "added";
    Constants["ROTATING"] = "rotating";
    Constants["MOVING"] = "moving";
    Constants["SCALING"] = "scaling";
    Constants["SELECTED"] = "selected";
    Constants["DESELECTED"] = "deselected";
    Constants["REMOVED"] = "removed";
    Constants["MODIFIED"] = "modified";
    Constants["SELECTION_CLEARED"] = "selection:cleared";
    Constants["MOUSE_UP"] = "mouse:up";
    Constants["AFTER_RENDER"] = "after:render";
    Constants["PROGRESS"] = "progress";
    Constants["LOAD"] = "load";
    Constants["CHANGE"] = "change";
    Constants["CONTEXT_2D"] = "2d";
    Constants["FILL"] = "fill";
    Constants["NORMAL"] = "normal";
    Constants["ITALIC"] = "italic";
    Constants["BOLD"] = "bold";
    Constants["BODY"] = "body";
    Constants["SIDE"] = "side";
    Constants["ENV"] = "env";
    Constants["MESH_PHYSICAL_MATERIAL"] = "MeshPhysicalMaterial";
    Constants["MARGIN"] = "margin";
    Constants["PERSPECTIVE_CAMERA"] = "PerspectiveCamera";
    Constants["MULTI_MATERIAL_NAME_SEPARATOR"] = "+";
    Constants["MATERIAL_NAME_SEPARATOR"] = "_";
    Constants["PNG"] = "png";
    Constants["JPG"] = "jpg";
})(Constants || (Constants = {}));
var Version = (function () {
    function Version() {
    }
    Version.version = "15.10.2020 11:53";
    return Version;
}());
var View = (function () {
    function View(container) {
        this.container = container;
    }
    View.prototype.show = function () {
        this.getElement().style.display = Constants.BLOCK;
    };
    View.prototype.hide = function () {
        this.getElement().style.display = Constants.NONE;
    };
    View.prototype.isVisible = function () {
        return this.getElement() != null
            && this.getElement().style != null
            && this.getElement().style.display != Constants.NONE;
    };
    return View;
}());
var Settings = (function () {
    function Settings() {
        this.urls = {
            textures: "textures/",
            maps: "textures/maps/",
            models: "models/",
            presets: "presets/"
        };
        this.fileExtensions = {
            model: ".json",
            object: ".obj",
            archive: ".zip",
            presets: ".json",
            map: ".jpg",
        };
        this.elementDefaults = {
            "circle": {
                radius: 50
            },
            "rect": {
                width: 100,
                height: 100
            },
            "triangle": {
                width: 100,
                height: 100
            },
            "i-text": {
                text: "Текст",
                fontSize: 25,
                fontFamily: "Helvetica"
            }
        };
        this.rotationStep = 15;
        this.snapSize = 10;
        this.gridSize = 20;
        this.duplicateOffset = 10;
        this.stateBufferSize = 100;
        this.previewTextureSize = 1024;
        this.previewBackgroundColor = "#dddddd";
        this.fitIntoMargins = false;
        this.localStorage = {
            enabled: true,
            keyPrefix: "CONSTRUCTOR_STATE_"
        };
        this.autoSize = false;
    }
    return Settings;
}());
var Constructor = (function (_super) {
    __extends(Constructor, _super);
    function Constructor(container) {
        var _this = _super.call(this, container instanceof HTMLElement ? container : document.getElementById(container)) || this;
        _this.container.style.overflow = Constants.AUTO;
        fabric.textureSize = 8096;
        Constructor.instance = _this;
        _this.clipboard = null;
        _this.snapToObjects = false;
        _this.setMode(Mode.Mode2D);
        _this.sides = [];
        _this.addSide(_this.container.clientWidth - 50, _this.container.clientHeight - 50);
        _this.preview = new Preview(_this);
        _this.spinner = new Spinner(_this.container);
        _this.preview.hide();
        _this.background = _this.container.style.background;
        _this.container.style.background = null;
        _this.lastWidth = _this.container.clientWidth;
        _this.lastHeight = _this.container.clientHeight;
        if (Constructor.settings.autoSize) {
            setInterval(function () {
                if (_this.lastWidth != _this.container.clientWidth || _this.lastHeight != _this.container.clientHeight) {
                    _this.autoSize();
                }
            }, 500);
        }
        console.log("Constructor.version: ", Constructor.version);
        return _this;
    }
    Constructor.prototype.autoSize = function () {
        console.log("autoSize");
        this.sides.forEach(function (side) { return side.centerPosition(); });
        this.preview.autoSize();
        this.lastWidth = this.container.clientWidth;
        this.lastHeight = this.container.clientHeight;
    };
    Constructor.prototype.loadModel = function (modelName, callback) {
        this.preview.loadModel(modelName, callback);
    };
    Constructor.prototype.addSide = function (width, height) {
        var side = new Side2D(this.container, width, height);
        this.insertSide(side);
        return side;
    };
    Constructor.prototype.insertSide = function (side, ignoreLocalStorage) {
        this.sides.push(side);
        if (!ignoreLocalStorage)
            side.loadFromLocalStorage();
        if (this.sides.length == 1) {
            this.activeSideIndex = 0;
            this.getActiveSide().show();
        }
    };
    Constructor.prototype.loadPreset = function (filename, callback) {
        this.loadState(Constructor.settings.urls.presets + filename + Constructor.settings.fileExtensions.presets, callback);
    };
    Constructor.prototype.loadState = function (url, callback) {
        var _this = this;
        Utils.loadJSON(url, function (json) {
            _this.setStateInternal(json, callback);
        });
    };
    Constructor.prototype.deleteAllSides = function () {
        this.sides.forEach(function (side) {
            side.getElement().parentElement.removeChild(side.getElement());
        });
        this.sides = [];
    };
    Constructor.prototype.clear = function () {
        localStorage.clear();
        this.deleteAllSides();
    };
    Constructor.prototype.clearAllSides = function () {
        this.sides.forEach(function (side) { return side.clear(); });
        localStorage.clear();
    };
    Constructor.prototype.getElement = function () {
        return this.container;
    };
    Constructor.prototype.setActiveSide = function (index) {
        if (this.activeSideIndex != index && index < this.sides.length) {
            if (this.getMode() != Mode.Mode2D) {
                this.setMode(Mode.Mode2D);
            }
            this.getActiveSide().hide();
            this.activeSideIndex = index;
            this.getActiveSide().show();
            this.getActiveSide().canvas.renderAll();
        }
    };
    Constructor.prototype.getActiveSide = function () {
        return this.sides[this.activeSideIndex];
    };
    Constructor.prototype.setZoom = function (value) {
        this.getActiveSide().setZoom(value);
    };
    Constructor.prototype.getZoom = function () {
        return this.getActiveSide().getZoom();
    };
    Constructor.prototype.setShow3DMargin = function (value) {
        this.preview.setShowMargin(value);
    };
    Constructor.prototype.zoomIn = function () {
        if (this.getMode() === Mode.Mode3D) {
            this.preview.controls.dollyIn(1 + Constructor.zoomStep);
            this.preview.controls.update();
        }
        else {
            this.getActiveSide().setZoom(this.getActiveSide().getZoom() + Constructor.zoomStep);
        }
    };
    Constructor.prototype.zoomOut = function () {
        if (this.getMode() === Mode.Mode3D) {
            this.preview.controls.dollyOut(1 + Constructor.zoomStep);
            this.preview.controls.update();
        }
        else {
            this.getActiveSide().setZoom(this.getActiveSide().getZoom() - Constructor.zoomStep);
        }
    };
    Constructor.prototype.zoomToFit = function () {
        this.getActiveSide().zoomToFit();
    };
    Constructor.prototype.resetZoom = function () {
        this.getActiveSide().resetZoom();
    };
    Constructor.prototype.getMode = function () {
        return (this.preview && this.preview.isVisible()) ? Mode.Mode3D : Mode.Mode2D;
    };
    Constructor.prototype.setMode = function (mode) {
        if (this.preview) {
            if (mode == Mode.Mode2D) {
                this.preview.hide();
                this.getActiveSide().show();
            }
            else if (this.getActiveSide && this.preview) {
                this.getActiveSide().deselect();
                this.preview.updateSideMaterials();
                this.getActiveSide().hide();
                this.preview.show();
                this.preview.render();
            }
        }
    };
    Constructor.prototype.toggleMode = function () {
        this.setMode(this.getMode() == Mode.Mode2D ? Mode.Mode3D : Mode.Mode2D);
    };
    Constructor.prototype.onSelect = function (handler) {
        this.onSelectHandler = handler;
    };
    Constructor.prototype.onDeselect = function (handler) {
        this.onDeselectHandler = handler;
    };
    Constructor.prototype.getSelection = function () {
        return this.getActiveSide().selection;
    };
    Constructor.prototype.addElement = function (type) {
        var element = this.getActiveSide().addElement(type);
        element.object.setOptions(Constructor.settings.elementDefaults[type.getNativeTypeName()]);
        element.randomizePosition();
        element.setColor(Color.random());
        return element;
    };
    Constructor.prototype.addImage = function (src) {
        var element = this.getActiveSide().addElement(ElementType.IMAGE);
        var image = element.object;
        image.setSrc(src, function () {
            var side = Constructor.instance.getActiveSide();
            var scale = Math.min(side.width / image.width, side.height / image.height);
            if (scale < 1)
                image.scale(scale);
            image.setCoords();
            element.randomizePosition();
            side.canvas.renderAll();
            side.saveState();
        });
        return element;
    };
    Constructor.prototype.getModelName = function () {
        return this.preview.modelName;
    };
    Constructor.prototype.getSettings = function () {
        return Constructor.settings;
    };
    Constructor.prototype.setSettings = function (settings) {
        Constructor.settings = settings;
    };
    Constructor.prototype.remove = function () {
        if (this.getSelection()) {
            this.getActiveSide().remove(this.getSelection());
        }
    };
    Constructor.prototype.copy = function () {
        var selection = this.getSelection();
        if (selection) {
            this.clipboard = selection.clone();
        }
    };
    Constructor.prototype.cut = function () {
        var selection = this.getSelection();
        if (selection) {
            this.clipboard = selection.clone();
            this.getActiveSide().remove(this.getSelection());
        }
    };
    Constructor.prototype.paste = function () {
        if (this.clipboard) {
            var element = this.clipboard.clone();
            this.getActiveSide().add(element);
            return this.getActiveSide().select(element);
        }
    };
    Constructor.prototype.duplicate = function () {
        var selection = this.getSelection();
        if (selection) {
            var element = selection.clone();
            this.getActiveSide().add(element);
            element.offset();
            return this.getActiveSide().select(element);
        }
    };
    Constructor.prototype.getState = function (prettyPrint) {
        var state = new ConstructorState();
        this.sides.forEach(function (side) { return state.sides.push(side.serialize()); });
        state.model = this.preview.modelName;
        state.fills = [];
        for (var i = 0; i < this.preview.fills.length; i++) {
            try {
                state.fills[i] = this.preview.fills[i].color.getHex();
            }
            catch (e) {
                state.fills[i] = null;
            }
        }
        return JSON.stringify(state, null, prettyPrint ? 4 : 0);
    };
    Constructor.prototype.applyPreset = function (model, sides, callback) {
        var json = JSON.stringify({
            model: model,
            sides: sides
        });
        this.setStateInternal(json, callback);
    };
    Constructor.prototype.applyState = function (json, callback) {
        this.setStateInternal(json, callback, false);
    };
    Constructor.prototype.setState = function (json, callback) {
        this.setStateInternal(json, callback, true);
    };
    Constructor.prototype.setStateInternal = function (json, callback, clearHistory) {
        var _this = this;
        var state;
        if (typeof json === Constants.STRING) {
            state = JSON.parse(json);
        }
        if (clearHistory)
            localStorage.clear();
        this.deleteAllSides();
        if (state.sides) {
            state.sides.forEach(function (sideState) {
                var side = Side2D.prototype.deserialize(sideState);
                _this.insertSide(side, clearHistory);
                side.canvas.renderAll();
            });
        }
        this.sides.forEach(function (side) { return side.saveState(); });
        if (this.preview.modelName != state.model) {
            this.loadModel(state.model, function () {
                if (state.fills) {
                    for (var i = 0; i < state.fills.length; i++) {
                        if (_this.preview.fills[i]) {
                            _this.preview.fills[i].color = new THREE.Color(state.fills[i]);
                        }
                    }
                }
                if (callback)
                    callback();
            });
        }
        else {
            if (state.fills) {
                for (var i = 0; i < state.fills.length; i++) {
                    if (this.preview.fills[i]) {
                        this.preview.fills[i].color = new THREE.Color(state.fills[i]);
                    }
                }
            }
            if (callback)
                callback();
        }
    };
    Constructor.prototype.undo = function () {
        this.getActiveSide().undo();
    };
    Constructor.prototype.redo = function () {
        this.getActiveSide().redo();
    };
    Constructor.version = Version.version;
    Constructor.settings = new Settings();
    Constructor.zoomStep = 0.05;
    return Constructor;
}(View));
var ConstructorState = (function () {
    function ConstructorState() {
        this.model = null;
        this.fills = [];
        this.sides = [];
    }
    ConstructorState.prototype.equals = function (state) {
        var a = JSON.stringify(this);
        var b = JSON.stringify(state);
        return a === b;
    };
    return ConstructorState;
}());
var DoubleLinkedNode = (function () {
    function DoubleLinkedNode(value) {
        this.value = value;
    }
    return DoubleLinkedNode;
}());
var HistoryList = (function () {
    function HistoryList(value) {
        this.locked = false;
        this.state = new DoubleLinkedNode(value);
    }
    HistoryList.prototype.lock = function () {
        this.locked = true;
    };
    HistoryList.prototype.unlock = function () {
        this.locked = false;
    };
    HistoryList.prototype.current = function () {
        return this.state.value;
    };
    HistoryList.prototype.back = function () {
        if (this.state.previous) {
            this.state = this.state.previous;
            return this.state.value;
        }
        return null;
    };
    HistoryList.prototype.forward = function () {
        if (this.state.next) {
            this.state = this.state.next;
            return this.state.value;
        }
        return null;
    };
    HistoryList.prototype.add = function (value) {
        if (!this.locked && !value.equals(this.current())) {
            var next = new DoubleLinkedNode(value);
            next.previous = this.state;
            this.state.next = next;
            this.state = next;
        }
    };
    return HistoryList;
}());
var Mode;
(function (Mode) {
    Mode[Mode["Mode2D"] = 0] = "Mode2D";
    Mode[Mode["Mode3D"] = 1] = "Mode3D";
})(Mode || (Mode = {}));
var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner(container) {
        var _this = _super.call(this, container) || this;
        _this.bar = document.createElement(Constants.DIV);
        _this.bar.style.zIndex = '1000';
        _this.bar.style.border = Spinner.border + Constants.PX + ' ' + Constants.SOLID + ' ' + Color.LIGHT_GRAY.toHex();
        _this.bar.style.borderTop = Spinner.border + Constants.PX + ' ' + Constants.SOLID + ' ' + Color.DARK_GRAY.toHex();
        _this.bar.style.borderRadius = Spinner.borderRadius;
        _this.bar.style.width = Spinner.size + Constants.PX;
        _this.bar.style.height = Spinner.size + Constants.PX;
        _this.bar.style.animation = Spinner.animation;
        _this.bar.style.position = Constants.ABSOLUTE;
        var offset = Spinner.size / 2;
        _this.bar.style.left = (container.clientWidth / 2 - offset) + Constants.PX;
        _this.bar.style.top = (container.clientHeight / 2 - offset) + Constants.PX;
        _this.container.appendChild(_this.bar);
        _this.style = document.createElement(Constants.STYLE);
        _this.style.type = Constants.TEXT_CSS;
        _this.style.innerHTML = Spinner.keyframes;
        document.body.appendChild(_this.style);
        _this.hide();
        return _this;
    }
    Spinner.prototype.getElement = function () {
        return this.bar;
    };
    Spinner.size = 64;
    Spinner.border = 6;
    Spinner.speed = 1;
    Spinner.keyframes = "@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}";
    Spinner.animation = "spin " + Spinner.speed + "s linear infinite";
    Spinner.borderRadius = "50%";
    return Spinner;
}(View));
var Utils = (function () {
    function Utils() {
    }
    Utils.randomInt = function (floor) {
        return Math.floor(Math.random() * floor);
    };
    Utils.loadJSON = function (url, callback) {
        var request = new XMLHttpRequest();
        request.overrideMimeType(Constants.APPLICATION_JSON);
        request.open(Constants.GET, url, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.responseText);
            }
        };
        request.send(null);
    };
    Utils.arrayMove = function (arr, from, to) {
        var element = arr[from];
        arr.splice(from, 1);
        arr.splice(to, 0, element);
    };
    Utils.arrayMoveToStart = function (arr, from) {
        this.arrayMove(arr, from, 0);
    };
    Utils.arrayMoveToEnd = function (arr, from) {
        this.arrayMove(arr, from, arr.length - 1);
    };
    return Utils;
}());
var Dimensions = (function () {
    function Dimensions(width, height) {
        this.width = width;
        this.height = height;
    }
    return Dimensions;
}());
var Element2D = (function () {
    function Element2D(type, side) {
        var _this = this;
        this.type = type;
        this.side = side;
        if (type === ElementType.IMAGE) {
            this.object = new type.nativeType();
        }
        else {
            var defaults = Constructor.settings.elementDefaults[type.getNativeTypeName()];
            type.nativeType.fromObject(defaults, function (native) {
                _this.object = native;
                _this.setOptions(_this.object);
                if (_this.side && _this.side.canvas) {
                    _this.object.dirty = true;
                    Constructor.instance.getActiveSide().canvas.requestRenderAll();
                }
                if (Constructor.instance.preview) {
                    Constructor.instance.preview.render();
                }
            });
        }
        this.setOptions(this.object);
    }
    Element2D.prototype.setOptions = function (object) {
        var _this = this;
        if (!object) {
            return;
        }
        object.on(Constants.ADDED, function () {
            _this.calculateGuides();
        });
        object.on(Constants.MODIFIED, function () {
            _this.calculateGuides();
        });
        object.on(Constants.SCALING, function (e) {
        });
        object.on(Constants.MOVING, function () {
            _this.fitIntoMargins();
            _this.snapPosition();
        });
        object.on(Constants.ROTATING, function () { return _this.snapRotation(); });
        object.on(Constants.SELECTED, function () {
            _this.side.selection = _this;
            Constructor.instance.onSelectHandler((_this));
        });
        object.on(Constants.DESELECTED, function () {
            Constructor.instance.onDeselectHandler((_this));
            _this.side.selection = null;
        });
        object.on(Constants.REMOVED, function () {
            _this.side.selection = null;
        });
        object.setOptions(Element2D.commonDefaults);
    };
    Element2D.prototype.randomizePosition = function () {
        var width = this.side.canvas.getWidth();
        var height = this.side.canvas.getHeight();
        var w = Math.max((width / 2) * Math.random(), width * 0.1);
        var h = Math.max((height / 2) * Math.random(), height * 0.1);
        this.object.left = (width - w) * Math.random() + w / 2;
        this.object.top = (height - h) * Math.random() + h / 2;
        this.fitIntoMargins();
        this.object.setCoords();
        this.side.canvas.renderAll();
    };
    Element2D.prototype.offset = function () {
        this.object.left = this.object.left + Constructor.settings.duplicateOffset;
        this.object.top = this.object.top + Constructor.settings.duplicateOffset;
        this.object.setCoords();
        this.side.canvas.renderAll();
    };
    Element2D.prototype.getColor = function () {
        return new Color(this.object.fill);
    };
    Element2D.prototype.setColor = function (value) {
        if (this.type != ElementType.IMAGE) {
            if (typeof value === Constants.STRING)
                value = new Color(value);
            var color = value;
            this.object.fill = color.toRgba();
            this.object.dirty = true;
            this.side.canvas.renderAll();
            setTimeout(function () {
                Constructor.instance.getActiveSide().canvas.renderAll();
            }, 100);
            this.side.saveState();
        }
    };
    Element2D.prototype.getAlpha = function () {
        var color = new Color(this.object.fill);
        return color.getAlpha();
    };
    Element2D.prototype.setAlpha = function (value) {
        this.object.opacity = value;
        this.side.saveState();
        this.side.canvas.renderAll();
    };
    Element2D.prototype.setShadow = function (value) {
        if (value && value != 0) {
            var options = {
                color: Color.TRANSPARENT_BLACK.toRgba(),
                includeDefaultValues: true
            };
            this.object.setShadow(new fabric.Shadow(options));
            var shadow = this.object.shadow;
            shadow.offsetX = value;
            shadow.offsetY = value;
            shadow.blur = value;
        }
        else {
            this.object.setShadow(null);
        }
        this.side.saveState();
        this.side.canvas.renderAll();
    };
    Element2D.prototype.getShadow = function () {
        var shadow = this.object.shadow;
        return shadow ? shadow.offsetX : 0;
    };
    Element2D.prototype.setPosition = function (left, top) {
        this.object.left = left;
        this.object.top = top;
        this.object.setCoords();
        this.object.dirty = true;
        this.side.canvas.requestRenderAll();
        this.side.saveState();
    };
    Element2D.prototype.setFontFamily = function (fontFamily, repeat) {
        if (this.type === ElementType.TEXT) {
            fabric.charWidthsCache[fontFamily] = {};
            var object = this.object;
            object.fontFamily = fontFamily;
            this.object.dirty = true;
            this.side.canvas.requestRenderAll();
        }
    };
    Element2D.prototype.getFontFamily = function () {
        return this.type === ElementType.TEXT ? this.object.fontFamily : null;
    };
    Element2D.prototype.setFontSize = function (value) {
        if (this.type === ElementType.TEXT) {
            this.object.fontSize = value;
            this.object.dirty = true;
            this.side.canvas.requestRenderAll();
            this.side.saveState();
        }
    };
    Element2D.prototype.getFontSize = function () {
        return this.type === ElementType.TEXT ? this.object.fontSize : null;
    };
    Element2D.prototype.setItalic = function (value) {
        if (this.type === ElementType.TEXT) {
            this.object.fontStyle = value ? Constants.ITALIC : Constants.NORMAL;
            this.object.dirty = true;
            this.side.canvas.requestRenderAll();
            this.side.saveState();
        }
    };
    Element2D.prototype.isItalic = function () {
        return this.type === ElementType.TEXT ? this.object.fontStyle === Constants.ITALIC : null;
    };
    Element2D.prototype.setBold = function (value) {
        if (this.type === ElementType.TEXT) {
            this.object.fontWeight = value ? Constants.BOLD : Constants.NORMAL;
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    };
    Element2D.prototype.isBold = function () {
        return this.type === ElementType.TEXT ? this.object.fontWeight === Constants.BOLD : null;
    };
    Element2D.prototype.setTextDecoration = function (value) {
        if (this.type === ElementType.TEXT) {
            switch (value) {
                case TextDecoration.LINETHROUGH:
                    this.object.linethrough = true;
                    break;
                case TextDecoration.OVERLINE:
                    this.object.overline = true;
                    break;
                case TextDecoration.UNDERLINE:
                    this.object.underline = true;
                    break;
                default: {
                    this.object.linethrough = false;
                    this.object.overline = false;
                    this.object.underline = false;
                }
            }
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    };
    Element2D.prototype.getTextDecoration = function () {
        if (this.type != ElementType.TEXT) {
            return null;
        }
        if (this.object.underline) {
            return TextDecoration.UNDERLINE;
        }
        if (this.object.overline) {
            return TextDecoration.OVERLINE;
        }
        if (this.object.linethrough) {
            return TextDecoration.LINETHROUGH;
        }
        return null;
    };
    Element2D.prototype.setTextAlignment = function (value) {
        if (this.type === ElementType.TEXT) {
            this.object.textAlign = value;
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    };
    Element2D.prototype.getTextAlignment = function () {
        return this.type === ElementType.TEXT ? this.object.textAlign : null;
    };
    Element2D.prototype.addFilter = function (filter, callback) {
        if (this.object instanceof fabric.Image) {
            if (!this.filters)
                this.filters = [];
            if (filter.isBoolean) {
                var index = this.filters.indexOf(filter);
                if (index != -1) {
                    this.filters.splice(index, 1);
                    if (this.filters.length === 0)
                        this.filters = null;
                    this.applyFilters(callback);
                    return;
                }
            }
            this.filters.push(filter);
            this.applyFilters(callback);
        }
    };
    Element2D.prototype.resetFilters = function (callback) {
        this.filters = null;
        if (this.object instanceof fabric.Image) {
            this.object.filters = [];
            this.applyFilters(callback);
        }
    };
    Element2D.prototype.applyFilters = function (callback) {
        var image = this.object;
        image.filters = [];
        if (this.filters) {
            for (var _i = 0, _a = this.filters; _i < _a.length; _i++) {
                var filter = _a[_i];
                image.filters.push(filter.getFilter());
            }
        }
        this.side.saveState();
        image.applyFilters();
        this.side.canvas.renderAll();
        if (callback)
            callback(this);
    };
    Element2D.prototype.snapRotation = function () {
        var angle = this.object.angle;
        angle = Math.round(angle / Constructor.settings.rotationStep) * Constructor.settings.rotationStep;
        this.object.rotate(angle);
    };
    Element2D.prototype.setLocked = function (locked) {
        this.object.lockScalingX
            = this.object.lockScalingY
                = this.object.lockRotation
                    = this.object.lockMovementX
                        = this.object.lockMovementY
                            = locked;
    };
    Element2D.prototype.isLocked = function () {
        return this.object.lockScalingX;
    };
    Element2D.prototype.toFront = function () {
        this.side.canvas.bringToFront(this.object);
        Utils.arrayMoveToEnd(this.side.elements, this.getIndex());
        this.side.deselect();
    };
    Element2D.prototype.toBack = function () {
        this.side.canvas.sendToBack(this.object);
        Utils.arrayMoveToStart(this.side.elements, this.getIndex());
        this.side.deselect();
    };
    Element2D.prototype.clone = function () {
        var o = this.serialize();
        return Element2D.prototype.deserialize(o);
    };
    Element2D.prototype.remove = function () {
        this.side.remove(this);
    };
    Element2D.prototype.calculateGuides = function () {
        if (this.side) {
            this.object.setCoords();
            var w = this.object.getBoundingRect().width / this.side.getZoom();
            var h = this.object.getBoundingRect().height / this.side.getZoom();
            var l = this.object.left - w / 2;
            var t = this.object.top - h / 2;
            this.horizontalGuides = [l + w / 2, l, l + w];
            this.verticalGuides = [t + h / 2, t, t + h];
        }
    };
    Element2D.getSnapOffset = function (source, target) {
        var minDelta = Constructor.settings.snapSize;
        var snapOffset;
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var a = source_1[_i];
            for (var _a = 0, target_1 = target; _a < target_1.length; _a++) {
                var b = target_1[_a];
                var delta = Math.abs(b - a);
                if (delta < minDelta) {
                    minDelta = delta;
                    var i = (target.indexOf(b) - 1);
                    if (i == -1)
                        i = 0;
                    else if (i == 0)
                        i = -1;
                    var d = i * (target[0] - target[1]);
                    snapOffset = new SnapOffset(a, a - d);
                }
            }
        }
        return snapOffset;
    };
    Element2D.prototype.getHorizontalSnapPosition = function (element) {
        return Element2D.getSnapOffset(element.horizontalGuides, this.horizontalGuides);
    };
    Element2D.prototype.getVerticalSnapPosition = function (element) {
        return Element2D.getSnapOffset(element.verticalGuides, this.verticalGuides);
    };
    Element2D.prototype.fitIntoMargins = function () {
        if (Constructor.settings.fitIntoMargins) {
            var rect = this.object.getBoundingRect();
            var w = rect.width / 2;
            var h = rect.height / 2;
            var x = (this.side.canvas.getWidth() / this.side.getZoom() - w);
            var y = (this.side.canvas.getHeight() / this.side.getZoom() - h);
            if (this.object.left < w) {
                this.object.left = w;
            }
            else if (this.object.left > x) {
                this.object.left = x;
            }
            if (this.object.top < h) {
                this.object.top = h;
            }
            else if (this.object.top > y) {
                this.object.top = y;
            }
        }
    };
    Element2D.prototype.snapPosition = function () {
        if (Constructor.instance.snapToObjects) {
            this.calculateGuides();
            this.side.hideGuides();
            var xUpdated = false;
            var yUpdated = false;
            for (var _i = 0, _a = this.side.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                if (element === this)
                    continue;
                if (!xUpdated) {
                    var x = this.getHorizontalSnapPosition(element);
                    if (x != null) {
                        this.object.left = x.objectPosition;
                        this.side.horizontalGuide.update(x.guidePosition);
                        xUpdated = true;
                    }
                }
                if (!yUpdated) {
                    var y = this.getVerticalSnapPosition(element);
                    if (y != null) {
                        this.object.top = y.objectPosition;
                        this.side.verticalGuide.update(y.guidePosition);
                        yUpdated = true;
                    }
                }
                if (xUpdated && yUpdated)
                    return;
            }
        }
        if (Constructor.instance.snapToGrid) {
            var gridSize = Constructor.settings.gridSize;
            this.object.left = Math.round(this.object.left / gridSize) * gridSize;
            this.object.top = Math.round(this.object.top / gridSize) * gridSize;
        }
    };
    Element2D.prototype.snapTransform = function (e) {
        var mouseEvent = (e.e);
        this.calculateGuides();
        this.side.hideGuides();
        var xUpdated = false;
        var yUpdated = false;
        for (var _i = 0, _a = this.side.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element === this)
                continue;
            if (!xUpdated) {
                var x = this.getHorizontalSnapPosition(element);
                if (x != null) {
                    var dx = x.objectPosition - mouseEvent.clientX;
                    this.object.width = this.object.width + dx / 2;
                    this.object.left = this.object.left - dx / 2;
                    this.object.setCoords();
                    this.side.horizontalGuide.update(x.guidePosition);
                    xUpdated = true;
                }
            }
            if (xUpdated && yUpdated)
                return;
        }
    };
    Element2D.prototype.getIndex = function () {
        return this.side.elements.indexOf(this);
    };
    Element2D.prototype.serialize = function () {
        return new ObjectOptions(this);
    };
    Element2D.prototype.deserialize = function (object) {
        var type = ElementType.get(object.type);
        var element = new Element2D(type);
        var filters = object.filters;
        if (filters && filters.length > 0) {
            element.filtersCache = object.filters;
            delete object.filters;
        }
        element.object.setOptions(object.toObject());
        if (type === ElementType.IMAGE) {
            var image = element.object;
            image.crossOrigin = "anonymous";
            image.setSrc(image.getSrc(), function () {
                if (filters) {
                    element.filters = [];
                    for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
                        var filterName = filters_1[_i];
                        var filter = Filter.get(filterName);
                        try {
                            element.addFilter(filter, function () { return element.side.canvas.renderAll(); });
                        }
                        catch (e) {
                            console.error(e.message);
                        }
                    }
                }
                try {
                    element.side.canvas.renderAll();
                    Constructor.instance.preview.updateSideMaterials();
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
        if (type === ElementType.TEXT && element.object['text']) {
            var o = element.object;
            o.text = o.text.split("<br>").join("\n");
        }
        element.setOptions(element.object);
        return element;
    };
    Element2D.commonDefaults = {
        hasBorders: false,
        cornerColor: Color.TRANSPARENT_BLACK.toRgba(),
        transparentCorners: false,
        cornerSize: 8,
        originX: Constants.CENTER,
        originY: Constants.CENTER,
        rotatingPointOffset: 30
    };
    return Element2D;
}());
var ElementType = (function (_super) {
    __extends(ElementType, _super);
    function ElementType(nativeType) {
        var _this = _super.call(this, nativeType.prototype.type) || this;
        _this.nativeType = nativeType;
        return _this;
    }
    ElementType.prototype.getNativeTypeName = function () {
        return this.nativeType.prototype.type;
    };
    ElementType.CIRCLE = new ElementType(fabric.Circle);
    ElementType.RECTANGLE = new ElementType(fabric.Rect);
    ElementType.TRIANGLE = new ElementType(fabric.Triangle);
    ElementType.TEXT = new ElementType(fabric.IText);
    ElementType.IMAGE = new ElementType(fabric.Image);
    return ElementType;
}(Associated));
var Filter = (function (_super) {
    __extends(Filter, _super);
    function Filter(name, filter, isBoolean) {
        var _this = _super.call(this, name) || this;
        _this.nativeFilter = filter;
        _this.isBoolean = isBoolean;
        return _this;
    }
    Filter.prototype.getFilter = function () {
        return this.nativeFilter;
    };
    Filter.GRAYSCALE = new Filter("grayscale", new fabric.Image.filters.Grayscale(), true);
    Filter.INVERT = new Filter("invert", new fabric.Image.filters.Invert(), true);
    Filter.BRIGHTNESS = new Filter("brightness", new fabric.Image.filters.Brightness({ brightness: 100 }));
    Filter.BLUR = new Filter("blur", new fabric.Image.filters.Convolute({
        matrix: [
            1 / 9, 1 / 9, 1 / 9,
            1 / 9, 1 / 9, 1 / 9,
            1 / 9, 1 / 9, 1 / 9
        ]
    }));
    Filter.SHARPEN = new Filter("sharpen", new fabric.Image.filters.Convolute({
        matrix: [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ]
    }));
    Filter.EMBOSS = new Filter("emboss", new fabric.Image.filters.Convolute({
        matrix: [
            1, 1, 1,
            1, 0.7, -1,
            -1, -1, -1
        ]
    }));
    return Filter;
}(Associated));
var Guide = (function (_super) {
    __extends(Guide, _super);
    function Guide() {
        var _this = _super.call(this, [0, 0, 0, 0], Guide.DEFAULTS) || this;
        _this.dirty = true;
        return _this;
    }
    Guide.prototype.show = function () {
        this.stroke = Color.GUIDE.toRgba();
        this.bringToFront();
        this.dirty = true;
    };
    Guide.prototype.hide = function () {
        this.stroke = Color.TRANSPARENT.toRgba();
        this.dirty = true;
    };
    Guide.DEFAULTS = {
        left: 0,
        top: 0,
        stroke: Color.GUIDE.toRgba(),
        selectable: false,
        width: 1
    };
    return Guide;
}(fabric.Line));
var HorizontalGuide = (function (_super) {
    __extends(HorizontalGuide, _super);
    function HorizontalGuide(h) {
        var _this = _super.call(this) || this;
        _this.height = h;
        return _this;
    }
    HorizontalGuide.prototype.update = function (x) {
        this.left = x;
        this.show();
    };
    return HorizontalGuide;
}(Guide));
var ImageType;
(function (ImageType) {
    ImageType["PNG"] = "image/png";
    ImageType["JPG"] = "image/jpeg";
    ImageType["GIF"] = "image/gif";
    ImageType["SVG"] = "image/svg+xml";
})(ImageType || (ImageType = {}));
var ObjectOptions = (function () {
    function ObjectOptions(element) {
        if (element) {
            var object = element.object.toJSON();
            var excludedOptions = ObjectOptions.excludedNativeOptions[element.object.type];
            for (var _i = 0, _a = ObjectOptions.nativeOptions; _i < _a.length; _i++) {
                var property = _a[_i];
                if (object[property] && (!excludedOptions || !excludedOptions[property])) {
                    this[property] = object[property];
                    if (property === "text") {
                        this[property] = this[property].split("\n").join("<br>");
                    }
                }
            }
            if (element.filters && element.filters.length > 0) {
                this.filters = [];
                for (var _b = 0, _c = element.filters; _b < _c.length; _b++) {
                    var filter = _c[_b];
                    this.filters.push(filter.getName());
                }
            }
            else if (element.filtersCache && element.filtersCache.length) {
                this.filters = element.filtersCache;
            }
        }
    }
    ObjectOptions.fromObject = function (value) {
        var object = new ObjectOptions();
        for (var _i = 0, _a = ObjectOptions.nativeOptions; _i < _a.length; _i++) {
            var property = _a[_i];
            if (value[property])
                object[property] = value[property];
        }
        return object;
    };
    ObjectOptions.prototype.toObject = function () {
        var options = {};
        for (var _i = 0, _a = ObjectOptions.nativeOptions; _i < _a.length; _i++) {
            var property = _a[_i];
            if (this[property])
                options[property] = this[property];
        }
        if (this.filters)
            options.filters = this.filters;
        return options;
    };
    ObjectOptions.prototype.equals = function (object) {
        var objectOptions = Object.getOwnPropertyNames(object);
        var options = Object.getOwnPropertyNames(this);
        if (objectOptions.length != options.length) {
            return false;
        }
        for (var i = 0; i < options.length; i++) {
            var a = options[i];
            var b = objectOptions[i];
            if (this[a] != object[a]) {
                return false;
            }
            if (a != b && this[b] != object[b]) {
                return false;
            }
        }
        return true;
    };
    ObjectOptions.nativeOptions = [
        "angle",
        "fill",
        "flipX",
        "flipY",
        "fontFamily",
        "filters",
        "fontSize",
        "fontStyle",
        "fontWeight",
        "height",
        "left",
        "lineHeight",
        "opacity",
        "radius",
        "scaleX",
        "scaleY",
        "shadow",
        "src",
        "text",
        "textAlign",
        "textBackgroundColor",
        'underline',
        'overline',
        'linethrough',
        "top",
        "transformMatrix",
        "type",
        "width"
    ];
    ObjectOptions.excludedNativeOptions = {
        "image": [
            "fill"
        ]
    };
    return ObjectOptions;
}());
var Side2DStateObjects = (function () {
    function Side2DStateObjects(side) {
        this.objects = [];
        if (side) {
            for (var _i = 0, _a = side.elements; _i < _a.length; _i++) {
                var element = _a[_i];
                this.objects.push(element.serialize());
            }
        }
    }
    Side2DStateObjects.parse = function (json) {
        var objects = new Side2DStateObjects();
        var rawObjects = JSON.parse(json).objects;
        for (var _i = 0, rawObjects_1 = rawObjects; _i < rawObjects_1.length; _i++) {
            var rawObject = rawObjects_1[_i];
            var objectOptions = ObjectOptions.fromObject(rawObject);
            objects.objects.push(objectOptions);
        }
        return objects;
    };
    Side2DStateObjects.prototype.equals = function (state) {
        if (state.objects.length != this.objects.length) {
            return false;
        }
        for (var i = 0; i < this.objects.length; i++) {
            var a = this.objects[i];
            var b = state.objects[i];
            if (!a.equals(b))
                return false;
        }
        return true;
    };
    return Side2DStateObjects;
}());
var Side2DState = (function (_super) {
    __extends(Side2DState, _super);
    function Side2DState(side) {
        var _this = _super.call(this, side) || this;
        _this.width = side.width;
        _this.height = side.height;
        _this.roundCorners = side.roundCorners;
        return _this;
    }
    Side2DState.prototype.equals = function (state) {
        if (this.width != state.width || this.height != state.height || this.roundCorners != state.roundCorners) {
            return false;
        }
        return _super.prototype.equals.call(this, state);
    };
    return Side2DState;
}(Side2DStateObjects));
var Side2D = (function (_super) {
    __extends(Side2D, _super);
    function Side2D(htmlElement, width, height, roundCorners) {
        var _this = _super.call(this, htmlElement) || this;
        _this.elements = [];
        _this.history = new HistoryList(new Side2DState(_this));
        _this.width = width;
        _this.height = height;
        _this.canvasElement = document.createElement(Constants.CANVAS);
        _this.container.appendChild(_this.canvasElement);
        _this.canvas = new fabric.Canvas(_this.canvasElement, null);
        _this.canvasElement.style.background = Constructor.instance.background;
        _this.canvas.setWidth(width);
        _this.canvas.setHeight(height);
        _this.canvas.selection = false;
        _this.canvas.on(Constants.MOUSE_UP, function () {
            _this.hideGuides();
            _this.saveState();
        });
        _this.canvas.on(Constants.SELECTION_CLEARED, function () {
            _this.selection = null;
        });
        _this.horizontalGuide = new HorizontalGuide(height);
        _this.verticalGuide = new VerticalGuide(width);
        _this.canvas.add(_this.horizontalGuide);
        _this.canvas.add(_this.verticalGuide);
        _this.setZoom(1);
        _this.hideGuides();
        _this.hide();
        _this.needsHistoryUpdate = false;
        _this.roundCorners = roundCorners;
        if (roundCorners)
            _this.setRoundCorners();
        _this.canvasElement.style.border = Constants.LINE_STYLE_PREFIX + Color.GRAY.toHex();
        return _this;
    }
    Side2D.prototype.setRoundCorners = function () {
        var smallestSide = Math.min(this.canvasElement.width, this.canvasElement.height);
        this.canvasElement.style.borderRadius = smallestSide / 2 * this.roundCorners / 100 + Constants.PX;
    };
    Side2D.prototype.centerPosition = function () {
        var canvasContainer = this.canvasElement.parentElement;
        var dw = this.container.clientWidth - canvasContainer.clientWidth;
        var dh = this.container.clientHeight - canvasContainer.clientHeight;
        canvasContainer.style.marginLeft = dw > 0 ? dw / 2 + Constants.PX : null;
        canvasContainer.style.marginTop = dh > 0 ? dh / 2 + Constants.PX : null;
        this.setRoundCorners();
    };
    Side2D.prototype.setZoom = function (value) {
        if (value >= Side2D.maxZoom && value <= Side2D.minZoom)
            return;
        this.canvas.setZoom(value);
        this.canvas.setWidth(this.width * value);
        this.canvas.setHeight(this.height * value);
        this.canvas.renderAll();
        this.centerPosition();
    };
    Side2D.prototype.getZoom = function () {
        return this.canvas ? this.canvas.getZoom() : 1;
    };
    Side2D.prototype.resetZoom = function () {
        this.canvas.setZoom(1);
        this.canvas.setWidth(this.width);
        this.canvas.setHeight(this.height);
        this.canvas.renderAll();
        this.centerPosition();
    };
    Side2D.prototype.zoomToFit = function () {
        this.setZoom(Math.min(this.container.clientWidth / this.width, this.container.clientHeight / this.height));
    };
    Side2D.prototype.getRatio = function () {
        return this.width / this.height;
    };
    Side2D.prototype.getElement = function () {
        return this.canvas.getElement().parentElement;
    };
    Side2D.prototype.getIndex = function () {
        return Constructor.instance.sides.indexOf(this);
    };
    Side2D.prototype.add = function (element) {
        element.side = this;
        this.elements.push(element);
        this.canvas.add(element.object);
        element.fitIntoMargins();
        element.object.setCoords();
        return element;
    };
    Side2D.prototype.addElement = function (type) {
        return this.add(new Element2D(type, this));
    };
    Side2D.prototype.remove = function (element) {
        this.canvas.remove(element.object);
        this.elements.splice(this.elements.indexOf(element), 1);
    };
    Side2D.prototype.getPointSize = function () {
        return 96 / 72 * this.getZoom();
    };
    Side2D.prototype.getInchSize = function () {
        return 72 * this.getPointSize();
    };
    Side2D.prototype.getCentimeterSize = function () {
        return this.getInchSize() / 2.54;
    };
    Side2D.prototype.getMillimeterSize = function () {
        return this.getCentimeterSize() / 10;
    };
    Side2D.prototype.select = function (element) {
        this.deselect();
        this.selection = element;
        this.canvas.setActiveObject(element.object);
        this.canvas.renderAll();
        return element;
    };
    Side2D.prototype.deselect = function () {
        this.selection = null;
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
    };
    Side2D.prototype.hideGuides = function () {
        this.horizontalGuide.hide();
        this.verticalGuide.hide();
        this.canvas.renderAll();
    };
    Side2D.prototype.serialize = function () {
        return new Side2DState(this);
    };
    Side2D.prototype.deserialize = function (state) {
        var side = new Side2D(Constructor.instance.getElement(), state.width, state.height, state.roundCorners);
        if (state.objects) {
            for (var _i = 0, _a = state.objects; _i < _a.length; _i++) {
                var object = _a[_i];
                var options = ObjectOptions.fromObject(object);
                var element = Element2D.prototype.deserialize(options);
                side.add(element);
            }
        }
        return side;
    };
    Side2D.prototype.clear = function () {
        this.elements = [];
        this.selection = null;
        this.canvas.clear();
        this.canvas.add(this.horizontalGuide);
        this.canvas.add(this.verticalGuide);
    };
    Side2D.prototype.removeElements = function () {
        while (this.elements.length) {
            this.elements[0].remove();
        }
        this.saveState();
    };
    Side2D.prototype.setState = function (state) {
        this.history.lock();
        this.clear();
        var _loop_1 = function (objectOptions) {
            if (objectOptions.type === 'image') {
                var object = objectOptions.toObject();
                var side_1 = this_1;
                fabric.Image.fromObject(object, function (image) {
                    var element = new Element2D(ElementType.IMAGE);
                    element.object = image;
                    image.crossOrigin = "anonymous";
                    element.setOptions(element.object);
                    side_1.add(element);
                    if (objectOptions.filters) {
                        element.filters = [];
                        for (var _i = 0, _a = objectOptions.filters; _i < _a.length; _i++) {
                            var filterName = _a[_i];
                            var filter = Filter.get(filterName);
                            try {
                                element.addFilter(filter, function () { return element.side.canvas.renderAll(); });
                            }
                            catch (e) {
                                console.error(e.message);
                            }
                        }
                        element.applyFilters(function (imageElement) {
                            imageElement.object.dirty = true;
                            imageElement.side.canvas.requestRenderAll();
                        });
                    }
                });
            }
            else {
                var element_1 = Element2D.prototype.deserialize(objectOptions);
                this_1.add(element_1);
                element_1.object.dirty = true;
                if (element_1.type === ElementType.TEXT) {
                    setTimeout(function () { return element_1.setFontFamily(element_1.getFontFamily()); }, 0);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = state.objects; _i < _a.length; _i++) {
            var objectOptions = _a[_i];
            _loop_1(objectOptions);
        }
        this.saveToLocalStorage(state);
        this.canvas.requestRenderAll();
        this.history.unlock();
    };
    Side2D.prototype.getLocalStorageKey = function () {
        return Constructor.settings.localStorage.keyPrefix + this.getIndex();
    };
    Side2D.prototype.saveToLocalStorage = function (state) {
        localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(state));
    };
    Side2D.prototype.loadFromLocalStorage = function () {
        if (Constructor.settings.localStorage.enabled) {
            var key = this.getLocalStorageKey();
            var state = localStorage.getItem(key);
            if (state) {
                var objects = Side2DStateObjects.parse(state);
                this.setState(objects);
            }
        }
    };
    Side2D.prototype.saveState = function () {
        var state = new Side2DStateObjects(this);
        this.history.add(state);
        this.saveToLocalStorage(state);
    };
    Side2D.prototype.undo = function () {
        var state = this.history.back();
        if (state)
            this.setState(state);
    };
    Side2D.prototype.redo = function () {
        var state = this.history.forward();
        if (state)
            this.setState(state);
    };
    Side2D.prototype.exportImage = function (maxSize, format) {
        var w = this.canvas.getWidth() / this.getZoom();
        var h = this.canvas.getHeight() / this.getZoom();
        var multiplier = maxSize ? maxSize / Math.max(w, h) : 1;
        if (!format)
            format = ImageType.PNG;
        if (format == ImageType.JPG) {
            var background = this.addElement(ElementType.RECTANGLE);
            background.setColor(Color.WHITE);
            background.object.width = w;
            background.object.height = h;
            background.object.left = w / 2;
            background.object.top = h / 2;
            background.object.setCoords();
            background.toBack();
            this.canvas.renderAll();
            var src = this.canvas.toDataURL({ format: Constants.JPG, multiplier: multiplier });
            background.remove();
            this.canvas.renderAll();
            return src;
        }
        if (format == ImageType.SVG) {
            return this.canvas.toSVG({
                width: w * multiplier,
                height: h * multiplier,
            });
        }
        return this.canvas.toDataURL({ format: Constants.PNG, multiplier: multiplier });
    };
    Side2D.prototype.getState = function () {
        return new Side2DState(this);
    };
    Side2D.prototype.equals = function (side) {
        return this.getState().equals(side.getState());
    };
    Side2D.prototype.isEmpty = function () {
        return this.elements.length == 0;
    };
    Side2D.maxZoom = 10;
    Side2D.minZoom = 0.001;
    return Side2D;
}(View));
var SnapOffset = (function () {
    function SnapOffset(guidePosition, objectPosition) {
        this.guidePosition = guidePosition;
        this.objectPosition = objectPosition;
    }
    return SnapOffset;
}());
var TextAlignment;
(function (TextAlignment) {
    TextAlignment["LEFT"] = "left";
    TextAlignment["CENTER"] = "center";
    TextAlignment["RIGHT"] = "right";
    TextAlignment["JUSTIFY"] = "justify";
})(TextAlignment || (TextAlignment = {}));
var TextDecoration;
(function (TextDecoration) {
    TextDecoration["UNDERLINE"] = "underline";
    TextDecoration["OVERLINE"] = "overline";
    TextDecoration["LINETHROUGH"] = "line-through";
})(TextDecoration || (TextDecoration = {}));
var VerticalGuide = (function (_super) {
    __extends(VerticalGuide, _super);
    function VerticalGuide(w) {
        var _this = _super.call(this) || this;
        _this.width = w;
        return _this;
    }
    VerticalGuide.prototype.update = function (y) {
        this.top = y;
        this.show();
    };
    return VerticalGuide;
}(Guide));
var Preview = (function (_super) {
    __extends(Preview, _super);
    function Preview(constructor) {
        var _this = _super.call(this, constructor.container) || this;
        _this.sides = [];
        _this.fills = [];
        _this.originalFillColors = [];
        Preview.instance = _this;
        _this.exportRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        _this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        try {
            _this.renderer.setClearColor(Constructor.settings.previewBackgroundColor);
        }
        catch (e) {
            _this.renderer.setClearColor(Color.BACKGROUND_GRAY.toHex());
        }
        _this.renderer.setPixelRatio(window.devicePixelRatio);
        _this.renderer.setSize(constructor.container.clientWidth, constructor.container.clientHeight);
        _this.camera = new THREE.PerspectiveCamera(70, _this.renderer.getSize().width / _this.renderer.getSize().height, 0.1);
        _this.scene = new THREE.Scene();
        _this.scene.add(_this.camera);
        _this.setupControls();
        _this.showMargins = false;
        constructor.container.appendChild(_this.renderer.domElement);
        _this.render();
        return _this;
    }
    Preview.prototype.autoSize = function () {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(Constructor.instance.getElement().clientWidth, Constructor.instance.getElement().clientHeight);
        this.camera.aspect = this.renderer.getSize().width / this.renderer.getSize().height;
        this.camera.updateProjectionMatrix();
        this.render();
    };
    Preview.prototype.getElement = function () {
        return Preview.instance.renderer.domElement;
    };
    Preview.prototype.animate = function () {
        requestAnimationFrame(this.animate);
        Preview.instance.controls.update();
        this.render();
    };
    Preview.prototype.render = function () {
        Preview.instance.camera.lookAt(Preview.instance.scene.position);
        Preview.instance.camera.updateMatrixWorld(true);
        Preview.instance.renderer.render(Preview.instance.scene, Preview.instance.camera);
    };
    Preview.prototype.clear = function () {
        this.sides = [];
        this.fills = [];
        this.originalFillColors = [];
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
    };
    Preview.prototype.setScene = function (scene) {
        Preview.instance.clear();
        Preview.instance.scene = scene;
        scene.background = Color.WHITE.toHex();
        Preview.instance.setupScene();
        Preview.instance.updateSideMaterials();
        Constructor.instance.spinner.hide();
        Preview.instance.render();
    };
    Preview.prototype.loadModel = function (modelName, callback) {
        var _this = this;
        Constructor.instance.spinner.show();
        this.modelName = modelName;
        Preview.objectLoader.manager.onError = function () { return Constructor.instance.spinner.hide(); };
        Preview.objectLoader.load(Constructor.settings.urls.models + this.modelName + Constructor.settings.fileExtensions.model, function (object) {
            _this.setScene(object);
            Constructor.instance.spinner.hide();
            if (callback)
                callback();
        });
    };
    Preview.prototype.setupScene = function () {
        var _this = this;
        this.scene.traverse(function (object) {
            if (object.type && object.type === Constants.PERSPECTIVE_CAMERA) {
                _this.camera = object;
                _this.camera.near = 0.1;
                _this.camera.aspect = _this.renderer.domElement.width / _this.renderer.domElement.height;
                _this.camera.updateProjectionMatrix();
                _this.setupControls();
            }
            else if (object.material && object.material.type && object.material.name) {
                var material = object.material;
                var materialNames = material.name.split(Constants.MULTI_MATERIAL_NAME_SEPARATOR);
                for (var i = 0; i < materialNames.length; i++) {
                    object.renderOrder = 100;
                    var nameParts = material.name.split(Constants.MATERIAL_NAME_SEPARATOR);
                    var type = nameParts[0];
                    var index = nameParts.length ? parseInt(nameParts[1]) - 1 : 0;
                    if (material.envMap) {
                        material.envMap.mapping = THREE.EquirectangularReflectionMapping;
                        material.envMap.magFilter = THREE.LinearFilter;
                        material.envMap.minFilter = THREE.LinearMipMapLinearFilter;
                        material.needsUpdate = true;
                    }
                    if (type === Constants.SIDE) {
                        object.renderOrder = 0;
                        _this.sides[index] = material;
                    }
                    else if (type === Constants.FILL) {
                        _this.fills[index] = material;
                        _this.originalFillColors[index] = material.color.getHex();
                    }
                }
            }
        });
    };
    Preview.prototype.setupControls = function () {
        var cameraDistance = Math.max(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.addEventListener(Constants.CHANGE, this.render);
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minDistance = cameraDistance / 2;
        this.controls.maxDistance = cameraDistance * 2;
        this.controls.zoomSpeed = 1;
        this.controls.enablePan = false;
        this.controls.update();
    };
    Preview.prototype.clearFills = function () {
        for (var i = 0; i < this.fills.length; i++) {
            this.setFills(null, i);
        }
    };
    Preview.prototype.setFills = function (color) {
        var indices = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            indices[_i - 1] = arguments[_i];
        }
        if (this.fills && this.fills.length) {
            for (var _a = 0, indices_1 = indices; _a < indices_1.length; _a++) {
                var index = indices_1[_a];
                if (this.fills.length > index) {
                    if (!this.fills[index]) {
                        continue;
                    }
                    if (color === null) {
                        this.fills[index].color = new THREE.Color(this.originalFillColors[index]);
                    }
                    else {
                        this.fills[index].color = new THREE.Color(color);
                    }
                }
            }
            this.render();
        }
    };
    Preview.prototype.setShowMargin = function (value) {
        var _this = this;
        this.scene.traverse(function (mesh) {
            if (mesh.material && mesh.material.name && mesh.material.name === Constants.MARGIN) {
                mesh.visible = value;
                _this.render();
            }
        });
    };
    Preview.prototype.updateSideMaterials = function (callback) {
        var _this = this;
        if (this.sides && this.sides.length) {
            var _loop_2 = function (i) {
                var map;
                var side = Constructor.instance.sides[i];
                if (!side || !side.canvas)
                    return "continue";
                var w = side.canvas.getWidth() / side.getZoom();
                var h = side.canvas.getHeight() / side.getZoom();
                var multiplier = Constructor.settings.previewTextureSize / Math.max(w, h);
                try {
                    var src = side.canvas.toDataURL({ format: Constants.PNG, multiplier: multiplier });
                    this_2.sides[i].userData = null;
                    var image_1 = document.createElement(Constants.IMG);
                    image_1.crossOrigin = "anonymous";
                    image_1.src = src;
                    image_1.onload = function () {
                        map = new THREE.Texture(image_1);
                        map.wrapS = map.wrapT = THREE.ClampToEdgeWrapping;
                        map.minFilter = THREE.NearestMipMapNearestFilter;
                        map.anisotropy = Constructor.instance.preview.renderer.capabilities.getMaxAnisotropy();
                        map.needsUpdate = true;
                        var side = Constructor.instance.preview.sides[i];
                        side.map = map;
                        side.transparent = true;
                        side.needsUpdate = true;
                        side.userData = true;
                        Constructor.instance.preview.render();
                    };
                }
                catch (e) {
                    console.error("failed to update side", side.getIndex());
                }
            };
            var this_2 = this;
            for (var i = 0; i < this.sides.length; i++) {
                _loop_2(i);
            }
            this.render();
            this.waitUntilSidesUpdate(function () {
                _this.render();
                if (callback)
                    callback();
            });
        }
    };
    Preview.prototype.waitUntilSidesUpdate = function (callback, max) {
        var _this = this;
        if (!max)
            max = new Date().getMilliseconds() + 100;
        if (this.sides && this.sides.length) {
            for (var i = 0; i < this.sides.length; i++) {
                if (this.sides[i].userData != 1) {
                    if (new Date().getMilliseconds() < max) {
                        setTimeout(function () { return _this.waitUntilSidesUpdate(callback, max); }, 10);
                    }
                    else {
                        callback();
                    }
                    return;
                }
            }
        }
        callback();
    };
    Preview.prototype.exportImage = function (callback, maxSize, format, quality) {
        var _this = this;
        this.updateSideMaterials(function () {
            callback(_this.exportImageSync(maxSize, format, quality));
        });
    };
    Preview.prototype.exportImageSync = function (maxSize, format, quality) {
        if (!format)
            format = ImageType.PNG;
        if (!quality)
            quality = 0.9;
        var w = this.renderer.domElement.width;
        var h = this.renderer.domElement.height;
        var multiplier = maxSize ? maxSize / Math.max(w, h) : 1;
        w *= multiplier;
        h *= multiplier;
        if (format == ImageType.JPG) {
            this.exportRenderer.setClearColor(Color.WHITE.toHex());
        }
        else {
            this.exportRenderer.setClearColor(Color.TRANSPARENT.toRgba(), 0);
        }
        if (this.exportRenderer.getSize().width != w && this.exportRenderer.getSize().height != h) {
            this.exportRenderer.setSize(w, h);
        }
        this.exportRenderer.render(this.scene, this.camera);
        return this.exportRenderer.domElement.toDataURL(format, quality);
    };
    Preview.prototype.setBackgroundColor = function (value) {
        var color;
        if (value instanceof Color) {
            color = value.toRgb();
        }
        else {
            color = new THREE.Color(value);
        }
        this.renderer.setClearColor(color);
        this.render();
    };
    Preview.marginMaterial = new THREE.LineBasicMaterial({
        name: Constants.MARGIN,
        color: Color.GUIDE.toNumber(),
        transparent: true,
        linewidth: 4,
        opacity: 0.5
    });
    Preview.objectLoader = new THREE.ObjectLoader();
    return Preview;
}(View));
//# sourceMappingURL=constructor.js.map