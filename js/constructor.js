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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
    Constants["BUTTON"] = "button";
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
    Constants["OBJECT_MODIFIED"] = "object:modified";
    Constants["OBJECT_MOVED"] = "object:moved";
    Constants["OBJECT_SCALED"] = "object:scaled";
    Constants["OBJECT_ROTATED"] = "object:rotated";
    Constants["OBJECT_SKEWED"] = "object:skewed";
    Constants["OBJECT_ADDED"] = "object:added";
    Constants["OBJECT_REMOVED"] = "object:removed";
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
    Version.version = "05.11.2020 17:37";
    return Version;
}());
var Trigger = (function () {
    function Trigger() {
        this.actions = [];
        this.visibilityActions = [];
    }
    Trigger.prototype.changed = function () {
        var _this = this;
        this.actions.forEach(function (action) { return action(_this); });
    };
    Trigger.prototype.visibilityChanged = function () {
        var _this = this;
        this.visibilityActions.forEach(function (action) { return action(_this); });
    };
    Trigger.prototype.onChange = function (action) {
        this.actions.push(action);
    };
    Trigger.prototype.onVisibilityChange = function (action) {
        this.visibilityActions.push(action);
    };
    return Trigger;
}());
var View = (function (_super) {
    __extends(View, _super);
    function View(container) {
        var _this = _super.call(this) || this;
        _this.container = container;
        return _this;
    }
    View.prototype.show = function () {
        this.getElement().style.display = Constants.BLOCK;
    };
    View.prototype.hide = function () {
        this.getElement().style.display = Constants.NONE;
    };
    View.prototype.setVisible = function (value) {
        if (value != this.isVisible()) {
            value ? this.show() : this.hide();
        }
    };
    View.prototype.clear = function () {
        this.getElement().innerHTML = "";
    };
    View.prototype.isVisible = function () {
        return this.getElement() != null
            && this.getElement().style != null
            && this.getElement().style.display != Constants.NONE;
    };
    View.prototype.getClassName = function () {
        return "";
    };
    return View;
}(Trigger));
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
            var _loop_1 = function (i) {
                var map;
                var side = Constructor.instance.sides[i];
                if (!side || !side.canvas)
                    return "continue";
                var w = side.canvas.getWidth() / side.getZoom();
                var h = side.canvas.getHeight() / side.getZoom();
                var multiplier = Constructor.settings.previewTextureSize / Math.max(w, h);
                try {
                    var src = side.canvas.toDataURL({ format: Constants.PNG, multiplier: multiplier });
                    this_1.sides[i].userData = null;
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
            var this_1 = this;
            for (var i = 0; i < this.sides.length; i++) {
                _loop_1(i);
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
var Settings = (function () {
    function Settings() {
        this.debug = false;
        this.ui = {
            layerIconSize: 24
        };
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
        _this.onSelectHandler = function () { };
        _this.onDeselectHandler = function () { };
        _this.onModeChangeHandler = function () { };
        _this.onElementModificationHandler = function () { };
        _this.isExplicitlyLoaded = false;
        _this.container.style.overflow = Constants.AUTO;
        fabric.textureSize = 4096;
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
        Utils.logMethodName();
        this.sides.forEach(function (side) { return side.centerPosition(); });
        this.preview.autoSize();
        this.lastWidth = this.container.clientWidth;
        this.lastHeight = this.container.clientHeight;
    };
    Constructor.prototype.loadModel = function (modelName, callback) {
        Utils.logMethodName();
        this.preview.loadModel(modelName, callback);
    };
    Constructor.prototype.addSide = function (width, height) {
        Utils.logMethodName();
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
        this.changed();
    };
    Constructor.prototype.loadPreset = function (filename, callback) {
        this.loadState(Constructor.settings.urls.presets + filename + Constructor.settings.fileExtensions.presets, callback);
    };
    Constructor.prototype.loadState = function (url, callback) {
        var _this = this;
        Utils.logMethodName();
        Utils.loadJSON(url, function (json) {
            _this.setStateInternal(json, callback);
        });
    };
    Constructor.prototype.deleteAllSides = function () {
        Utils.logMethodName();
        this.sides.forEach(function (side) {
            side.getElement().parentElement.removeChild(side.getElement());
        });
        this.sides = [];
        this.changed();
    };
    Constructor.prototype.clear = function () {
        localStorage.clear();
        this.deleteAllSides();
    };
    Constructor.prototype.clearAllSides = function () {
        Utils.logMethodName();
        this.sides.forEach(function (side) { return side.clear(); });
        localStorage.clear();
        this.changed();
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
            this.getActiveSide().canvas.requestRenderAll();
            this.visibilityChanged();
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
            Utils.logMethodName();
            if (mode == Mode.Mode2D) {
                this.preview.hide();
                this.getActiveSide().show();
                if (this.onModeChangeHandler)
                    this.onModeChangeHandler();
            }
            else if (this.getActiveSide && this.preview) {
                this.getActiveSide().deselect();
                this.preview.updateSideMaterials();
                this.getActiveSide().hide();
                this.preview.show();
                this.preview.render();
                if (this.onModeChangeHandler)
                    this.onModeChangeHandler();
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
    Constructor.prototype.onModeChange = function (handler) {
        this.onModeChangeHandler = handler;
    };
    Constructor.prototype.onElementModification = function (handler) {
        this.onElementModificationHandler = handler;
    };
    Constructor.prototype.getSelection = function () {
        return this.getActiveSide().selection;
    };
    Constructor.prototype.addElement = function (type) {
        Utils.logMethodName();
        var element = this.getActiveSide().addElement(type);
        element.object.setOptions(Constructor.settings.elementDefaults[type.getNativeTypeName()]);
        element.randomizePosition();
        element.setColor(Color.random());
        return element;
    };
    Constructor.prototype.addImage = function (src, callback) {
        Utils.logMethodName();
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
            callback && callback(element);
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
        Utils.logMethodName();
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
                if (side.elements && side.elements.length > 0) {
                    _this.insertSide(side, true);
                }
                else {
                    _this.insertSide(side, clearHistory);
                }
                side.canvas.requestRenderAll();
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
    HistoryList.prototype.isLocked = function () {
        return this.locked === true;
    };
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
    Utils.logMethodName = function () {
        if (Constructor.settings.debug) {
            var obj = { stack: "" };
            var message_1 = "";
            Error.captureStackTrace(obj, this.logMethodName);
            var first_1 = true;
            obj.stack.split("\n").forEach(function (line) {
                if (line.includes("Constructor.") || line.includes("Side2D.") || line.includes("Element2D.")) {
                    line.split(" ").forEach(function (part) {
                        if (part.startsWith("Constructor.") || part.startsWith("Side2D.") || part.startsWith("Element2D.")) {
                            if (!first_1) {
                                message_1 += "< " + part + "\n";
                            }
                            else {
                                message_1 += part + "\n";
                                first_1 = false;
                            }
                        }
                    });
                }
            });
            if (message_1 != "") {
                message_1 = '-----------------------------------------------\n'
                    + message_1
                    + '-----------------------------------------------\n';
                console.log(message_1);
            }
        }
    };
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
    Utils.div = function () {
        return document.createElement(Constants.DIV);
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
var Element2D = (function (_super) {
    __extends(Element2D, _super);
    function Element2D(type, side) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.side = side;
        if (type === ElementType.IMAGE) {
            _this.object = new type.nativeType();
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
        _this.setOptions(_this.object);
        return _this;
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
            _this.layerControl && _this.layerControl.select();
        });
        object.on(Constants.DESELECTED, function () {
            Constructor.instance.onDeselectHandler((_this));
            _this.side.selection = null;
            _this.layerControl && _this.layerControl.deselect();
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
        return this.object.opacity;
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
    Element2D.prototype.getText = function () {
        return this.type === ElementType.TEXT
            ? this.object.text
            : null;
    };
    Element2D.prototype.setText = function (value) {
        if (this.type === ElementType.TEXT) {
            this.object.text = value;
            this.side.canvas.renderAll();
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
            this.side.canvas.requestRenderAll();
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
    Element2D.prototype.toggleLock = function () {
        this.setLocked(!this.isLocked());
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
        return this.object && this.object.lockScalingX;
    };
    Element2D.prototype.toFront = function () {
        this.side.canvas.bringToFront(this.object);
        Utils.arrayMoveToEnd(this.side.elements, this.getIndex());
        this.side.horizontalGuide.sendToBack();
        this.side.verticalGuide.sendToBack();
        this.side.deselect();
        this.side.saveState();
    };
    Element2D.prototype.toBack = function () {
        this.side.canvas.sendToBack(this.object);
        Utils.arrayMoveToStart(this.side.elements, this.getIndex());
        this.side.horizontalGuide.sendToBack();
        this.side.verticalGuide.sendToBack();
        this.side.deselect();
        this.side.saveState();
    };
    Element2D.prototype.bringDown = function () {
        this.shiftLayer(-1);
    };
    Element2D.prototype.bringUp = function () {
        this.shiftLayer(1);
    };
    Element2D.prototype.shiftLayer = function (delta) {
        var index = this.getIndex() + delta;
        if (index < 0) {
            index = 0;
        }
        else if (index > this.side.getLayers().length - 1) {
            index = this.side.getLayers().length - 1;
        }
        this.toLayerInternal(index);
    };
    Element2D.prototype.toLayer = function (index) {
        this.toLayerInternal(this.side.getLayers().length - index - 1);
    };
    Element2D.prototype.toLayerInternal = function (index) {
        this.side.canvas.moveTo(this.object, index + 2);
        this.side.horizontalGuide.sendToBack();
        this.side.verticalGuide.sendToBack();
        Utils.arrayMove(this.side.elements, this.getIndex(), index);
        this.side.deselect();
        this.side.canvas.renderAll();
    };
    Element2D.prototype.isVisible = function () {
        return this.object && this.object.visible == true;
    };
    Element2D.prototype.toggleVisibility = function () {
        this.isVisible() ? this.hide() : this.show();
    };
    Element2D.prototype.hide = function () {
        this.object.visible = false;
        this.object.selectable = false;
        this.side.deselect();
        this.side.canvas.renderAll();
        this.side.saveState();
    };
    Element2D.prototype.show = function () {
        this.object.selectable = true;
        this.side.deselect();
        this.side.canvas.renderAll();
        this.object.visible = true;
        this.side.saveState();
    };
    Element2D.prototype.toDataURL = function (size) {
        if (!size) {
            return this.object.toDataURL({});
        }
        var maxSize = Math.max(this.object.width * this.object.scaleX, this.object.height * this.object.scaleY);
        var multiplier = size / maxSize;
        return this.object.toDataURL({ multiplier: multiplier });
    };
    Element2D.prototype.clone = function () {
        var object = fabric.util.object.clone(this.object);
        var element = new Element2D(this.type, this.side);
        element.object = object;
        return element;
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
    Element2D.prototype.getLayerIndex = function () {
        return this.side.getLayers().indexOf(this);
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
        cornerSize: 8 * window.devicePixelRatio,
        originX: Constants.CENTER,
        originY: Constants.CENTER,
        rotatingPointOffset: 30 * window.devicePixelRatio
    };
    return Element2D;
}(Trigger));
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
    Filter.BRIGHTNESS = new Filter("brightness", new fabric.Image.filters.Brightness({ brightness: 0.1 }));
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
        _this.canvas.on(Constants.AFTER_RENDER, function () {
            Constructor.instance.onElementModificationHandler && Constructor.instance.onElementModificationHandler();
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
    Side2D.prototype.fixElementPosition = function (element) {
        if (!element.object.isOnScreen(true)) {
            this.resetElementPosition(element);
        }
    };
    Side2D.prototype.resetElementPosition = function (element) {
        element.object.left = this.width / 2;
        element.object.top = this.height / 2;
    };
    Side2D.prototype.add = function (element) {
        var _this = this;
        Utils.logMethodName();
        element.side = this;
        this.elements.push(element);
        this.canvas.add(element.object);
        setTimeout(function () { return _this.fixElementPosition(element); }, 200);
        element.fitIntoMargins();
        element.object.setCoords();
        this.canvas.requestRenderAll();
        setTimeout(function () { return _this.canvas.renderAll(); }, null);
        return element;
    };
    Side2D.prototype.addElement = function (type) {
        Utils.logMethodName();
        return this.add(new Element2D(type, this));
    };
    Side2D.prototype.getLayers = function () {
        var layers = [];
        for (var i = 0; i < this.elements.length; i++) {
            layers.unshift(this.elements[i]);
        }
        return layers;
    };
    Side2D.prototype.moveLayer = function (from, to) {
        var element = this.getLayers()[from];
        element.toLayer(to);
        this.changed();
    };
    Side2D.prototype.remove = function (element) {
        this.canvas.remove(element.object);
        this.elements.splice(this.elements.indexOf(element), 1);
        this.deselect();
        this.canvas.renderAll();
        this.changed();
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
            var json = '{"objects":' + JSON.stringify(state.objects) + '}';
            var objects = Side2DStateObjects.parse(json);
            side.setState(objects);
        }
        return side;
    };
    Side2D.prototype.clear = function () {
        Utils.logMethodName();
        this.elements = [];
        this.selection = null;
        this.canvas.clear();
        this.canvas.add(this.horizontalGuide);
        this.canvas.add(this.verticalGuide);
        this.changed();
    };
    Side2D.prototype.removeElements = function () {
        Utils.logMethodName();
        while (this.elements.length) {
            this.elements[0].remove();
        }
        this.saveState();
    };
    Side2D.prototype.addImageFromObjectOptions = function (objectOptions) {
        var _this = this;
        Utils.logMethodName();
        var object = objectOptions.toObject();
        var side = this;
        fabric.Image.fromObject(object, function (image) {
            if (image === null) {
                return;
            }
            var element = new Element2D(ElementType.IMAGE);
            element.side = _this;
            element.object = image;
            element.setOptions(element.object);
            side.add(element);
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
    };
    Side2D.prototype.setState = function (state) {
        var _this = this;
        Utils.logMethodName();
        this.history.lock();
        this.clear();
        var _loop_2 = function (objectOptions) {
            if (objectOptions.type === 'image') {
                this_2.addImageFromObjectOptions(objectOptions);
            }
            else {
                var element_1 = Element2D.prototype.deserialize(objectOptions);
                this_2.add(element_1);
                element_1.object.dirty = true;
                if (element_1.type === ElementType.TEXT) {
                    setTimeout(function () { return element_1.setFontFamily(element_1.getFontFamily()); }, 0);
                }
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = state.objects; _i < _a.length; _i++) {
            var objectOptions = _a[_i];
            _loop_2(objectOptions);
        }
        this.saveToLocalStorage(state);
        this.canvas.requestRenderAll();
        setTimeout(function () {
            _this.history.unlock();
        }, 50);
    };
    Side2D.prototype.getLocalStorageKey = function () {
        return Constructor.settings.localStorage.keyPrefix + this.getIndex();
    };
    Side2D.prototype.saveToLocalStorage = function (state) {
        if (!this.history.isLocked()) {
            Utils.logMethodName();
            localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(state));
        }
    };
    Side2D.prototype.loadFromLocalStorage = function () {
        if (Constructor.settings.localStorage.enabled && !Constructor.instance.isExplicitlyLoaded) {
            Utils.logMethodName();
            var key = this.getLocalStorageKey();
            var state = localStorage.getItem(key);
            if (state) {
                var objects = Side2DStateObjects.parse(state);
                this.setState(objects);
            }
        }
    };
    Side2D.prototype.saveState = function () {
        Utils.logMethodName();
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
            this.history.lock();
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
            this.history.unlock();
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
var UIControl = (function (_super) {
    __extends(UIControl, _super);
    function UIControl() {
        var _this = _super.call(this, Utils.div()) || this;
        _this.children = [];
        _this.c = Constructor.instance;
        _this.container.className = _this.getClassName();
        return _this;
    }
    UIControl.prototype.update = function () {
    };
    UIControl.prototype.getElement = function () {
        return this.container;
    };
    UIControl.prototype.appendChild = function (control) {
        this.children.push(control);
        this.container.appendChild(control.container);
        return this;
    };
    UIControl.prototype.append = function () {
        var _this = this;
        var controls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            controls[_i] = arguments[_i];
        }
        controls.forEach(function (control) { return _this.appendChild(control); });
        return this;
    };
    return UIControl;
}(View));
var TriggeredUIControl = (function (_super) {
    __extends(TriggeredUIControl, _super);
    function TriggeredUIControl(trigger) {
        var _this = _super.call(this) || this;
        trigger.onChange(function () { return _this.update(); });
        trigger.onVisibilityChange(function () { return _this.updateVisibility(); });
        _this.trigger = trigger;
        return _this;
    }
    return TriggeredUIControl;
}(UIControl));
var Icon;
(function (Icon) {
    Icon["_500PX"] = "<i class=\"fa fa-500px\"></i>";
    Icon["ADDRESS_BOOK"] = "<i class=\"fa fa-address-book\"></i>";
    Icon["ADDRESS_BOOK_O"] = "<i class=\"fa fa-address-book-o\"></i>";
    Icon["ADDRESS_CARD"] = "<i class=\"fa fa-address-card\"></i>";
    Icon["ADDRESS_CARD_O"] = "<i class=\"fa fa-address-card-o\"></i>";
    Icon["ADJUST"] = "<i class=\"fa fa-adjust\"></i>";
    Icon["ADN"] = "<i class=\"fa fa-adn\"></i>";
    Icon["ALIGN_CENTER"] = "<i class=\"fa fa-align-center\"></i>";
    Icon["ALIGN_JUSTIFY"] = "<i class=\"fa fa-align-justify\"></i>";
    Icon["ALIGN_LEFT"] = "<i class=\"fa fa-align-left\"></i>";
    Icon["ALIGN_RIGHT"] = "<i class=\"fa fa-align-right\"></i>";
    Icon["AMAZON"] = "<i class=\"fa fa-amazon\"></i>";
    Icon["AMBULANCE"] = "<i class=\"fa fa-ambulance\"></i>";
    Icon["AMERICAN_SIGN_LANGUAGE_INTERPRETING"] = "<i class=\"fa fa-american-sign-language-interpreting\"></i>";
    Icon["ANCHOR"] = "<i class=\"fa fa-anchor\"></i>";
    Icon["ANDROID"] = "<i class=\"fa fa-android\"></i>";
    Icon["ANGELLIST"] = "<i class=\"fa fa-angellist\"></i>";
    Icon["ANGLE_DOUBLE_DOWN"] = "<i class=\"fa fa-angle-double-down\"></i>";
    Icon["ANGLE_DOUBLE_LEFT"] = "<i class=\"fa fa-angle-double-left\"></i>";
    Icon["ANGLE_DOUBLE_RIGHT"] = "<i class=\"fa fa-angle-double-right\"></i>";
    Icon["ANGLE_DOUBLE_UP"] = "<i class=\"fa fa-angle-double-up\"></i>";
    Icon["ANGLE_DOWN"] = "<i class=\"fa fa-angle-down\"></i>";
    Icon["ANGLE_LEFT"] = "<i class=\"fa fa-angle-left\"></i>";
    Icon["ANGLE_RIGHT"] = "<i class=\"fa fa-angle-right\"></i>";
    Icon["ANGLE_UP"] = "<i class=\"fa fa-angle-up\"></i>";
    Icon["APPLE"] = "<i class=\"fa fa-apple\"></i>";
    Icon["ARCHIVE"] = "<i class=\"fa fa-archive\"></i>";
    Icon["AREA_CHART"] = "<i class=\"fa fa-area-chart\"></i>";
    Icon["ARROW_CIRCLE_DOWN"] = "<i class=\"fa fa-arrow-circle-down\"></i>";
    Icon["ARROW_CIRCLE_LEFT"] = "<i class=\"fa fa-arrow-circle-left\"></i>";
    Icon["ARROW_CIRCLE_O_DOWN"] = "<i class=\"fa fa-arrow-circle-o-down\"></i>";
    Icon["ARROW_CIRCLE_O_LEFT"] = "<i class=\"fa fa-arrow-circle-o-left\"></i>";
    Icon["ARROW_CIRCLE_O_RIGHT"] = "<i class=\"fa fa-arrow-circle-o-right\"></i>";
    Icon["ARROW_CIRCLE_O_UP"] = "<i class=\"fa fa-arrow-circle-o-up\"></i>";
    Icon["ARROW_CIRCLE_RIGHT"] = "<i class=\"fa fa-arrow-circle-right\"></i>";
    Icon["ARROW_CIRCLE_UP"] = "<i class=\"fa fa-arrow-circle-up\"></i>";
    Icon["ARROW_DOWN"] = "<i class=\"fa fa-arrow-down\"></i>";
    Icon["ARROW_LEFT"] = "<i class=\"fa fa-arrow-left\"></i>";
    Icon["ARROW_RIGHT"] = "<i class=\"fa fa-arrow-right\"></i>";
    Icon["ARROW_UP"] = "<i class=\"fa fa-arrow-up\"></i>";
    Icon["ARROWS"] = "<i class=\"fa fa-arrows\"></i>";
    Icon["ARROWS_ALT"] = "<i class=\"fa fa-arrows-alt\"></i>";
    Icon["ARROWS_H"] = "<i class=\"fa fa-arrows-h\"></i>";
    Icon["ARROWS_V"] = "<i class=\"fa fa-arrows-v\"></i>";
    Icon["ASL_INTERPRETING"] = "<i class=\"fa fa-asl-interpreting (alias)\"></i>";
    Icon["ASSISTIVE_LISTENING_SYSTEMS"] = "<i class=\"fa fa-assistive-listening-systems\"></i>";
    Icon["ASTERISK"] = "<i class=\"fa fa-asterisk\"></i>";
    Icon["AT"] = "<i class=\"fa fa-at\"></i>";
    Icon["AUDIO_DESCRIPTION"] = "<i class=\"fa fa-audio-description\"></i>";
    Icon["AUTOMOBILE"] = "<i class=\"fa fa-automobile (alias)\"></i>";
    Icon["BACKWARD"] = "<i class=\"fa fa-backward\"></i>";
    Icon["BALANCE_SCALE"] = "<i class=\"fa fa-balance-scale\"></i>";
    Icon["BAN"] = "<i class=\"fa fa-ban\"></i>";
    Icon["BANDCAMP"] = "<i class=\"fa fa-bandcamp\"></i>";
    Icon["BANK"] = "<i class=\"fa fa-bank (alias)\"></i>";
    Icon["BAR_CHART"] = "<i class=\"fa fa-bar-chart\"></i>";
    Icon["BAR_CHART_O"] = "<i class=\"fa fa-bar-chart-o (alias)\"></i>";
    Icon["BARCODE"] = "<i class=\"fa fa-barcode\"></i>";
    Icon["BARS"] = "<i class=\"fa fa-bars\"></i>";
    Icon["BATH"] = "<i class=\"fa fa-bath\"></i>";
    Icon["BATHTUB"] = "<i class=\"fa fa-bathtub (alias)\"></i>";
    Icon["BATTERY"] = "<i class=\"fa fa-battery (alias)\"></i>";
    Icon["BATTERY_0"] = "<i class=\"fa fa-battery-0 (alias)\"></i>";
    Icon["BATTERY_1"] = "<i class=\"fa fa-battery-1 (alias)\"></i>";
    Icon["BATTERY_2"] = "<i class=\"fa fa-battery-2 (alias)\"></i>";
    Icon["BATTERY_3"] = "<i class=\"fa fa-battery-3 (alias)\"></i>";
    Icon["BATTERY_4"] = "<i class=\"fa fa-battery-4 (alias)\"></i>";
    Icon["BATTERY_EMPTY"] = "<i class=\"fa fa-battery-empty\"></i>";
    Icon["BATTERY_FULL"] = "<i class=\"fa fa-battery-full\"></i>";
    Icon["BATTERY_HALF"] = "<i class=\"fa fa-battery-half\"></i>";
    Icon["BATTERY_QUARTER"] = "<i class=\"fa fa-battery-quarter\"></i>";
    Icon["BATTERY_THREE_QUARTERS"] = "<i class=\"fa fa-battery-three-quarters\"></i>";
    Icon["BED"] = "<i class=\"fa fa-bed\"></i>";
    Icon["BEER"] = "<i class=\"fa fa-beer\"></i>";
    Icon["BEHANCE"] = "<i class=\"fa fa-behance\"></i>";
    Icon["BEHANCE_SQUARE"] = "<i class=\"fa fa-behance-square\"></i>";
    Icon["BELL"] = "<i class=\"fa fa-bell\"></i>";
    Icon["BELL_O"] = "<i class=\"fa fa-bell-o\"></i>";
    Icon["BELL_SLASH"] = "<i class=\"fa fa-bell-slash\"></i>";
    Icon["BELL_SLASH_O"] = "<i class=\"fa fa-bell-slash-o\"></i>";
    Icon["BICYCLE"] = "<i class=\"fa fa-bicycle\"></i>";
    Icon["BINOCULARS"] = "<i class=\"fa fa-binoculars\"></i>";
    Icon["BIRTHDAY_CAKE"] = "<i class=\"fa fa-birthday-cake\"></i>";
    Icon["BITBUCKET"] = "<i class=\"fa fa-bitbucket\"></i>";
    Icon["BITBUCKET_SQUARE"] = "<i class=\"fa fa-bitbucket-square\"></i>";
    Icon["BITCOIN"] = "<i class=\"fa fa-bitcoin (alias)\"></i>";
    Icon["BLACK_TIE"] = "<i class=\"fa fa-black-tie\"></i>";
    Icon["BLIND"] = "<i class=\"fa fa-blind\"></i>";
    Icon["BLUETOOTH"] = "<i class=\"fa fa-bluetooth\"></i>";
    Icon["BLUETOOTH_B"] = "<i class=\"fa fa-bluetooth-b\"></i>";
    Icon["BOLD"] = "<i class=\"fa fa-bold\"></i>";
    Icon["BOLT"] = "<i class=\"fa fa-bolt\"></i>";
    Icon["BOMB"] = "<i class=\"fa fa-bomb\"></i>";
    Icon["BOOK"] = "<i class=\"fa fa-book\"></i>";
    Icon["BOOKMARK"] = "<i class=\"fa fa-bookmark\"></i>";
    Icon["BOOKMARK_O"] = "<i class=\"fa fa-bookmark-o\"></i>";
    Icon["BRAILLE"] = "<i class=\"fa fa-braille\"></i>";
    Icon["BRIEFCASE"] = "<i class=\"fa fa-briefcase\"></i>";
    Icon["BTC"] = "<i class=\"fa fa-btc\"></i>";
    Icon["BUG"] = "<i class=\"fa fa-bug\"></i>";
    Icon["BUILDING"] = "<i class=\"fa fa-building\"></i>";
    Icon["BUILDING_O"] = "<i class=\"fa fa-building-o\"></i>";
    Icon["BULLHORN"] = "<i class=\"fa fa-bullhorn\"></i>";
    Icon["BULLSEYE"] = "<i class=\"fa fa-bullseye\"></i>";
    Icon["BUS"] = "<i class=\"fa fa-bus\"></i>";
    Icon["BUYSELLADS"] = "<i class=\"fa fa-buysellads\"></i>";
    Icon["CAB"] = "<i class=\"fa fa-cab (alias)\"></i>";
    Icon["CALCULATOR"] = "<i class=\"fa fa-calculator\"></i>";
    Icon["CALENDAR"] = "<i class=\"fa fa-calendar\"></i>";
    Icon["CALENDAR_CHECK_O"] = "<i class=\"fa fa-calendar-check-o\"></i>";
    Icon["CALENDAR_MINUS_O"] = "<i class=\"fa fa-calendar-minus-o\"></i>";
    Icon["CALENDAR_O"] = "<i class=\"fa fa-calendar-o\"></i>";
    Icon["CALENDAR_PLUS_O"] = "<i class=\"fa fa-calendar-plus-o\"></i>";
    Icon["CALENDAR_TIMES_O"] = "<i class=\"fa fa-calendar-times-o\"></i>";
    Icon["CAMERA"] = "<i class=\"fa fa-camera\"></i>";
    Icon["CAMERA_RETRO"] = "<i class=\"fa fa-camera-retro\"></i>";
    Icon["CAR"] = "<i class=\"fa fa-car\"></i>";
    Icon["CARET_DOWN"] = "<i class=\"fa fa-caret-down\"></i>";
    Icon["CARET_LEFT"] = "<i class=\"fa fa-caret-left\"></i>";
    Icon["CARET_RIGHT"] = "<i class=\"fa fa-caret-right\"></i>";
    Icon["CARET_SQUARE_O_DOWN"] = "<i class=\"fa fa-caret-square-o-down\"></i>";
    Icon["CARET_SQUARE_O_LEFT"] = "<i class=\"fa fa-caret-square-o-left\"></i>";
    Icon["CARET_SQUARE_O_RIGHT"] = "<i class=\"fa fa-caret-square-o-right\"></i>";
    Icon["CARET_SQUARE_O_UP"] = "<i class=\"fa fa-caret-square-o-up\"></i>";
    Icon["CARET_UP"] = "<i class=\"fa fa-caret-up\"></i>";
    Icon["CART_ARROW_DOWN"] = "<i class=\"fa fa-cart-arrow-down\"></i>";
    Icon["CART_PLUS"] = "<i class=\"fa fa-cart-plus\"></i>";
    Icon["CC"] = "<i class=\"fa fa-cc\"></i>";
    Icon["CC_AMEX"] = "<i class=\"fa fa-cc-amex\"></i>";
    Icon["CC_DINERS_CLUB"] = "<i class=\"fa fa-cc-diners-club\"></i>";
    Icon["CC_DISCOVER"] = "<i class=\"fa fa-cc-discover\"></i>";
    Icon["CC_JCB"] = "<i class=\"fa fa-cc-jcb\"></i>";
    Icon["CC_MASTERCARD"] = "<i class=\"fa fa-cc-mastercard\"></i>";
    Icon["CC_PAYPAL"] = "<i class=\"fa fa-cc-paypal\"></i>";
    Icon["CC_STRIPE"] = "<i class=\"fa fa-cc-stripe\"></i>";
    Icon["CC_VISA"] = "<i class=\"fa fa-cc-visa\"></i>";
    Icon["CERTIFICATE"] = "<i class=\"fa fa-certificate\"></i>";
    Icon["CHAIN"] = "<i class=\"fa fa-chain (alias)\"></i>";
    Icon["CHAIN_BROKEN"] = "<i class=\"fa fa-chain-broken\"></i>";
    Icon["CHECK"] = "<i class=\"fa fa-check\"></i>";
    Icon["CHECK_CIRCLE"] = "<i class=\"fa fa-check-circle\"></i>";
    Icon["CHECK_CIRCLE_O"] = "<i class=\"fa fa-check-circle-o\"></i>";
    Icon["CHECK_SQUARE"] = "<i class=\"fa fa-check-square\"></i>";
    Icon["CHECK_SQUARE_O"] = "<i class=\"fa fa-check-square-o\"></i>";
    Icon["CHEVRON_CIRCLE_DOWN"] = "<i class=\"fa fa-chevron-circle-down\"></i>";
    Icon["CHEVRON_CIRCLE_LEFT"] = "<i class=\"fa fa-chevron-circle-left\"></i>";
    Icon["CHEVRON_CIRCLE_RIGHT"] = "<i class=\"fa fa-chevron-circle-right\"></i>";
    Icon["CHEVRON_CIRCLE_UP"] = "<i class=\"fa fa-chevron-circle-up\"></i>";
    Icon["CHEVRON_DOWN"] = "<i class=\"fa fa-chevron-down\"></i>";
    Icon["CHEVRON_LEFT"] = "<i class=\"fa fa-chevron-left\"></i>";
    Icon["CHEVRON_RIGHT"] = "<i class=\"fa fa-chevron-right\"></i>";
    Icon["CHEVRON_UP"] = "<i class=\"fa fa-chevron-up\"></i>";
    Icon["CHILD"] = "<i class=\"fa fa-child\"></i>";
    Icon["CHROME"] = "<i class=\"fa fa-chrome\"></i>";
    Icon["CIRCLE"] = "<i class=\"fa fa-circle\"></i>";
    Icon["CIRCLE_O"] = "<i class=\"fa fa-circle-o\"></i>";
    Icon["CIRCLE_O_NOTCH"] = "<i class=\"fa fa-circle-o-notch\"></i>";
    Icon["CIRCLE_THIN"] = "<i class=\"fa fa-circle-thin\"></i>";
    Icon["CLIPBOARD"] = "<i class=\"fa fa-clipboard\"></i>";
    Icon["CLOCK_O"] = "<i class=\"fa fa-clock-o\"></i>";
    Icon["CLONE"] = "<i class=\"fa fa-clone\"></i>";
    Icon["CLOSE"] = "<i class=\"fa fa-close (alias)\"></i>";
    Icon["CLOUD"] = "<i class=\"fa fa-cloud\"></i>";
    Icon["CLOUD_DOWNLOAD"] = "<i class=\"fa fa-cloud-download\"></i>";
    Icon["CLOUD_UPLOAD"] = "<i class=\"fa fa-cloud-upload\"></i>";
    Icon["CNY"] = "<i class=\"fa fa-cny (alias)\"></i>";
    Icon["CODE"] = "<i class=\"fa fa-code\"></i>";
    Icon["CODE_FORK"] = "<i class=\"fa fa-code-fork\"></i>";
    Icon["CODEPEN"] = "<i class=\"fa fa-codepen\"></i>";
    Icon["CODIEPIE"] = "<i class=\"fa fa-codiepie\"></i>";
    Icon["COFFEE"] = "<i class=\"fa fa-coffee\"></i>";
    Icon["COG"] = "<i class=\"fa fa-cog\"></i>";
    Icon["COGS"] = "<i class=\"fa fa-cogs\"></i>";
    Icon["COLUMNS"] = "<i class=\"fa fa-columns\"></i>";
    Icon["COMMENT"] = "<i class=\"fa fa-comment\"></i>";
    Icon["COMMENT_O"] = "<i class=\"fa fa-comment-o\"></i>";
    Icon["COMMENTING"] = "<i class=\"fa fa-commenting\"></i>";
    Icon["COMMENTING_O"] = "<i class=\"fa fa-commenting-o\"></i>";
    Icon["COMMENTS"] = "<i class=\"fa fa-comments\"></i>";
    Icon["COMMENTS_O"] = "<i class=\"fa fa-comments-o\"></i>";
    Icon["COMPASS"] = "<i class=\"fa fa-compass\"></i>";
    Icon["COMPRESS"] = "<i class=\"fa fa-compress\"></i>";
    Icon["CONNECTDEVELOP"] = "<i class=\"fa fa-connectdevelop\"></i>";
    Icon["CONTAO"] = "<i class=\"fa fa-contao\"></i>";
    Icon["COPY"] = "<i class=\"fa fa-copy (alias)\"></i>";
    Icon["COPYRIGHT"] = "<i class=\"fa fa-copyright\"></i>";
    Icon["CREATIVE_COMMONS"] = "<i class=\"fa fa-creative-commons\"></i>";
    Icon["CREDIT_CARD"] = "<i class=\"fa fa-credit-card\"></i>";
    Icon["CREDIT_CARD_ALT"] = "<i class=\"fa fa-credit-card-alt\"></i>";
    Icon["CROP"] = "<i class=\"fa fa-crop\"></i>";
    Icon["CROSSHAIRS"] = "<i class=\"fa fa-crosshairs\"></i>";
    Icon["CSS3"] = "<i class=\"fa fa-css3\"></i>";
    Icon["CUBE"] = "<i class=\"fa fa-cube\"></i>";
    Icon["CUBES"] = "<i class=\"fa fa-cubes\"></i>";
    Icon["CUT"] = "<i class=\"fa fa-cut (alias)\"></i>";
    Icon["CUTLERY"] = "<i class=\"fa fa-cutlery\"></i>";
    Icon["DASHBOARD"] = "<i class=\"fa fa-dashboard (alias)\"></i>";
    Icon["DASHCUBE"] = "<i class=\"fa fa-dashcube\"></i>";
    Icon["DATABASE"] = "<i class=\"fa fa-database\"></i>";
    Icon["DEAF"] = "<i class=\"fa fa-deaf\"></i>";
    Icon["DEAFNESS"] = "<i class=\"fa fa-deafness (alias)\"></i>";
    Icon["DEDENT"] = "<i class=\"fa fa-dedent (alias)\"></i>";
    Icon["DELICIOUS"] = "<i class=\"fa fa-delicious\"></i>";
    Icon["DESKTOP"] = "<i class=\"fa fa-desktop\"></i>";
    Icon["DEVIANTART"] = "<i class=\"fa fa-deviantart\"></i>";
    Icon["DIAMOND"] = "<i class=\"fa fa-diamond\"></i>";
    Icon["DIGG"] = "<i class=\"fa fa-digg\"></i>";
    Icon["DOLLAR"] = "<i class=\"fa fa-dollar (alias)\"></i>";
    Icon["DOT_CIRCLE_O"] = "<i class=\"fa fa-dot-circle-o\"></i>";
    Icon["DOWNLOAD"] = "<i class=\"fa fa-download\"></i>";
    Icon["DRIBBBLE"] = "<i class=\"fa fa-dribbble\"></i>";
    Icon["DRIVERS_LICENSE"] = "<i class=\"fa fa-drivers-license (alias)\"></i>";
    Icon["DRIVERS_LICENSE_O"] = "<i class=\"fa fa-drivers-license-o (alias)\"></i>";
    Icon["DROPBOX"] = "<i class=\"fa fa-dropbox\"></i>";
    Icon["DRUPAL"] = "<i class=\"fa fa-drupal\"></i>";
    Icon["EDGE"] = "<i class=\"fa fa-edge\"></i>";
    Icon["EDIT"] = "<i class=\"fa fa-edit (alias)\"></i>";
    Icon["EERCAST"] = "<i class=\"fa fa-eercast\"></i>";
    Icon["EJECT"] = "<i class=\"fa fa-eject\"></i>";
    Icon["ELLIPSIS_H"] = "<i class=\"fa fa-ellipsis-h\"></i>";
    Icon["ELLIPSIS_V"] = "<i class=\"fa fa-ellipsis-v\"></i>";
    Icon["EMPIRE"] = "<i class=\"fa fa-empire\"></i>";
    Icon["ENVELOPE"] = "<i class=\"fa fa-envelope\"></i>";
    Icon["ENVELOPE_O"] = "<i class=\"fa fa-envelope-o\"></i>";
    Icon["ENVELOPE_OPEN"] = "<i class=\"fa fa-envelope-open\"></i>";
    Icon["ENVELOPE_OPEN_O"] = "<i class=\"fa fa-envelope-open-o\"></i>";
    Icon["ENVELOPE_SQUARE"] = "<i class=\"fa fa-envelope-square\"></i>";
    Icon["ENVIRA"] = "<i class=\"fa fa-envira\"></i>";
    Icon["ERASER"] = "<i class=\"fa fa-eraser\"></i>";
    Icon["ETSY"] = "<i class=\"fa fa-etsy\"></i>";
    Icon["EUR"] = "<i class=\"fa fa-eur\"></i>";
    Icon["EURO"] = "<i class=\"fa fa-euro (alias)\"></i>";
    Icon["EXCHANGE"] = "<i class=\"fa fa-exchange\"></i>";
    Icon["EXCLAMATION"] = "<i class=\"fa fa-exclamation\"></i>";
    Icon["EXCLAMATION_CIRCLE"] = "<i class=\"fa fa-exclamation-circle\"></i>";
    Icon["EXCLAMATION_TRIANGLE"] = "<i class=\"fa fa-exclamation-triangle\"></i>";
    Icon["EXPAND"] = "<i class=\"fa fa-expand\"></i>";
    Icon["EXPEDITEDSSL"] = "<i class=\"fa fa-expeditedssl\"></i>";
    Icon["EXTERNAL_LINK"] = "<i class=\"fa fa-external-link\"></i>";
    Icon["EXTERNAL_LINK_SQUARE"] = "<i class=\"fa fa-external-link-square\"></i>";
    Icon["EYE"] = "<i class=\"fa fa-eye\"></i>";
    Icon["EYE_SLASH"] = "<i class=\"fa fa-eye-slash\"></i>";
    Icon["EYEDROPPER"] = "<i class=\"fa fa-eyedropper\"></i>";
    Icon["FA"] = "<i class=\"fa fa-fa (alias)\"></i>";
    Icon["FACEBOOK"] = "<i class=\"fa fa-facebook\"></i>";
    Icon["FACEBOOK_F"] = "<i class=\"fa fa-facebook-f (alias)\"></i>";
    Icon["FACEBOOK_OFFICIAL"] = "<i class=\"fa fa-facebook-official\"></i>";
    Icon["FACEBOOK_SQUARE"] = "<i class=\"fa fa-facebook-square\"></i>";
    Icon["FAST_BACKWARD"] = "<i class=\"fa fa-fast-backward\"></i>";
    Icon["FAST_FORWARD"] = "<i class=\"fa fa-fast-forward\"></i>";
    Icon["FAX"] = "<i class=\"fa fa-fax\"></i>";
    Icon["FEED"] = "<i class=\"fa fa-feed (alias)\"></i>";
    Icon["FEMALE"] = "<i class=\"fa fa-female\"></i>";
    Icon["FIGHTER_JET"] = "<i class=\"fa fa-fighter-jet\"></i>";
    Icon["FILE"] = "<i class=\"fa fa-file\"></i>";
    Icon["FILE_ARCHIVE_O"] = "<i class=\"fa fa-file-archive-o\"></i>";
    Icon["FILE_AUDIO_O"] = "<i class=\"fa fa-file-audio-o\"></i>";
    Icon["FILE_CODE_O"] = "<i class=\"fa fa-file-code-o\"></i>";
    Icon["FILE_EXCEL_O"] = "<i class=\"fa fa-file-excel-o\"></i>";
    Icon["FILE_IMAGE_O"] = "<i class=\"fa fa-file-image-o\"></i>";
    Icon["FILE_MOVIE_O"] = "<i class=\"fa fa-file-movie-o (alias)\"></i>";
    Icon["FILE_O"] = "<i class=\"fa fa-file-o\"></i>";
    Icon["FILE_PDF_O"] = "<i class=\"fa fa-file-pdf-o\"></i>";
    Icon["FILE_PHOTO_O"] = "<i class=\"fa fa-file-photo-o (alias)\"></i>";
    Icon["FILE_PICTURE_O"] = "<i class=\"fa fa-file-picture-o (alias)\"></i>";
    Icon["FILE_POWERPOINT_O"] = "<i class=\"fa fa-file-powerpoint-o\"></i>";
    Icon["FILE_SOUND_O"] = "<i class=\"fa fa-file-sound-o (alias)\"></i>";
    Icon["FILE_TEXT"] = "<i class=\"fa fa-file-text\"></i>";
    Icon["FILE_TEXT_O"] = "<i class=\"fa fa-file-text-o\"></i>";
    Icon["FILE_VIDEO_O"] = "<i class=\"fa fa-file-video-o\"></i>";
    Icon["FILE_WORD_O"] = "<i class=\"fa fa-file-word-o\"></i>";
    Icon["FILE_ZIP_O"] = "<i class=\"fa fa-file-zip-o (alias)\"></i>";
    Icon["FILES_O"] = "<i class=\"fa fa-files-o\"></i>";
    Icon["FILM"] = "<i class=\"fa fa-film\"></i>";
    Icon["FILTER"] = "<i class=\"fa fa-filter\"></i>";
    Icon["FIRE"] = "<i class=\"fa fa-fire\"></i>";
    Icon["FIRE_EXTINGUISHER"] = "<i class=\"fa fa-fire-extinguisher\"></i>";
    Icon["FIREFOX"] = "<i class=\"fa fa-firefox\"></i>";
    Icon["FIRST_ORDER"] = "<i class=\"fa fa-first-order\"></i>";
    Icon["FLAG"] = "<i class=\"fa fa-flag\"></i>";
    Icon["FLAG_CHECKERED"] = "<i class=\"fa fa-flag-checkered\"></i>";
    Icon["FLAG_O"] = "<i class=\"fa fa-flag-o\"></i>";
    Icon["FLASH"] = "<i class=\"fa fa-flash (alias)\"></i>";
    Icon["FLASK"] = "<i class=\"fa fa-flask\"></i>";
    Icon["FLICKR"] = "<i class=\"fa fa-flickr\"></i>";
    Icon["FLOPPY_O"] = "<i class=\"fa fa-floppy-o\"></i>";
    Icon["FOLDER"] = "<i class=\"fa fa-folder\"></i>";
    Icon["FOLDER_O"] = "<i class=\"fa fa-folder-o\"></i>";
    Icon["FOLDER_OPEN"] = "<i class=\"fa fa-folder-open\"></i>";
    Icon["FOLDER_OPEN_O"] = "<i class=\"fa fa-folder-open-o\"></i>";
    Icon["FONT"] = "<i class=\"fa fa-font\"></i>";
    Icon["FONT_AWESOME"] = "<i class=\"fa fa-font-awesome\"></i>";
    Icon["FONTICONS"] = "<i class=\"fa fa-fonticons\"></i>";
    Icon["FORT_AWESOME"] = "<i class=\"fa fa-fort-awesome\"></i>";
    Icon["FORUMBEE"] = "<i class=\"fa fa-forumbee\"></i>";
    Icon["FORWARD"] = "<i class=\"fa fa-forward\"></i>";
    Icon["FOURSQUARE"] = "<i class=\"fa fa-foursquare\"></i>";
    Icon["FREE_CODE_CAMP"] = "<i class=\"fa fa-free-code-camp\"></i>";
    Icon["FROWN_O"] = "<i class=\"fa fa-frown-o\"></i>";
    Icon["FUTBOL_O"] = "<i class=\"fa fa-futbol-o\"></i>";
    Icon["GAMEPAD"] = "<i class=\"fa fa-gamepad\"></i>";
    Icon["GAVEL"] = "<i class=\"fa fa-gavel\"></i>";
    Icon["GBP"] = "<i class=\"fa fa-gbp\"></i>";
    Icon["GE"] = "<i class=\"fa fa-ge (alias)\"></i>";
    Icon["GEAR"] = "<i class=\"fa fa-gear (alias)\"></i>";
    Icon["GEARS"] = "<i class=\"fa fa-gears (alias)\"></i>";
    Icon["GENDERLESS"] = "<i class=\"fa fa-genderless\"></i>";
    Icon["GET_POCKET"] = "<i class=\"fa fa-get-pocket\"></i>";
    Icon["GG"] = "<i class=\"fa fa-gg\"></i>";
    Icon["GG_CIRCLE"] = "<i class=\"fa fa-gg-circle\"></i>";
    Icon["GIFT"] = "<i class=\"fa fa-gift\"></i>";
    Icon["GIT"] = "<i class=\"fa fa-git\"></i>";
    Icon["GIT_SQUARE"] = "<i class=\"fa fa-git-square\"></i>";
    Icon["GITHUB"] = "<i class=\"fa fa-github\"></i>";
    Icon["GITHUB_ALT"] = "<i class=\"fa fa-github-alt\"></i>";
    Icon["GITHUB_SQUARE"] = "<i class=\"fa fa-github-square\"></i>";
    Icon["GITLAB"] = "<i class=\"fa fa-gitlab\"></i>";
    Icon["GITTIP"] = "<i class=\"fa fa-gittip (alias)\"></i>";
    Icon["GLASS"] = "<i class=\"fa fa-glass\"></i>";
    Icon["GLIDE"] = "<i class=\"fa fa-glide\"></i>";
    Icon["GLIDE_G"] = "<i class=\"fa fa-glide-g\"></i>";
    Icon["GLOBE"] = "<i class=\"fa fa-globe\"></i>";
    Icon["GOOGLE"] = "<i class=\"fa fa-google\"></i>";
    Icon["GOOGLE_PLUS"] = "<i class=\"fa fa-google-plus\"></i>";
    Icon["GOOGLE_PLUS_CIRCLE"] = "<i class=\"fa fa-google-plus-circle (alias)\"></i>";
    Icon["GOOGLE_PLUS_OFFICIAL"] = "<i class=\"fa fa-google-plus-official\"></i>";
    Icon["GOOGLE_PLUS_SQUARE"] = "<i class=\"fa fa-google-plus-square\"></i>";
    Icon["GOOGLE_WALLET"] = "<i class=\"fa fa-google-wallet\"></i>";
    Icon["GRADUATION_CAP"] = "<i class=\"fa fa-graduation-cap\"></i>";
    Icon["GRATIPAY"] = "<i class=\"fa fa-gratipay\"></i>";
    Icon["GRAV"] = "<i class=\"fa fa-grav\"></i>";
    Icon["GROUP"] = "<i class=\"fa fa-group (alias)\"></i>";
    Icon["H_SQUARE"] = "<i class=\"fa fa-h-square\"></i>";
    Icon["HACKER_NEWS"] = "<i class=\"fa fa-hacker-news\"></i>";
    Icon["HAND_GRAB_O"] = "<i class=\"fa fa-hand-grab-o (alias)\"></i>";
    Icon["HAND_LIZARD_O"] = "<i class=\"fa fa-hand-lizard-o\"></i>";
    Icon["HAND_O_DOWN"] = "<i class=\"fa fa-hand-o-down\"></i>";
    Icon["HAND_O_LEFT"] = "<i class=\"fa fa-hand-o-left\"></i>";
    Icon["HAND_O_RIGHT"] = "<i class=\"fa fa-hand-o-right\"></i>";
    Icon["HAND_O_UP"] = "<i class=\"fa fa-hand-o-up\"></i>";
    Icon["HAND_PAPER_O"] = "<i class=\"fa fa-hand-paper-o\"></i>";
    Icon["HAND_PEACE_O"] = "<i class=\"fa fa-hand-peace-o\"></i>";
    Icon["HAND_POINTER_O"] = "<i class=\"fa fa-hand-pointer-o\"></i>";
    Icon["HAND_ROCK_O"] = "<i class=\"fa fa-hand-rock-o\"></i>";
    Icon["HAND_SCISSORS_O"] = "<i class=\"fa fa-hand-scissors-o\"></i>";
    Icon["HAND_SPOCK_O"] = "<i class=\"fa fa-hand-spock-o\"></i>";
    Icon["HAND_STOP_O"] = "<i class=\"fa fa-hand-stop-o (alias)\"></i>";
    Icon["HANDSHAKE_O"] = "<i class=\"fa fa-handshake-o\"></i>";
    Icon["HARD_OF_HEARING"] = "<i class=\"fa fa-hard-of-hearing (alias)\"></i>";
    Icon["HASHTAG"] = "<i class=\"fa fa-hashtag\"></i>";
    Icon["HDD_O"] = "<i class=\"fa fa-hdd-o\"></i>";
    Icon["HEADER"] = "<i class=\"fa fa-header\"></i>";
    Icon["HEADPHONES"] = "<i class=\"fa fa-headphones\"></i>";
    Icon["HEART"] = "<i class=\"fa fa-heart\"></i>";
    Icon["HEART_O"] = "<i class=\"fa fa-heart-o\"></i>";
    Icon["HEARTBEAT"] = "<i class=\"fa fa-heartbeat\"></i>";
    Icon["HISTORY"] = "<i class=\"fa fa-history\"></i>";
    Icon["HOME"] = "<i class=\"fa fa-home\"></i>";
    Icon["HOSPITAL_O"] = "<i class=\"fa fa-hospital-o\"></i>";
    Icon["HOTEL"] = "<i class=\"fa fa-hotel (alias)\"></i>";
    Icon["HOURGLASS"] = "<i class=\"fa fa-hourglass\"></i>";
    Icon["HOURGLASS_1"] = "<i class=\"fa fa-hourglass-1 (alias)\"></i>";
    Icon["HOURGLASS_2"] = "<i class=\"fa fa-hourglass-2 (alias)\"></i>";
    Icon["HOURGLASS_3"] = "<i class=\"fa fa-hourglass-3 (alias)\"></i>";
    Icon["HOURGLASS_END"] = "<i class=\"fa fa-hourglass-end\"></i>";
    Icon["HOURGLASS_HALF"] = "<i class=\"fa fa-hourglass-half\"></i>";
    Icon["HOURGLASS_O"] = "<i class=\"fa fa-hourglass-o\"></i>";
    Icon["HOURGLASS_START"] = "<i class=\"fa fa-hourglass-start\"></i>";
    Icon["HOUZZ"] = "<i class=\"fa fa-houzz\"></i>";
    Icon["HTML5"] = "<i class=\"fa fa-html5\"></i>";
    Icon["I_CURSOR"] = "<i class=\"fa fa-i-cursor\"></i>";
    Icon["ID_BADGE"] = "<i class=\"fa fa-id-badge\"></i>";
    Icon["ID_CARD"] = "<i class=\"fa fa-id-card\"></i>";
    Icon["ID_CARD_O"] = "<i class=\"fa fa-id-card-o\"></i>";
    Icon["ILS"] = "<i class=\"fa fa-ils\"></i>";
    Icon["IMAGE"] = "<i class=\"fa fa-image (alias)\"></i>";
    Icon["IMDB"] = "<i class=\"fa fa-imdb\"></i>";
    Icon["INBOX"] = "<i class=\"fa fa-inbox\"></i>";
    Icon["INDENT"] = "<i class=\"fa fa-indent\"></i>";
    Icon["INDUSTRY"] = "<i class=\"fa fa-industry\"></i>";
    Icon["INFO"] = "<i class=\"fa fa-info\"></i>";
    Icon["INFO_CIRCLE"] = "<i class=\"fa fa-info-circle\"></i>";
    Icon["INR"] = "<i class=\"fa fa-inr\"></i>";
    Icon["INSTAGRAM"] = "<i class=\"fa fa-instagram\"></i>";
    Icon["INSTITUTION"] = "<i class=\"fa fa-institution (alias)\"></i>";
    Icon["INTERNET_EXPLORER"] = "<i class=\"fa fa-internet-explorer\"></i>";
    Icon["INTERSEX"] = "<i class=\"fa fa-intersex (alias)\"></i>";
    Icon["IOXHOST"] = "<i class=\"fa fa-ioxhost\"></i>";
    Icon["ITALIC"] = "<i class=\"fa fa-italic\"></i>";
    Icon["JOOMLA"] = "<i class=\"fa fa-joomla\"></i>";
    Icon["JPY"] = "<i class=\"fa fa-jpy\"></i>";
    Icon["JSFIDDLE"] = "<i class=\"fa fa-jsfiddle\"></i>";
    Icon["KEY"] = "<i class=\"fa fa-key\"></i>";
    Icon["KEYBOARD_O"] = "<i class=\"fa fa-keyboard-o\"></i>";
    Icon["KRW"] = "<i class=\"fa fa-krw\"></i>";
    Icon["LANGUAGE"] = "<i class=\"fa fa-language\"></i>";
    Icon["LAPTOP"] = "<i class=\"fa fa-laptop\"></i>";
    Icon["LASTFM"] = "<i class=\"fa fa-lastfm\"></i>";
    Icon["LASTFM_SQUARE"] = "<i class=\"fa fa-lastfm-square\"></i>";
    Icon["LEAF"] = "<i class=\"fa fa-leaf\"></i>";
    Icon["LEANPUB"] = "<i class=\"fa fa-leanpub\"></i>";
    Icon["LEGAL"] = "<i class=\"fa fa-legal (alias)\"></i>";
    Icon["LEMON_O"] = "<i class=\"fa fa-lemon-o\"></i>";
    Icon["LEVEL_DOWN"] = "<i class=\"fa fa-level-down\"></i>";
    Icon["LEVEL_UP"] = "<i class=\"fa fa-level-up\"></i>";
    Icon["LIFE_BOUY"] = "<i class=\"fa fa-life-bouy (alias)\"></i>";
    Icon["LIFE_BUOY"] = "<i class=\"fa fa-life-buoy (alias)\"></i>";
    Icon["LIFE_RING"] = "<i class=\"fa fa-life-ring\"></i>";
    Icon["LIFE_SAVER"] = "<i class=\"fa fa-life-saver (alias)\"></i>";
    Icon["LIGHTBULB_O"] = "<i class=\"fa fa-lightbulb-o\"></i>";
    Icon["LINE_CHART"] = "<i class=\"fa fa-line-chart\"></i>";
    Icon["LINK"] = "<i class=\"fa fa-link\"></i>";
    Icon["LINKEDIN"] = "<i class=\"fa fa-linkedin\"></i>";
    Icon["LINKEDIN_SQUARE"] = "<i class=\"fa fa-linkedin-square\"></i>";
    Icon["LINODE"] = "<i class=\"fa fa-linode\"></i>";
    Icon["LINUX"] = "<i class=\"fa fa-linux\"></i>";
    Icon["LIST"] = "<i class=\"fa fa-list\"></i>";
    Icon["LIST_ALT"] = "<i class=\"fa fa-list-alt\"></i>";
    Icon["LIST_OL"] = "<i class=\"fa fa-list-ol\"></i>";
    Icon["LIST_UL"] = "<i class=\"fa fa-list-ul\"></i>";
    Icon["LOCATION_ARROW"] = "<i class=\"fa fa-location-arrow\"></i>";
    Icon["LOCK"] = "<i class=\"fa fa-lock\"></i>";
    Icon["LONG_ARROW_DOWN"] = "<i class=\"fa fa-long-arrow-down\"></i>";
    Icon["LONG_ARROW_LEFT"] = "<i class=\"fa fa-long-arrow-left\"></i>";
    Icon["LONG_ARROW_RIGHT"] = "<i class=\"fa fa-long-arrow-right\"></i>";
    Icon["LONG_ARROW_UP"] = "<i class=\"fa fa-long-arrow-up\"></i>";
    Icon["LOW_VISION"] = "<i class=\"fa fa-low-vision\"></i>";
    Icon["MAGIC"] = "<i class=\"fa fa-magic\"></i>";
    Icon["MAGNET"] = "<i class=\"fa fa-magnet\"></i>";
    Icon["MAIL_FORWARD"] = "<i class=\"fa fa-mail-forward (alias)\"></i>";
    Icon["MAIL_REPLY"] = "<i class=\"fa fa-mail-reply (alias)\"></i>";
    Icon["MAIL_REPLY_ALL"] = "<i class=\"fa fa-mail-reply-all (alias)\"></i>";
    Icon["MALE"] = "<i class=\"fa fa-male\"></i>";
    Icon["MAP"] = "<i class=\"fa fa-map\"></i>";
    Icon["MAP_MARKER"] = "<i class=\"fa fa-map-marker\"></i>";
    Icon["MAP_O"] = "<i class=\"fa fa-map-o\"></i>";
    Icon["MAP_PIN"] = "<i class=\"fa fa-map-pin\"></i>";
    Icon["MAP_SIGNS"] = "<i class=\"fa fa-map-signs\"></i>";
    Icon["MARS"] = "<i class=\"fa fa-mars\"></i>";
    Icon["MARS_DOUBLE"] = "<i class=\"fa fa-mars-double\"></i>";
    Icon["MARS_STROKE"] = "<i class=\"fa fa-mars-stroke\"></i>";
    Icon["MARS_STROKE_H"] = "<i class=\"fa fa-mars-stroke-h\"></i>";
    Icon["MARS_STROKE_V"] = "<i class=\"fa fa-mars-stroke-v\"></i>";
    Icon["MAXCDN"] = "<i class=\"fa fa-maxcdn\"></i>";
    Icon["MEANPATH"] = "<i class=\"fa fa-meanpath\"></i>";
    Icon["MEDIUM"] = "<i class=\"fa fa-medium\"></i>";
    Icon["MEDKIT"] = "<i class=\"fa fa-medkit\"></i>";
    Icon["MEETUP"] = "<i class=\"fa fa-meetup\"></i>";
    Icon["MEH_O"] = "<i class=\"fa fa-meh-o\"></i>";
    Icon["MERCURY"] = "<i class=\"fa fa-mercury\"></i>";
    Icon["MICROCHIP"] = "<i class=\"fa fa-microchip\"></i>";
    Icon["MICROPHONE"] = "<i class=\"fa fa-microphone\"></i>";
    Icon["MICROPHONE_SLASH"] = "<i class=\"fa fa-microphone-slash\"></i>";
    Icon["MINUS"] = "<i class=\"fa fa-minus\"></i>";
    Icon["MINUS_CIRCLE"] = "<i class=\"fa fa-minus-circle\"></i>";
    Icon["MINUS_SQUARE"] = "<i class=\"fa fa-minus-square\"></i>";
    Icon["MINUS_SQUARE_O"] = "<i class=\"fa fa-minus-square-o\"></i>";
    Icon["MIXCLOUD"] = "<i class=\"fa fa-mixcloud\"></i>";
    Icon["MOBILE"] = "<i class=\"fa fa-mobile\"></i>";
    Icon["MOBILE_PHONE"] = "<i class=\"fa fa-mobile-phone (alias)\"></i>";
    Icon["MODX"] = "<i class=\"fa fa-modx\"></i>";
    Icon["MONEY"] = "<i class=\"fa fa-money\"></i>";
    Icon["MOON_O"] = "<i class=\"fa fa-moon-o\"></i>";
    Icon["MORTAR_BOARD"] = "<i class=\"fa fa-mortar-board (alias)\"></i>";
    Icon["MOTORCYCLE"] = "<i class=\"fa fa-motorcycle\"></i>";
    Icon["MOUSE_POINTER"] = "<i class=\"fa fa-mouse-pointer\"></i>";
    Icon["MUSIC"] = "<i class=\"fa fa-music\"></i>";
    Icon["NAVICON"] = "<i class=\"fa fa-navicon (alias)\"></i>";
    Icon["NEUTER"] = "<i class=\"fa fa-neuter\"></i>";
    Icon["NEWSPAPER_O"] = "<i class=\"fa fa-newspaper-o\"></i>";
    Icon["OBJECT_GROUP"] = "<i class=\"fa fa-object-group\"></i>";
    Icon["OBJECT_UNGROUP"] = "<i class=\"fa fa-object-ungroup\"></i>";
    Icon["ODNOKLASSNIKI"] = "<i class=\"fa fa-odnoklassniki\"></i>";
    Icon["ODNOKLASSNIKI_SQUARE"] = "<i class=\"fa fa-odnoklassniki-square\"></i>";
    Icon["OPENCART"] = "<i class=\"fa fa-opencart\"></i>";
    Icon["OPENID"] = "<i class=\"fa fa-openid\"></i>";
    Icon["OPERA"] = "<i class=\"fa fa-opera\"></i>";
    Icon["OPTIN_MONSTER"] = "<i class=\"fa fa-optin-monster\"></i>";
    Icon["OUTDENT"] = "<i class=\"fa fa-outdent\"></i>";
    Icon["PAGELINES"] = "<i class=\"fa fa-pagelines\"></i>";
    Icon["PAINT_BRUSH"] = "<i class=\"fa fa-paint-brush\"></i>";
    Icon["PAPER_PLANE"] = "<i class=\"fa fa-paper-plane\"></i>";
    Icon["PAPER_PLANE_O"] = "<i class=\"fa fa-paper-plane-o\"></i>";
    Icon["PAPERCLIP"] = "<i class=\"fa fa-paperclip\"></i>";
    Icon["PARAGRAPH"] = "<i class=\"fa fa-paragraph\"></i>";
    Icon["PASTE"] = "<i class=\"fa fa-paste (alias)\"></i>";
    Icon["PAUSE"] = "<i class=\"fa fa-pause\"></i>";
    Icon["PAUSE_CIRCLE"] = "<i class=\"fa fa-pause-circle\"></i>";
    Icon["PAUSE_CIRCLE_O"] = "<i class=\"fa fa-pause-circle-o\"></i>";
    Icon["PAW"] = "<i class=\"fa fa-paw\"></i>";
    Icon["PAYPAL"] = "<i class=\"fa fa-paypal\"></i>";
    Icon["PENCIL"] = "<i class=\"fa fa-pencil\"></i>";
    Icon["PENCIL_SQUARE"] = "<i class=\"fa fa-pencil-square\"></i>";
    Icon["PENCIL_SQUARE_O"] = "<i class=\"fa fa-pencil-square-o\"></i>";
    Icon["PERCENT"] = "<i class=\"fa fa-percent\"></i>";
    Icon["PHONE"] = "<i class=\"fa fa-phone\"></i>";
    Icon["PHONE_SQUARE"] = "<i class=\"fa fa-phone-square\"></i>";
    Icon["PHOTO"] = "<i class=\"fa fa-photo (alias)\"></i>";
    Icon["PICTURE_O"] = "<i class=\"fa fa-picture-o\"></i>";
    Icon["PIE_CHART"] = "<i class=\"fa fa-pie-chart\"></i>";
    Icon["PIED_PIPER"] = "<i class=\"fa fa-pied-piper\"></i>";
    Icon["PIED_PIPER_ALT"] = "<i class=\"fa fa-pied-piper-alt\"></i>";
    Icon["PIED_PIPER_PP"] = "<i class=\"fa fa-pied-piper-pp\"></i>";
    Icon["PINTEREST"] = "<i class=\"fa fa-pinterest\"></i>";
    Icon["PINTEREST_P"] = "<i class=\"fa fa-pinterest-p\"></i>";
    Icon["PINTEREST_SQUARE"] = "<i class=\"fa fa-pinterest-square\"></i>";
    Icon["PLANE"] = "<i class=\"fa fa-plane\"></i>";
    Icon["PLAY"] = "<i class=\"fa fa-play\"></i>";
    Icon["PLAY_CIRCLE"] = "<i class=\"fa fa-play-circle\"></i>";
    Icon["PLAY_CIRCLE_O"] = "<i class=\"fa fa-play-circle-o\"></i>";
    Icon["PLUG"] = "<i class=\"fa fa-plug\"></i>";
    Icon["PLUS"] = "<i class=\"fa fa-plus\"></i>";
    Icon["PLUS_CIRCLE"] = "<i class=\"fa fa-plus-circle\"></i>";
    Icon["PLUS_SQUARE"] = "<i class=\"fa fa-plus-square\"></i>";
    Icon["PLUS_SQUARE_O"] = "<i class=\"fa fa-plus-square-o\"></i>";
    Icon["PODCAST"] = "<i class=\"fa fa-podcast\"></i>";
    Icon["POWER_OFF"] = "<i class=\"fa fa-power-off\"></i>";
    Icon["PRINT"] = "<i class=\"fa fa-print\"></i>";
    Icon["PRODUCT_HUNT"] = "<i class=\"fa fa-product-hunt\"></i>";
    Icon["PUZZLE_PIECE"] = "<i class=\"fa fa-puzzle-piece\"></i>";
    Icon["QQ"] = "<i class=\"fa fa-qq\"></i>";
    Icon["QRCODE"] = "<i class=\"fa fa-qrcode\"></i>";
    Icon["QUESTION"] = "<i class=\"fa fa-question\"></i>";
    Icon["QUESTION_CIRCLE"] = "<i class=\"fa fa-question-circle\"></i>";
    Icon["QUESTION_CIRCLE_O"] = "<i class=\"fa fa-question-circle-o\"></i>";
    Icon["QUORA"] = "<i class=\"fa fa-quora\"></i>";
    Icon["QUOTE_LEFT"] = "<i class=\"fa fa-quote-left\"></i>";
    Icon["QUOTE_RIGHT"] = "<i class=\"fa fa-quote-right\"></i>";
    Icon["RA"] = "<i class=\"fa fa-ra (alias)\"></i>";
    Icon["RANDOM"] = "<i class=\"fa fa-random\"></i>";
    Icon["RAVELRY"] = "<i class=\"fa fa-ravelry\"></i>";
    Icon["REBEL"] = "<i class=\"fa fa-rebel\"></i>";
    Icon["RECYCLE"] = "<i class=\"fa fa-recycle\"></i>";
    Icon["REDDIT"] = "<i class=\"fa fa-reddit\"></i>";
    Icon["REDDIT_ALIEN"] = "<i class=\"fa fa-reddit-alien\"></i>";
    Icon["REDDIT_SQUARE"] = "<i class=\"fa fa-reddit-square\"></i>";
    Icon["REFRESH"] = "<i class=\"fa fa-refresh\"></i>";
    Icon["REGISTERED"] = "<i class=\"fa fa-registered\"></i>";
    Icon["REMOVE"] = "<i class=\"fa fa-remove (alias)\"></i>";
    Icon["RENREN"] = "<i class=\"fa fa-renren\"></i>";
    Icon["REORDER"] = "<i class=\"fa fa-reorder (alias)\"></i>";
    Icon["REPEAT"] = "<i class=\"fa fa-repeat\"></i>";
    Icon["REPLY"] = "<i class=\"fa fa-reply\"></i>";
    Icon["REPLY_ALL"] = "<i class=\"fa fa-reply-all\"></i>";
    Icon["RESISTANCE"] = "<i class=\"fa fa-resistance (alias)\"></i>";
    Icon["RETWEET"] = "<i class=\"fa fa-retweet\"></i>";
    Icon["RMB"] = "<i class=\"fa fa-rmb (alias)\"></i>";
    Icon["ROAD"] = "<i class=\"fa fa-road\"></i>";
    Icon["ROCKET"] = "<i class=\"fa fa-rocket\"></i>";
    Icon["ROTATE_LEFT"] = "<i class=\"fa fa-rotate-left (alias)\"></i>";
    Icon["ROTATE_RIGHT"] = "<i class=\"fa fa-rotate-right (alias)\"></i>";
    Icon["ROUBLE"] = "<i class=\"fa fa-rouble (alias)\"></i>";
    Icon["RSS"] = "<i class=\"fa fa-rss\"></i>";
    Icon["RSS_SQUARE"] = "<i class=\"fa fa-rss-square\"></i>";
    Icon["RUB"] = "<i class=\"fa fa-rub\"></i>";
    Icon["RUBLE"] = "<i class=\"fa fa-ruble (alias)\"></i>";
    Icon["RUPEE"] = "<i class=\"fa fa-rupee (alias)\"></i>";
    Icon["S15"] = "<i class=\"fa fa-s15 (alias)\"></i>";
    Icon["SAFARI"] = "<i class=\"fa fa-safari\"></i>";
    Icon["SAVE"] = "<i class=\"fa fa-save (alias)\"></i>";
    Icon["SCISSORS"] = "<i class=\"fa fa-scissors\"></i>";
    Icon["SCRIBD"] = "<i class=\"fa fa-scribd\"></i>";
    Icon["SEARCH"] = "<i class=\"fa fa-search\"></i>";
    Icon["SEARCH_MINUS"] = "<i class=\"fa fa-search-minus\"></i>";
    Icon["SEARCH_PLUS"] = "<i class=\"fa fa-search-plus\"></i>";
    Icon["SELLSY"] = "<i class=\"fa fa-sellsy\"></i>";
    Icon["SEND"] = "<i class=\"fa fa-send (alias)\"></i>";
    Icon["SEND_O"] = "<i class=\"fa fa-send-o (alias)\"></i>";
    Icon["SERVER"] = "<i class=\"fa fa-server\"></i>";
    Icon["SHARE"] = "<i class=\"fa fa-share\"></i>";
    Icon["SHARE_ALT"] = "<i class=\"fa fa-share-alt\"></i>";
    Icon["SHARE_ALT_SQUARE"] = "<i class=\"fa fa-share-alt-square\"></i>";
    Icon["SHARE_SQUARE"] = "<i class=\"fa fa-share-square\"></i>";
    Icon["SHARE_SQUARE_O"] = "<i class=\"fa fa-share-square-o\"></i>";
    Icon["SHEKEL"] = "<i class=\"fa fa-shekel (alias)\"></i>";
    Icon["SHEQEL"] = "<i class=\"fa fa-sheqel (alias)\"></i>";
    Icon["SHIELD"] = "<i class=\"fa fa-shield\"></i>";
    Icon["SHIP"] = "<i class=\"fa fa-ship\"></i>";
    Icon["SHIRTSINBULK"] = "<i class=\"fa fa-shirtsinbulk\"></i>";
    Icon["SHOPPING_BAG"] = "<i class=\"fa fa-shopping-bag\"></i>";
    Icon["SHOPPING_BASKET"] = "<i class=\"fa fa-shopping-basket\"></i>";
    Icon["SHOPPING_CART"] = "<i class=\"fa fa-shopping-cart\"></i>";
    Icon["SHOWER"] = "<i class=\"fa fa-shower\"></i>";
    Icon["SIGN_IN"] = "<i class=\"fa fa-sign-in\"></i>";
    Icon["SIGN_LANGUAGE"] = "<i class=\"fa fa-sign-language\"></i>";
    Icon["SIGN_OUT"] = "<i class=\"fa fa-sign-out\"></i>";
    Icon["SIGNAL"] = "<i class=\"fa fa-signal\"></i>";
    Icon["SIGNING"] = "<i class=\"fa fa-signing (alias)\"></i>";
    Icon["SIMPLYBUILT"] = "<i class=\"fa fa-simplybuilt\"></i>";
    Icon["SITEMAP"] = "<i class=\"fa fa-sitemap\"></i>";
    Icon["SKYATLAS"] = "<i class=\"fa fa-skyatlas\"></i>";
    Icon["SKYPE"] = "<i class=\"fa fa-skype\"></i>";
    Icon["SLACK"] = "<i class=\"fa fa-slack\"></i>";
    Icon["SLIDERS"] = "<i class=\"fa fa-sliders\"></i>";
    Icon["SLIDESHARE"] = "<i class=\"fa fa-slideshare\"></i>";
    Icon["SMILE_O"] = "<i class=\"fa fa-smile-o\"></i>";
    Icon["SNAPCHAT"] = "<i class=\"fa fa-snapchat\"></i>";
    Icon["SNAPCHAT_GHOST"] = "<i class=\"fa fa-snapchat-ghost\"></i>";
    Icon["SNAPCHAT_SQUARE"] = "<i class=\"fa fa-snapchat-square\"></i>";
    Icon["SNOWFLAKE_O"] = "<i class=\"fa fa-snowflake-o\"></i>";
    Icon["SOCCER_BALL_O"] = "<i class=\"fa fa-soccer-ball-o (alias)\"></i>";
    Icon["SORT"] = "<i class=\"fa fa-sort\"></i>";
    Icon["SORT_ALPHA_ASC"] = "<i class=\"fa fa-sort-alpha-asc\"></i>";
    Icon["SORT_ALPHA_DESC"] = "<i class=\"fa fa-sort-alpha-desc\"></i>";
    Icon["SORT_AMOUNT_ASC"] = "<i class=\"fa fa-sort-amount-asc\"></i>";
    Icon["SORT_AMOUNT_DESC"] = "<i class=\"fa fa-sort-amount-desc\"></i>";
    Icon["SORT_ASC"] = "<i class=\"fa fa-sort-asc\"></i>";
    Icon["SORT_DESC"] = "<i class=\"fa fa-sort-desc\"></i>";
    Icon["SORT_DOWN"] = "<i class=\"fa fa-sort-down (alias)\"></i>";
    Icon["SORT_NUMERIC_ASC"] = "<i class=\"fa fa-sort-numeric-asc\"></i>";
    Icon["SORT_NUMERIC_DESC"] = "<i class=\"fa fa-sort-numeric-desc\"></i>";
    Icon["SORT_UP"] = "<i class=\"fa fa-sort-up (alias)\"></i>";
    Icon["SOUNDCLOUD"] = "<i class=\"fa fa-soundcloud\"></i>";
    Icon["SPACE_SHUTTLE"] = "<i class=\"fa fa-space-shuttle\"></i>";
    Icon["SPINNER"] = "<i class=\"fa fa-spinner\"></i>";
    Icon["SPOON"] = "<i class=\"fa fa-spoon\"></i>";
    Icon["SPOTIFY"] = "<i class=\"fa fa-spotify\"></i>";
    Icon["SQUARE"] = "<i class=\"fa fa-square\"></i>";
    Icon["SQUARE_O"] = "<i class=\"fa fa-square-o\"></i>";
    Icon["STACK_EXCHANGE"] = "<i class=\"fa fa-stack-exchange\"></i>";
    Icon["STACK_OVERFLOW"] = "<i class=\"fa fa-stack-overflow\"></i>";
    Icon["STAR"] = "<i class=\"fa fa-star\"></i>";
    Icon["STAR_HALF"] = "<i class=\"fa fa-star-half\"></i>";
    Icon["STAR_HALF_EMPTY"] = "<i class=\"fa fa-star-half-empty (alias)\"></i>";
    Icon["STAR_HALF_FULL"] = "<i class=\"fa fa-star-half-full (alias)\"></i>";
    Icon["STAR_HALF_O"] = "<i class=\"fa fa-star-half-o\"></i>";
    Icon["STAR_O"] = "<i class=\"fa fa-star-o\"></i>";
    Icon["STEAM"] = "<i class=\"fa fa-steam\"></i>";
    Icon["STEAM_SQUARE"] = "<i class=\"fa fa-steam-square\"></i>";
    Icon["STEP_BACKWARD"] = "<i class=\"fa fa-step-backward\"></i>";
    Icon["STEP_FORWARD"] = "<i class=\"fa fa-step-forward\"></i>";
    Icon["STETHOSCOPE"] = "<i class=\"fa fa-stethoscope\"></i>";
    Icon["STICKY_NOTE"] = "<i class=\"fa fa-sticky-note\"></i>";
    Icon["STICKY_NOTE_O"] = "<i class=\"fa fa-sticky-note-o\"></i>";
    Icon["STOP"] = "<i class=\"fa fa-stop\"></i>";
    Icon["STOP_CIRCLE"] = "<i class=\"fa fa-stop-circle\"></i>";
    Icon["STOP_CIRCLE_O"] = "<i class=\"fa fa-stop-circle-o\"></i>";
    Icon["STREET_VIEW"] = "<i class=\"fa fa-street-view\"></i>";
    Icon["STRIKETHROUGH"] = "<i class=\"fa fa-strikethrough\"></i>";
    Icon["STUMBLEUPON"] = "<i class=\"fa fa-stumbleupon\"></i>";
    Icon["STUMBLEUPON_CIRCLE"] = "<i class=\"fa fa-stumbleupon-circle\"></i>";
    Icon["SUBSCRIPT"] = "<i class=\"fa fa-subscript\"></i>";
    Icon["SUBWAY"] = "<i class=\"fa fa-subway\"></i>";
    Icon["SUITCASE"] = "<i class=\"fa fa-suitcase\"></i>";
    Icon["SUN_O"] = "<i class=\"fa fa-sun-o\"></i>";
    Icon["SUPERPOWERS"] = "<i class=\"fa fa-superpowers\"></i>";
    Icon["SUPERSCRIPT"] = "<i class=\"fa fa-superscript\"></i>";
    Icon["SUPPORT"] = "<i class=\"fa fa-support (alias)\"></i>";
    Icon["TABLE"] = "<i class=\"fa fa-table\"></i>";
    Icon["TABLET"] = "<i class=\"fa fa-tablet\"></i>";
    Icon["TACHOMETER"] = "<i class=\"fa fa-tachometer\"></i>";
    Icon["TAG"] = "<i class=\"fa fa-tag\"></i>";
    Icon["TAGS"] = "<i class=\"fa fa-tags\"></i>";
    Icon["TASKS"] = "<i class=\"fa fa-tasks\"></i>";
    Icon["TAXI"] = "<i class=\"fa fa-taxi\"></i>";
    Icon["TELEGRAM"] = "<i class=\"fa fa-telegram\"></i>";
    Icon["TELEVISION"] = "<i class=\"fa fa-television\"></i>";
    Icon["TENCENT_WEIBO"] = "<i class=\"fa fa-tencent-weibo\"></i>";
    Icon["TERMINAL"] = "<i class=\"fa fa-terminal\"></i>";
    Icon["TEXT_HEIGHT"] = "<i class=\"fa fa-text-height\"></i>";
    Icon["TEXT_WIDTH"] = "<i class=\"fa fa-text-width\"></i>";
    Icon["TH"] = "<i class=\"fa fa-th\"></i>";
    Icon["TH_LARGE"] = "<i class=\"fa fa-th-large\"></i>";
    Icon["TH_LIST"] = "<i class=\"fa fa-th-list\"></i>";
    Icon["THEMEISLE"] = "<i class=\"fa fa-themeisle\"></i>";
    Icon["THERMOMETER"] = "<i class=\"fa fa-thermometer (alias)\"></i>";
    Icon["THERMOMETER_0"] = "<i class=\"fa fa-thermometer-0 (alias)\"></i>";
    Icon["THERMOMETER_1"] = "<i class=\"fa fa-thermometer-1 (alias)\"></i>";
    Icon["THERMOMETER_2"] = "<i class=\"fa fa-thermometer-2 (alias)\"></i>";
    Icon["THERMOMETER_3"] = "<i class=\"fa fa-thermometer-3 (alias)\"></i>";
    Icon["THERMOMETER_4"] = "<i class=\"fa fa-thermometer-4 (alias)\"></i>";
    Icon["THERMOMETER_EMPTY"] = "<i class=\"fa fa-thermometer-empty\"></i>";
    Icon["THERMOMETER_FULL"] = "<i class=\"fa fa-thermometer-full\"></i>";
    Icon["THERMOMETER_HALF"] = "<i class=\"fa fa-thermometer-half\"></i>";
    Icon["THERMOMETER_QUARTER"] = "<i class=\"fa fa-thermometer-quarter\"></i>";
    Icon["THERMOMETER_THREE_QUARTERS"] = "<i class=\"fa fa-thermometer-three-quarters\"></i>";
    Icon["THUMB_TACK"] = "<i class=\"fa fa-thumb-tack\"></i>";
    Icon["THUMBS_DOWN"] = "<i class=\"fa fa-thumbs-down\"></i>";
    Icon["THUMBS_O_DOWN"] = "<i class=\"fa fa-thumbs-o-down\"></i>";
    Icon["THUMBS_O_UP"] = "<i class=\"fa fa-thumbs-o-up\"></i>";
    Icon["THUMBS_UP"] = "<i class=\"fa fa-thumbs-up\"></i>";
    Icon["TICKET"] = "<i class=\"fa fa-ticket\"></i>";
    Icon["TIMES"] = "<i class=\"fa fa-times\"></i>";
    Icon["TIMES_CIRCLE"] = "<i class=\"fa fa-times-circle\"></i>";
    Icon["TIMES_CIRCLE_O"] = "<i class=\"fa fa-times-circle-o\"></i>";
    Icon["TIMES_RECTANGLE"] = "<i class=\"fa fa-times-rectangle (alias)\"></i>";
    Icon["TIMES_RECTANGLE_O"] = "<i class=\"fa fa-times-rectangle-o (alias)\"></i>";
    Icon["TINT"] = "<i class=\"fa fa-tint\"></i>";
    Icon["TOGGLE_DOWN"] = "<i class=\"fa fa-toggle-down (alias)\"></i>";
    Icon["TOGGLE_LEFT"] = "<i class=\"fa fa-toggle-left (alias)\"></i>";
    Icon["TOGGLE_OFF"] = "<i class=\"fa fa-toggle-off\"></i>";
    Icon["TOGGLE_ON"] = "<i class=\"fa fa-toggle-on\"></i>";
    Icon["TOGGLE_RIGHT"] = "<i class=\"fa fa-toggle-right (alias)\"></i>";
    Icon["TOGGLE_UP"] = "<i class=\"fa fa-toggle-up (alias)\"></i>";
    Icon["TRADEMARK"] = "<i class=\"fa fa-trademark\"></i>";
    Icon["TRAIN"] = "<i class=\"fa fa-train\"></i>";
    Icon["TRANSGENDER"] = "<i class=\"fa fa-transgender\"></i>";
    Icon["TRANSGENDER_ALT"] = "<i class=\"fa fa-transgender-alt\"></i>";
    Icon["TRASH"] = "<i class=\"fa fa-trash\"></i>";
    Icon["TRASH_O"] = "<i class=\"fa fa-trash-o\"></i>";
    Icon["TREE"] = "<i class=\"fa fa-tree\"></i>";
    Icon["TRELLO"] = "<i class=\"fa fa-trello\"></i>";
    Icon["TRIPADVISOR"] = "<i class=\"fa fa-tripadvisor\"></i>";
    Icon["TROPHY"] = "<i class=\"fa fa-trophy\"></i>";
    Icon["TRUCK"] = "<i class=\"fa fa-truck\"></i>";
    Icon["TRY"] = "<i class=\"fa fa-try\"></i>";
    Icon["TTY"] = "<i class=\"fa fa-tty\"></i>";
    Icon["TUMBLR"] = "<i class=\"fa fa-tumblr\"></i>";
    Icon["TUMBLR_SQUARE"] = "<i class=\"fa fa-tumblr-square\"></i>";
    Icon["TURKISH_LIRA"] = "<i class=\"fa fa-turkish-lira (alias)\"></i>";
    Icon["TV"] = "<i class=\"fa fa-tv (alias)\"></i>";
    Icon["TWITCH"] = "<i class=\"fa fa-twitch\"></i>";
    Icon["TWITTER"] = "<i class=\"fa fa-twitter\"></i>";
    Icon["TWITTER_SQUARE"] = "<i class=\"fa fa-twitter-square\"></i>";
    Icon["UMBRELLA"] = "<i class=\"fa fa-umbrella\"></i>";
    Icon["UNDERLINE"] = "<i class=\"fa fa-underline\"></i>";
    Icon["UNDO"] = "<i class=\"fa fa-undo\"></i>";
    Icon["UNIVERSAL_ACCESS"] = "<i class=\"fa fa-universal-access\"></i>";
    Icon["UNIVERSITY"] = "<i class=\"fa fa-university\"></i>";
    Icon["UNLINK"] = "<i class=\"fa fa-unlink (alias)\"></i>";
    Icon["UNLOCK"] = "<i class=\"fa fa-unlock\"></i>";
    Icon["UNLOCK_ALT"] = "<i class=\"fa fa-unlock-alt\"></i>";
    Icon["UNSORTED"] = "<i class=\"fa fa-unsorted (alias)\"></i>";
    Icon["UPLOAD"] = "<i class=\"fa fa-upload\"></i>";
    Icon["USB"] = "<i class=\"fa fa-usb\"></i>";
    Icon["USD"] = "<i class=\"fa fa-usd\"></i>";
    Icon["USER"] = "<i class=\"fa fa-user\"></i>";
    Icon["USER_CIRCLE"] = "<i class=\"fa fa-user-circle\"></i>";
    Icon["USER_CIRCLE_O"] = "<i class=\"fa fa-user-circle-o\"></i>";
    Icon["USER_MD"] = "<i class=\"fa fa-user-md\"></i>";
    Icon["USER_O"] = "<i class=\"fa fa-user-o\"></i>";
    Icon["USER_PLUS"] = "<i class=\"fa fa-user-plus\"></i>";
    Icon["USER_SECRET"] = "<i class=\"fa fa-user-secret\"></i>";
    Icon["USER_TIMES"] = "<i class=\"fa fa-user-times\"></i>";
    Icon["USERS"] = "<i class=\"fa fa-users\"></i>";
    Icon["VCARD"] = "<i class=\"fa fa-vcard (alias)\"></i>";
    Icon["VCARD_O"] = "<i class=\"fa fa-vcard-o (alias)\"></i>";
    Icon["VENUS"] = "<i class=\"fa fa-venus\"></i>";
    Icon["VENUS_DOUBLE"] = "<i class=\"fa fa-venus-double\"></i>";
    Icon["VENUS_MARS"] = "<i class=\"fa fa-venus-mars\"></i>";
    Icon["VIACOIN"] = "<i class=\"fa fa-viacoin\"></i>";
    Icon["VIADEO"] = "<i class=\"fa fa-viadeo\"></i>";
    Icon["VIADEO_SQUARE"] = "<i class=\"fa fa-viadeo-square\"></i>";
    Icon["VIDEO_CAMERA"] = "<i class=\"fa fa-video-camera\"></i>";
    Icon["VIMEO"] = "<i class=\"fa fa-vimeo\"></i>";
    Icon["VIMEO_SQUARE"] = "<i class=\"fa fa-vimeo-square\"></i>";
    Icon["VINE"] = "<i class=\"fa fa-vine\"></i>";
    Icon["VK"] = "<i class=\"fa fa-vk\"></i>";
    Icon["VOLUME_CONTROL_PHONE"] = "<i class=\"fa fa-volume-control-phone\"></i>";
    Icon["VOLUME_DOWN"] = "<i class=\"fa fa-volume-down\"></i>";
    Icon["VOLUME_OFF"] = "<i class=\"fa fa-volume-off\"></i>";
    Icon["VOLUME_UP"] = "<i class=\"fa fa-volume-up\"></i>";
    Icon["WARNING"] = "<i class=\"fa fa-warning (alias)\"></i>";
    Icon["WECHAT"] = "<i class=\"fa fa-wechat (alias)\"></i>";
    Icon["WEIBO"] = "<i class=\"fa fa-weibo\"></i>";
    Icon["WEIXIN"] = "<i class=\"fa fa-weixin\"></i>";
    Icon["WHATSAPP"] = "<i class=\"fa fa-whatsapp\"></i>";
    Icon["WHEELCHAIR"] = "<i class=\"fa fa-wheelchair\"></i>";
    Icon["WHEELCHAIR_ALT"] = "<i class=\"fa fa-wheelchair-alt\"></i>";
    Icon["WIFI"] = "<i class=\"fa fa-wifi\"></i>";
    Icon["WIKIPEDIA_W"] = "<i class=\"fa fa-wikipedia-w\"></i>";
    Icon["WINDOW_CLOSE"] = "<i class=\"fa fa-window-close\"></i>";
    Icon["WINDOW_CLOSE_O"] = "<i class=\"fa fa-window-close-o\"></i>";
    Icon["WINDOW_MAXIMIZE"] = "<i class=\"fa fa-window-maximize\"></i>";
    Icon["WINDOW_MINIMIZE"] = "<i class=\"fa fa-window-minimize\"></i>";
    Icon["WINDOW_RESTORE"] = "<i class=\"fa fa-window-restore\"></i>";
    Icon["WINDOWS"] = "<i class=\"fa fa-windows\"></i>";
    Icon["WON"] = "<i class=\"fa fa-won (alias)\"></i>";
    Icon["WORDPRESS"] = "<i class=\"fa fa-wordpress\"></i>";
    Icon["WPBEGINNER"] = "<i class=\"fa fa-wpbeginner\"></i>";
    Icon["WPEXPLORER"] = "<i class=\"fa fa-wpexplorer\"></i>";
    Icon["WPFORMS"] = "<i class=\"fa fa-wpforms\"></i>";
    Icon["WRENCH"] = "<i class=\"fa fa-wrench\"></i>";
    Icon["XING"] = "<i class=\"fa fa-xing\"></i>";
    Icon["XING_SQUARE"] = "<i class=\"fa fa-xing-square\"></i>";
    Icon["Y_COMBINATOR"] = "<i class=\"fa fa-y-combinator\"></i>";
    Icon["Y_COMBINATOR_SQUARE"] = "<i class=\"fa fa-y-combinator-square (alias)\"></i>";
    Icon["YAHOO"] = "<i class=\"fa fa-yahoo\"></i>";
    Icon["YC"] = "<i class=\"fa fa-yc (alias)\"></i>";
    Icon["YC_SQUARE"] = "<i class=\"fa fa-yc-square (alias)\"></i>";
    Icon["YELP"] = "<i class=\"fa fa-yelp\"></i>";
    Icon["YEN"] = "<i class=\"fa fa-yen (alias)\"></i>";
    Icon["YOAST"] = "<i class=\"fa fa-yoast\"></i>";
    Icon["YOUTUBE"] = "<i class=\"fa fa-youtube\"></i>";
    Icon["YOUTUBE_PLAY"] = "<i class=\"fa fa-youtube-play\"></i>";
    Icon["YOUTUBE_SQUARE"] = "<i class=\"fa fa-youtube-square\"></i>";
})(Icon || (Icon = {}));
var LayersPanelUIControl = (function (_super) {
    __extends(LayersPanelUIControl, _super);
    function LayersPanelUIControl(c) {
        var _this = _super.call(this, c) || this;
        _this.update();
        return _this;
    }
    LayersPanelUIControl.prototype.getClassName = function () {
        return "constructor-layers-panel-control";
    };
    LayersPanelUIControl.prototype.update = function () {
        this.clear();
        for (var i = 0; i < this.trigger.sides.length; i++) {
            var side = this.trigger.sides[i];
            console.log(side);
            this.append(new LayersUIControl(side));
        }
    };
    LayersPanelUIControl.prototype.updateVisibility = function () {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    };
    return LayersPanelUIControl;
}(TriggeredUIControl));
var Loader = (function () {
    function Loader() {
    }
    Loader.init = function () {
        document.addEventListener("DOMContentLoaded", function () {
            var element = document.getElementById("constructor-container");
            new Constructor(element);
        });
        return null;
    };
    Loader.load = Loader.init();
    return Loader;
}());
var ButtonUIControl = (function (_super) {
    __extends(ButtonUIControl, _super);
    function ButtonUIControl(action, icon) {
        var _this = _super.call(this) || this;
        _this.container.innerHTML = icon;
        _this.container.onclick = function () { return action(); };
        return _this;
    }
    ButtonUIControl.prototype.getClassName = function () {
        return "button-control";
    };
    ButtonUIControl.prototype.update = function () {
    };
    return ButtonUIControl;
}(UIControl));
var ToggleButtonUIControl = (function (_super) {
    __extends(ToggleButtonUIControl, _super);
    function ToggleButtonUIControl(action, check, iconOn, iconOff) {
        var _this = _super.call(this, action, iconOn) || this;
        _this.action = action;
        _this.check = check;
        _this.iconOn = iconOn;
        _this.iconOn = iconOn;
        _this.iconOff = iconOff;
        _this.container.onclick = function () { return _this.action(); };
        _this.update();
        return _this;
    }
    ToggleButtonUIControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " toggle-button-control";
    };
    ToggleButtonUIControl.prototype.update = function () {
        this.container.innerHTML = this.check() ? this.iconOn : this.iconOff;
    };
    return ToggleButtonUIControl;
}(ButtonUIControl));
var ToolbarUIControl = (function (_super) {
    __extends(ToolbarUIControl, _super);
    function ToolbarUIControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarUIControl.prototype.getClassName = function () {
        return "toolbar-control";
    };
    ToolbarUIControl.prototype.update = function () {
    };
    return ToolbarUIControl;
}(UIControl));
var SidebarUIControl = (function (_super) {
    __extends(SidebarUIControl, _super);
    function SidebarUIControl() {
        var _this = _super.call(this) || this;
        var verticalToolbar = new ToolbarUIControl()
            .append(new ButtonUIControl(function () { return _this.switch(0); }, Icon.HOME), new ButtonUIControl(function () { return _this.switch(1); }, Icon.PLUS_CIRCLE), new ButtonUIControl(function () { return _this.switch(2); }, Icon.TH_LARGE));
        _this.toolbar = new ToolbarUIControl()
            .append(new ButtonUIControl(function () { return _this.c.addElement(ElementType.CIRCLE); }, Icon.CIRCLE))
            .append(new ButtonUIControl(function () { return _this.c.addElement(ElementType.RECTANGLE); }, Icon.SQUARE))
            .append(new ButtonUIControl(function () { return _this.c.addElement(ElementType.TRIANGLE); }, Icon.CARET_UP))
            .append(new ButtonUIControl(function () { return _this.c.addElement(ElementType.TEXT); }, Icon.FONT));
        _this.left = new LeftPaneUIControl();
        _this.right = new RightPaneUIControl();
        _this.layersPanel = new LayersPanelUIControl(_this.c);
        _this.left.append(verticalToolbar);
        _this.right.append(_this.toolbar);
        _this.right.append(_this.layersPanel);
        _this.append(_this.left);
        _this.append(_this.right);
        _this.switch(1);
        return _this;
    }
    SidebarUIControl.prototype.getClassName = function () {
        return "sidebar-control";
    };
    SidebarUIControl.prototype.switch = function (index) {
        for (var i = 0; i < this.right.children.length; i++) {
            if (i == index) {
                this.right.children[i].show();
            }
            else {
                this.right.children[i].hide();
            }
        }
    };
    SidebarUIControl.prototype.update = function () {
    };
    return SidebarUIControl;
}(ToolbarUIControl));
var LayerUIControl = (function (_super) {
    __extends(LayerUIControl, _super);
    function LayerUIControl(element) {
        var _this = _super.call(this, element) || this;
        _this.container.onclick = function (e) { return _this.trigger.side.select(_this.trigger); };
        _this.labelElement = document.createElement(Constants.DIV);
        _this.iconContainerElement = document.createElement(Constants.DIV);
        _this.container.style.userSelect = "none";
        _this.container.draggable = true;
        _this.container.ondragend = function (e) {
            _this.trigger.side.moveLayer(_this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            _this.trigger.side.select(_this.trigger);
        };
        _this.container.ondragover = function (e) {
            e.preventDefault();
            LayerUIControl.dragTo = _this.trigger.getLayerIndex();
            _this.container.classList.add("layer-drag-over");
        };
        _this.container.ondragleave = function (e) {
            _this.container.classList.remove("layer-drag-over");
        };
        _this.iconElement = document.createElement(Constants.IMG);
        _this.iconContainerElement.className = "constructor-layer-control-icon-frame";
        _this.iconContainerElement.style.width = Constructor.settings.ui.layerIconSize + "px";
        _this.iconContainerElement.style.height = Constructor.settings.ui.layerIconSize + "px";
        _this.iconContainerElement.style.textAlign = "center";
        _this.visibilityButton = new ToggleButtonUIControl(function () { return element.toggleVisibility(); }, function () { return element.isVisible(); }, Icon.EYE, Icon.EYE_SLASH);
        _this.visibilityButton.getElement().style.float = "right";
        _this.lockButton = new ToggleButtonUIControl(function () { return element.toggleLock(); }, function () { return element.isLocked(); }, Icon.LOCK, Icon.UNLOCK_ALT);
        _this.lockButton.getElement().style.float = "right";
        _this.deleteButton = new ButtonUIControl(function () { return element.remove(); }, Icon.TRASH);
        _this.deleteButton.getElement().style.float = "right";
        _this.container.appendChild(_this.iconContainerElement);
        _this.iconContainerElement.appendChild(_this.iconElement);
        _this.container.appendChild(_this.labelElement);
        _this.container.appendChild(_this.deleteButton.getElement());
        _this.container.appendChild(_this.visibilityButton.getElement());
        _this.container.appendChild(_this.lockButton.getElement());
        _this.update();
        return _this;
    }
    LayerUIControl.prototype.getClassName = function () {
        return "constructor-layer-control";
    };
    LayerUIControl.prototype.select = function () {
        this.container.classList.add("layer-select");
    };
    LayerUIControl.prototype.deselect = function () {
        this.container.classList.remove("layer-select");
    };
    LayerUIControl.prototype.update = function () {
        this.labelElement.innerText = this.trigger.type.getName();
        var maxSize = Math.max(this.trigger.object.width * this.trigger.object.scaleX, this.trigger.object.height * this.trigger.object.scaleY);
        if (this.trigger.isVisible()) {
            var multiplier = Constructor.settings.ui.layerIconSize / maxSize;
            var options = {
                format: "png",
                multiplier: multiplier
            };
            var src = this.trigger.object.toDataURL(options).toString();
            this.iconElement.src = src;
            this.cachedIcon = src;
        }
        else {
            this.iconElement.src = this.cachedIcon;
        }
        this.lockButton.update();
        this.updateVisibility();
    };
    LayerUIControl.prototype.updateVisibility = function () {
        this.visibilityButton.update();
    };
    LayerUIControl.dragTo = 0;
    return LayerUIControl;
}(TriggeredUIControl));
var ConstructorUI = (function () {
    function ConstructorUI() {
        this.c = Constructor.instance;
        console.log(this.c);
        this.bindDelKey();
        var sidebarContainer = document.getElementById("constructor-sidebar");
        if (sidebarContainer) {
            this.sidebarControl = new SidebarUIControl();
            sidebarContainer.appendChild(this.sidebarControl.getElement());
        }
        var toolbarContainer = document.getElementById("constructor-toolbar");
        if (toolbarContainer) {
            this.toolbarControl = new ToolbarUIControl();
            toolbarContainer.appendChild(this.toolbarControl.getElement());
        }
    }
    ConstructorUI.init = function () {
        document.addEventListener("DOMContentLoaded", function () {
            ConstructorUI.instance = new ConstructorUI();
        });
    };
    ConstructorUI.prototype.bindDelKey = function () {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 46) {
                var selection = _this.c.getSelection();
                if (selection) {
                    selection.remove();
                }
            }
        }, false);
    };
    ConstructorUI.test = ConstructorUI.init();
    return ConstructorUI;
}());
var LayersUIControl = (function (_super) {
    __extends(LayersUIControl, _super);
    function LayersUIControl(side) {
        var _this = _super.call(this, side) || this;
        _this.update();
        return _this;
    }
    LayersUIControl.prototype.getClassName = function () {
        return "constructor-layers-control";
    };
    LayersUIControl.prototype.update = function () {
        var _this = this;
        this.clear();
        this.trigger.getLayers().forEach(function (layer) {
            _this.append(new LayerUIControl(layer));
        });
        this.updateVisibility();
    };
    LayersUIControl.prototype.updateVisibility = function () {
        if (this.isVisible() != this.trigger.isVisible()) {
            this.setVisible(this.trigger.isVisible());
        }
    };
    return LayersUIControl;
}(TriggeredUIControl));
var LeftPaneUIControl = (function (_super) {
    __extends(LeftPaneUIControl, _super);
    function LeftPaneUIControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftPaneUIControl.prototype.getClassName = function () {
        return "left-pane-control";
    };
    return LeftPaneUIControl;
}(UIControl));
var RightPaneUIControl = (function (_super) {
    __extends(RightPaneUIControl, _super);
    function RightPaneUIControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RightPaneUIControl.prototype.getClassName = function () {
        return "right-pane-control";
    };
    return RightPaneUIControl;
}(UIControl));
//# sourceMappingURL=constructor.js.map