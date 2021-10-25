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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
        try {
            if (args.length === 1) {
                if (typeof args[0] === Constants.STRING)
                    _this = _super.apply(this, args) || this;
                else
                    _this = _super.call(this, args[0].toRgba()) || this;
            }
            else
                _this = _super.call(this, Color.componentsToRgbaString.apply(Color, args)) || this;
        }
        catch (e) {
            return Color.BLACK;
        }
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
    Constants["INPUT"] = "input";
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
    Constants["SELECTION_CREATED"] = "selection:created";
    Constants["SELECTION_UPDATED"] = "selection:updated";
    Constants["MOUSE_UP"] = "mouse:up";
    Constants["TEXT_EDITING_ENTERED"] = "text:editing:entered";
    Constants["EDITING_ENTERED"] = "editing:entered";
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
    Constants["OBJECT_2D_BORDER"] = "visible-border";
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
    Constants["MESH"] = "Mesh";
    Constants["GROUP"] = "Group";
    Constants["MULTI_MATERIAL_NAME_SEPARATOR"] = "+";
    Constants["MATERIAL_NAME_SEPARATOR"] = "_";
    Constants["PNG"] = "png";
    Constants["JPG"] = "jpg";
    Constants[Constants["PREVIEW_SIZE"] = 500] = "PREVIEW_SIZE";
    Constants["FRAME_DEFAULT_FILL"] = "rgb(120, 213, 115)";
})(Constants || (Constants = {}));
var Version = (function () {
    function Version() {
    }
    Version.version = "25.10.2021 11:08";
    return Version;
}());
var Trigger = (function () {
    function Trigger() {
        this.actions = {};
        this.visibilityActions = [];
    }
    Trigger.prototype.hasUpdatedRecently = function (key) {
        return Trigger.actionUpdateTimes[key]
            && (new Date().getTime() - Trigger.actionUpdateTimes[key]) < Trigger.minUpdateInterval;
    };
    Trigger.prototype.isUpdateScheduled = function (key) {
        return Trigger.updateSchedule[key];
    };
    Trigger.prototype.changed = function () {
        var _this = this;
        if (Trigger.preventUpdate) {
            return;
        }
        Object.keys(this.actions).forEach(function (key, id) {
            if (_this.isUpdateScheduled(key)) {
                return;
            }
            if (_this.hasUpdatedRecently(key)) {
                setTimeout(function () {
                    Trigger.actionUpdateTimes[key] = new Date().getTime();
                    var control = UIControl.getById(key);
                    if (!control) {
                        delete _this.actions[key];
                        return;
                    }
                    var action = _this.actions[key];
                    try {
                        action(_this);
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                    Trigger.updateSchedule[key] = false;
                }, Trigger.minUpdateInterval);
                Trigger.updateSchedule[key] = true;
                return;
            }
            Trigger.actionUpdateTimes[key] = new Date().getTime();
            var control = UIControl.getById(key);
            if (!control) {
                delete _this.actions[key];
                return;
            }
            var action = _this.actions[key];
            try {
                setTimeout(function () { return action(_this); }, 0);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    };
    Trigger.prototype.visibilityChanged = function () {
        var _this = this;
        this.visibilityActions.forEach(function (action) { return action(_this); });
    };
    Trigger.prototype.onChange = function (action, object) {
        this.actions[object.getId()] = action;
    };
    Trigger.prototype.onVisibilityChange = function (action) {
        this.visibilityActions.push(action);
    };
    Trigger.actionUpdateTimes = {};
    Trigger.updateSchedule = {};
    Trigger.preventUpdate = false;
    Trigger.minUpdateInterval = 100;
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
        this.getElement().style.display = null;
        this.visibilityChanged();
        return this;
    };
    View.prototype.hide = function () {
        this.getElement().style.display = Constants.NONE;
        this.visibilityChanged();
        return this;
    };
    View.prototype.setVisible = function (value) {
        if (value != this.isVisible()) {
            value ? this.show() : this.hide();
        }
    };
    View.prototype.toggleVisibility = function () {
        this.setVisible(!this.isVisible());
    };
    View.prototype.clear = function () {
        this.getElement().innerHTML = "";
        this.changed();
    };
    View.prototype.allowUserSelect = function () {
        this.container.style.userSelect = 'all';
        return this;
    };
    View.prototype.isVisible = function () {
        return this.getElement() != null
            && this.getElement().style != null
            && this.getElement().style.display != Constants.NONE;
    };
    View.prototype.getClassName = function () {
        return "";
    };
    View.prototype.addClass = function (className) {
        if (!this.hasClass(className)) {
            this.container.classList.add(className);
        }
        return this;
    };
    View.prototype.removeClass = function (className) {
        if (this.hasClass(className)) {
            this.container.classList.remove(className);
        }
        return this;
    };
    View.prototype.hasClass = function (className) {
        return this.container.classList.contains(className);
    };
    View.prototype.toggleClass = function (className) {
        this.hasClass(className)
            ? this.removeClass(className)
            : this.addClass(className);
    };
    View.prototype.setFontFamily = function (fontFamily) {
        this.container.style.fontFamily = fontFamily;
        return this;
    };
    View.prototype.setFontSize = function (fontSize) {
        this.container.style.fontSize = fontSize + "px";
        return this;
    };
    View.prototype.isEmpty = function () {
        return this.container.innerHTML == "";
    };
    View.prototype.setColor = function (value) {
        this.container.style.color = value;
        return this;
    };
    View.prototype.setBackgroundColor = function (value) {
        this.container.style.backgroundColor = value;
        return this;
    };
    View.prototype.setAttribute = function (attributeName, value) {
        this.container.setAttribute(attributeName, value);
        return this;
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
        _this.isLoaded = false;
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
        _this.renderer.setSize(400, 300);
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
    Preview.prototype.setModel = function (modelName, json, callback) {
        var _this = this;
        Constructor.instance.spinner.show();
        this.modelName = modelName;
        Preview.objectLoader.manager.onError = function () { return Constructor.instance.spinner.hide(); };
        Preview.objectLoader.parse(json, function (object) {
            _this.setScene(object);
            Constructor.instance.spinner.hide();
            if (callback)
                callback();
        });
    };
    Preview.prototype.loadModel = function (modelName, callback, error) {
        var _this = this;
        if (this.modelName == modelName) {
            if (callback)
                callback();
            return;
        }
        this.isLoaded = false;
        Constructor.instance.spinner.show();
        this.modelName = modelName;
        if (!Constructor.instance.is2dEditorMode()) {
            Preview.objectLoader.manager.onError = function () {
                Constructor.instance.spinner.hide();
                error && error("Failed to load model: " + modelName);
            };
            Preview.objectLoader.load(Constructor.settings.urls.models + this.modelName + Constructor.settings.fileExtensions.model, function (object) {
                _this.setScene(object);
                Constructor.instance.spinner.hide();
                _this.isLoaded = true;
                if (callback)
                    callback();
            });
        }
        else {
            this.isLoaded = true;
            Constructor.instance.spinner.hide();
        }
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
                if (!side || !side.canvas) {
                    Constructor.instance.preview.sides[i].visible = false;
                    return "continue";
                }
                var w = side.canvas.getWidth();
                var h = side.canvas.getHeight();
                var multiplier = Constructor.settings.previewTextureSize / Math.max(w, h);
                try {
                    var src = side.canvas.toDataURL({ format: Constants.PNG, multiplier: multiplier });
                    this_1.sides[i].userData = null;
                    var image_1 = document.createElement(Constants.IMG);
                    image_1.src = src;
                    image_1.onload = function () {
                        map = new THREE.Texture(image_1);
                        map.wrapS = map.wrapT = THREE.ClampToEdgeWrapping;
                        map.needsUpdate = true;
                        var side = Constructor.instance.preview.sides[i];
                        side.alphaTest = 0.01;
                        side.map = map;
                        side.transparent = true;
                        side.needsUpdate = true;
                        side.userData = true;
                        side.visible = true;
                        Constructor.instance.preview.render();
                    };
                }
                catch (e) {
                    console.error("failed to update side", side.getIndex(), e);
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
    Preview.prototype.setSceneBackgroundColor = function (value) {
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
        this.createDefaultSide = (window.constructorConfiguration && window.constructorConfiguration.createDefaultSide) || false;
        this.ui = {
            layerIconSize: 38
        };
        this.urls = {
            textures: "textures/",
            maps: "textures/maps/",
            models: (window.constructorConfiguration && window.constructorConfiguration.modelsUrl) || "models/",
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
                text: "Text",
                fontSize: 100,
                fontFamily: "Helvetica"
            }
        };
        this.rotationStep = 15;
        this.snapSize = 10;
        this.gridSize = 20;
        this.duplicateOffset = 10;
        this.stateBufferSize = 100;
        this.previewTextureSize = 4096;
        this.previewBackgroundColor = "#eeeeee";
        this.fitIntoMargins = false;
        this.localStorage = {
            enabled: true,
            keyPrefix: "CONSTRUCTOR_STATE_"
        };
        this.autoSize = false;
        this.printWidth = window.constructorConfiguration ? window.constructorConfiguration.printWidth : 800;
    }
    return Settings;
}());
var Constructor = (function (_super) {
    __extends(Constructor, _super);
    function Constructor(container, state) {
        var _this = _super.call(this, container instanceof HTMLElement ? container : document.getElementById(container)) || this;
        _this.sides = [];
        _this.onSelectHandler = function () {
        };
        _this.onDeselectHandler = function () {
        };
        _this.onModeChangeHandler = function () {
        };
        _this.onElementModificationHandler = function () {
        };
        _this.isExplicitlyLoaded = false;
        _this.dummyElement = document.createElement('empty');
        Constructor.instance = _this;
        _this.container.style.overflow = Constants.AUTO;
        fabric.textureSize = 4096;
        _this.clipboard = null;
        _this.snapToObjects = false;
        _this.setMode(Mode.Mode2D);
        _this.spinner = new Spinner(_this.container);
        _this.preview = new Preview(_this);
        var width = _this.container.parentElement
            ? _this.container.parentElement.clientWidth * .8
            : 320;
        var height = _this.container.parentElement
            ? _this.container.parentElement.clientHeight * .8
            : 240;
        if (state) {
            try {
                _this.setState(state);
            }
            catch (e) {
                console.error(e);
                _this.addSide(width, height);
            }
        }
        else if (Constructor.settings.createDefaultSide) {
            _this.addSide(width, height);
        }
        _this.preview.hide();
        Constructor.onReadyHandler && Constructor.onReadyHandler();
        _this.background = _this.container.style.background;
        _this.container.style.background = null;
        console.log("Constructor.version: ", Constructor.version);
        console.log("fabric.js.version: ", fabric.version);
        window.addEventListener("resize", function () {
            Constructor.instance.preview.autoSize();
            Constructor.instance.spinner.update();
            var div = container;
            Constructor.instance.zoomToFit();
        });
        return _this;
    }
    Constructor.onReady = function (handler) {
        Constructor.onReadyHandler = handler;
    };
    Constructor.onUpdate = function (handler) {
        Constructor.onUpdateHandlers.push(handler);
    };
    Constructor.onTextEditingEntered = function (handler) {
        Constructor.onTextEditingEnteredHandler = handler;
    };
    Constructor.prototype.loadModel = function (modelName, mode, callback, error) {
        if (ConstructorUI.instance.options) {
            ConstructorUI.instance.options.mode = mode;
        }
        if (this.state) {
            this.state['mode'] = mode;
        }
        Utils.logMethodName();
        this.preview.loadModel(modelName, callback, error);
        this.changed();
        if (this.is2dEditorMode()) {
            this.setMode(Mode.Mode2D);
        }
    };
    Constructor.prototype.addSide = function (width, height, roundCorners, name, price, productImage, mask) {
        Utils.logMethodName();
        var side = new Side2D(this.container, width, height, roundCorners, name, price, productImage, mask);
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
            side.canvas.renderAll();
            side.zoomToFit();
        }
        this.changed();
    };
    Constructor.prototype.is2dEditorMode = function () {
        return (this.state && this.state['mode'] === '2d') ||
            (ConstructorUI.instance.options && ConstructorUI.instance.options.mode === '2d');
    };
    Constructor.prototype.hasImages = function () {
        for (var _i = 0, _a = Constructor.instance.sides; _i < _a.length; _i++) {
            var side = _a[_i];
            if (side.getImageSources().length != 0) {
                return true;
            }
        }
        return false;
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
            this.getActiveSide().canvas.renderAll();
            this.zoomToFit();
            this.changed();
        }
    };
    Constructor.prototype.getActiveSide = function () {
        if (!this.sides || this.sides.length == 0) {
            return new Side2D(this.dummyElement, 0, 0);
        }
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
        if (this.is3D()) {
            this.preview.controls.dollyIn(1 + Constructor.zoomStep);
            this.preview.controls.update();
        }
        else {
            this.getActiveSide().setZoom(this.getActiveSide().getZoom() + Constructor.zoomStep);
        }
    };
    Constructor.prototype.zoomOut = function () {
        if (this.is3D()) {
            this.preview.controls.dollyOut(1 + Constructor.zoomStep);
            this.preview.controls.update();
        }
        else {
            this.getActiveSide().setZoom(this.getActiveSide().getZoom() - Constructor.zoomStep);
        }
    };
    Constructor.prototype.zoomToFit = function () {
        var _this = this;
        if (this.is3D()) {
        }
        else {
            if (!this.getActiveSide()) {
                setTimeout(function () { return _this.zoomToFit(); }, 10);
            }
            else {
                this.getActiveSide().zoomToFit();
            }
        }
    };
    Constructor.prototype.resetZoom = function () {
        this.getActiveSide().resetZoom();
    };
    Constructor.prototype.is3D = function () {
        return this.getMode() === Mode.Mode3D;
    };
    Constructor.prototype.is2D = function () {
        return this.getMode() === Mode.Mode2D;
    };
    Constructor.prototype.getMode = function () {
        return (this.preview && this.preview.isVisible()) ? Mode.Mode3D : Mode.Mode2D;
    };
    Constructor.prototype.toggleSnapToGrid = function () {
        this.snapToGrid = !this.snapToGrid;
        this.changed();
    };
    Constructor.prototype.toggleSnapToObjects = function () {
        this.snapToObjects = !this.snapToObjects;
        this.changed();
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
                this.preview.autoSize();
                this.getActiveSide().deselect();
                this.preview.updateSideMaterials();
                this.getActiveSide().hide();
                this.preview.show();
                this.preview.render();
                if (this.onModeChangeHandler)
                    this.onModeChangeHandler();
            }
            this.changed();
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
    Constructor.prototype.hasSelection = function () {
        return this.getSelection() != null;
    };
    Constructor.prototype.hasTextSelection = function () {
        return this.getSelection() != null && this.getSelection().type == ElementType.TEXT;
    };
    Constructor.prototype.hasImageSelection = function () {
        return this.getSelection() != null && this.getSelection().type == ElementType.IMAGE;
    };
    Constructor.prototype.getSelection = function () {
        if (this.sides.length == 0) {
            return null;
        }
        return this.getActiveSide().selection;
    };
    Constructor.prototype.addElement = function (type) {
        Utils.logMethodName();
        var element = this.getActiveSide().addElement(type);
        element.object.setOptions(Constructor.settings.elementDefaults[type.getNativeTypeName()]);
        element.setColor(Color.random());
        if (Constructor.instance.is2dEditorMode()) {
            element.setPositionAtCenterOfViewport();
        }
        else {
            element.randomizePosition();
        }
        this.changed();
        return element;
    };
    Constructor.prototype.addText = function (value) {
        var element = this.addElement(ElementType.TEXT);
        if (value) {
            element.setText(value);
        }
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
            element.changed();
            callback && callback(element);
        });
        return element;
    };
    Constructor.prototype.addFrame = function (src, dimensions) {
        var side = this.getActiveSide();
        var frame = new Frame(side, src, null, dimensions);
        var element = this.getActiveSide().add(frame);
        return element;
    };
    Constructor.prototype.changed = function () {
        _super.prototype.changed.call(this);
        Constructor.onUpdateHandlers.forEach(function (handler) { return handler(); });
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
        var _this = this;
        var selection = this.getSelection();
        if (selection) {
            selection.clone(function (element) {
                _this.getActiveSide().add(element);
                _this.getActiveSide().saveState();
                element.randomizePosition();
                return _this.getActiveSide().select(element);
            });
        }
    };
    Constructor.prototype.getState = function (prettyPrint) {
        var state = new ConstructorState();
        this.sides.forEach(function (side) { return state.sides.push(side.serialize()); });
        state.model = this.preview.modelName;
        state.fills = [];
        state.mode = Constructor.instance.is2dEditorMode() ? '2d' : '3d';
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
        else {
            state = json;
        }
        if (clearHistory)
            localStorage.clear();
        this.deleteAllSides();
        this.state = state;
        if (state.sides) {
            state.sides.forEach(function (sideState) {
                var side = Side2D.prototype.deserialize(sideState);
                if (side.elements && side.elements.length > 0) {
                    _this.insertSide(side, true);
                }
                else {
                    _this.insertSide(side, clearHistory);
                }
                side.canvas.renderAll();
            });
        }
        this.sides.forEach(function (side) { return side.saveState(); });
        if (state.model && this.preview.modelName != state.model) {
            this.loadModel(state.model, state.mode, function () {
                _this.setFills(state);
                if (callback)
                    callback();
            });
        }
        else {
            this.setFills(state);
            if (callback)
                callback();
        }
    };
    Constructor.prototype.setFills = function (state) {
        if (state.fills) {
            for (var i = 0; i < state.fills.length; i++) {
                if (this.preview.fills[i]) {
                    this.preview.fills[i].color = new THREE.Color(state.fills[i]);
                }
            }
            this.preview.render();
        }
    };
    Constructor.prototype.undo = function () {
        this.getActiveSide().undo();
    };
    Constructor.prototype.redo = function () {
        this.getActiveSide().redo();
    };
    Constructor.onTextEditingEnteredHandler = function () {
    };
    Constructor.version = Version.version;
    Constructor.settings = new Settings();
    Constructor.zoomStep = 0.5;
    Constructor.onReadyHandler = function () { return true; };
    Constructor.onUpdateHandlers = [];
    return Constructor;
}(View));
var ConstructorState = (function () {
    function ConstructorState() {
        this.model = null;
        this.mode = '3d';
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
    function HistoryList() {
        this.cursor = 0;
        this.history = [];
        this.locked = false;
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
        if (this.history.length == 0) {
            return null;
        }
        return this.history[this.cursor];
    };
    HistoryList.prototype.hasNext = function () {
        return this.cursor < (this.history.length - 1);
    };
    HistoryList.prototype.hasPrevious = function () {
        return this.cursor > 0;
    };
    HistoryList.prototype.back = function () {
        if (this.hasPrevious()) {
            this.cursor--;
            return this.current();
        }
        return null;
    };
    HistoryList.prototype.forward = function () {
        if (this.hasNext()) {
            this.cursor++;
            return this.current();
        }
        return null;
    };
    HistoryList.prototype.add = function (value) {
        if (!this.locked && value != this.current()) {
            if (this.hasNext()) {
                this.history.splice(this.cursor);
            }
            this.history.push(value);
            this.forward();
        }
    };
    return HistoryList;
}());
var Icon;
(function (Icon) {
    Icon["ACCESSIBLE_ICON"] = "<i class=\"fa fa-accessible-icon\"></i>";
    Icon["ACCUSOFT"] = "<i class=\"fa fa-accusoft\"></i>";
    Icon["ACQUISITIONS_INCORPORATED"] = "<i class=\"fa fa-acquisitions-incorporated\"></i>";
    Icon["AD"] = "<i class=\"fa fa-ad\"></i>";
    Icon["ADDRESS_BOOK"] = "<i class=\"fa fa-address-book\"></i>";
    Icon["ADDRESS_CARD"] = "<i class=\"fa fa-address-card\"></i>";
    Icon["ADJUST"] = "<i class=\"fa fa-adjust\"></i>";
    Icon["ADN"] = "<i class=\"fa fa-adn\"></i>";
    Icon["ADVERSAL"] = "<i class=\"fa fa-adversal\"></i>";
    Icon["AFFILIATETHEME"] = "<i class=\"fa fa-affiliatetheme\"></i>";
    Icon["AIRBNB"] = "<i class=\"fa fa-airbnb\"></i>";
    Icon["AIR_FRESHENER"] = "<i class=\"fa fa-air-freshener\"></i>";
    Icon["ALGOLIA"] = "<i class=\"fa fa-algolia\"></i>";
    Icon["ALIGN_CENTER"] = "<i class=\"fa fa-align-center\"></i>";
    Icon["ALIGN_JUSTIFY"] = "<i class=\"fa fa-align-justify\"></i>";
    Icon["ALIGN_LEFT"] = "<i class=\"fa fa-align-left\"></i>";
    Icon["ALIGN_RIGHT"] = "<i class=\"fa fa-align-right\"></i>";
    Icon["ALIPAY"] = "<i class=\"fa fa-alipay\"></i>";
    Icon["ALLERGIES"] = "<i class=\"fa fa-allergies\"></i>";
    Icon["AMAZON"] = "<i class=\"fa fa-amazon\"></i>";
    Icon["AMAZON_PAY"] = "<i class=\"fa fa-amazon-pay\"></i>";
    Icon["AMBULANCE"] = "<i class=\"fa fa-ambulance\"></i>";
    Icon["AMERICAN_SIGN_LANGUAGE_INTERPRETING"] = "<i class=\"fa fa-american-sign-language-interpreting\"></i>";
    Icon["AMILIA"] = "<i class=\"fa fa-amilia\"></i>";
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
    Icon["ANGRY"] = "<i class=\"fa fa-angry\"></i>";
    Icon["ANGRYCREATIVE"] = "<i class=\"fa fa-angrycreative\"></i>";
    Icon["ANGULAR"] = "<i class=\"fa fa-angular\"></i>";
    Icon["ANKH"] = "<i class=\"fa fa-ankh\"></i>";
    Icon["APPER"] = "<i class=\"fa fa-apper\"></i>";
    Icon["APPLE"] = "<i class=\"fa fa-apple\"></i>";
    Icon["APPLE_ALT"] = "<i class=\"fa fa-apple-alt\"></i>";
    Icon["APPLE_PAY"] = "<i class=\"fa fa-apple-pay\"></i>";
    Icon["APP_STORE"] = "<i class=\"fa fa-app-store\"></i>";
    Icon["APP_STORE_IOS"] = "<i class=\"fa fa-app-store-ios\"></i>";
    Icon["ARCHIVE"] = "<i class=\"fa fa-archive\"></i>";
    Icon["ARCHWAY"] = "<i class=\"fa fa-archway\"></i>";
    Icon["ARROWS_ALT"] = "<i class=\"fa fa-arrows-alt\"></i>";
    Icon["ARROWS_ALT_H"] = "<i class=\"fa fa-arrows-alt-h\"></i>";
    Icon["ARROWS_ALT_V"] = "<i class=\"fa fa-arrows-alt-v\"></i>";
    Icon["ARROW_ALT_CIRCLE_DOWN"] = "<i class=\"fa fa-arrow-alt-circle-down\"></i>";
    Icon["ARROW_ALT_CIRCLE_LEFT"] = "<i class=\"fa fa-arrow-alt-circle-left\"></i>";
    Icon["ARROW_ALT_CIRCLE_RIGHT"] = "<i class=\"fa fa-arrow-alt-circle-right\"></i>";
    Icon["ARROW_ALT_CIRCLE_UP"] = "<i class=\"fa fa-arrow-alt-circle-up\"></i>";
    Icon["ARROW_CIRCLE_DOWN"] = "<i class=\"fa fa-arrow-circle-down\"></i>";
    Icon["ARROW_CIRCLE_LEFT"] = "<i class=\"fa fa-arrow-circle-left\"></i>";
    Icon["ARROW_CIRCLE_RIGHT"] = "<i class=\"fa fa-arrow-circle-right\"></i>";
    Icon["ARROW_CIRCLE_UP"] = "<i class=\"fa fa-arrow-circle-up\"></i>";
    Icon["ARROW_DOWN"] = "<i class=\"fa fa-arrow-down\"></i>";
    Icon["ARROW_LEFT"] = "<i class=\"fa fa-arrow-left\"></i>";
    Icon["ARROW_RIGHT"] = "<i class=\"fa fa-arrow-right\"></i>";
    Icon["ARROW_UP"] = "<i class=\"fa fa-arrow-up\"></i>";
    Icon["ARTSTATION"] = "<i class=\"fa fa-artstation\"></i>";
    Icon["ASSISTIVE_LISTENING_SYSTEMS"] = "<i class=\"fa fa-assistive-listening-systems\"></i>";
    Icon["ASTERISK"] = "<i class=\"fa fa-asterisk\"></i>";
    Icon["ASYMMETRIK"] = "<i class=\"fa fa-asymmetrik\"></i>";
    Icon["AT"] = "<i class=\"fa fa-at\"></i>";
    Icon["ATLAS"] = "<i class=\"fa fa-atlas\"></i>";
    Icon["ATLASSIAN"] = "<i class=\"fa fa-atlassian\"></i>";
    Icon["ATOM"] = "<i class=\"fa fa-atom\"></i>";
    Icon["AUDIBLE"] = "<i class=\"fa fa-audible\"></i>";
    Icon["AUDIO_DESCRIPTION"] = "<i class=\"fa fa-audio-description\"></i>";
    Icon["AUTOPREFIXER"] = "<i class=\"fa fa-autoprefixer\"></i>";
    Icon["AVIANEX"] = "<i class=\"fa fa-avianex\"></i>";
    Icon["AVIATO"] = "<i class=\"fa fa-aviato\"></i>";
    Icon["AWARD"] = "<i class=\"fa fa-award\"></i>";
    Icon["AWS"] = "<i class=\"fa fa-aws\"></i>";
    Icon["BABY"] = "<i class=\"fa fa-baby\"></i>";
    Icon["BABY_CARRIAGE"] = "<i class=\"fa fa-baby-carriage\"></i>";
    Icon["BACKSPACE"] = "<i class=\"fa fa-backspace\"></i>";
    Icon["BACKWARD"] = "<i class=\"fa fa-backward\"></i>";
    Icon["BACON"] = "<i class=\"fa fa-bacon\"></i>";
    Icon["BACTERIA"] = "<i class=\"fa fa-bacteria\"></i>";
    Icon["BACTERIUM"] = "<i class=\"fa fa-bacterium\"></i>";
    Icon["BAHAI"] = "<i class=\"fa fa-bahai\"></i>";
    Icon["BALANCE_SCALE"] = "<i class=\"fa fa-balance-scale\"></i>";
    Icon["BALANCE_SCALE_LEFT"] = "<i class=\"fa fa-balance-scale-left\"></i>";
    Icon["BALANCE_SCALE_RIGHT"] = "<i class=\"fa fa-balance-scale-right\"></i>";
    Icon["BAN"] = "<i class=\"fa fa-ban\"></i>";
    Icon["BANDCAMP"] = "<i class=\"fa fa-bandcamp\"></i>";
    Icon["BAND_AID"] = "<i class=\"fa fa-band-aid\"></i>";
    Icon["BARCODE"] = "<i class=\"fa fa-barcode\"></i>";
    Icon["BARS"] = "<i class=\"fa fa-bars\"></i>";
    Icon["BASEBALL_BALL"] = "<i class=\"fa fa-baseball-ball\"></i>";
    Icon["BASKETBALL_BALL"] = "<i class=\"fa fa-basketball-ball\"></i>";
    Icon["BATH"] = "<i class=\"fa fa-bath\"></i>";
    Icon["BATTERY_EMPTY"] = "<i class=\"fa fa-battery-empty\"></i>";
    Icon["BATTERY_FULL"] = "<i class=\"fa fa-battery-full\"></i>";
    Icon["BATTERY_HALF"] = "<i class=\"fa fa-battery-half\"></i>";
    Icon["BATTERY_QUARTER"] = "<i class=\"fa fa-battery-quarter\"></i>";
    Icon["BATTERY_THREE_QUARTERS"] = "<i class=\"fa fa-battery-three-quarters\"></i>";
    Icon["BATTLE_NET"] = "<i class=\"fa fa-battle-net\"></i>";
    Icon["BED"] = "<i class=\"fa fa-bed\"></i>";
    Icon["BEER"] = "<i class=\"fa fa-beer\"></i>";
    Icon["BEHANCE"] = "<i class=\"fa fa-behance\"></i>";
    Icon["BEHANCE_SQUARE"] = "<i class=\"fa fa-behance-square\"></i>";
    Icon["BELL"] = "<i class=\"fa fa-bell\"></i>";
    Icon["BELL_SLASH"] = "<i class=\"fa fa-bell-slash\"></i>";
    Icon["BEZIER_CURVE"] = "<i class=\"fa fa-bezier-curve\"></i>";
    Icon["BIBLE"] = "<i class=\"fa fa-bible\"></i>";
    Icon["BICYCLE"] = "<i class=\"fa fa-bicycle\"></i>";
    Icon["BIKING"] = "<i class=\"fa fa-biking\"></i>";
    Icon["BIMOBJECT"] = "<i class=\"fa fa-bimobject\"></i>";
    Icon["BINOCULARS"] = "<i class=\"fa fa-binoculars\"></i>";
    Icon["BIOHAZARD"] = "<i class=\"fa fa-biohazard\"></i>";
    Icon["BIRTHDAY_CAKE"] = "<i class=\"fa fa-birthday-cake\"></i>";
    Icon["BITBUCKET"] = "<i class=\"fa fa-bitbucket\"></i>";
    Icon["BITCOIN"] = "<i class=\"fa fa-bitcoin\"></i>";
    Icon["BITY"] = "<i class=\"fa fa-bity\"></i>";
    Icon["BLACKBERRY"] = "<i class=\"fa fa-blackberry\"></i>";
    Icon["BLACK_TIE"] = "<i class=\"fa fa-black-tie\"></i>";
    Icon["BLENDER"] = "<i class=\"fa fa-blender\"></i>";
    Icon["BLENDER_PHONE"] = "<i class=\"fa fa-blender-phone\"></i>";
    Icon["BLIND"] = "<i class=\"fa fa-blind\"></i>";
    Icon["BLOG"] = "<i class=\"fa fa-blog\"></i>";
    Icon["BLOGGER"] = "<i class=\"fa fa-blogger\"></i>";
    Icon["BLOGGER_B"] = "<i class=\"fa fa-blogger-b\"></i>";
    Icon["BLUETOOTH"] = "<i class=\"fa fa-bluetooth\"></i>";
    Icon["BLUETOOTH_B"] = "<i class=\"fa fa-bluetooth-b\"></i>";
    Icon["BOLD"] = "<i class=\"fa fa-bold\"></i>";
    Icon["BOLT"] = "<i class=\"fa fa-bolt\"></i>";
    Icon["BOMB"] = "<i class=\"fa fa-bomb\"></i>";
    Icon["BONE"] = "<i class=\"fa fa-bone\"></i>";
    Icon["BONG"] = "<i class=\"fa fa-bong\"></i>";
    Icon["BOOK"] = "<i class=\"fa fa-book\"></i>";
    Icon["BOOKMARK"] = "<i class=\"fa fa-bookmark\"></i>";
    Icon["BOOK_DEAD"] = "<i class=\"fa fa-book-dead\"></i>";
    Icon["BOOK_MEDICAL"] = "<i class=\"fa fa-book-medical\"></i>";
    Icon["BOOK_OPEN"] = "<i class=\"fa fa-book-open\"></i>";
    Icon["BOOK_READER"] = "<i class=\"fa fa-book-reader\"></i>";
    Icon["BOOTSTRAP"] = "<i class=\"fa fa-bootstrap\"></i>";
    Icon["BORDER_ALL"] = "<i class=\"fa fa-border-all\"></i>";
    Icon["BORDER_NONE"] = "<i class=\"fa fa-border-none\"></i>";
    Icon["BORDER_STYLE"] = "<i class=\"fa fa-border-style\"></i>";
    Icon["BOWLING_BALL"] = "<i class=\"fa fa-bowling-ball\"></i>";
    Icon["BOX"] = "<i class=\"fa fa-box\"></i>";
    Icon["BOXES"] = "<i class=\"fa fa-boxes\"></i>";
    Icon["BOX_OPEN"] = "<i class=\"fa fa-box-open\"></i>";
    Icon["BOX_TISSUE"] = "<i class=\"fa fa-box-tissue\"></i>";
    Icon["BRAILLE"] = "<i class=\"fa fa-braille\"></i>";
    Icon["BRAIN"] = "<i class=\"fa fa-brain\"></i>";
    Icon["BREAD_SLICE"] = "<i class=\"fa fa-bread-slice\"></i>";
    Icon["BRIEFCASE"] = "<i class=\"fa fa-briefcase\"></i>";
    Icon["BRIEFCASE_MEDICAL"] = "<i class=\"fa fa-briefcase-medical\"></i>";
    Icon["BROADCAST_TOWER"] = "<i class=\"fa fa-broadcast-tower\"></i>";
    Icon["BROOM"] = "<i class=\"fa fa-broom\"></i>";
    Icon["BRUSH"] = "<i class=\"fa fa-brush\"></i>";
    Icon["BTC"] = "<i class=\"fa fa-btc\"></i>";
    Icon["BUFFER"] = "<i class=\"fa fa-buffer\"></i>";
    Icon["BUG"] = "<i class=\"fa fa-bug\"></i>";
    Icon["BUILDING"] = "<i class=\"fa fa-building\"></i>";
    Icon["BULLHORN"] = "<i class=\"fa fa-bullhorn\"></i>";
    Icon["BULLSEYE"] = "<i class=\"fa fa-bullseye\"></i>";
    Icon["BURN"] = "<i class=\"fa fa-burn\"></i>";
    Icon["BUROMOBELEXPERTE"] = "<i class=\"fa fa-buromobelexperte\"></i>";
    Icon["BUS"] = "<i class=\"fa fa-bus\"></i>";
    Icon["BUSINESS_TIME"] = "<i class=\"fa fa-business-time\"></i>";
    Icon["BUS_ALT"] = "<i class=\"fa fa-bus-alt\"></i>";
    Icon["BUYSELLADS"] = "<i class=\"fa fa-buysellads\"></i>";
    Icon["BUY_N_LARGE"] = "<i class=\"fa fa-buy-n-large\"></i>";
    Icon["CALCULATOR"] = "<i class=\"fa fa-calculator\"></i>";
    Icon["CALENDAR"] = "<i class=\"fa fa-calendar\"></i>";
    Icon["CALENDAR_ALT"] = "<i class=\"fa fa-calendar-alt\"></i>";
    Icon["CALENDAR_CHECK"] = "<i class=\"fa fa-calendar-check\"></i>";
    Icon["CALENDAR_DAY"] = "<i class=\"fa fa-calendar-day\"></i>";
    Icon["CALENDAR_MINUS"] = "<i class=\"fa fa-calendar-minus\"></i>";
    Icon["CALENDAR_PLUS"] = "<i class=\"fa fa-calendar-plus\"></i>";
    Icon["CALENDAR_TIMES"] = "<i class=\"fa fa-calendar-times\"></i>";
    Icon["CALENDAR_WEEK"] = "<i class=\"fa fa-calendar-week\"></i>";
    Icon["CAMERA"] = "<i class=\"fa fa-camera\"></i>";
    Icon["CAMERA_RETRO"] = "<i class=\"fa fa-camera-retro\"></i>";
    Icon["CAMPGROUND"] = "<i class=\"fa fa-campground\"></i>";
    Icon["CANADIAN_MAPLE_LEAF"] = "<i class=\"fa fa-canadian-maple-leaf\"></i>";
    Icon["CANDY_CANE"] = "<i class=\"fa fa-candy-cane\"></i>";
    Icon["CANNABIS"] = "<i class=\"fa fa-cannabis\"></i>";
    Icon["CAPSULES"] = "<i class=\"fa fa-capsules\"></i>";
    Icon["CAR"] = "<i class=\"fa fa-car\"></i>";
    Icon["CARAVAN"] = "<i class=\"fa fa-caravan\"></i>";
    Icon["CARET_DOWN"] = "<i class=\"fa fa-caret-down\"></i>";
    Icon["CARET_LEFT"] = "<i class=\"fa fa-caret-left\"></i>";
    Icon["CARET_RIGHT"] = "<i class=\"fa fa-caret-right\"></i>";
    Icon["CARET_SQUARE_DOWN"] = "<i class=\"fa fa-caret-square-down\"></i>";
    Icon["CARET_SQUARE_LEFT"] = "<i class=\"fa fa-caret-square-left\"></i>";
    Icon["CARET_SQUARE_RIGHT"] = "<i class=\"fa fa-caret-square-right\"></i>";
    Icon["CARET_SQUARE_UP"] = "<i class=\"fa fa-caret-square-up\"></i>";
    Icon["CARET_UP"] = "<i class=\"fa fa-caret-up\"></i>";
    Icon["CARROT"] = "<i class=\"fa fa-carrot\"></i>";
    Icon["CART_ARROW_DOWN"] = "<i class=\"fa fa-cart-arrow-down\"></i>";
    Icon["CART_PLUS"] = "<i class=\"fa fa-cart-plus\"></i>";
    Icon["CAR_ALT"] = "<i class=\"fa fa-car-alt\"></i>";
    Icon["CAR_BATTERY"] = "<i class=\"fa fa-car-battery\"></i>";
    Icon["CAR_CRASH"] = "<i class=\"fa fa-car-crash\"></i>";
    Icon["CAR_SIDE"] = "<i class=\"fa fa-car-side\"></i>";
    Icon["CASH_REGISTER"] = "<i class=\"fa fa-cash-register\"></i>";
    Icon["CAT"] = "<i class=\"fa fa-cat\"></i>";
    Icon["CC_AMAZON_PAY"] = "<i class=\"fa fa-cc-amazon-pay\"></i>";
    Icon["CC_AMEX"] = "<i class=\"fa fa-cc-amex\"></i>";
    Icon["CC_APPLE_PAY"] = "<i class=\"fa fa-cc-apple-pay\"></i>";
    Icon["CC_DINERS_CLUB"] = "<i class=\"fa fa-cc-diners-club\"></i>";
    Icon["CC_DISCOVER"] = "<i class=\"fa fa-cc-discover\"></i>";
    Icon["CC_JCB"] = "<i class=\"fa fa-cc-jcb\"></i>";
    Icon["CC_MASTERCARD"] = "<i class=\"fa fa-cc-mastercard\"></i>";
    Icon["CC_PAYPAL"] = "<i class=\"fa fa-cc-paypal\"></i>";
    Icon["CC_STRIPE"] = "<i class=\"fa fa-cc-stripe\"></i>";
    Icon["CC_VISA"] = "<i class=\"fa fa-cc-visa\"></i>";
    Icon["CENTERCODE"] = "<i class=\"fa fa-centercode\"></i>";
    Icon["CENTOS"] = "<i class=\"fa fa-centos\"></i>";
    Icon["CERTIFICATE"] = "<i class=\"fa fa-certificate\"></i>";
    Icon["CHAIR"] = "<i class=\"fa fa-chair\"></i>";
    Icon["CHALKBOARD"] = "<i class=\"fa fa-chalkboard\"></i>";
    Icon["CHALKBOARD_TEACHER"] = "<i class=\"fa fa-chalkboard-teacher\"></i>";
    Icon["CHARGING_STATION"] = "<i class=\"fa fa-charging-station\"></i>";
    Icon["CHART_AREA"] = "<i class=\"fa fa-chart-area\"></i>";
    Icon["CHART_BAR"] = "<i class=\"fa fa-chart-bar\"></i>";
    Icon["CHART_LINE"] = "<i class=\"fa fa-chart-line\"></i>";
    Icon["CHART_PIE"] = "<i class=\"fa fa-chart-pie\"></i>";
    Icon["CHECK"] = "<i class=\"fa fa-check\"></i>";
    Icon["CHECK_CIRCLE"] = "<i class=\"fa fa-check-circle\"></i>";
    Icon["CHECK_DOUBLE"] = "<i class=\"fa fa-check-double\"></i>";
    Icon["CHECK_SQUARE"] = "<i class=\"fa fa-check-square\"></i>";
    Icon["CHEESE"] = "<i class=\"fa fa-cheese\"></i>";
    Icon["CHESS"] = "<i class=\"fa fa-chess\"></i>";
    Icon["CHESS_BISHOP"] = "<i class=\"fa fa-chess-bishop\"></i>";
    Icon["CHESS_BOARD"] = "<i class=\"fa fa-chess-board\"></i>";
    Icon["CHESS_KING"] = "<i class=\"fa fa-chess-king\"></i>";
    Icon["CHESS_KNIGHT"] = "<i class=\"fa fa-chess-knight\"></i>";
    Icon["CHESS_PAWN"] = "<i class=\"fa fa-chess-pawn\"></i>";
    Icon["CHESS_QUEEN"] = "<i class=\"fa fa-chess-queen\"></i>";
    Icon["CHESS_ROOK"] = "<i class=\"fa fa-chess-rook\"></i>";
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
    Icon["CHROMECAST"] = "<i class=\"fa fa-chromecast\"></i>";
    Icon["CHURCH"] = "<i class=\"fa fa-church\"></i>";
    Icon["CIRCLE"] = "<i class=\"fa fa-circle\"></i>";
    Icon["CIRCLE_NOTCH"] = "<i class=\"fa fa-circle-notch\"></i>";
    Icon["CITY"] = "<i class=\"fa fa-city\"></i>";
    Icon["CLINIC_MEDICAL"] = "<i class=\"fa fa-clinic-medical\"></i>";
    Icon["CLIPBOARD"] = "<i class=\"fa fa-clipboard\"></i>";
    Icon["CLIPBOARD_CHECK"] = "<i class=\"fa fa-clipboard-check\"></i>";
    Icon["CLIPBOARD_LIST"] = "<i class=\"fa fa-clipboard-list\"></i>";
    Icon["CLOCK"] = "<i class=\"fa fa-clock\"></i>";
    Icon["CLONE"] = "<i class=\"fa fa-clone\"></i>";
    Icon["CLOSED_CAPTIONING"] = "<i class=\"fa fa-closed-captioning\"></i>";
    Icon["CLOUD"] = "<i class=\"fa fa-cloud\"></i>";
    Icon["CLOUDFLARE"] = "<i class=\"fa fa-cloudflare\"></i>";
    Icon["CLOUDSCALE"] = "<i class=\"fa fa-cloudscale\"></i>";
    Icon["CLOUDSMITH"] = "<i class=\"fa fa-cloudsmith\"></i>";
    Icon["CLOUDVERSIFY"] = "<i class=\"fa fa-cloudversify\"></i>";
    Icon["CLOUD_DOWNLOAD_ALT"] = "<i class=\"fa fa-cloud-download-alt\"></i>";
    Icon["CLOUD_MEATBALL"] = "<i class=\"fa fa-cloud-meatball\"></i>";
    Icon["CLOUD_MOON"] = "<i class=\"fa fa-cloud-moon\"></i>";
    Icon["CLOUD_MOON_RAIN"] = "<i class=\"fa fa-cloud-moon-rain\"></i>";
    Icon["CLOUD_RAIN"] = "<i class=\"fa fa-cloud-rain\"></i>";
    Icon["CLOUD_SHOWERS_HEAVY"] = "<i class=\"fa fa-cloud-showers-heavy\"></i>";
    Icon["CLOUD_SUN"] = "<i class=\"fa fa-cloud-sun\"></i>";
    Icon["CLOUD_SUN_RAIN"] = "<i class=\"fa fa-cloud-sun-rain\"></i>";
    Icon["CLOUD_UPLOAD_ALT"] = "<i class=\"fa fa-cloud-upload-alt\"></i>";
    Icon["COCKTAIL"] = "<i class=\"fa fa-cocktail\"></i>";
    Icon["CODE"] = "<i class=\"fa fa-code\"></i>";
    Icon["CODEPEN"] = "<i class=\"fa fa-codepen\"></i>";
    Icon["CODE_BRANCH"] = "<i class=\"fa fa-code-branch\"></i>";
    Icon["CODIEPIE"] = "<i class=\"fa fa-codiepie\"></i>";
    Icon["COFFEE"] = "<i class=\"fa fa-coffee\"></i>";
    Icon["COG"] = "<i class=\"fa fa-cog\"></i>";
    Icon["COGS"] = "<i class=\"fa fa-cogs\"></i>";
    Icon["COINS"] = "<i class=\"fa fa-coins\"></i>";
    Icon["COLUMNS"] = "<i class=\"fa fa-columns\"></i>";
    Icon["COMMENT"] = "<i class=\"fa fa-comment\"></i>";
    Icon["COMMENTS"] = "<i class=\"fa fa-comments\"></i>";
    Icon["COMMENTS_DOLLAR"] = "<i class=\"fa fa-comments-dollar\"></i>";
    Icon["COMMENT_ALT"] = "<i class=\"fa fa-comment-alt\"></i>";
    Icon["COMMENT_DOLLAR"] = "<i class=\"fa fa-comment-dollar\"></i>";
    Icon["COMMENT_DOTS"] = "<i class=\"fa fa-comment-dots\"></i>";
    Icon["COMMENT_MEDICAL"] = "<i class=\"fa fa-comment-medical\"></i>";
    Icon["COMMENT_SLASH"] = "<i class=\"fa fa-comment-slash\"></i>";
    Icon["COMPACT_DISC"] = "<i class=\"fa fa-compact-disc\"></i>";
    Icon["COMPASS"] = "<i class=\"fa fa-compass\"></i>";
    Icon["COMPRESS"] = "<i class=\"fa fa-compress\"></i>";
    Icon["COMPRESS_ALT"] = "<i class=\"fa fa-compress-alt\"></i>";
    Icon["COMPRESS_ARROWS_ALT"] = "<i class=\"fa fa-compress-arrows-alt\"></i>";
    Icon["CONCIERGE_BELL"] = "<i class=\"fa fa-concierge-bell\"></i>";
    Icon["CONFLUENCE"] = "<i class=\"fa fa-confluence\"></i>";
    Icon["CONNECTDEVELOP"] = "<i class=\"fa fa-connectdevelop\"></i>";
    Icon["CONTAO"] = "<i class=\"fa fa-contao\"></i>";
    Icon["COOKIE"] = "<i class=\"fa fa-cookie\"></i>";
    Icon["COOKIE_BITE"] = "<i class=\"fa fa-cookie-bite\"></i>";
    Icon["COPY"] = "<i class=\"fa fa-copy\"></i>";
    Icon["COPYRIGHT"] = "<i class=\"fa fa-copyright\"></i>";
    Icon["COTTON_BUREAU"] = "<i class=\"fa fa-cotton-bureau\"></i>";
    Icon["COUCH"] = "<i class=\"fa fa-couch\"></i>";
    Icon["CPANEL"] = "<i class=\"fa fa-cpanel\"></i>";
    Icon["CREATIVE_COMMONS"] = "<i class=\"fa fa-creative-commons\"></i>";
    Icon["CREATIVE_COMMONS_BY"] = "<i class=\"fa fa-creative-commons-by\"></i>";
    Icon["CREATIVE_COMMONS_NC"] = "<i class=\"fa fa-creative-commons-nc\"></i>";
    Icon["CREATIVE_COMMONS_NC_EU"] = "<i class=\"fa fa-creative-commons-nc-eu\"></i>";
    Icon["CREATIVE_COMMONS_NC_JP"] = "<i class=\"fa fa-creative-commons-nc-jp\"></i>";
    Icon["CREATIVE_COMMONS_ND"] = "<i class=\"fa fa-creative-commons-nd\"></i>";
    Icon["CREATIVE_COMMONS_PD"] = "<i class=\"fa fa-creative-commons-pd\"></i>";
    Icon["CREATIVE_COMMONS_PD_ALT"] = "<i class=\"fa fa-creative-commons-pd-alt\"></i>";
    Icon["CREATIVE_COMMONS_REMIX"] = "<i class=\"fa fa-creative-commons-remix\"></i>";
    Icon["CREATIVE_COMMONS_SA"] = "<i class=\"fa fa-creative-commons-sa\"></i>";
    Icon["CREATIVE_COMMONS_SAMPLING"] = "<i class=\"fa fa-creative-commons-sampling\"></i>";
    Icon["CREATIVE_COMMONS_SAMPLING_PLUS"] = "<i class=\"fa fa-creative-commons-sampling-plus\"></i>";
    Icon["CREATIVE_COMMONS_SHARE"] = "<i class=\"fa fa-creative-commons-share\"></i>";
    Icon["CREATIVE_COMMONS_ZERO"] = "<i class=\"fa fa-creative-commons-zero\"></i>";
    Icon["CREDIT_CARD"] = "<i class=\"fa fa-credit-card\"></i>";
    Icon["CRITICAL_ROLE"] = "<i class=\"fa fa-critical-role\"></i>";
    Icon["CROP"] = "<i class=\"fa fa-crop\"></i>";
    Icon["CROP_ALT"] = "<i class=\"fa fa-crop-alt\"></i>";
    Icon["CROSS"] = "<i class=\"fa fa-cross\"></i>";
    Icon["CROSSHAIRS"] = "<i class=\"fa fa-crosshairs\"></i>";
    Icon["CROW"] = "<i class=\"fa fa-crow\"></i>";
    Icon["CROWN"] = "<i class=\"fa fa-crown\"></i>";
    Icon["CRUTCH"] = "<i class=\"fa fa-crutch\"></i>";
    Icon["CSS3"] = "<i class=\"fa fa-css3\"></i>";
    Icon["CSS3_ALT"] = "<i class=\"fa fa-css3-alt\"></i>";
    Icon["CUBE"] = "<i class=\"fa fa-cube\"></i>";
    Icon["CUBES"] = "<i class=\"fa fa-cubes\"></i>";
    Icon["CUT"] = "<i class=\"fa fa-cut\"></i>";
    Icon["CUTTLEFISH"] = "<i class=\"fa fa-cuttlefish\"></i>";
    Icon["DAILYMOTION"] = "<i class=\"fa fa-dailymotion\"></i>";
    Icon["DASHCUBE"] = "<i class=\"fa fa-dashcube\"></i>";
    Icon["DATABASE"] = "<i class=\"fa fa-database\"></i>";
    Icon["DEAF"] = "<i class=\"fa fa-deaf\"></i>";
    Icon["DEEZER"] = "<i class=\"fa fa-deezer\"></i>";
    Icon["DELICIOUS"] = "<i class=\"fa fa-delicious\"></i>";
    Icon["DEMOCRAT"] = "<i class=\"fa fa-democrat\"></i>";
    Icon["DEPLOYDOG"] = "<i class=\"fa fa-deploydog\"></i>";
    Icon["DESKPRO"] = "<i class=\"fa fa-deskpro\"></i>";
    Icon["DESKTOP"] = "<i class=\"fa fa-desktop\"></i>";
    Icon["DEV"] = "<i class=\"fa fa-dev\"></i>";
    Icon["DEVIANTART"] = "<i class=\"fa fa-deviantart\"></i>";
    Icon["DHARMACHAKRA"] = "<i class=\"fa fa-dharmachakra\"></i>";
    Icon["DHL"] = "<i class=\"fa fa-dhl\"></i>";
    Icon["DIAGNOSES"] = "<i class=\"fa fa-diagnoses\"></i>";
    Icon["DIASPORA"] = "<i class=\"fa fa-diaspora\"></i>";
    Icon["DICE"] = "<i class=\"fa fa-dice\"></i>";
    Icon["DICE_D20"] = "<i class=\"fa fa-dice-d20\"></i>";
    Icon["DICE_D6"] = "<i class=\"fa fa-dice-d6\"></i>";
    Icon["DICE_FIVE"] = "<i class=\"fa fa-dice-five\"></i>";
    Icon["DICE_FOUR"] = "<i class=\"fa fa-dice-four\"></i>";
    Icon["DICE_ONE"] = "<i class=\"fa fa-dice-one\"></i>";
    Icon["DICE_SIX"] = "<i class=\"fa fa-dice-six\"></i>";
    Icon["DICE_THREE"] = "<i class=\"fa fa-dice-three\"></i>";
    Icon["DICE_TWO"] = "<i class=\"fa fa-dice-two\"></i>";
    Icon["DIGG"] = "<i class=\"fa fa-digg\"></i>";
    Icon["DIGITAL_OCEAN"] = "<i class=\"fa fa-digital-ocean\"></i>";
    Icon["DIGITAL_TACHOGRAPH"] = "<i class=\"fa fa-digital-tachograph\"></i>";
    Icon["DIRECTIONS"] = "<i class=\"fa fa-directions\"></i>";
    Icon["DISCORD"] = "<i class=\"fa fa-discord\"></i>";
    Icon["DISCOURSE"] = "<i class=\"fa fa-discourse\"></i>";
    Icon["DISEASE"] = "<i class=\"fa fa-disease\"></i>";
    Icon["DIVIDE"] = "<i class=\"fa fa-divide\"></i>";
    Icon["DIZZY"] = "<i class=\"fa fa-dizzy\"></i>";
    Icon["DNA"] = "<i class=\"fa fa-dna\"></i>";
    Icon["DOCHUB"] = "<i class=\"fa fa-dochub\"></i>";
    Icon["DOCKER"] = "<i class=\"fa fa-docker\"></i>";
    Icon["DOG"] = "<i class=\"fa fa-dog\"></i>";
    Icon["DOLLAR_SIGN"] = "<i class=\"fa fa-dollar-sign\"></i>";
    Icon["DOLLY"] = "<i class=\"fa fa-dolly\"></i>";
    Icon["DOLLY_FLATBED"] = "<i class=\"fa fa-dolly-flatbed\"></i>";
    Icon["DONATE"] = "<i class=\"fa fa-donate\"></i>";
    Icon["DOOR_CLOSED"] = "<i class=\"fa fa-door-closed\"></i>";
    Icon["DOOR_OPEN"] = "<i class=\"fa fa-door-open\"></i>";
    Icon["DOT_CIRCLE"] = "<i class=\"fa fa-dot-circle\"></i>";
    Icon["DOVE"] = "<i class=\"fa fa-dove\"></i>";
    Icon["DOWNLOAD"] = "<i class=\"fa fa-download\"></i>";
    Icon["DRAFT2DIGITAL"] = "<i class=\"fa fa-draft2digital\"></i>";
    Icon["DRAFTING_COMPASS"] = "<i class=\"fa fa-drafting-compass\"></i>";
    Icon["DRAGON"] = "<i class=\"fa fa-dragon\"></i>";
    Icon["DRAW_POLYGON"] = "<i class=\"fa fa-draw-polygon\"></i>";
    Icon["DRIBBBLE"] = "<i class=\"fa fa-dribbble\"></i>";
    Icon["DRIBBBLE_SQUARE"] = "<i class=\"fa fa-dribbble-square\"></i>";
    Icon["DROPBOX"] = "<i class=\"fa fa-dropbox\"></i>";
    Icon["DRUM"] = "<i class=\"fa fa-drum\"></i>";
    Icon["DRUMSTICK_BITE"] = "<i class=\"fa fa-drumstick-bite\"></i>";
    Icon["DRUM_STEELPAN"] = "<i class=\"fa fa-drum-steelpan\"></i>";
    Icon["DRUPAL"] = "<i class=\"fa fa-drupal\"></i>";
    Icon["DUMBBELL"] = "<i class=\"fa fa-dumbbell\"></i>";
    Icon["DUMPSTER"] = "<i class=\"fa fa-dumpster\"></i>";
    Icon["DUMPSTER_FIRE"] = "<i class=\"fa fa-dumpster-fire\"></i>";
    Icon["DUNGEON"] = "<i class=\"fa fa-dungeon\"></i>";
    Icon["DYALOG"] = "<i class=\"fa fa-dyalog\"></i>";
    Icon["D_AND_D"] = "<i class=\"fa fa-d-and-d\"></i>";
    Icon["D_AND_D_BEYOND"] = "<i class=\"fa fa-d-and-d-beyond\"></i>";
    Icon["EARLYBIRDS"] = "<i class=\"fa fa-earlybirds\"></i>";
    Icon["EBAY"] = "<i class=\"fa fa-ebay\"></i>";
    Icon["EDGE"] = "<i class=\"fa fa-edge\"></i>";
    Icon["EDGE_LEGACY"] = "<i class=\"fa fa-edge-legacy\"></i>";
    Icon["EDIT"] = "<i class=\"fa fa-edit\"></i>";
    Icon["EGG"] = "<i class=\"fa fa-egg\"></i>";
    Icon["EJECT"] = "<i class=\"fa fa-eject\"></i>";
    Icon["ELEMENTOR"] = "<i class=\"fa fa-elementor\"></i>";
    Icon["ELLIPSIS_H"] = "<i class=\"fa fa-ellipsis-h\"></i>";
    Icon["ELLIPSIS_V"] = "<i class=\"fa fa-ellipsis-v\"></i>";
    Icon["ELLO"] = "<i class=\"fa fa-ello\"></i>";
    Icon["EMBER"] = "<i class=\"fa fa-ember\"></i>";
    Icon["EMPIRE"] = "<i class=\"fa fa-empire\"></i>";
    Icon["ENVELOPE"] = "<i class=\"fa fa-envelope\"></i>";
    Icon["ENVELOPE_OPEN"] = "<i class=\"fa fa-envelope-open\"></i>";
    Icon["ENVELOPE_OPEN_TEXT"] = "<i class=\"fa fa-envelope-open-text\"></i>";
    Icon["ENVELOPE_SQUARE"] = "<i class=\"fa fa-envelope-square\"></i>";
    Icon["ENVIRA"] = "<i class=\"fa fa-envira\"></i>";
    Icon["EQUALS"] = "<i class=\"fa fa-equals\"></i>";
    Icon["ERASER"] = "<i class=\"fa fa-eraser\"></i>";
    Icon["ERLANG"] = "<i class=\"fa fa-erlang\"></i>";
    Icon["ETHEREUM"] = "<i class=\"fa fa-ethereum\"></i>";
    Icon["ETHERNET"] = "<i class=\"fa fa-ethernet\"></i>";
    Icon["ETSY"] = "<i class=\"fa fa-etsy\"></i>";
    Icon["EURO_SIGN"] = "<i class=\"fa fa-euro-sign\"></i>";
    Icon["EVERNOTE"] = "<i class=\"fa fa-evernote\"></i>";
    Icon["EXCHANGE_ALT"] = "<i class=\"fa fa-exchange-alt\"></i>";
    Icon["EXCLAMATION"] = "<i class=\"fa fa-exclamation\"></i>";
    Icon["EXCLAMATION_CIRCLE"] = "<i class=\"fa fa-exclamation-circle\"></i>";
    Icon["EXCLAMATION_TRIANGLE"] = "<i class=\"fa fa-exclamation-triangle\"></i>";
    Icon["TRIANGLE"] = "<i class=\"fa fa-triangle\"></i>";
    Icon["EXPAND"] = "<i class=\"fa fa-expand\"></i>";
    Icon["EXPAND_ALT"] = "<i class=\"fa fa-expand-alt\"></i>";
    Icon["EXPAND_ARROWS_ALT"] = "<i class=\"fa fa-expand-arrows-alt\"></i>";
    Icon["EXPEDITEDSSL"] = "<i class=\"fa fa-expeditedssl\"></i>";
    Icon["EXTERNAL_LINK_ALT"] = "<i class=\"fa fa-external-link-alt\"></i>";
    Icon["EXTERNAL_LINK_SQUARE_ALT"] = "<i class=\"fa fa-external-link-square-alt\"></i>";
    Icon["EYE"] = "<i class=\"fa fa-eye\"></i>";
    Icon["EYE_DROPPER"] = "<i class=\"fa fa-eye-dropper\"></i>";
    Icon["EYE_SLASH"] = "<i class=\"fa fa-eye-slash\"></i>";
    Icon["FACEBOOK"] = "<i class=\"fa fa-facebook\"></i>";
    Icon["FACEBOOK_F"] = "<i class=\"fa fa-facebook-f\"></i>";
    Icon["FACEBOOK_MESSENGER"] = "<i class=\"fa fa-facebook-messenger\"></i>";
    Icon["FACEBOOK_SQUARE"] = "<i class=\"fa fa-facebook-square\"></i>";
    Icon["FAN"] = "<i class=\"fa fa-fan\"></i>";
    Icon["FANTASY_FLIGHT_GAMES"] = "<i class=\"fa fa-fantasy-flight-games\"></i>";
    Icon["FAST_BACKWARD"] = "<i class=\"fa fa-fast-backward\"></i>";
    Icon["FAST_FORWARD"] = "<i class=\"fa fa-fast-forward\"></i>";
    Icon["FAUCET"] = "<i class=\"fa fa-faucet\"></i>";
    Icon["FAX"] = "<i class=\"fa fa-fax\"></i>";
    Icon["FEATHER"] = "<i class=\"fa fa-feather\"></i>";
    Icon["FEATHER_ALT"] = "<i class=\"fa fa-feather-alt\"></i>";
    Icon["FEDEX"] = "<i class=\"fa fa-fedex\"></i>";
    Icon["FEDORA"] = "<i class=\"fa fa-fedora\"></i>";
    Icon["FEMALE"] = "<i class=\"fa fa-female\"></i>";
    Icon["FIGHTER_JET"] = "<i class=\"fa fa-fighter-jet\"></i>";
    Icon["FIGMA"] = "<i class=\"fa fa-figma\"></i>";
    Icon["FILE"] = "<i class=\"fa fa-file\"></i>";
    Icon["FILE_ALT"] = "<i class=\"fa fa-file-alt\"></i>";
    Icon["FILE_ARCHIVE"] = "<i class=\"fa fa-file-archive\"></i>";
    Icon["FILE_AUDIO"] = "<i class=\"fa fa-file-audio\"></i>";
    Icon["FILE_CODE"] = "<i class=\"fa fa-file-code\"></i>";
    Icon["FILE_CONTRACT"] = "<i class=\"fa fa-file-contract\"></i>";
    Icon["FILE_CSV"] = "<i class=\"fa fa-file-csv\"></i>";
    Icon["FILE_DOWNLOAD"] = "<i class=\"fa fa-file-download\"></i>";
    Icon["FILE_EXCEL"] = "<i class=\"fa fa-file-excel\"></i>";
    Icon["FILE_EXPORT"] = "<i class=\"fa fa-file-export\"></i>";
    Icon["FILE_IMAGE"] = "<i class=\"fa fa-file-image\"></i>";
    Icon["FILE_IMPORT"] = "<i class=\"fa fa-file-import\"></i>";
    Icon["FILE_INVOICE"] = "<i class=\"fa fa-file-invoice\"></i>";
    Icon["FILE_INVOICE_DOLLAR"] = "<i class=\"fa fa-file-invoice-dollar\"></i>";
    Icon["FILE_MEDICAL"] = "<i class=\"fa fa-file-medical\"></i>";
    Icon["FILE_MEDICAL_ALT"] = "<i class=\"fa fa-file-medical-alt\"></i>";
    Icon["FILE_PDF"] = "<i class=\"fa fa-file-pdf\"></i>";
    Icon["FILE_POWERPOINT"] = "<i class=\"fa fa-file-powerpoint\"></i>";
    Icon["FILE_PRESCRIPTION"] = "<i class=\"fa fa-file-prescription\"></i>";
    Icon["FILE_SIGNATURE"] = "<i class=\"fa fa-file-signature\"></i>";
    Icon["FILE_UPLOAD"] = "<i class=\"fa fa-file-upload\"></i>";
    Icon["FILE_VIDEO"] = "<i class=\"fa fa-file-video\"></i>";
    Icon["FILE_WORD"] = "<i class=\"fa fa-file-word\"></i>";
    Icon["FILL"] = "<i class=\"fa fa-fill\"></i>";
    Icon["FILL_DRIP"] = "<i class=\"fa fa-fill-drip\"></i>";
    Icon["FILM"] = "<i class=\"fa fa-film\"></i>";
    Icon["FILTER"] = "<i class=\"fa fa-filter\"></i>";
    Icon["FINGERPRINT"] = "<i class=\"fa fa-fingerprint\"></i>";
    Icon["FIRE"] = "<i class=\"fa fa-fire\"></i>";
    Icon["FIREFOX"] = "<i class=\"fa fa-firefox\"></i>";
    Icon["FIREFOX_BROWSER"] = "<i class=\"fa fa-firefox-browser\"></i>";
    Icon["FIRE_ALT"] = "<i class=\"fa fa-fire-alt\"></i>";
    Icon["FIRE_EXTINGUISHER"] = "<i class=\"fa fa-fire-extinguisher\"></i>";
    Icon["FIRSTDRAFT"] = "<i class=\"fa fa-firstdraft\"></i>";
    Icon["FIRST_AID"] = "<i class=\"fa fa-first-aid\"></i>";
    Icon["FIRST_ORDER"] = "<i class=\"fa fa-first-order\"></i>";
    Icon["FIRST_ORDER_ALT"] = "<i class=\"fa fa-first-order-alt\"></i>";
    Icon["FISH"] = "<i class=\"fa fa-fish\"></i>";
    Icon["FIST_RAISED"] = "<i class=\"fa fa-fist-raised\"></i>";
    Icon["FLAG"] = "<i class=\"fa fa-flag\"></i>";
    Icon["FLAG_CHECKERED"] = "<i class=\"fa fa-flag-checkered\"></i>";
    Icon["FLAG_USA"] = "<i class=\"fa fa-flag-usa\"></i>";
    Icon["FLASK"] = "<i class=\"fa fa-flask\"></i>";
    Icon["FLICKR"] = "<i class=\"fa fa-flickr\"></i>";
    Icon["FLIPBOARD"] = "<i class=\"fa fa-flipboard\"></i>";
    Icon["FLUSHED"] = "<i class=\"fa fa-flushed\"></i>";
    Icon["FLY"] = "<i class=\"fa fa-fly\"></i>";
    Icon["FOLDER"] = "<i class=\"fa fa-folder\"></i>";
    Icon["FOLDER_MINUS"] = "<i class=\"fa fa-folder-minus\"></i>";
    Icon["FOLDER_OPEN"] = "<i class=\"fa fa-folder-open\"></i>";
    Icon["FOLDER_PLUS"] = "<i class=\"fa fa-folder-plus\"></i>";
    Icon["FONT"] = "<i class=\"fa fa-font\"></i>";
    Icon["FONTICONS"] = "<i class=\"fa fa-fonticons\"></i>";
    Icon["FONTICONS_FI"] = "<i class=\"fa fa-fonticons-fi\"></i>";
    Icon["FONT_AWESOME"] = "<i class=\"fa fa-font-awesome\"></i>";
    Icon["FONT_AWESOME_ALT"] = "<i class=\"fa fa-font-awesome-alt\"></i>";
    Icon["FONT_AWESOME_FLAG"] = "<i class=\"fa fa-font-awesome-flag\"></i>";
    Icon["FONT_AWESOME_LOGO_FULL"] = "<i class=\"fa fa-font-awesome-logo-full\"></i>";
    Icon["FOOTBALL_BALL"] = "<i class=\"fa fa-football-ball\"></i>";
    Icon["FORT_AWESOME"] = "<i class=\"fa fa-fort-awesome\"></i>";
    Icon["FORT_AWESOME_ALT"] = "<i class=\"fa fa-fort-awesome-alt\"></i>";
    Icon["FORUMBEE"] = "<i class=\"fa fa-forumbee\"></i>";
    Icon["FORWARD"] = "<i class=\"fa fa-forward\"></i>";
    Icon["FOURSQUARE"] = "<i class=\"fa fa-foursquare\"></i>";
    Icon["FREEBSD"] = "<i class=\"fa fa-freebsd\"></i>";
    Icon["FREE_CODE_CAMP"] = "<i class=\"fa fa-free-code-camp\"></i>";
    Icon["FROG"] = "<i class=\"fa fa-frog\"></i>";
    Icon["FROWN"] = "<i class=\"fa fa-frown\"></i>";
    Icon["FROWN_OPEN"] = "<i class=\"fa fa-frown-open\"></i>";
    Icon["FULCRUM"] = "<i class=\"fa fa-fulcrum\"></i>";
    Icon["FUNNEL_DOLLAR"] = "<i class=\"fa fa-funnel-dollar\"></i>";
    Icon["FUTBOL"] = "<i class=\"fa fa-futbol\"></i>";
    Icon["GALACTIC_REPUBLIC"] = "<i class=\"fa fa-galactic-republic\"></i>";
    Icon["GALACTIC_SENATE"] = "<i class=\"fa fa-galactic-senate\"></i>";
    Icon["GAMEPAD"] = "<i class=\"fa fa-gamepad\"></i>";
    Icon["GAS_PUMP"] = "<i class=\"fa fa-gas-pump\"></i>";
    Icon["GAVEL"] = "<i class=\"fa fa-gavel\"></i>";
    Icon["GEM"] = "<i class=\"fa fa-gem\"></i>";
    Icon["GENDERLESS"] = "<i class=\"fa fa-genderless\"></i>";
    Icon["GET_POCKET"] = "<i class=\"fa fa-get-pocket\"></i>";
    Icon["GG"] = "<i class=\"fa fa-gg\"></i>";
    Icon["GG_CIRCLE"] = "<i class=\"fa fa-gg-circle\"></i>";
    Icon["GHOST"] = "<i class=\"fa fa-ghost\"></i>";
    Icon["GIFT"] = "<i class=\"fa fa-gift\"></i>";
    Icon["GIFTS"] = "<i class=\"fa fa-gifts\"></i>";
    Icon["GIT"] = "<i class=\"fa fa-git\"></i>";
    Icon["GITHUB"] = "<i class=\"fa fa-github\"></i>";
    Icon["GITHUB_ALT"] = "<i class=\"fa fa-github-alt\"></i>";
    Icon["GITHUB_SQUARE"] = "<i class=\"fa fa-github-square\"></i>";
    Icon["GITKRAKEN"] = "<i class=\"fa fa-gitkraken\"></i>";
    Icon["GITLAB"] = "<i class=\"fa fa-gitlab\"></i>";
    Icon["GITTER"] = "<i class=\"fa fa-gitter\"></i>";
    Icon["GIT_ALT"] = "<i class=\"fa fa-git-alt\"></i>";
    Icon["GIT_SQUARE"] = "<i class=\"fa fa-git-square\"></i>";
    Icon["GLASSES"] = "<i class=\"fa fa-glasses\"></i>";
    Icon["GLASS_CHEERS"] = "<i class=\"fa fa-glass-cheers\"></i>";
    Icon["GLASS_MARTINI"] = "<i class=\"fa fa-glass-martini\"></i>";
    Icon["GLASS_MARTINI_ALT"] = "<i class=\"fa fa-glass-martini-alt\"></i>";
    Icon["GLASS_WHISKEY"] = "<i class=\"fa fa-glass-whiskey\"></i>";
    Icon["GLIDE"] = "<i class=\"fa fa-glide\"></i>";
    Icon["GLIDE_G"] = "<i class=\"fa fa-glide-g\"></i>";
    Icon["GLOBE"] = "<i class=\"fa fa-globe\"></i>";
    Icon["GLOBE_AFRICA"] = "<i class=\"fa fa-globe-africa\"></i>";
    Icon["GLOBE_AMERICAS"] = "<i class=\"fa fa-globe-americas\"></i>";
    Icon["GLOBE_ASIA"] = "<i class=\"fa fa-globe-asia\"></i>";
    Icon["GLOBE_EUROPE"] = "<i class=\"fa fa-globe-europe\"></i>";
    Icon["GOFORE"] = "<i class=\"fa fa-gofore\"></i>";
    Icon["GOLF_BALL"] = "<i class=\"fa fa-golf-ball\"></i>";
    Icon["GOODREADS"] = "<i class=\"fa fa-goodreads\"></i>";
    Icon["GOODREADS_G"] = "<i class=\"fa fa-goodreads-g\"></i>";
    Icon["GOOGLE"] = "<i class=\"fa fa-google\"></i>";
    Icon["GOOGLE_DRIVE"] = "<i class=\"fa fa-google-drive\"></i>";
    Icon["GOOGLE_PAY"] = "<i class=\"fa fa-google-pay\"></i>";
    Icon["GOOGLE_PLAY"] = "<i class=\"fa fa-google-play\"></i>";
    Icon["GOOGLE_PLUS"] = "<i class=\"fa fa-google-plus\"></i>";
    Icon["GOOGLE_PLUS_G"] = "<i class=\"fa fa-google-plus-g\"></i>";
    Icon["GOOGLE_PLUS_SQUARE"] = "<i class=\"fa fa-google-plus-square\"></i>";
    Icon["GOOGLE_WALLET"] = "<i class=\"fa fa-google-wallet\"></i>";
    Icon["GOPURAM"] = "<i class=\"fa fa-gopuram\"></i>";
    Icon["GRADUATION_CAP"] = "<i class=\"fa fa-graduation-cap\"></i>";
    Icon["GRATIPAY"] = "<i class=\"fa fa-gratipay\"></i>";
    Icon["GRAV"] = "<i class=\"fa fa-grav\"></i>";
    Icon["GREATER_THAN"] = "<i class=\"fa fa-greater-than\"></i>";
    Icon["GREATER_THAN_EQUAL"] = "<i class=\"fa fa-greater-than-equal\"></i>";
    Icon["GRIMACE"] = "<i class=\"fa fa-grimace\"></i>";
    Icon["GRIN"] = "<i class=\"fa fa-grin\"></i>";
    Icon["GRIN_ALT"] = "<i class=\"fa fa-grin-alt\"></i>";
    Icon["GRIN_BEAM"] = "<i class=\"fa fa-grin-beam\"></i>";
    Icon["GRIN_BEAM_SWEAT"] = "<i class=\"fa fa-grin-beam-sweat\"></i>";
    Icon["GRIN_HEARTS"] = "<i class=\"fa fa-grin-hearts\"></i>";
    Icon["GRIN_SQUINT"] = "<i class=\"fa fa-grin-squint\"></i>";
    Icon["GRIN_SQUINT_TEARS"] = "<i class=\"fa fa-grin-squint-tears\"></i>";
    Icon["GRIN_STARS"] = "<i class=\"fa fa-grin-stars\"></i>";
    Icon["GRIN_TEARS"] = "<i class=\"fa fa-grin-tears\"></i>";
    Icon["GRIN_TONGUE"] = "<i class=\"fa fa-grin-tongue\"></i>";
    Icon["GRIN_TONGUE_SQUINT"] = "<i class=\"fa fa-grin-tongue-squint\"></i>";
    Icon["GRIN_TONGUE_WINK"] = "<i class=\"fa fa-grin-tongue-wink\"></i>";
    Icon["GRIN_WINK"] = "<i class=\"fa fa-grin-wink\"></i>";
    Icon["GRIPFIRE"] = "<i class=\"fa fa-gripfire\"></i>";
    Icon["GRIP_HORIZONTAL"] = "<i class=\"fa fa-grip-horizontal\"></i>";
    Icon["GRIP_LINES"] = "<i class=\"fa fa-grip-lines\"></i>";
    Icon["GRIP_LINES_VERTICAL"] = "<i class=\"fa fa-grip-lines-vertical\"></i>";
    Icon["GRIP_VERTICAL"] = "<i class=\"fa fa-grip-vertical\"></i>";
    Icon["GRUNT"] = "<i class=\"fa fa-grunt\"></i>";
    Icon["GUILDED"] = "<i class=\"fa fa-guilded\"></i>";
    Icon["GUITAR"] = "<i class=\"fa fa-guitar\"></i>";
    Icon["GULP"] = "<i class=\"fa fa-gulp\"></i>";
    Icon["HACKERRANK"] = "<i class=\"fa fa-hackerrank\"></i>";
    Icon["HACKER_NEWS"] = "<i class=\"fa fa-hacker-news\"></i>";
    Icon["HACKER_NEWS_SQUARE"] = "<i class=\"fa fa-hacker-news-square\"></i>";
    Icon["HAMBURGER"] = "<i class=\"fa fa-hamburger\"></i>";
    Icon["HAMMER"] = "<i class=\"fa fa-hammer\"></i>";
    Icon["HAMSA"] = "<i class=\"fa fa-hamsa\"></i>";
    Icon["HANDS"] = "<i class=\"fa fa-hands\"></i>";
    Icon["HANDSHAKE"] = "<i class=\"fa fa-handshake\"></i>";
    Icon["HANDSHAKE_ALT_SLASH"] = "<i class=\"fa fa-handshake-alt-slash\"></i>";
    Icon["HANDSHAKE_SLASH"] = "<i class=\"fa fa-handshake-slash\"></i>";
    Icon["HANDS_HELPING"] = "<i class=\"fa fa-hands-helping\"></i>";
    Icon["HANDS_WASH"] = "<i class=\"fa fa-hands-wash\"></i>";
    Icon["HAND_HOLDING"] = "<i class=\"fa fa-hand-holding\"></i>";
    Icon["HAND_HOLDING_HEART"] = "<i class=\"fa fa-hand-holding-heart\"></i>";
    Icon["HAND_HOLDING_MEDICAL"] = "<i class=\"fa fa-hand-holding-medical\"></i>";
    Icon["HAND_HOLDING_USD"] = "<i class=\"fa fa-hand-holding-usd\"></i>";
    Icon["HAND_HOLDING_WATER"] = "<i class=\"fa fa-hand-holding-water\"></i>";
    Icon["HAND_LIZARD"] = "<i class=\"fa fa-hand-lizard\"></i>";
    Icon["HAND_MIDDLE_FINGER"] = "<i class=\"fa fa-hand-middle-finger\"></i>";
    Icon["HAND_PAPER"] = "<i class=\"fa fa-hand-paper\"></i>";
    Icon["HAND_PEACE"] = "<i class=\"fa fa-hand-peace\"></i>";
    Icon["HAND_POINTER"] = "<i class=\"fa fa-hand-pointer\"></i>";
    Icon["HAND_POINT_DOWN"] = "<i class=\"fa fa-hand-point-down\"></i>";
    Icon["HAND_POINT_LEFT"] = "<i class=\"fa fa-hand-point-left\"></i>";
    Icon["HAND_POINT_RIGHT"] = "<i class=\"fa fa-hand-point-right\"></i>";
    Icon["HAND_POINT_UP"] = "<i class=\"fa fa-hand-point-up\"></i>";
    Icon["HAND_ROCK"] = "<i class=\"fa fa-hand-rock\"></i>";
    Icon["HAND_SCISSORS"] = "<i class=\"fa fa-hand-scissors\"></i>";
    Icon["HAND_SPARKLES"] = "<i class=\"fa fa-hand-sparkles\"></i>";
    Icon["HAND_SPOCK"] = "<i class=\"fa fa-hand-spock\"></i>";
    Icon["HANUKIAH"] = "<i class=\"fa fa-hanukiah\"></i>";
    Icon["HARD_HAT"] = "<i class=\"fa fa-hard-hat\"></i>";
    Icon["HASHTAG"] = "<i class=\"fa fa-hashtag\"></i>";
    Icon["HAT_COWBOY"] = "<i class=\"fa fa-hat-cowboy\"></i>";
    Icon["HAT_COWBOY_SIDE"] = "<i class=\"fa fa-hat-cowboy-side\"></i>";
    Icon["HAT_WIZARD"] = "<i class=\"fa fa-hat-wizard\"></i>";
    Icon["HDD"] = "<i class=\"fa fa-hdd\"></i>";
    Icon["HEADING"] = "<i class=\"fa fa-heading\"></i>";
    Icon["HEADPHONES"] = "<i class=\"fa fa-headphones\"></i>";
    Icon["HEADPHONES_ALT"] = "<i class=\"fa fa-headphones-alt\"></i>";
    Icon["HEADSET"] = "<i class=\"fa fa-headset\"></i>";
    Icon["HEAD_SIDE_COUGH"] = "<i class=\"fa fa-head-side-cough\"></i>";
    Icon["HEAD_SIDE_COUGH_SLASH"] = "<i class=\"fa fa-head-side-cough-slash\"></i>";
    Icon["HEAD_SIDE_MASK"] = "<i class=\"fa fa-head-side-mask\"></i>";
    Icon["HEAD_SIDE_VIRUS"] = "<i class=\"fa fa-head-side-virus\"></i>";
    Icon["HEART"] = "<i class=\"fa fa-heart\"></i>";
    Icon["HEARTBEAT"] = "<i class=\"fa fa-heartbeat\"></i>";
    Icon["HEART_BROKEN"] = "<i class=\"fa fa-heart-broken\"></i>";
    Icon["HELICOPTER"] = "<i class=\"fa fa-helicopter\"></i>";
    Icon["HIGHLIGHTER"] = "<i class=\"fa fa-highlighter\"></i>";
    Icon["HIKING"] = "<i class=\"fa fa-hiking\"></i>";
    Icon["HIPPO"] = "<i class=\"fa fa-hippo\"></i>";
    Icon["HIPS"] = "<i class=\"fa fa-hips\"></i>";
    Icon["HIRE_A_HELPER"] = "<i class=\"fa fa-hire-a-helper\"></i>";
    Icon["HISTORY"] = "<i class=\"fa fa-history\"></i>";
    Icon["HIVE"] = "<i class=\"fa fa-hive\"></i>";
    Icon["HOCKEY_PUCK"] = "<i class=\"fa fa-hockey-puck\"></i>";
    Icon["HOLLY_BERRY"] = "<i class=\"fa fa-holly-berry\"></i>";
    Icon["HOME"] = "<i class=\"fa fa-home\"></i>";
    Icon["HOOLI"] = "<i class=\"fa fa-hooli\"></i>";
    Icon["HORNBILL"] = "<i class=\"fa fa-hornbill\"></i>";
    Icon["HORSE"] = "<i class=\"fa fa-horse\"></i>";
    Icon["HORSE_HEAD"] = "<i class=\"fa fa-horse-head\"></i>";
    Icon["HOSPITAL"] = "<i class=\"fa fa-hospital\"></i>";
    Icon["HOSPITAL_ALT"] = "<i class=\"fa fa-hospital-alt\"></i>";
    Icon["HOSPITAL_SYMBOL"] = "<i class=\"fa fa-hospital-symbol\"></i>";
    Icon["HOSPITAL_USER"] = "<i class=\"fa fa-hospital-user\"></i>";
    Icon["HOTDOG"] = "<i class=\"fa fa-hotdog\"></i>";
    Icon["HOTEL"] = "<i class=\"fa fa-hotel\"></i>";
    Icon["HOTJAR"] = "<i class=\"fa fa-hotjar\"></i>";
    Icon["HOT_TUB"] = "<i class=\"fa fa-hot-tub\"></i>";
    Icon["HOURGLASS"] = "<i class=\"fa fa-hourglass\"></i>";
    Icon["HOURGLASS_END"] = "<i class=\"fa fa-hourglass-end\"></i>";
    Icon["HOURGLASS_HALF"] = "<i class=\"fa fa-hourglass-half\"></i>";
    Icon["HOURGLASS_START"] = "<i class=\"fa fa-hourglass-start\"></i>";
    Icon["HOUSE_DAMAGE"] = "<i class=\"fa fa-house-damage\"></i>";
    Icon["HOUSE_USER"] = "<i class=\"fa fa-house-user\"></i>";
    Icon["HOUZZ"] = "<i class=\"fa fa-houzz\"></i>";
    Icon["HRYVNIA"] = "<i class=\"fa fa-hryvnia\"></i>";
    Icon["HTML5"] = "<i class=\"fa fa-html5\"></i>";
    Icon["HUBSPOT"] = "<i class=\"fa fa-hubspot\"></i>";
    Icon["H_SQUARE"] = "<i class=\"fa fa-h-square\"></i>";
    Icon["ICE_CREAM"] = "<i class=\"fa fa-ice-cream\"></i>";
    Icon["ICICLES"] = "<i class=\"fa fa-icicles\"></i>";
    Icon["ICONS"] = "<i class=\"fa fa-icons\"></i>";
    Icon["IDEAL"] = "<i class=\"fa fa-ideal\"></i>";
    Icon["ID_BADGE"] = "<i class=\"fa fa-id-badge\"></i>";
    Icon["ID_CARD"] = "<i class=\"fa fa-id-card\"></i>";
    Icon["ID_CARD_ALT"] = "<i class=\"fa fa-id-card-alt\"></i>";
    Icon["IGLOO"] = "<i class=\"fa fa-igloo\"></i>";
    Icon["IMAGE"] = "<i class=\"fa fa-image\"></i>";
    Icon["IMAGES"] = "<i class=\"fa fa-images\"></i>";
    Icon["IMDB"] = "<i class=\"fa fa-imdb\"></i>";
    Icon["INBOX"] = "<i class=\"fa fa-inbox\"></i>";
    Icon["INDENT"] = "<i class=\"fa fa-indent\"></i>";
    Icon["INDUSTRY"] = "<i class=\"fa fa-industry\"></i>";
    Icon["INFINITY"] = "<i class=\"fa fa-infinity\"></i>";
    Icon["INFO"] = "<i class=\"fa fa-info\"></i>";
    Icon["INFO_CIRCLE"] = "<i class=\"fa fa-info-circle\"></i>";
    Icon["INNOSOFT"] = "<i class=\"fa fa-innosoft\"></i>";
    Icon["INSTAGRAM"] = "<i class=\"fa fa-instagram\"></i>";
    Icon["INSTAGRAM_SQUARE"] = "<i class=\"fa fa-instagram-square\"></i>";
    Icon["INSTALOD"] = "<i class=\"fa fa-instalod\"></i>";
    Icon["INTERCOM"] = "<i class=\"fa fa-intercom\"></i>";
    Icon["INTERNET_EXPLORER"] = "<i class=\"fa fa-internet-explorer\"></i>";
    Icon["INVISION"] = "<i class=\"fa fa-invision\"></i>";
    Icon["IOXHOST"] = "<i class=\"fa fa-ioxhost\"></i>";
    Icon["ITALIC"] = "<i class=\"fa fa-italic\"></i>";
    Icon["ITCH_IO"] = "<i class=\"fa fa-itch-io\"></i>";
    Icon["ITUNES"] = "<i class=\"fa fa-itunes\"></i>";
    Icon["ITUNES_NOTE"] = "<i class=\"fa fa-itunes-note\"></i>";
    Icon["I_CURSOR"] = "<i class=\"fa fa-i-cursor\"></i>";
    Icon["JAVA"] = "<i class=\"fa fa-java\"></i>";
    Icon["JEDI"] = "<i class=\"fa fa-jedi\"></i>";
    Icon["JEDI_ORDER"] = "<i class=\"fa fa-jedi-order\"></i>";
    Icon["JENKINS"] = "<i class=\"fa fa-jenkins\"></i>";
    Icon["JIRA"] = "<i class=\"fa fa-jira\"></i>";
    Icon["JOGET"] = "<i class=\"fa fa-joget\"></i>";
    Icon["JOINT"] = "<i class=\"fa fa-joint\"></i>";
    Icon["JOOMLA"] = "<i class=\"fa fa-joomla\"></i>";
    Icon["JOURNAL_WHILLS"] = "<i class=\"fa fa-journal-whills\"></i>";
    Icon["JS"] = "<i class=\"fa fa-js\"></i>";
    Icon["JSFIDDLE"] = "<i class=\"fa fa-jsfiddle\"></i>";
    Icon["JS_SQUARE"] = "<i class=\"fa fa-js-square\"></i>";
    Icon["KAABA"] = "<i class=\"fa fa-kaaba\"></i>";
    Icon["KAGGLE"] = "<i class=\"fa fa-kaggle\"></i>";
    Icon["KEY"] = "<i class=\"fa fa-key\"></i>";
    Icon["KEYBASE"] = "<i class=\"fa fa-keybase\"></i>";
    Icon["KEYBOARD"] = "<i class=\"fa fa-keyboard\"></i>";
    Icon["KEYCDN"] = "<i class=\"fa fa-keycdn\"></i>";
    Icon["KHANDA"] = "<i class=\"fa fa-khanda\"></i>";
    Icon["KICKSTARTER"] = "<i class=\"fa fa-kickstarter\"></i>";
    Icon["KICKSTARTER_K"] = "<i class=\"fa fa-kickstarter-k\"></i>";
    Icon["KISS"] = "<i class=\"fa fa-kiss\"></i>";
    Icon["KISS_BEAM"] = "<i class=\"fa fa-kiss-beam\"></i>";
    Icon["KISS_WINK_HEART"] = "<i class=\"fa fa-kiss-wink-heart\"></i>";
    Icon["KIWI_BIRD"] = "<i class=\"fa fa-kiwi-bird\"></i>";
    Icon["KORVUE"] = "<i class=\"fa fa-korvue\"></i>";
    Icon["LANDMARK"] = "<i class=\"fa fa-landmark\"></i>";
    Icon["LANGUAGE"] = "<i class=\"fa fa-language\"></i>";
    Icon["LAPTOP"] = "<i class=\"fa fa-laptop\"></i>";
    Icon["LAPTOP_CODE"] = "<i class=\"fa fa-laptop-code\"></i>";
    Icon["LAPTOP_HOUSE"] = "<i class=\"fa fa-laptop-house\"></i>";
    Icon["LAPTOP_MEDICAL"] = "<i class=\"fa fa-laptop-medical\"></i>";
    Icon["LARAVEL"] = "<i class=\"fa fa-laravel\"></i>";
    Icon["LASTFM"] = "<i class=\"fa fa-lastfm\"></i>";
    Icon["LASTFM_SQUARE"] = "<i class=\"fa fa-lastfm-square\"></i>";
    Icon["LAUGH"] = "<i class=\"fa fa-laugh\"></i>";
    Icon["LAUGH_BEAM"] = "<i class=\"fa fa-laugh-beam\"></i>";
    Icon["LAUGH_SQUINT"] = "<i class=\"fa fa-laugh-squint\"></i>";
    Icon["LAUGH_WINK"] = "<i class=\"fa fa-laugh-wink\"></i>";
    Icon["LAYER_GROUP"] = "<i class=\"fa fa-layer-group\"></i>";
    Icon["LEAF"] = "<i class=\"fa fa-leaf\"></i>";
    Icon["LEANPUB"] = "<i class=\"fa fa-leanpub\"></i>";
    Icon["LEMON"] = "<i class=\"fa fa-lemon\"></i>";
    Icon["LESS"] = "<i class=\"fa fa-less\"></i>";
    Icon["LESS_THAN"] = "<i class=\"fa fa-less-than\"></i>";
    Icon["LESS_THAN_EQUAL"] = "<i class=\"fa fa-less-than-equal\"></i>";
    Icon["LEVEL_DOWN_ALT"] = "<i class=\"fa fa-level-down-alt\"></i>";
    Icon["LEVEL_UP_ALT"] = "<i class=\"fa fa-level-up-alt\"></i>";
    Icon["LIFE_RING"] = "<i class=\"fa fa-life-ring\"></i>";
    Icon["LIGHTBULB"] = "<i class=\"fa fa-lightbulb\"></i>";
    Icon["LINE"] = "<i class=\"fa fa-line\"></i>";
    Icon["LINK"] = "<i class=\"fa fa-link\"></i>";
    Icon["LINKEDIN"] = "<i class=\"fa fa-linkedin\"></i>";
    Icon["LINKEDIN_IN"] = "<i class=\"fa fa-linkedin-in\"></i>";
    Icon["LINODE"] = "<i class=\"fa fa-linode\"></i>";
    Icon["LINUX"] = "<i class=\"fa fa-linux\"></i>";
    Icon["LIRA_SIGN"] = "<i class=\"fa fa-lira-sign\"></i>";
    Icon["LIST"] = "<i class=\"fa fa-list\"></i>";
    Icon["LIST_ALT"] = "<i class=\"fa fa-list-alt\"></i>";
    Icon["LIST_OL"] = "<i class=\"fa fa-list-ol\"></i>";
    Icon["LIST_UL"] = "<i class=\"fa fa-list-ul\"></i>";
    Icon["LOCATION_ARROW"] = "<i class=\"fa fa-location-arrow\"></i>";
    Icon["LOCK"] = "<i class=\"fa fa-lock\"></i>";
    Icon["LOCK_OPEN"] = "<i class=\"fa fa-lock-open\"></i>";
    Icon["LONG_ARROW_ALT_DOWN"] = "<i class=\"fa fa-long-arrow-alt-down\"></i>";
    Icon["LONG_ARROW_ALT_LEFT"] = "<i class=\"fa fa-long-arrow-alt-left\"></i>";
    Icon["LONG_ARROW_ALT_RIGHT"] = "<i class=\"fa fa-long-arrow-alt-right\"></i>";
    Icon["LONG_ARROW_ALT_UP"] = "<i class=\"fa fa-long-arrow-alt-up\"></i>";
    Icon["LOW_VISION"] = "<i class=\"fa fa-low-vision\"></i>";
    Icon["LUGGAGE_CART"] = "<i class=\"fa fa-luggage-cart\"></i>";
    Icon["LUNGS"] = "<i class=\"fa fa-lungs\"></i>";
    Icon["LUNGS_VIRUS"] = "<i class=\"fa fa-lungs-virus\"></i>";
    Icon["LYFT"] = "<i class=\"fa fa-lyft\"></i>";
    Icon["MAGENTO"] = "<i class=\"fa fa-magento\"></i>";
    Icon["MAGIC"] = "<i class=\"fa fa-magic\"></i>";
    Icon["MAGNET"] = "<i class=\"fa fa-magnet\"></i>";
    Icon["MAILCHIMP"] = "<i class=\"fa fa-mailchimp\"></i>";
    Icon["MAIL_BULK"] = "<i class=\"fa fa-mail-bulk\"></i>";
    Icon["MALE"] = "<i class=\"fa fa-male\"></i>";
    Icon["MANDALORIAN"] = "<i class=\"fa fa-mandalorian\"></i>";
    Icon["MAP"] = "<i class=\"fa fa-map\"></i>";
    Icon["MAP_MARKED"] = "<i class=\"fa fa-map-marked\"></i>";
    Icon["MAP_MARKED_ALT"] = "<i class=\"fa fa-map-marked-alt\"></i>";
    Icon["MAP_MARKER"] = "<i class=\"fa fa-map-marker\"></i>";
    Icon["MAP_MARKER_ALT"] = "<i class=\"fa fa-map-marker-alt\"></i>";
    Icon["MAP_PIN"] = "<i class=\"fa fa-map-pin\"></i>";
    Icon["MAP_SIGNS"] = "<i class=\"fa fa-map-signs\"></i>";
    Icon["MARKDOWN"] = "<i class=\"fa fa-markdown\"></i>";
    Icon["MARKER"] = "<i class=\"fa fa-marker\"></i>";
    Icon["MARS"] = "<i class=\"fa fa-mars\"></i>";
    Icon["MARS_DOUBLE"] = "<i class=\"fa fa-mars-double\"></i>";
    Icon["MARS_STROKE"] = "<i class=\"fa fa-mars-stroke\"></i>";
    Icon["MARS_STROKE_H"] = "<i class=\"fa fa-mars-stroke-h\"></i>";
    Icon["MARS_STROKE_V"] = "<i class=\"fa fa-mars-stroke-v\"></i>";
    Icon["MASK"] = "<i class=\"fa fa-mask\"></i>";
    Icon["MASTODON"] = "<i class=\"fa fa-mastodon\"></i>";
    Icon["MAXCDN"] = "<i class=\"fa fa-maxcdn\"></i>";
    Icon["MDB"] = "<i class=\"fa fa-mdb\"></i>";
    Icon["MEDAL"] = "<i class=\"fa fa-medal\"></i>";
    Icon["MEDAPPS"] = "<i class=\"fa fa-medapps\"></i>";
    Icon["MEDIUM"] = "<i class=\"fa fa-medium\"></i>";
    Icon["MEDIUM_M"] = "<i class=\"fa fa-medium-m\"></i>";
    Icon["MEDKIT"] = "<i class=\"fa fa-medkit\"></i>";
    Icon["MEDRT"] = "<i class=\"fa fa-medrt\"></i>";
    Icon["MEETUP"] = "<i class=\"fa fa-meetup\"></i>";
    Icon["MEGAPORT"] = "<i class=\"fa fa-megaport\"></i>";
    Icon["MEH"] = "<i class=\"fa fa-meh\"></i>";
    Icon["MEH_BLANK"] = "<i class=\"fa fa-meh-blank\"></i>";
    Icon["MEH_ROLLING_EYES"] = "<i class=\"fa fa-meh-rolling-eyes\"></i>";
    Icon["MEMORY"] = "<i class=\"fa fa-memory\"></i>";
    Icon["MENDELEY"] = "<i class=\"fa fa-mendeley\"></i>";
    Icon["MENORAH"] = "<i class=\"fa fa-menorah\"></i>";
    Icon["MERCURY"] = "<i class=\"fa fa-mercury\"></i>";
    Icon["METEOR"] = "<i class=\"fa fa-meteor\"></i>";
    Icon["MICROBLOG"] = "<i class=\"fa fa-microblog\"></i>";
    Icon["MICROCHIP"] = "<i class=\"fa fa-microchip\"></i>";
    Icon["MICROPHONE"] = "<i class=\"fa fa-microphone\"></i>";
    Icon["MICROPHONE_ALT"] = "<i class=\"fa fa-microphone-alt\"></i>";
    Icon["MICROPHONE_ALT_SLASH"] = "<i class=\"fa fa-microphone-alt-slash\"></i>";
    Icon["MICROPHONE_SLASH"] = "<i class=\"fa fa-microphone-slash\"></i>";
    Icon["MICROSCOPE"] = "<i class=\"fa fa-microscope\"></i>";
    Icon["MICROSOFT"] = "<i class=\"fa fa-microsoft\"></i>";
    Icon["MINUS"] = "<i class=\"fa fa-minus\"></i>";
    Icon["MINUS_CIRCLE"] = "<i class=\"fa fa-minus-circle\"></i>";
    Icon["MINUS_SQUARE"] = "<i class=\"fa fa-minus-square\"></i>";
    Icon["MITTEN"] = "<i class=\"fa fa-mitten\"></i>";
    Icon["MIX"] = "<i class=\"fa fa-mix\"></i>";
    Icon["MIXCLOUD"] = "<i class=\"fa fa-mixcloud\"></i>";
    Icon["MIXER"] = "<i class=\"fa fa-mixer\"></i>";
    Icon["MIZUNI"] = "<i class=\"fa fa-mizuni\"></i>";
    Icon["MOBILE"] = "<i class=\"fa fa-mobile\"></i>";
    Icon["MOBILE_ALT"] = "<i class=\"fa fa-mobile-alt\"></i>";
    Icon["MODX"] = "<i class=\"fa fa-modx\"></i>";
    Icon["MONERO"] = "<i class=\"fa fa-monero\"></i>";
    Icon["MONEY_BILL"] = "<i class=\"fa fa-money-bill\"></i>";
    Icon["MONEY_BILL_ALT"] = "<i class=\"fa fa-money-bill-alt\"></i>";
    Icon["MONEY_BILL_WAVE"] = "<i class=\"fa fa-money-bill-wave\"></i>";
    Icon["MONEY_BILL_WAVE_ALT"] = "<i class=\"fa fa-money-bill-wave-alt\"></i>";
    Icon["MONEY_CHECK"] = "<i class=\"fa fa-money-check\"></i>";
    Icon["MONEY_CHECK_ALT"] = "<i class=\"fa fa-money-check-alt\"></i>";
    Icon["MONUMENT"] = "<i class=\"fa fa-monument\"></i>";
    Icon["MOON"] = "<i class=\"fa fa-moon\"></i>";
    Icon["MORTAR_PESTLE"] = "<i class=\"fa fa-mortar-pestle\"></i>";
    Icon["MOSQUE"] = "<i class=\"fa fa-mosque\"></i>";
    Icon["MOTORCYCLE"] = "<i class=\"fa fa-motorcycle\"></i>";
    Icon["MOUNTAIN"] = "<i class=\"fa fa-mountain\"></i>";
    Icon["MOUSE"] = "<i class=\"fa fa-mouse\"></i>";
    Icon["MOUSE_POINTER"] = "<i class=\"fa fa-mouse-pointer\"></i>";
    Icon["MUG_HOT"] = "<i class=\"fa fa-mug-hot\"></i>";
    Icon["MUSIC"] = "<i class=\"fa fa-music\"></i>";
    Icon["NAPSTER"] = "<i class=\"fa fa-napster\"></i>";
    Icon["NEOS"] = "<i class=\"fa fa-neos\"></i>";
    Icon["NETWORK_WIRED"] = "<i class=\"fa fa-network-wired\"></i>";
    Icon["NEUTER"] = "<i class=\"fa fa-neuter\"></i>";
    Icon["NEWSPAPER"] = "<i class=\"fa fa-newspaper\"></i>";
    Icon["NIMBLR"] = "<i class=\"fa fa-nimblr\"></i>";
    Icon["NODE"] = "<i class=\"fa fa-node\"></i>";
    Icon["NODE_JS"] = "<i class=\"fa fa-node-js\"></i>";
    Icon["NOTES_MEDICAL"] = "<i class=\"fa fa-notes-medical\"></i>";
    Icon["NOT_EQUAL"] = "<i class=\"fa fa-not-equal\"></i>";
    Icon["NPM"] = "<i class=\"fa fa-npm\"></i>";
    Icon["NS8"] = "<i class=\"fa fa-ns8\"></i>";
    Icon["NUTRITIONIX"] = "<i class=\"fa fa-nutritionix\"></i>";
    Icon["OBJECT_GROUP"] = "<i class=\"fa fa-object-group\"></i>";
    Icon["OBJECT_UNGROUP"] = "<i class=\"fa fa-object-ungroup\"></i>";
    Icon["OCTOPUS_DEPLOY"] = "<i class=\"fa fa-octopus-deploy\"></i>";
    Icon["ODNOKLASSNIKI"] = "<i class=\"fa fa-odnoklassniki\"></i>";
    Icon["ODNOKLASSNIKI_SQUARE"] = "<i class=\"fa fa-odnoklassniki-square\"></i>";
    Icon["OIL_CAN"] = "<i class=\"fa fa-oil-can\"></i>";
    Icon["OLD_REPUBLIC"] = "<i class=\"fa fa-old-republic\"></i>";
    Icon["OM"] = "<i class=\"fa fa-om\"></i>";
    Icon["OPENCART"] = "<i class=\"fa fa-opencart\"></i>";
    Icon["OPENID"] = "<i class=\"fa fa-openid\"></i>";
    Icon["OPERA"] = "<i class=\"fa fa-opera\"></i>";
    Icon["OPTIN_MONSTER"] = "<i class=\"fa fa-optin-monster\"></i>";
    Icon["ORCID"] = "<i class=\"fa fa-orcid\"></i>";
    Icon["OSI"] = "<i class=\"fa fa-osi\"></i>";
    Icon["OTTER"] = "<i class=\"fa fa-otter\"></i>";
    Icon["OUTDENT"] = "<i class=\"fa fa-outdent\"></i>";
    Icon["PAGE4"] = "<i class=\"fa fa-page4\"></i>";
    Icon["PAGELINES"] = "<i class=\"fa fa-pagelines\"></i>";
    Icon["PAGER"] = "<i class=\"fa fa-pager\"></i>";
    Icon["PAINT_BRUSH"] = "<i class=\"fa fa-paint-brush\"></i>";
    Icon["PAINT_ROLLER"] = "<i class=\"fa fa-paint-roller\"></i>";
    Icon["PALETTE"] = "<i class=\"fa fa-palette\"></i>";
    Icon["PALFED"] = "<i class=\"fa fa-palfed\"></i>";
    Icon["PALLET"] = "<i class=\"fa fa-pallet\"></i>";
    Icon["PAPERCLIP"] = "<i class=\"fa fa-paperclip\"></i>";
    Icon["PAPER_PLANE"] = "<i class=\"fa fa-paper-plane\"></i>";
    Icon["PARACHUTE_BOX"] = "<i class=\"fa fa-parachute-box\"></i>";
    Icon["PARAGRAPH"] = "<i class=\"fa fa-paragraph\"></i>";
    Icon["PARKING"] = "<i class=\"fa fa-parking\"></i>";
    Icon["PASSPORT"] = "<i class=\"fa fa-passport\"></i>";
    Icon["PASTAFARIANISM"] = "<i class=\"fa fa-pastafarianism\"></i>";
    Icon["PASTE"] = "<i class=\"fa fa-paste\"></i>";
    Icon["PATREON"] = "<i class=\"fa fa-patreon\"></i>";
    Icon["PAUSE"] = "<i class=\"fa fa-pause\"></i>";
    Icon["PAUSE_CIRCLE"] = "<i class=\"fa fa-pause-circle\"></i>";
    Icon["PAW"] = "<i class=\"fa fa-paw\"></i>";
    Icon["PAYPAL"] = "<i class=\"fa fa-paypal\"></i>";
    Icon["PEACE"] = "<i class=\"fa fa-peace\"></i>";
    Icon["PEN"] = "<i class=\"fa fa-pen\"></i>";
    Icon["PENCIL_ALT"] = "<i class=\"fa fa-pencil-alt\"></i>";
    Icon["PENCIL_RULER"] = "<i class=\"fa fa-pencil-ruler\"></i>";
    Icon["PENNY_ARCADE"] = "<i class=\"fa fa-penny-arcade\"></i>";
    Icon["PEN_ALT"] = "<i class=\"fa fa-pen-alt\"></i>";
    Icon["PEN_FANCY"] = "<i class=\"fa fa-pen-fancy\"></i>";
    Icon["PEN_NIB"] = "<i class=\"fa fa-pen-nib\"></i>";
    Icon["PEN_SQUARE"] = "<i class=\"fa fa-pen-square\"></i>";
    Icon["PEOPLE_ARROWS"] = "<i class=\"fa fa-people-arrows\"></i>";
    Icon["PEOPLE_CARRY"] = "<i class=\"fa fa-people-carry\"></i>";
    Icon["PEPPER_HOT"] = "<i class=\"fa fa-pepper-hot\"></i>";
    Icon["PERBYTE"] = "<i class=\"fa fa-perbyte\"></i>";
    Icon["PERCENT"] = "<i class=\"fa fa-percent\"></i>";
    Icon["PERCENTAGE"] = "<i class=\"fa fa-percentage\"></i>";
    Icon["PERISCOPE"] = "<i class=\"fa fa-periscope\"></i>";
    Icon["PERSON_BOOTH"] = "<i class=\"fa fa-person-booth\"></i>";
    Icon["PHABRICATOR"] = "<i class=\"fa fa-phabricator\"></i>";
    Icon["PHOENIX_FRAMEWORK"] = "<i class=\"fa fa-phoenix-framework\"></i>";
    Icon["PHOENIX_SQUADRON"] = "<i class=\"fa fa-phoenix-squadron\"></i>";
    Icon["PHONE"] = "<i class=\"fa fa-phone\"></i>";
    Icon["PHONE_ALT"] = "<i class=\"fa fa-phone-alt\"></i>";
    Icon["PHONE_SLASH"] = "<i class=\"fa fa-phone-slash\"></i>";
    Icon["PHONE_SQUARE"] = "<i class=\"fa fa-phone-square\"></i>";
    Icon["PHONE_SQUARE_ALT"] = "<i class=\"fa fa-phone-square-alt\"></i>";
    Icon["PHONE_VOLUME"] = "<i class=\"fa fa-phone-volume\"></i>";
    Icon["PHOTO_VIDEO"] = "<i class=\"fa fa-photo-video\"></i>";
    Icon["PHP"] = "<i class=\"fa fa-php\"></i>";
    Icon["PIED_PIPER"] = "<i class=\"fa fa-pied-piper\"></i>";
    Icon["PIED_PIPER_ALT"] = "<i class=\"fa fa-pied-piper-alt\"></i>";
    Icon["PIED_PIPER_HAT"] = "<i class=\"fa fa-pied-piper-hat\"></i>";
    Icon["PIED_PIPER_PP"] = "<i class=\"fa fa-pied-piper-pp\"></i>";
    Icon["PIED_PIPER_SQUARE"] = "<i class=\"fa fa-pied-piper-square\"></i>";
    Icon["PIGGY_BANK"] = "<i class=\"fa fa-piggy-bank\"></i>";
    Icon["PILLS"] = "<i class=\"fa fa-pills\"></i>";
    Icon["PINTEREST"] = "<i class=\"fa fa-pinterest\"></i>";
    Icon["PINTEREST_P"] = "<i class=\"fa fa-pinterest-p\"></i>";
    Icon["PINTEREST_SQUARE"] = "<i class=\"fa fa-pinterest-square\"></i>";
    Icon["PIZZA_SLICE"] = "<i class=\"fa fa-pizza-slice\"></i>";
    Icon["PLACE_OF_WORSHIP"] = "<i class=\"fa fa-place-of-worship\"></i>";
    Icon["PLANE"] = "<i class=\"fa fa-plane\"></i>";
    Icon["PLANE_ARRIVAL"] = "<i class=\"fa fa-plane-arrival\"></i>";
    Icon["PLANE_DEPARTURE"] = "<i class=\"fa fa-plane-departure\"></i>";
    Icon["PLANE_SLASH"] = "<i class=\"fa fa-plane-slash\"></i>";
    Icon["PLAY"] = "<i class=\"fa fa-play\"></i>";
    Icon["PLAYSTATION"] = "<i class=\"fa fa-playstation\"></i>";
    Icon["PLAY_CIRCLE"] = "<i class=\"fa fa-play-circle\"></i>";
    Icon["PLUG"] = "<i class=\"fa fa-plug\"></i>";
    Icon["PLUS"] = "<i class=\"fa fa-plus\"></i>";
    Icon["PLUS_CIRCLE"] = "<i class=\"fa fa-plus-circle\"></i>";
    Icon["PLUS_SQUARE"] = "<i class=\"fa fa-plus-square\"></i>";
    Icon["PODCAST"] = "<i class=\"fa fa-podcast\"></i>";
    Icon["POLL"] = "<i class=\"fa fa-poll\"></i>";
    Icon["POLL_H"] = "<i class=\"fa fa-poll-h\"></i>";
    Icon["POO"] = "<i class=\"fa fa-poo\"></i>";
    Icon["POOP"] = "<i class=\"fa fa-poop\"></i>";
    Icon["POO_STORM"] = "<i class=\"fa fa-poo-storm\"></i>";
    Icon["PORTRAIT"] = "<i class=\"fa fa-portrait\"></i>";
    Icon["POUND_SIGN"] = "<i class=\"fa fa-pound-sign\"></i>";
    Icon["POWER_OFF"] = "<i class=\"fa fa-power-off\"></i>";
    Icon["PRAY"] = "<i class=\"fa fa-pray\"></i>";
    Icon["PRAYING_HANDS"] = "<i class=\"fa fa-praying-hands\"></i>";
    Icon["PRESCRIPTION"] = "<i class=\"fa fa-prescription\"></i>";
    Icon["PRESCRIPTION_BOTTLE"] = "<i class=\"fa fa-prescription-bottle\"></i>";
    Icon["PRESCRIPTION_BOTTLE_ALT"] = "<i class=\"fa fa-prescription-bottle-alt\"></i>";
    Icon["PRINT"] = "<i class=\"fa fa-print\"></i>";
    Icon["PROCEDURES"] = "<i class=\"fa fa-procedures\"></i>";
    Icon["PRODUCT_HUNT"] = "<i class=\"fa fa-product-hunt\"></i>";
    Icon["PROJECT_DIAGRAM"] = "<i class=\"fa fa-project-diagram\"></i>";
    Icon["PUMP_MEDICAL"] = "<i class=\"fa fa-pump-medical\"></i>";
    Icon["PUMP_SOAP"] = "<i class=\"fa fa-pump-soap\"></i>";
    Icon["PUSHED"] = "<i class=\"fa fa-pushed\"></i>";
    Icon["PUZZLE_PIECE"] = "<i class=\"fa fa-puzzle-piece\"></i>";
    Icon["PYTHON"] = "<i class=\"fa fa-python\"></i>";
    Icon["QQ"] = "<i class=\"fa fa-qq\"></i>";
    Icon["QRCODE"] = "<i class=\"fa fa-qrcode\"></i>";
    Icon["QUESTION"] = "<i class=\"fa fa-question\"></i>";
    Icon["QUESTION_CIRCLE"] = "<i class=\"fa fa-question-circle\"></i>";
    Icon["QUIDDITCH"] = "<i class=\"fa fa-quidditch\"></i>";
    Icon["QUINSCAPE"] = "<i class=\"fa fa-quinscape\"></i>";
    Icon["QUORA"] = "<i class=\"fa fa-quora\"></i>";
    Icon["QUOTE_LEFT"] = "<i class=\"fa fa-quote-left\"></i>";
    Icon["QUOTE_RIGHT"] = "<i class=\"fa fa-quote-right\"></i>";
    Icon["QURAN"] = "<i class=\"fa fa-quran\"></i>";
    Icon["RADIATION"] = "<i class=\"fa fa-radiation\"></i>";
    Icon["RADIATION_ALT"] = "<i class=\"fa fa-radiation-alt\"></i>";
    Icon["RAINBOW"] = "<i class=\"fa fa-rainbow\"></i>";
    Icon["RANDOM"] = "<i class=\"fa fa-random\"></i>";
    Icon["RASPBERRY_PI"] = "<i class=\"fa fa-raspberry-pi\"></i>";
    Icon["RAVELRY"] = "<i class=\"fa fa-ravelry\"></i>";
    Icon["REACT"] = "<i class=\"fa fa-react\"></i>";
    Icon["REACTEUROPE"] = "<i class=\"fa fa-reacteurope\"></i>";
    Icon["README"] = "<i class=\"fa fa-readme\"></i>";
    Icon["REBEL"] = "<i class=\"fa fa-rebel\"></i>";
    Icon["RECEIPT"] = "<i class=\"fa fa-receipt\"></i>";
    Icon["RECORD_VINYL"] = "<i class=\"fa fa-record-vinyl\"></i>";
    Icon["RECYCLE"] = "<i class=\"fa fa-recycle\"></i>";
    Icon["REDDIT"] = "<i class=\"fa fa-reddit\"></i>";
    Icon["REDDIT_ALIEN"] = "<i class=\"fa fa-reddit-alien\"></i>";
    Icon["REDDIT_SQUARE"] = "<i class=\"fa fa-reddit-square\"></i>";
    Icon["REDHAT"] = "<i class=\"fa fa-redhat\"></i>";
    Icon["REDO"] = "<i class=\"fa fa-redo\"></i>";
    Icon["REDO_ALT"] = "<i class=\"fa fa-redo-alt\"></i>";
    Icon["RED_RIVER"] = "<i class=\"fa fa-red-river\"></i>";
    Icon["REGISTERED"] = "<i class=\"fa fa-registered\"></i>";
    Icon["REMOVE_FORMAT"] = "<i class=\"fa fa-remove-format\"></i>";
    Icon["RENREN"] = "<i class=\"fa fa-renren\"></i>";
    Icon["REPLY"] = "<i class=\"fa fa-reply\"></i>";
    Icon["REPLYD"] = "<i class=\"fa fa-replyd\"></i>";
    Icon["REPLY_ALL"] = "<i class=\"fa fa-reply-all\"></i>";
    Icon["REPUBLICAN"] = "<i class=\"fa fa-republican\"></i>";
    Icon["RESEARCHGATE"] = "<i class=\"fa fa-researchgate\"></i>";
    Icon["RESOLVING"] = "<i class=\"fa fa-resolving\"></i>";
    Icon["RESTROOM"] = "<i class=\"fa fa-restroom\"></i>";
    Icon["RETWEET"] = "<i class=\"fa fa-retweet\"></i>";
    Icon["REV"] = "<i class=\"fa fa-rev\"></i>";
    Icon["RIBBON"] = "<i class=\"fa fa-ribbon\"></i>";
    Icon["RING"] = "<i class=\"fa fa-ring\"></i>";
    Icon["ROAD"] = "<i class=\"fa fa-road\"></i>";
    Icon["ROBOT"] = "<i class=\"fa fa-robot\"></i>";
    Icon["ROCKET"] = "<i class=\"fa fa-rocket\"></i>";
    Icon["ROCKETCHAT"] = "<i class=\"fa fa-rocketchat\"></i>";
    Icon["ROCKRMS"] = "<i class=\"fa fa-rockrms\"></i>";
    Icon["ROUTE"] = "<i class=\"fa fa-route\"></i>";
    Icon["RSS"] = "<i class=\"fa fa-rss\"></i>";
    Icon["RSS_SQUARE"] = "<i class=\"fa fa-rss-square\"></i>";
    Icon["RUBLE_SIGN"] = "<i class=\"fa fa-ruble-sign\"></i>";
    Icon["RULER"] = "<i class=\"fa fa-ruler\"></i>";
    Icon["RULER_COMBINED"] = "<i class=\"fa fa-ruler-combined\"></i>";
    Icon["RULER_HORIZONTAL"] = "<i class=\"fa fa-ruler-horizontal\"></i>";
    Icon["RULER_VERTICAL"] = "<i class=\"fa fa-ruler-vertical\"></i>";
    Icon["RUNNING"] = "<i class=\"fa fa-running\"></i>";
    Icon["RUPEE_SIGN"] = "<i class=\"fa fa-rupee-sign\"></i>";
    Icon["RUST"] = "<i class=\"fa fa-rust\"></i>";
    Icon["R_PROJECT"] = "<i class=\"fa fa-r-project\"></i>";
    Icon["SAD_CRY"] = "<i class=\"fa fa-sad-cry\"></i>";
    Icon["SAD_TEAR"] = "<i class=\"fa fa-sad-tear\"></i>";
    Icon["SAFARI"] = "<i class=\"fa fa-safari\"></i>";
    Icon["SALESFORCE"] = "<i class=\"fa fa-salesforce\"></i>";
    Icon["SASS"] = "<i class=\"fa fa-sass\"></i>";
    Icon["SATELLITE"] = "<i class=\"fa fa-satellite\"></i>";
    Icon["SATELLITE_DISH"] = "<i class=\"fa fa-satellite-dish\"></i>";
    Icon["SAVE"] = "<i class=\"fa fa-save\"></i>";
    Icon["SCHLIX"] = "<i class=\"fa fa-schlix\"></i>";
    Icon["SCHOOL"] = "<i class=\"fa fa-school\"></i>";
    Icon["SCREWDRIVER"] = "<i class=\"fa fa-screwdriver\"></i>";
    Icon["SCRIBD"] = "<i class=\"fa fa-scribd\"></i>";
    Icon["SCROLL"] = "<i class=\"fa fa-scroll\"></i>";
    Icon["SD_CARD"] = "<i class=\"fa fa-sd-card\"></i>";
    Icon["SEARCH"] = "<i class=\"fa fa-search\"></i>";
    Icon["SEARCHENGIN"] = "<i class=\"fa fa-searchengin\"></i>";
    Icon["SEARCH_DOLLAR"] = "<i class=\"fa fa-search-dollar\"></i>";
    Icon["SEARCH_LOCATION"] = "<i class=\"fa fa-search-location\"></i>";
    Icon["SEARCH_MINUS"] = "<i class=\"fa fa-search-minus\"></i>";
    Icon["SEARCH_PLUS"] = "<i class=\"fa fa-search-plus\"></i>";
    Icon["SEEDLING"] = "<i class=\"fa fa-seedling\"></i>";
    Icon["SELLCAST"] = "<i class=\"fa fa-sellcast\"></i>";
    Icon["SELLSY"] = "<i class=\"fa fa-sellsy\"></i>";
    Icon["SERVER"] = "<i class=\"fa fa-server\"></i>";
    Icon["SERVICESTACK"] = "<i class=\"fa fa-servicestack\"></i>";
    Icon["SHAPES"] = "<i class=\"fa fa-shapes\"></i>";
    Icon["SHARE"] = "<i class=\"fa fa-share\"></i>";
    Icon["SHARE_ALT"] = "<i class=\"fa fa-share-alt\"></i>";
    Icon["SHARE_ALT_SQUARE"] = "<i class=\"fa fa-share-alt-square\"></i>";
    Icon["SHARE_SQUARE"] = "<i class=\"fa fa-share-square\"></i>";
    Icon["SHEKEL_SIGN"] = "<i class=\"fa fa-shekel-sign\"></i>";
    Icon["SHIELD_ALT"] = "<i class=\"fa fa-shield-alt\"></i>";
    Icon["SHIELD_VIRUS"] = "<i class=\"fa fa-shield-virus\"></i>";
    Icon["SHIP"] = "<i class=\"fa fa-ship\"></i>";
    Icon["SHIPPING_FAST"] = "<i class=\"fa fa-shipping-fast\"></i>";
    Icon["SHIRTSINBULK"] = "<i class=\"fa fa-shirtsinbulk\"></i>";
    Icon["SHOE_PRINTS"] = "<i class=\"fa fa-shoe-prints\"></i>";
    Icon["SHOPIFY"] = "<i class=\"fa fa-shopify\"></i>";
    Icon["SHOPPING_BAG"] = "<i class=\"fa fa-shopping-bag\"></i>";
    Icon["SHOPPING_BASKET"] = "<i class=\"fa fa-shopping-basket\"></i>";
    Icon["SHOPPING_CART"] = "<i class=\"fa fa-shopping-cart\"></i>";
    Icon["SHOPWARE"] = "<i class=\"fa fa-shopware\"></i>";
    Icon["SHOWER"] = "<i class=\"fa fa-shower\"></i>";
    Icon["SHUTTLE_VAN"] = "<i class=\"fa fa-shuttle-van\"></i>";
    Icon["SIGN"] = "<i class=\"fa fa-sign\"></i>";
    Icon["SIGNAL"] = "<i class=\"fa fa-signal\"></i>";
    Icon["SIGNATURE"] = "<i class=\"fa fa-signature\"></i>";
    Icon["SIGN_IN_ALT"] = "<i class=\"fa fa-sign-in-alt\"></i>";
    Icon["SIGN_LANGUAGE"] = "<i class=\"fa fa-sign-language\"></i>";
    Icon["SIGN_OUT_ALT"] = "<i class=\"fa fa-sign-out-alt\"></i>";
    Icon["SIMPLYBUILT"] = "<i class=\"fa fa-simplybuilt\"></i>";
    Icon["SIM_CARD"] = "<i class=\"fa fa-sim-card\"></i>";
    Icon["SINK"] = "<i class=\"fa fa-sink\"></i>";
    Icon["SISTRIX"] = "<i class=\"fa fa-sistrix\"></i>";
    Icon["SITEMAP"] = "<i class=\"fa fa-sitemap\"></i>";
    Icon["SITH"] = "<i class=\"fa fa-sith\"></i>";
    Icon["SKATING"] = "<i class=\"fa fa-skating\"></i>";
    Icon["SKETCH"] = "<i class=\"fa fa-sketch\"></i>";
    Icon["SKIING"] = "<i class=\"fa fa-skiing\"></i>";
    Icon["SKIING_NORDIC"] = "<i class=\"fa fa-skiing-nordic\"></i>";
    Icon["SKULL"] = "<i class=\"fa fa-skull\"></i>";
    Icon["SKULL_CROSSBONES"] = "<i class=\"fa fa-skull-crossbones\"></i>";
    Icon["SKYATLAS"] = "<i class=\"fa fa-skyatlas\"></i>";
    Icon["SKYPE"] = "<i class=\"fa fa-skype\"></i>";
    Icon["SLACK"] = "<i class=\"fa fa-slack\"></i>";
    Icon["SLACK_HASH"] = "<i class=\"fa fa-slack-hash\"></i>";
    Icon["SLASH"] = "<i class=\"fa fa-slash\"></i>";
    Icon["SLEIGH"] = "<i class=\"fa fa-sleigh\"></i>";
    Icon["SLIDERS_H"] = "<i class=\"fa fa-sliders-h\"></i>";
    Icon["SLIDESHARE"] = "<i class=\"fa fa-slideshare\"></i>";
    Icon["SMILE"] = "<i class=\"fa fa-smile\"></i>";
    Icon["SMILE_BEAM"] = "<i class=\"fa fa-smile-beam\"></i>";
    Icon["SMILE_WINK"] = "<i class=\"fa fa-smile-wink\"></i>";
    Icon["SMOG"] = "<i class=\"fa fa-smog\"></i>";
    Icon["SMOKING"] = "<i class=\"fa fa-smoking\"></i>";
    Icon["SMOKING_BAN"] = "<i class=\"fa fa-smoking-ban\"></i>";
    Icon["SMS"] = "<i class=\"fa fa-sms\"></i>";
    Icon["SNAPCHAT"] = "<i class=\"fa fa-snapchat\"></i>";
    Icon["SNAPCHAT_GHOST"] = "<i class=\"fa fa-snapchat-ghost\"></i>";
    Icon["SNAPCHAT_SQUARE"] = "<i class=\"fa fa-snapchat-square\"></i>";
    Icon["SNOWBOARDING"] = "<i class=\"fa fa-snowboarding\"></i>";
    Icon["SNOWFLAKE"] = "<i class=\"fa fa-snowflake\"></i>";
    Icon["SNOWMAN"] = "<i class=\"fa fa-snowman\"></i>";
    Icon["SNOWPLOW"] = "<i class=\"fa fa-snowplow\"></i>";
    Icon["SOAP"] = "<i class=\"fa fa-soap\"></i>";
    Icon["SOCKS"] = "<i class=\"fa fa-socks\"></i>";
    Icon["SOLAR_PANEL"] = "<i class=\"fa fa-solar-panel\"></i>";
    Icon["SORT"] = "<i class=\"fa fa-sort\"></i>";
    Icon["SORT_ALPHA_DOWN"] = "<i class=\"fa fa-sort-alpha-down\"></i>";
    Icon["SORT_ALPHA_DOWN_ALT"] = "<i class=\"fa fa-sort-alpha-down-alt\"></i>";
    Icon["SORT_ALPHA_UP"] = "<i class=\"fa fa-sort-alpha-up\"></i>";
    Icon["SORT_ALPHA_UP_ALT"] = "<i class=\"fa fa-sort-alpha-up-alt\"></i>";
    Icon["SORT_AMOUNT_DOWN"] = "<i class=\"fa fa-sort-amount-down\"></i>";
    Icon["SORT_AMOUNT_DOWN_ALT"] = "<i class=\"fa fa-sort-amount-down-alt\"></i>";
    Icon["SORT_AMOUNT_UP"] = "<i class=\"fa fa-sort-amount-up\"></i>";
    Icon["SORT_AMOUNT_UP_ALT"] = "<i class=\"fa fa-sort-amount-up-alt\"></i>";
    Icon["SORT_DOWN"] = "<i class=\"fa fa-sort-down\"></i>";
    Icon["SORT_NUMERIC_DOWN"] = "<i class=\"fa fa-sort-numeric-down\"></i>";
    Icon["SORT_NUMERIC_DOWN_ALT"] = "<i class=\"fa fa-sort-numeric-down-alt\"></i>";
    Icon["SORT_NUMERIC_UP"] = "<i class=\"fa fa-sort-numeric-up\"></i>";
    Icon["SORT_NUMERIC_UP_ALT"] = "<i class=\"fa fa-sort-numeric-up-alt\"></i>";
    Icon["SORT_UP"] = "<i class=\"fa fa-sort-up\"></i>";
    Icon["SOUNDCLOUD"] = "<i class=\"fa fa-soundcloud\"></i>";
    Icon["SOURCETREE"] = "<i class=\"fa fa-sourcetree\"></i>";
    Icon["SPA"] = "<i class=\"fa fa-spa\"></i>";
    Icon["SPACE_SHUTTLE"] = "<i class=\"fa fa-space-shuttle\"></i>";
    Icon["SPEAKAP"] = "<i class=\"fa fa-speakap\"></i>";
    Icon["SPEAKER_DECK"] = "<i class=\"fa fa-speaker-deck\"></i>";
    Icon["SPELL_CHECK"] = "<i class=\"fa fa-spell-check\"></i>";
    Icon["SPIDER"] = "<i class=\"fa fa-spider\"></i>";
    Icon["SPINNER"] = "<i class=\"fa fa-spinner\"></i>";
    Icon["SPLOTCH"] = "<i class=\"fa fa-splotch\"></i>";
    Icon["SPOTIFY"] = "<i class=\"fa fa-spotify\"></i>";
    Icon["SPRAY_CAN"] = "<i class=\"fa fa-spray-can\"></i>";
    Icon["SQUARE"] = "<i class=\"fa fa-square\"></i>";
    Icon["SQUARESPACE"] = "<i class=\"fa fa-squarespace\"></i>";
    Icon["SQUARE_FULL"] = "<i class=\"fa fa-square-full\"></i>";
    Icon["SQUARE_ROOT_ALT"] = "<i class=\"fa fa-square-root-alt\"></i>";
    Icon["STACKPATH"] = "<i class=\"fa fa-stackpath\"></i>";
    Icon["STACK_EXCHANGE"] = "<i class=\"fa fa-stack-exchange\"></i>";
    Icon["STACK_OVERFLOW"] = "<i class=\"fa fa-stack-overflow\"></i>";
    Icon["STAMP"] = "<i class=\"fa fa-stamp\"></i>";
    Icon["STAR"] = "<i class=\"fa fa-star\"></i>";
    Icon["STAR_AND_CRESCENT"] = "<i class=\"fa fa-star-and-crescent\"></i>";
    Icon["STAR_HALF"] = "<i class=\"fa fa-star-half\"></i>";
    Icon["STAR_HALF_ALT"] = "<i class=\"fa fa-star-half-alt\"></i>";
    Icon["STAR_OF_DAVID"] = "<i class=\"fa fa-star-of-david\"></i>";
    Icon["STAR_OF_LIFE"] = "<i class=\"fa fa-star-of-life\"></i>";
    Icon["STAYLINKED"] = "<i class=\"fa fa-staylinked\"></i>";
    Icon["STEAM"] = "<i class=\"fa fa-steam\"></i>";
    Icon["STEAM_SQUARE"] = "<i class=\"fa fa-steam-square\"></i>";
    Icon["STEAM_SYMBOL"] = "<i class=\"fa fa-steam-symbol\"></i>";
    Icon["STEP_BACKWARD"] = "<i class=\"fa fa-step-backward\"></i>";
    Icon["STEP_FORWARD"] = "<i class=\"fa fa-step-forward\"></i>";
    Icon["STETHOSCOPE"] = "<i class=\"fa fa-stethoscope\"></i>";
    Icon["STICKER_MULE"] = "<i class=\"fa fa-sticker-mule\"></i>";
    Icon["STICKY_NOTE"] = "<i class=\"fa fa-sticky-note\"></i>";
    Icon["STOP"] = "<i class=\"fa fa-stop\"></i>";
    Icon["STOPWATCH"] = "<i class=\"fa fa-stopwatch\"></i>";
    Icon["STOPWATCH_20"] = "<i class=\"fa fa-stopwatch-20\"></i>";
    Icon["STOP_CIRCLE"] = "<i class=\"fa fa-stop-circle\"></i>";
    Icon["STORE"] = "<i class=\"fa fa-store\"></i>";
    Icon["STORE_ALT"] = "<i class=\"fa fa-store-alt\"></i>";
    Icon["STORE_ALT_SLASH"] = "<i class=\"fa fa-store-alt-slash\"></i>";
    Icon["STORE_SLASH"] = "<i class=\"fa fa-store-slash\"></i>";
    Icon["STRAVA"] = "<i class=\"fa fa-strava\"></i>";
    Icon["STREAM"] = "<i class=\"fa fa-stream\"></i>";
    Icon["STREET_VIEW"] = "<i class=\"fa fa-street-view\"></i>";
    Icon["STRIKETHROUGH"] = "<i class=\"fa fa-strikethrough\"></i>";
    Icon["LINETHROUGH"] = "<i class=\"fa fa-strikethrough\"></i>";
    Icon["STRIPE"] = "<i class=\"fa fa-stripe\"></i>";
    Icon["STRIPE_S"] = "<i class=\"fa fa-stripe-s\"></i>";
    Icon["STROOPWAFEL"] = "<i class=\"fa fa-stroopwafel\"></i>";
    Icon["STUDIOVINARI"] = "<i class=\"fa fa-studiovinari\"></i>";
    Icon["STUMBLEUPON"] = "<i class=\"fa fa-stumbleupon\"></i>";
    Icon["STUMBLEUPON_CIRCLE"] = "<i class=\"fa fa-stumbleupon-circle\"></i>";
    Icon["SUBSCRIPT"] = "<i class=\"fa fa-subscript\"></i>";
    Icon["SUBWAY"] = "<i class=\"fa fa-subway\"></i>";
    Icon["SUITCASE"] = "<i class=\"fa fa-suitcase\"></i>";
    Icon["SUITCASE_ROLLING"] = "<i class=\"fa fa-suitcase-rolling\"></i>";
    Icon["SUN"] = "<i class=\"fa fa-sun\"></i>";
    Icon["SUPERPOWERS"] = "<i class=\"fa fa-superpowers\"></i>";
    Icon["SUPERSCRIPT"] = "<i class=\"fa fa-superscript\"></i>";
    Icon["SUPPLE"] = "<i class=\"fa fa-supple\"></i>";
    Icon["SURPRISE"] = "<i class=\"fa fa-surprise\"></i>";
    Icon["SUSE"] = "<i class=\"fa fa-suse\"></i>";
    Icon["SWATCHBOOK"] = "<i class=\"fa fa-swatchbook\"></i>";
    Icon["SWIFT"] = "<i class=\"fa fa-swift\"></i>";
    Icon["SWIMMER"] = "<i class=\"fa fa-swimmer\"></i>";
    Icon["SWIMMING_POOL"] = "<i class=\"fa fa-swimming-pool\"></i>";
    Icon["SYMFONY"] = "<i class=\"fa fa-symfony\"></i>";
    Icon["SYNAGOGUE"] = "<i class=\"fa fa-synagogue\"></i>";
    Icon["SYNC"] = "<i class=\"fa fa-sync\"></i>";
    Icon["SYNC_ALT"] = "<i class=\"fa fa-sync-alt\"></i>";
    Icon["SYRINGE"] = "<i class=\"fa fa-syringe\"></i>";
    Icon["TABLE"] = "<i class=\"fa fa-table\"></i>";
    Icon["TABLET"] = "<i class=\"fa fa-tablet\"></i>";
    Icon["TABLETS"] = "<i class=\"fa fa-tablets\"></i>";
    Icon["TABLET_ALT"] = "<i class=\"fa fa-tablet-alt\"></i>";
    Icon["TABLE_TENNIS"] = "<i class=\"fa fa-table-tennis\"></i>";
    Icon["TACHOMETER_ALT"] = "<i class=\"fa fa-tachometer-alt\"></i>";
    Icon["TAG"] = "<i class=\"fa fa-tag\"></i>";
    Icon["TAGS"] = "<i class=\"fa fa-tags\"></i>";
    Icon["TAPE"] = "<i class=\"fa fa-tape\"></i>";
    Icon["TASKS"] = "<i class=\"fa fa-tasks\"></i>";
    Icon["TAXI"] = "<i class=\"fa fa-taxi\"></i>";
    Icon["TEAMSPEAK"] = "<i class=\"fa fa-teamspeak\"></i>";
    Icon["TEETH"] = "<i class=\"fa fa-teeth\"></i>";
    Icon["TEETH_OPEN"] = "<i class=\"fa fa-teeth-open\"></i>";
    Icon["TELEGRAM"] = "<i class=\"fa fa-telegram\"></i>";
    Icon["TELEGRAM_PLANE"] = "<i class=\"fa fa-telegram-plane\"></i>";
    Icon["TEMPERATURE_HIGH"] = "<i class=\"fa fa-temperature-high\"></i>";
    Icon["TEMPERATURE_LOW"] = "<i class=\"fa fa-temperature-low\"></i>";
    Icon["TENCENT_WEIBO"] = "<i class=\"fa fa-tencent-weibo\"></i>";
    Icon["TENGE"] = "<i class=\"fa fa-tenge\"></i>";
    Icon["TERMINAL"] = "<i class=\"fa fa-terminal\"></i>";
    Icon["TEXT_HEIGHT"] = "<i class=\"fa fa-text-height\"></i>";
    Icon["TEXT_WIDTH"] = "<i class=\"fa fa-text-width\"></i>";
    Icon["TH"] = "<i class=\"fa fa-th\"></i>";
    Icon["THEATER_MASKS"] = "<i class=\"fa fa-theater-masks\"></i>";
    Icon["THEMECO"] = "<i class=\"fa fa-themeco\"></i>";
    Icon["THEMEISLE"] = "<i class=\"fa fa-themeisle\"></i>";
    Icon["THERMOMETER"] = "<i class=\"fa fa-thermometer\"></i>";
    Icon["THERMOMETER_EMPTY"] = "<i class=\"fa fa-thermometer-empty\"></i>";
    Icon["THERMOMETER_FULL"] = "<i class=\"fa fa-thermometer-full\"></i>";
    Icon["THERMOMETER_HALF"] = "<i class=\"fa fa-thermometer-half\"></i>";
    Icon["THERMOMETER_QUARTER"] = "<i class=\"fa fa-thermometer-quarter\"></i>";
    Icon["THERMOMETER_THREE_QUARTERS"] = "<i class=\"fa fa-thermometer-three-quarters\"></i>";
    Icon["THE_RED_YETI"] = "<i class=\"fa fa-the-red-yeti\"></i>";
    Icon["THINK_PEAKS"] = "<i class=\"fa fa-think-peaks\"></i>";
    Icon["THUMBS_DOWN"] = "<i class=\"fa fa-thumbs-down\"></i>";
    Icon["THUMBS_UP"] = "<i class=\"fa fa-thumbs-up\"></i>";
    Icon["THUMBTACK"] = "<i class=\"fa fa-thumbtack\"></i>";
    Icon["TH_LARGE"] = "<i class=\"fa fa-th-large\"></i>";
    Icon["TH_LIST"] = "<i class=\"fa fa-th-list\"></i>";
    Icon["TICKET_ALT"] = "<i class=\"fa fa-ticket-alt\"></i>";
    Icon["TIKTOK"] = "<i class=\"fa fa-tiktok\"></i>";
    Icon["TIMES"] = "<i class=\"fa fa-times\"></i>";
    Icon["TIMES_CIRCLE"] = "<i class=\"fa fa-times-circle\"></i>";
    Icon["TINT"] = "<i class=\"fa fa-tint\"></i>";
    Icon["TINT_SLASH"] = "<i class=\"fa fa-tint-slash\"></i>";
    Icon["TIRED"] = "<i class=\"fa fa-tired\"></i>";
    Icon["TOGGLE_OFF"] = "<i class=\"fa fa-toggle-off\"></i>";
    Icon["TOGGLE_ON"] = "<i class=\"fa fa-toggle-on\"></i>";
    Icon["TOILET"] = "<i class=\"fa fa-toilet\"></i>";
    Icon["TOILET_PAPER"] = "<i class=\"fa fa-toilet-paper\"></i>";
    Icon["TOILET_PAPER_SLASH"] = "<i class=\"fa fa-toilet-paper-slash\"></i>";
    Icon["TOOLBOX"] = "<i class=\"fa fa-toolbox\"></i>";
    Icon["TOOLS"] = "<i class=\"fa fa-tools\"></i>";
    Icon["TOOTH"] = "<i class=\"fa fa-tooth\"></i>";
    Icon["TORAH"] = "<i class=\"fa fa-torah\"></i>";
    Icon["TORII_GATE"] = "<i class=\"fa fa-torii-gate\"></i>";
    Icon["TRACTOR"] = "<i class=\"fa fa-tractor\"></i>";
    Icon["TRADEMARK"] = "<i class=\"fa fa-trademark\"></i>";
    Icon["TRADE_FEDERATION"] = "<i class=\"fa fa-trade-federation\"></i>";
    Icon["TRAFFIC_LIGHT"] = "<i class=\"fa fa-traffic-light\"></i>";
    Icon["TRAILER"] = "<i class=\"fa fa-trailer\"></i>";
    Icon["TRAIN"] = "<i class=\"fa fa-train\"></i>";
    Icon["TRAM"] = "<i class=\"fa fa-tram\"></i>";
    Icon["TRANSGENDER"] = "<i class=\"fa fa-transgender\"></i>";
    Icon["TRANSGENDER_ALT"] = "<i class=\"fa fa-transgender-alt\"></i>";
    Icon["TRASH"] = "<i class=\"fa fa-trash\"></i>";
    Icon["TRASH_ALT"] = "<i class=\"fa fa-trash-alt\"></i>";
    Icon["TRASH_RESTORE"] = "<i class=\"fa fa-trash-restore\"></i>";
    Icon["TRASH_RESTORE_ALT"] = "<i class=\"fa fa-trash-restore-alt\"></i>";
    Icon["TREE"] = "<i class=\"fa fa-tree\"></i>";
    Icon["TRELLO"] = "<i class=\"fa fa-trello\"></i>";
    Icon["TRIPADVISOR"] = "<i class=\"fa fa-tripadvisor\"></i>";
    Icon["TROPHY"] = "<i class=\"fa fa-trophy\"></i>";
    Icon["TRUCK"] = "<i class=\"fa fa-truck\"></i>";
    Icon["TRUCK_LOADING"] = "<i class=\"fa fa-truck-loading\"></i>";
    Icon["TRUCK_MONSTER"] = "<i class=\"fa fa-truck-monster\"></i>";
    Icon["TRUCK_MOVING"] = "<i class=\"fa fa-truck-moving\"></i>";
    Icon["TRUCK_PICKUP"] = "<i class=\"fa fa-truck-pickup\"></i>";
    Icon["TSHIRT"] = "<i class=\"fa fa-tshirt\"></i>";
    Icon["TTY"] = "<i class=\"fa fa-tty\"></i>";
    Icon["TUMBLR"] = "<i class=\"fa fa-tumblr\"></i>";
    Icon["TUMBLR_SQUARE"] = "<i class=\"fa fa-tumblr-square\"></i>";
    Icon["TV"] = "<i class=\"fa fa-tv\"></i>";
    Icon["TWITCH"] = "<i class=\"fa fa-twitch\"></i>";
    Icon["TWITTER"] = "<i class=\"fa fa-twitter\"></i>";
    Icon["TWITTER_SQUARE"] = "<i class=\"fa fa-twitter-square\"></i>";
    Icon["TYPO3"] = "<i class=\"fa fa-typo3\"></i>";
    Icon["UBER"] = "<i class=\"fa fa-uber\"></i>";
    Icon["UBUNTU"] = "<i class=\"fa fa-ubuntu\"></i>";
    Icon["UIKIT"] = "<i class=\"fa fa-uikit\"></i>";
    Icon["UMBRACO"] = "<i class=\"fa fa-umbraco\"></i>";
    Icon["UMBRELLA"] = "<i class=\"fa fa-umbrella\"></i>";
    Icon["UMBRELLA_BEACH"] = "<i class=\"fa fa-umbrella-beach\"></i>";
    Icon["UNCHARTED"] = "<i class=\"fa fa-uncharted\"></i>";
    Icon["UNDERLINE"] = "<i class=\"fa fa-underline\"></i>";
    Icon["UNDO"] = "<i class=\"fa fa-undo\"></i>";
    Icon["UNDO_ALT"] = "<i class=\"fa fa-undo-alt\"></i>";
    Icon["UNIREGISTRY"] = "<i class=\"fa fa-uniregistry\"></i>";
    Icon["UNITY"] = "<i class=\"fa fa-unity\"></i>";
    Icon["UNIVERSAL_ACCESS"] = "<i class=\"fa fa-universal-access\"></i>";
    Icon["UNIVERSITY"] = "<i class=\"fa fa-university\"></i>";
    Icon["UNLINK"] = "<i class=\"fa fa-unlink\"></i>";
    Icon["UNLOCK"] = "<i class=\"fa fa-unlock\"></i>";
    Icon["UNLOCK_ALT"] = "<i class=\"fa fa-unlock-alt\"></i>";
    Icon["UNSPLASH"] = "<i class=\"fa fa-unsplash\"></i>";
    Icon["UNTAPPD"] = "<i class=\"fa fa-untappd\"></i>";
    Icon["UPLOAD"] = "<i class=\"fa fa-upload\"></i>";
    Icon["UPS"] = "<i class=\"fa fa-ups\"></i>";
    Icon["USB"] = "<i class=\"fa fa-usb\"></i>";
    Icon["USER"] = "<i class=\"fa fa-user\"></i>";
    Icon["USERS"] = "<i class=\"fa fa-users\"></i>";
    Icon["USERS_COG"] = "<i class=\"fa fa-users-cog\"></i>";
    Icon["USERS_SLASH"] = "<i class=\"fa fa-users-slash\"></i>";
    Icon["USER_ALT"] = "<i class=\"fa fa-user-alt\"></i>";
    Icon["USER_ALT_SLASH"] = "<i class=\"fa fa-user-alt-slash\"></i>";
    Icon["USER_ASTRONAUT"] = "<i class=\"fa fa-user-astronaut\"></i>";
    Icon["USER_CHECK"] = "<i class=\"fa fa-user-check\"></i>";
    Icon["USER_CIRCLE"] = "<i class=\"fa fa-user-circle\"></i>";
    Icon["USER_CLOCK"] = "<i class=\"fa fa-user-clock\"></i>";
    Icon["USER_COG"] = "<i class=\"fa fa-user-cog\"></i>";
    Icon["USER_EDIT"] = "<i class=\"fa fa-user-edit\"></i>";
    Icon["USER_FRIENDS"] = "<i class=\"fa fa-user-friends\"></i>";
    Icon["USER_GRADUATE"] = "<i class=\"fa fa-user-graduate\"></i>";
    Icon["USER_INJURED"] = "<i class=\"fa fa-user-injured\"></i>";
    Icon["USER_LOCK"] = "<i class=\"fa fa-user-lock\"></i>";
    Icon["USER_MD"] = "<i class=\"fa fa-user-md\"></i>";
    Icon["USER_MINUS"] = "<i class=\"fa fa-user-minus\"></i>";
    Icon["USER_NINJA"] = "<i class=\"fa fa-user-ninja\"></i>";
    Icon["USER_NURSE"] = "<i class=\"fa fa-user-nurse\"></i>";
    Icon["USER_PLUS"] = "<i class=\"fa fa-user-plus\"></i>";
    Icon["USER_SECRET"] = "<i class=\"fa fa-user-secret\"></i>";
    Icon["USER_SHIELD"] = "<i class=\"fa fa-user-shield\"></i>";
    Icon["USER_SLASH"] = "<i class=\"fa fa-user-slash\"></i>";
    Icon["USER_TAG"] = "<i class=\"fa fa-user-tag\"></i>";
    Icon["USER_TIE"] = "<i class=\"fa fa-user-tie\"></i>";
    Icon["USER_TIMES"] = "<i class=\"fa fa-user-times\"></i>";
    Icon["USPS"] = "<i class=\"fa fa-usps\"></i>";
    Icon["USSUNNAH"] = "<i class=\"fa fa-ussunnah\"></i>";
    Icon["UTENSILS"] = "<i class=\"fa fa-utensils\"></i>";
    Icon["UTENSIL_SPOON"] = "<i class=\"fa fa-utensil-spoon\"></i>";
    Icon["VAADIN"] = "<i class=\"fa fa-vaadin\"></i>";
    Icon["VECTOR_SQUARE"] = "<i class=\"fa fa-vector-square\"></i>";
    Icon["VENUS"] = "<i class=\"fa fa-venus\"></i>";
    Icon["VENUS_DOUBLE"] = "<i class=\"fa fa-venus-double\"></i>";
    Icon["VENUS_MARS"] = "<i class=\"fa fa-venus-mars\"></i>";
    Icon["VEST"] = "<i class=\"fa fa-vest\"></i>";
    Icon["VEST_PATCHES"] = "<i class=\"fa fa-vest-patches\"></i>";
    Icon["VIACOIN"] = "<i class=\"fa fa-viacoin\"></i>";
    Icon["VIADEO"] = "<i class=\"fa fa-viadeo\"></i>";
    Icon["VIADEO_SQUARE"] = "<i class=\"fa fa-viadeo-square\"></i>";
    Icon["VIAL"] = "<i class=\"fa fa-vial\"></i>";
    Icon["VIALS"] = "<i class=\"fa fa-vials\"></i>";
    Icon["VIBER"] = "<i class=\"fa fa-viber\"></i>";
    Icon["VIDEO"] = "<i class=\"fa fa-video\"></i>";
    Icon["VIDEO_SLASH"] = "<i class=\"fa fa-video-slash\"></i>";
    Icon["VIHARA"] = "<i class=\"fa fa-vihara\"></i>";
    Icon["VIMEO"] = "<i class=\"fa fa-vimeo\"></i>";
    Icon["VIMEO_SQUARE"] = "<i class=\"fa fa-vimeo-square\"></i>";
    Icon["VIMEO_V"] = "<i class=\"fa fa-vimeo-v\"></i>";
    Icon["VINE"] = "<i class=\"fa fa-vine\"></i>";
    Icon["VIRUS"] = "<i class=\"fa fa-virus\"></i>";
    Icon["VIRUSES"] = "<i class=\"fa fa-viruses\"></i>";
    Icon["VIRUS_SLASH"] = "<i class=\"fa fa-virus-slash\"></i>";
    Icon["VK"] = "<i class=\"fa fa-vk\"></i>";
    Icon["VNV"] = "<i class=\"fa fa-vnv\"></i>";
    Icon["VOICEMAIL"] = "<i class=\"fa fa-voicemail\"></i>";
    Icon["VOLLEYBALL_BALL"] = "<i class=\"fa fa-volleyball-ball\"></i>";
    Icon["VOLUME_DOWN"] = "<i class=\"fa fa-volume-down\"></i>";
    Icon["VOLUME_MUTE"] = "<i class=\"fa fa-volume-mute\"></i>";
    Icon["VOLUME_OFF"] = "<i class=\"fa fa-volume-off\"></i>";
    Icon["VOLUME_UP"] = "<i class=\"fa fa-volume-up\"></i>";
    Icon["VOTE_YEA"] = "<i class=\"fa fa-vote-yea\"></i>";
    Icon["VR_CARDBOARD"] = "<i class=\"fa fa-vr-cardboard\"></i>";
    Icon["VUEJS"] = "<i class=\"fa fa-vuejs\"></i>";
    Icon["WALKING"] = "<i class=\"fa fa-walking\"></i>";
    Icon["WALLET"] = "<i class=\"fa fa-wallet\"></i>";
    Icon["WAREHOUSE"] = "<i class=\"fa fa-warehouse\"></i>";
    Icon["WATCHMAN_MONITORING"] = "<i class=\"fa fa-watchman-monitoring\"></i>";
    Icon["WATER"] = "<i class=\"fa fa-water\"></i>";
    Icon["WAVE_SQUARE"] = "<i class=\"fa fa-wave-square\"></i>";
    Icon["WAZE"] = "<i class=\"fa fa-waze\"></i>";
    Icon["WEEBLY"] = "<i class=\"fa fa-weebly\"></i>";
    Icon["WEIBO"] = "<i class=\"fa fa-weibo\"></i>";
    Icon["WEIGHT"] = "<i class=\"fa fa-weight\"></i>";
    Icon["WEIGHT_HANGING"] = "<i class=\"fa fa-weight-hanging\"></i>";
    Icon["WEIXIN"] = "<i class=\"fa fa-weixin\"></i>";
    Icon["WHATSAPP"] = "<i class=\"fa fa-whatsapp\"></i>";
    Icon["WHATSAPP_SQUARE"] = "<i class=\"fa fa-whatsapp-square\"></i>";
    Icon["WHEELCHAIR"] = "<i class=\"fa fa-wheelchair\"></i>";
    Icon["WHMCS"] = "<i class=\"fa fa-whmcs\"></i>";
    Icon["WIFI"] = "<i class=\"fa fa-wifi\"></i>";
    Icon["WIKIPEDIA_W"] = "<i class=\"fa fa-wikipedia-w\"></i>";
    Icon["WIND"] = "<i class=\"fa fa-wind\"></i>";
    Icon["WINDOWS"] = "<i class=\"fa fa-windows\"></i>";
    Icon["WINDOW_CLOSE"] = "<i class=\"fa fa-window-close\"></i>";
    Icon["WINDOW_MAXIMIZE"] = "<i class=\"fa fa-window-maximize\"></i>";
    Icon["WINDOW_MINIMIZE"] = "<i class=\"fa fa-window-minimize\"></i>";
    Icon["WINDOW_RESTORE"] = "<i class=\"fa fa-window-restore\"></i>";
    Icon["WINE_BOTTLE"] = "<i class=\"fa fa-wine-bottle\"></i>";
    Icon["WINE_GLASS"] = "<i class=\"fa fa-wine-glass\"></i>";
    Icon["WINE_GLASS_ALT"] = "<i class=\"fa fa-wine-glass-alt\"></i>";
    Icon["WIX"] = "<i class=\"fa fa-wix\"></i>";
    Icon["WIZARDS_OF_THE_COAST"] = "<i class=\"fa fa-wizards-of-the-coast\"></i>";
    Icon["WODU"] = "<i class=\"fa fa-wodu\"></i>";
    Icon["WOLF_PACK_BATTALION"] = "<i class=\"fa fa-wolf-pack-battalion\"></i>";
    Icon["WON_SIGN"] = "<i class=\"fa fa-won-sign\"></i>";
    Icon["WORDPRESS"] = "<i class=\"fa fa-wordpress\"></i>";
    Icon["WORDPRESS_SIMPLE"] = "<i class=\"fa fa-wordpress-simple\"></i>";
    Icon["WPBEGINNER"] = "<i class=\"fa fa-wpbeginner\"></i>";
    Icon["WPEXPLORER"] = "<i class=\"fa fa-wpexplorer\"></i>";
    Icon["WPFORMS"] = "<i class=\"fa fa-wpforms\"></i>";
    Icon["WPRESSR"] = "<i class=\"fa fa-wpressr\"></i>";
    Icon["WRENCH"] = "<i class=\"fa fa-wrench\"></i>";
    Icon["XBOX"] = "<i class=\"fa fa-xbox\"></i>";
    Icon["XING"] = "<i class=\"fa fa-xing\"></i>";
    Icon["XING_SQUARE"] = "<i class=\"fa fa-xing-square\"></i>";
    Icon["X_RAY"] = "<i class=\"fa fa-x-ray\"></i>";
    Icon["YAHOO"] = "<i class=\"fa fa-yahoo\"></i>";
    Icon["YAMMER"] = "<i class=\"fa fa-yammer\"></i>";
    Icon["YANDEX"] = "<i class=\"fa fa-yandex\"></i>";
    Icon["YANDEX_INTERNATIONAL"] = "<i class=\"fa fa-yandex-international\"></i>";
    Icon["YARN"] = "<i class=\"fa fa-yarn\"></i>";
    Icon["YELP"] = "<i class=\"fa fa-yelp\"></i>";
    Icon["YEN_SIGN"] = "<i class=\"fa fa-yen-sign\"></i>";
    Icon["YIN_YANG"] = "<i class=\"fa fa-yin-yang\"></i>";
    Icon["YOAST"] = "<i class=\"fa fa-yoast\"></i>";
    Icon["YOUTUBE"] = "<i class=\"fa fa-youtube\"></i>";
    Icon["YOUTUBE_SQUARE"] = "<i class=\"fa fa-youtube-square\"></i>";
    Icon["Y_COMBINATOR"] = "<i class=\"fa fa-y-combinator\"></i>";
    Icon["ZHIHU"] = "<i class=\"fa fa-zhihu\"></i>";
    Icon["_500PX"] = "<i class=\"fa fa-500px\"></i>";
})(Icon || (Icon = {}));
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
        _this.bar.style.left = "45%";
        _this.bar.style.top = "50%";
        _this.container.appendChild(_this.bar);
        _this.style = document.createElement(Constants.STYLE);
        _this.style.type = Constants.TEXT_CSS;
        _this.style.innerHTML = Spinner.keyframes;
        document.body.appendChild(_this.style);
        _this.hide();
        return _this;
    }
    Spinner.prototype.update = function () {
    };
    Spinner.prototype.getElement = function () {
        return this.bar;
    };
    Spinner.prototype.show = function () {
        _super.prototype.show.call(this);
        this.update();
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
            if (!Error.captureStackTrace) {
                return;
            }
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
    Utils.div = function (innerText) {
        var div = document.createElement(Constants.DIV);
        if (innerText) {
            div.innerText = innerText;
        }
        return div;
    };
    Utils.input = function () {
        return document.createElement(Constants.INPUT);
    };
    Utils.isFullscreen = function () {
        return window.innerWidth == screen.width && window.innerHeight == screen.height;
    };
    Utils.isCompact = function () {
        return window.innerWidth < 1000;
    };
    Utils.isIos = function () {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    };
    Utils.toUrlParameters = function (data) {
        var url = Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }).join('&');
        return url;
    };
    Utils.copyToClipboard = function (text) {
        if (window.clipboardData && window.clipboardData.setData) {
            return clipboardData.setData("Text", text);
        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");
            }
            catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            }
            finally {
                document.body.removeChild(textarea);
            }
        }
    };
    Utils.prototype.test = function () {
        var node = document.body.appendChild(document.createElement('div'));
        node.innerHTML = 'test!!!111';
        var range = document.createRange();
        range.selectNode(node);
        window.getSelection().addRange(range);
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy email command was ' + msg);
        }
        catch (err) {
            console.log('Oops, unable to copy');
        }
        window.getSelection().removeAllRanges();
        document.body.removeChild(node);
    };
    Utils.isMobile = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    ;
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
        _this.hash = Math.random();
        _this.clip = null;
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
            _this.changed();
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
            _this.changed();
        });
        object.on(Constants.DESELECTED, function () {
            Constructor.instance.onDeselectHandler((_this));
            _this.side.selection = null;
            _this.changed();
        });
        object.on(Constants.REMOVED, function () {
            _this.side.selection = null;
        });
        object.setOptions(Element2D.commonDefaults);
    };
    Element2D.prototype.randomizePosition = function () {
        var width = this.side.canvas.getWidth() / this.side.getZoom();
        var height = this.side.canvas.getHeight() / this.side.getZoom();
        var w = Math.max((width / 2) * Math.random(), width * 0.1);
        var h = Math.max((height / 2) * Math.random(), height * 0.1);
        this.object.left = (width - w) * Math.random() + w / 2;
        this.object.top = (height - h) * Math.random() + h / 2;
        this.fitIntoMargins();
        this.object.setCoords();
        this.side.canvas.renderAll();
    };
    Element2D.prototype.setPositionAtCenterOfViewport = function () {
        var bound = this.side.canvas.clipPath.getBoundingRect();
        this.object.set({
            top: (bound.top + bound.height / 2) - this.object.height / 2,
            left: (bound.left + bound.width / 2) - this.object.width / 2,
        });
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
            if (this.isText()) {
                this.object.styles = {};
            }
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
        if (this.isText()) {
            var font = new FontFaceObserver(fontFamily);
            var element_1 = this;
            font.load(FontFamilyButton.charset)
                .then(function () {
                element_1.object.set("fontFamily", fontFamily);
                element_1.side.canvas.requestRenderAll();
                element_1.changed();
                element_1.side.saveState();
            }).catch(function (e) {
                console.log(e);
            });
        }
    };
    Element2D.prototype.isEditing = function () {
        return this.type == ElementType.TEXT && this.object.isEditing;
    };
    Element2D.prototype.getText = function () {
        return this.isText()
            ? this.object.text
            : null;
    };
    Element2D.prototype.setText = function (value) {
        if (this.isText()) {
            this.object.text = value;
            this.side.canvas.renderAll();
        }
    };
    Element2D.prototype.getFontFamily = function () {
        return this.isText() ? this.object.fontFamily : null;
    };
    Element2D.prototype.setFontSize = function (value) {
        if (this.isText()) {
            this.object.fontSize = value;
            this.object.dirty = true;
            this.side.canvas.requestRenderAll();
            Constructor.instance.changed();
            this.changed();
        }
    };
    Element2D.prototype.getFontSize = function () {
        return this.isText() ? this.object.fontSize : null;
    };
    Element2D.prototype.setItalic = function (value) {
        if (this.isText()) {
            this.object.fontStyle = value ? Constants.ITALIC : Constants.NORMAL;
            this.object.dirty = true;
            this.side.canvas.requestRenderAll();
            this.side.saveState();
            this.changed();
        }
    };
    Element2D.prototype.isItalic = function () {
        return this.isText() ? this.object.fontStyle === Constants.ITALIC : null;
    };
    Element2D.prototype.toggleItalic = function () {
        this.setItalic(!this.isItalic());
    };
    Element2D.prototype.setBold = function (value) {
        if (this.isText()) {
            this.object.fontWeight = value ? Constants.BOLD : Constants.NORMAL;
            this.side.canvas.renderAll();
            this.side.saveState();
            this.changed();
        }
    };
    Element2D.prototype.isText = function () {
        return this.type === ElementType.TEXT;
    };
    Element2D.prototype.isImage = function () {
        return this.type === ElementType.IMAGE;
    };
    Element2D.prototype.isBold = function () {
        return this.isText() ? this.object.fontWeight === Constants.BOLD : null;
    };
    Element2D.prototype.toggleBold = function () {
        this.setBold(!this.isBold());
    };
    Element2D.prototype.setTextDecoration = function (value) {
        if (this.isText()) {
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
            this.changed();
        }
    };
    Element2D.prototype.toggleUnderline = function () {
        if (!this.isUnderline()) {
            this.setTextDecoration(TextDecoration.UNDERLINE);
        }
        else {
            this.setTextDecoration(null);
        }
    };
    Element2D.prototype.toggleOverline = function () {
        if (!this.isOverline()) {
            this.setTextDecoration(TextDecoration.OVERLINE);
        }
        else {
            this.setTextDecoration(null);
        }
    };
    Element2D.prototype.toggleLinethrough = function () {
        if (!this.isLinethrough()) {
            this.setTextDecoration(TextDecoration.LINETHROUGH);
        }
        else {
            this.setTextDecoration(null);
        }
    };
    Element2D.prototype.clearDecoration = function () {
        this.setTextDecoration(null);
    };
    Element2D.prototype.isUnderline = function () {
        return this.getTextDecoration() == TextDecoration.UNDERLINE;
    };
    Element2D.prototype.isOverline = function () {
        return this.getTextDecoration() == TextDecoration.OVERLINE;
    };
    Element2D.prototype.isLinethrough = function () {
        return this.getTextDecoration() == TextDecoration.LINETHROUGH;
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
        if (this.isText()) {
            this.object.textAlign = value;
            this.side.canvas.renderAll();
            this.side.saveState();
        }
    };
    Element2D.prototype.getTextAlignment = function () {
        return this.isText() ? this.object.textAlign : null;
    };
    Element2D.prototype.setLineHeight = function (value) {
        if (this.isText()) {
            this.object.lineHeight = value;
            this.side.canvas.renderAll();
            Constructor.instance.changed();
        }
    };
    Element2D.prototype.getLineHeight = function () {
        return this.isText() ? this.object.lineHeight : null;
    };
    Element2D.prototype.setLetterSpacing = function (value) {
        if (this.isText()) {
            this.object.charSpacing = value;
            this.side.canvas.renderAll();
            Constructor.instance.changed();
        }
    };
    Element2D.prototype.getLetterSpacing = function () {
        return this.isText() ? this.object.charSpacing : 0;
    };
    Element2D.prototype.addFilter = function (filter, callback) {
        if (this.object instanceof fabric.Image) {
            if (!this.filters)
                this.filters = [];
            if (filter.isBoolean) {
                var index = this.filters.indexOf(filter);
                if (index != -1) {
                    this.filters.splice(index, 1);
                    Constructor.instance.changed();
                    if (this.filters.length === 0)
                        this.filters = null;
                    this.applyFilters(callback);
                    return;
                }
            }
            this.filters.push(filter);
            Constructor.instance.changed();
            this.applyFilters(callback);
        }
    };
    Element2D.prototype.removeFilter = function (filter, callback) {
        if (this.object instanceof fabric.Image) {
            if (!this.filters) {
                this.filters = [];
                return;
            }
            var index = this.filters.indexOf(filter);
            if (index != -1) {
                this.filters.splice(index, 1);
                this.changed();
                Constructor.instance.changed();
                if (this.filters.length === 0)
                    this.filters = null;
                this.applyFilters(callback);
                return;
            }
            this.applyFilters(callback);
        }
    };
    Element2D.prototype.hasFilters = function () {
        return this.filters && this.filters.length > 0;
    };
    Element2D.prototype.hasFilter = function (filter) {
        if (this.object instanceof fabric.Image) {
            if (!this.filters) {
                return false;
            }
            var index = this.filters.indexOf(filter);
            return index != -1;
        }
        return false;
    };
    Element2D.prototype.resetFilters = function (callback) {
        this.filters = null;
        Constructor.instance.changed();
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
        this.changed();
    };
    Element2D.prototype.isLocked = function () {
        return this.object && this.object.lockScalingX;
    };
    Element2D.prototype.setFrozen = function (frozen) {
        this.object.lockScalingX
            = this.object.lockScalingY
                = this.object.lockRotation
                    = this.object.lockMovementX
                        = this.object.lockMovementY
                            = frozen;
        if (frozen && this.isEditing()) {
            this.object.exitEditing();
        }
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
        this.side.saveState();
    };
    Element2D.prototype.isVisible = function () {
        return this.object && this.object.visible == true;
    };
    Element2D.prototype.isSelected = function () {
        return Constructor.instance.getSelection() == this;
    };
    Element2D.prototype.toggleVisibility = function () {
        this.isVisible() ? this.hide() : this.show();
    };
    Element2D.prototype.hide = function () {
        this.object.visible = false;
        this.object.selectable = false;
        this.side.deselect();
        this.side.canvas.renderAll();
        this.changed();
    };
    Element2D.prototype.show = function () {
        this.object.selectable = true;
        this.object.visible = true;
        this.side.deselect();
        this.side.canvas.renderAll();
        this.changed();
    };
    Element2D.prototype.toDataURL = function (size) {
        if (!size) {
            return this.object.toDataURL({});
        }
        var maxSize = Math.max(this.object.width * this.object.scaleX, this.object.height * this.object.scaleY);
        var multiplier = size / maxSize;
        return this.object.toDataURL({ multiplier: multiplier });
    };
    Element2D.prototype.clone = function (callback) {
        var _this = this;
        var objectOptions = this.serialize();
        var element;
        if (objectOptions.type === 'image') {
            var object = objectOptions.toObject();
            fabric.Image.fromObject(object, function (image) {
                if (image === null) {
                    return;
                }
                element = new Element2D(ElementType.IMAGE);
                element.side = _this;
                element.object = image;
                element.setOptions(element.object);
                callback(element);
            });
        }
        else {
            element = Element2D.prototype.deserialize(objectOptions);
            callback && callback(element);
            element.object.dirty = true;
        }
        return element;
    };
    Element2D.prototype.remove = function () {
        var _this = this;
        setTimeout(function () { return _this.side.remove(_this); }, 0);
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
        if (type === ElementType.TEXT && element.object['text']) {
            var o = element.object;
            o.text = unescape(o.text).split("<br>").join("\n");
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
        rotatingPointOffset: 8 * window.devicePixelRatio * 2
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
    ElementType.FRAME = new ElementType(fabric.Path);
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
    Filter.DARKNESS = new Filter("darkness", new fabric.Image.filters.Brightness({ brightness: -0.1 }));
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
var HelperControl = (function (_super) {
    __extends(HelperControl, _super);
    function HelperControl(side, object, offset) {
        if (offset === void 0) { offset = 0; }
        var _this = _super.call(this, HelperControl.DEFAULTS) || this;
        _this.pressed = false;
        _this.offset = 0;
        _this.dragCursor = 'url("https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur"), auto';
        _this.defaultCursor = 'url("https://www.google.com/intl/en_ALL/mapfiles/openhand.cur"), auto';
        _this.side = side;
        _this.object = object;
        _this.offset = offset;
        _this.visible = false;
        _this.updatePosition();
        _this.bringToFront();
        _this.dirty = true;
        _this.object.canvas && _this.object.canvas.renderAll();
        _this.on("mouseover", function (e) {
            console.error("mouseover");
            _this.opacity = 1;
            if (_this.pressed) {
                _this.hoverCursor = _this.dragCursor;
                _this.side.canvas.hoverCursor = _this.dragCursor;
                _this.side.canvas.setCursor(_this.dragCursor);
            }
            else {
                console.error(_this.pressed);
                _this.hoverCursor = _this.defaultCursor;
                _this.side.canvas.hoverCursor = _this.defaultCursor;
                _this.side.canvas.setCursor(_this.defaultCursor);
            }
            _this.side.canvas.renderAll();
        });
        _this.on("mouseout", function (e) {
            if (!_this.pressed) {
                side.canvas.hoverCursor = 'move';
            }
            _this.opacity = 0.8;
            _this.object.canvas && _this.object.canvas.renderAll();
        });
        _this.side.canvas.on("mouse:move", function (e) {
            if (_this.pressed && _this.mouseMoveEvent) {
                _this.mouseMoveEvent(e.pointer);
                _this.side.canvas.setCursor(_this.dragCursor);
            }
            if (_this.pressed && _this.hoverCursor != _this.dragCursor) {
                _this.hoverCursor = _this.dragCursor;
                _this.side.canvas.hoverCursor = _this.dragCursor;
            }
        });
        _this.side.canvas.on("mouse:up", function (e) {
            console.error("canvas mouseup");
            if (_this.mouseMoveEvent) {
                _this.pressed = false;
                _this.mouseUpEvent && _this.mouseUpEvent(e.pointer);
            }
            _this.side.canvas.hoverCursor = 'move';
            _this.side.canvas.renderAll();
            _this.side.canvas.setCursor('move');
        });
        _this.on("mousedown", function (e) {
            _this.pressed = true;
            _this.hoverCursor = _this.dragCursor;
            _this.side.canvas.hoverCursor = _this.dragCursor;
            _this.side.canvas.setCursor(_this.dragCursor);
            _this.mouseDownEvent && _this.mouseDownEvent(e.pointer);
            _this.object.canvas.setActiveObject(_this.object);
        });
        _this.on("mouseup", function (e) {
            console.error("helper mouseup");
            _this.pressed = false;
        });
        return _this;
    }
    HelperControl.prototype.setIcon = function (base64, scale) {
        if (scale === void 0) { scale = 1; }
        return;
        scale = scale * HelperControl.DEFAULTS.radius / 128;
        this.fill = new fabric.Pattern({
            source: base64,
            repeat: "no-repeat"
        });
        this.fill.patternTransform = [scale, 0, 0, scale, 0, 0];
    };
    HelperControl.prototype.show = function (force) {
        if (force === void 0) { force = false; }
        if (force || this.visible == null || !this.visible) {
            this.visible = true;
            this.bringToFront();
            this.dirty = true;
            this.object.canvas && this.object.canvas.renderAll();
        }
    };
    HelperControl.prototype.hide = function () {
        if (this.visible) {
            this.visible = false;
            this.dirty = true;
            this.object.canvas && this.object.canvas.renderAll();
        }
    };
    HelperControl.prototype.updatePosition = function (force) {
        if (force === void 0) { force = false; }
        this.left = this.object.left + this.offset;
        this.top = this.object.top;
        this.show(force);
        this.setCoords();
    };
    HelperControl.DEFAULTS = {
        width: window.devicePixelRatio == 1 ? 32 : 16 * window.devicePixelRatio,
        height: window.devicePixelRatio == 1 ? 32 : 16 * window.devicePixelRatio,
        left: 0,
        top: 0,
        radius: window.devicePixelRatio == 1 ? 32 : 16 * window.devicePixelRatio,
        fill: "#444",
        selectable: false,
        originX: "center",
        originY: "center",
        opacity: 0.8,
        hasBorders: true,
    };
    return HelperControl;
}(fabric.Rect));
var Frame = (function (_super) {
    __extends(Frame, _super);
    function Frame(side, src, callback, dimensions) {
        var _this = _super.call(this, ElementType.RECTANGLE, side) || this;
        _this.mouseDownX = 0;
        _this.mouseDownY = 0;
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.frameLeft = 0;
        _this.frameTop = 0;
        _this.scale = 1;
        _this.lastScale = 1;
        _this.src = src;
        var element = _this;
        _this.frame = element.object;
        _this.scrollControl = new HelperControl(_this.side, _this.frame, HelperControl.DEFAULTS.radius / 2);
        _this.scrollControl.mouseDownEvent = function (point) {
            _this.mouseDownX = point.x;
            _this.mouseDownY = point.y;
        };
        _this.scrollControl.mouseMoveEvent = function (point) {
            var x = point.x - _this.mouseDownX + _this.offsetX;
            var y = point.y - _this.mouseDownY + _this.offsetY;
            if (x > 0) {
                x = 0;
            }
            else if (_this.frame.fill.source) {
                var minOffset = -_this.frame.fill.source.width * _this.scale + _this.frame.width;
                if (x < minOffset) {
                    x = minOffset;
                }
            }
            if (y > 0) {
                y = 0;
            }
            else if (_this.frame.fill.source) {
                var minOffset = -_this.frame.fill.source.height * _this.scale + _this.frame.height;
                if (y < minOffset) {
                    y = minOffset;
                }
            }
            _this.frame.fill.offsetX = x;
            _this.frame.fill.offsetY = y;
            side.canvas.renderAll();
        };
        _this.scrollControl.mouseUpEvent = function (point) {
            _this.frameLeft = _this.frame.left;
            _this.frameTop = _this.frame.top;
            _this.offsetX = _this.frame.fill.offsetX;
            _this.offsetY = _this.frame.fill.offsetY;
        };
        _this.scaleControl = new HelperControl(_this.side, _this.frame, -HelperControl.DEFAULTS.radius / 2);
        _this.scaleControl.mouseDownEvent = function (point) {
            _this.mouseDownX = point.x;
            _this.mouseDownY = point.y;
        };
        _this.scaleControl.mouseMoveEvent = function (point) {
            var dy = point.y - _this.mouseDownY;
            var scale = _this.scale + dy / window.screen.height * 8;
            if (scale < 0.01 || scale > 4) {
                return;
            }
            var projectedRight = _this.offsetX + _this.frame.fill.source.width * scale;
            if (projectedRight < _this.frame.width) {
                return;
            }
            var projectedBottom = _this.offsetY + _this.frame.fill.source.height * scale;
            if (projectedBottom < _this.frame.height) {
                return;
            }
            _this.lastScale = _this.scale + dy / window.screen.height * 8;
            _this.frame.fill.patternTransform = [_this.lastScale, 0, 0, _this.lastScale, 0, 0];
            side.canvas.renderAll();
        };
        _this.scaleControl.mouseUpEvent = function (point) {
            _this.scale = _this.lastScale;
        };
        _this.scaleControl.setIcon(Frame.scaleControlIcon);
        _this.scrollControl.setIcon(Frame.scrollControlIcon);
        _this.scaleControl.defaultCursor = "nesw-resize";
        _this.scaleControl.dragCursor = "nesw-resize";
        _this.controls = [_this.scrollControl, _this.scaleControl];
        for (var _i = 0, _a = _this.controls; _i < _a.length; _i++) {
            var control = _a[_i];
            _this.side.canvas.add(control);
        }
        if (dimensions != null) {
            _this.frame.width = dimensions.width;
            _this.frame.height = dimensions.height;
            _this.frame.left = dimensions.left;
            _this.frame.top = dimensions.top;
            _this.object.setCoords();
            _this.side.canvas.renderAll();
        }
        else {
            _this.frame.width = 200;
            _this.frame.height = 200;
            _this.randomizePosition();
        }
        _this.frame.originX = "center";
        _this.frame.originY = "center";
        _this.frameLeft = _this.frame.left;
        _this.frameTop = _this.frame.top;
        _this.frame.objectCaching = false;
        _this.frame.set('strokeUniform', true);
        var pattern;
        if (src == null || src.length == 0) {
            pattern = "rgb(255,255,255)";
        }
        else {
            pattern = new fabric.Pattern({
                source: src,
                repeat: "no-repeat"
            });
        }
        _this.frame.fill = pattern;
        _this.frame.setCoords();
        side.canvas.renderAll();
        side.saveState();
        element.changed();
        side.canvas.preserveObjectStacking = true;
        side.canvas.uniScaleTransform = true;
        _this.frame.on("mousedblclick", function (e) {
        });
        _this.frame.on(Constants.SELECTED, function () {
            side.canvas.renderAll();
            _this.updateControls(true);
        });
        _this.frame.on(Constants.DESELECTED, function () {
            _this.hideControls();
        });
        _this.frame.on('scaling', function (e) {
            _this.normalizeScale();
            _this.hideControls();
        });
        _this.frame.on('scaled', function (e) {
            _this.normalizeScale();
            _this.updateControls();
        });
        _this.frame.on('mouseover', function (e) {
        });
        _this.frame.on('mousemove', function (e) {
        });
        _this.frame.on('moving', function (e) {
            _this.updateControls();
        });
        _this.frame.on('moved', function (e) {
            _this.frameLeft = _this.frame.left;
            _this.frameTop = _this.frame.top;
            _this.offsetX = _this.frame.fill.offsetX;
            _this.offsetY = _this.frame.fill.offsetY;
            _this.updateControls();
        });
        _this.frame.on('dragenter', function (e) {
            console.error('dragenter', e);
            if (_this.frame.fill.source) {
                _this.cachedImage = _this.frame.fill;
            }
            _this.frame.fill = Constants.FRAME_DEFAULT_FILL;
            side.canvas.renderAll();
        });
        _this.frame.on('dragover', function (e) {
        });
        _this.frame.on('dragleave', function (e) {
            console.error('dragleave', e);
            if (_this.cachedImage != null) {
                _this.frame.fill = _this.cachedImage;
            }
            else if (_this.frame.fill.source == null) {
                _this.frame.fill = "rgb(255,255,255)";
            }
            _this.frame.stroke = Color.GRAY.toRgba();
            side.canvas.renderAll();
        });
        _this.frame.on('drop', function (e) {
            console.error('drop', e);
            e.e.preventDefault();
            if (_this.cachedImage) {
                _this.frame.fill = _this.cachedImage;
            }
            var src = e.e.dataTransfer.getData("text/plain");
            if (!_this.frame.fill || !_this.frame.fill.source) {
                _this.frame.fill = new fabric.Pattern({
                    source: src,
                    repeat: "no-repeat"
                });
                setTimeout(function () {
                    Constructor.instance.getActiveSide().canvas.renderAll();
                });
            }
            else {
                _this.frame.fill.source.src = src;
            }
            _this.frame.opacity = 1;
            side.canvas.renderAll();
        });
        _this.frame.on('dragstart', function (e) {
            console.error('dragstart', e);
        });
        callback && callback(_this.frame);
        _this.updateControls();
        return element;
    }
    Frame.prototype.resetImageTransform = function () {
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
    };
    Frame.prototype.normalizeScale = function () {
        var w = this.frame.width * this.frame.scaleX;
        var h = this.frame.height * this.frame.scaleY;
        if (!this.frame.fill || !this.frame.fill.source || !this.frame.fill.source.width) {
            return;
        }
        var projectedRight = this.offsetX + this.frame.fill.source.width * this.scale;
        if (projectedRight < w) {
            this.frame.set({
                'height': h / this.frame.scaleY,
                'width': w / this.frame.scaleX,
                'scaleX': 1,
                'scaleY': 1
            });
            return;
        }
        var projectedBottom = this.offsetY + this.frame.fill.source.height * this.scale;
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
    };
    Frame.prototype.updateControls = function (forceShow) {
        if (forceShow === void 0) { forceShow = false; }
        for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.updatePosition(forceShow);
        }
    };
    Frame.prototype.hideControls = function () {
        for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.hide();
        }
    };
    Frame.prototype.isText = function () {
        return false;
    };
    Frame.prototype.isImage = function () {
        return false;
    };
    Frame.scrollControlIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAYiSURBVHic7Z1di5VVFMd/Z86cGR3TFL9H+gkqShIFwcjIC0GhIKEuhArTEs2LEoO8KDAwKvBCzNQQTGdgnKbCCfwE1qdQhnT0zEwX++yYOT7nzPOy1355nvWD/82M+Pz3XuvMOWfvvdYGRVEURVGU5jHSk9IwtgNTwMOeJoFtQR0p3tgBzAPLfZrv/U6pMbuBRzwbfKsFYG8wd4ooe4DHDA6+1RNgXyCPihD7gaesHXyrLnAwiFPFOe8Ai+QPvtUS8F4Av4pDDlMu+CuT4Ih314oTPqJ84Pt1wrN3pSJHcRd8qzNeR6CU5jTug2911uM4lIK0gHPIBd/qPLp8HB0t4Bvkg291AU2CaGgDP+Iv+FaXgFH54SnDGAOu4D/4VjeAcfFRKpmMA9cJF3yrm8B64bEqfUxgtnNDB99qBnhOdMTK/2wApgkf9H79AWwSHLcCbAbuEj7Yg3QP2Co2+obTxvypDR3ktTTd86o45i3CBzev3hCaA+ektJjxYmgDBXgptIG8pJQAT0MbKEA3tIG8pJQAt0MbKMBkaAN1JeSqX15dFhu9Qgc4BtzH/JkNHWyrbs/TsZ7HZGiFNiDIsuP/bx3m2HitSOkzgCKAJkDD0QTIj+u3lCjQBGg4mgANRxMgP/oWoNQPTYCGownQcDQB8qOfAZT6IV3Y0MacjnkZs44+BdwSfmbq7AJewxx7/w24iilxT47NwB2e3Tn7GT87Zq53/KRfLGPAtYznzgBbhJ/tnI3AHIMn87gHD6klwCdDnv0XZk6TYAKYZfhk3vfgw3UCSJ/0/WeN589i5jZq1pGvYsfHmbnUEiDPAZcpzBxHSQdTLJl3QqVxnQCS35haBXzcJsKC1DamXLrIhEqTUgKMFPRyjYhK01vAdxSfUGlSSoB2CT8/EUEFUgvTMqXMhErjOgEkz0+OlvT0A4EX877MMKUJUJxOBV9fC/oayuc5DWoCrM1YRW/nBL1lcqqiYU2A1Yw78HdS0N8qjjgwq5LRx0Pi5oT3Ixikarg+GBi9ihyiWuNllR8tAe9mh7A8bxJXLZ5quBaBA5mRLMHrFLtsQRWHupiLMiqxk3zXrKji1BPMVTmleJXhFyyp0tAC5pRRIbaTfbWaKk3NU/BexMkITKvc6lcyyFrdGgEeoK1P68ZDzNnCpZU/zNpJWu7/R0ptWO7/waAEmJP3onjmTzISYBD6IbBemgdeoCD6NbAeKvU10KILQWmr0kKQRZeC01QX02DbCboZlJacbgZZDqHbwSlIZDvYogdC4pfYgRCLHgmLV+JHwiynHJiVLG8qUmqVV9JU9XfSg8dVfFHRsGSPgKKlVqknwFce/GVSpTBEsratSQkQrDAEzJ/abzNM5ZFkXVtTEuB7IujzNAJcpLj52IotU0uAi0QQfEuZ8nDJSpu6J8BVIioPt8TUIKLOCRBlgwhLLC1iUkyA5FvEWGJoEpViAvy9xvOTaBJl2YhpbTZoMNIrVmUbLoRMgGFt4uZIqE2cZQvZjSIvI98oMsUE6GCaaPY/dxrTdFME6Wvj2pjzBK9gThdNYt7HpBnF/VWzvq7Y29nTOCb4vyB4SLeu9wZ2MKdhXFLLuYpmIUEJQ10ToJavVgnqmgBKTjQBGo4mQMOpawLoZ4Cc1DUBlJxoAjScuiaAvgXkpK4JoOREE6DhpJYAY8CnmL3zYQcoHgk8e9hOYbfn6Th+rsRrLNdxv83rWlfERt9wdhM+uHm1U2gOnJPSW0Ayk0pCXlNKgOiOQQ8hmc8BKSXAbGgDBUjJazK0yT5jGJvukNYLKymeB+4SPsiDdA/YKjZ6BYANmMOSoYPdr9+BTYLjVlYwQVwNrWfQ3sreGSOOhaGbwHrhsSoD6GBW3kIF/wYRF2o2hTbmDl3fwb9EWmsTtaaFaZXiK/gX0K960dHC3KErHfzzaPCj5jPkgn/W4ziUChzFffDPeB2BUpkPcRf8E569K444TLUG10uY1rhKwhygXKv7ReDtAH4VAfZT7NKLLnAwiFNFjD3ku/5mAdgXyKMizC7gXwYH/zGwN5g7xQs7yL4Sb773O6UBbANuYa7IfYC5V7fwvXpK+rTQOkJFURRFURrIfzaBYsx5mVcDAAAAAElFTkSuQmCC";
    Frame.scaleControlIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAI9AAACPQGsco8uAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAMlQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALJMpoAAAAEJ0Uk5TAAIEEDM1QENTV1piY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fqaoqq2vsLG8vr/Q2Nrc5ebq7O/w8fr7/P3+dMHBqgAAAeBJREFUeNrtm9dSAkEQRUcUwazknIMJEUQEMTD9/x+lhVUUEnZnhu6elz4fsOe8bM1LX6X2IdqfTvtR5Y3EHH6ZJ3z5kxoW6KQffwqWpHz407BCmt+fgX9kuP1ZWCPL68/BBjlOfx62kPfsZywowA4KPP4i7KTI4S9BACV6fxkCKVP7KxBChdZfhVCqlP4aGFCj89fBiDqVvwGGNGj8TTCmSeFvgQUtfH8brGhj+ztgSQfX3wVrup79qAUxcCKGFjBwCxigBUzcAiZoAUO3gCH3G0D3JkSeXPy9COJ/eHI/Gr9/mqq/ZuPRXVzRMluTHipmJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJEACJIA5IH77YnPA8PH2+niKqI/0XE44Hg7QAhyPWPCOO72f8Xg/ZHI85XpGC3A7ZtPHeL+B0zkf6oFx17Pf4aQT/cTb8qiV4Mjd6qyX5Mzf4rCZaOjQ8Ow3fhMIpyZG5/2kYxuDgQPx4Cl04kE++QoZuTCM3gJnPiyzv4ChE9PwcdfUi2/6uX3sphnHr9sK9I1iZHPwqK8VK+uTT32lmPk/etWXip20Z//q8FlfKC8sp9/nyhN/4/fvM+WNxfz/aK9P/ABeyTyDEgAK6wAAAABJRU5ErkJggg==";
    Frame.resetControlIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAefSURBVHic7Z1riFVVFMd/M6OmWT4qDTWzEi0zRSxDTTIsKsqigsRCehCCIESYURD0tNI+BPUlemP2ISt6mISZJYSGRVaWaVqmaYYpab4zc6YPyxnGcRzn3vPfe59zZ/1gwTDcu+5a66yz9z77sQ44juM4juM4juM4juM4juM4juM4juM4juM4juM4FUJVagMCUQOcBwwHzgH6AL2BfsCJzXx+F/AHsBXYDGwElgPfAwcj2JuMSkmAGmA0cC0wCrvwJwn0/gusAL4GFh6WfQK9joAa4DpgNrANqIsge4H3gNuBbuFddJrjdOB+YD1xLvqxZD/wOjAkrLtOPf2Al7FmOeWFbyq1wCLg6nCut216AjOxOy71xT6eLAKGhQlD26MGuAfYTfoLW4ocAl4BeulD0nYYAiwj/cXMIjuASerAVDpVwHTy189nkTfwJ4ZW0RV7xEp9wULIRuAiXagqj/OBX0h/oULKXuAGVcAqiRHEm8hJLbXAI5KoVQhXAXtIf2FiyzOK4BWd8cAB0l+MVPJk9hAWl5G0zTu/qTyYNZBFZCj2jJw6+HmRqdnCWSx6Ar+TPuh5koPApVmCWhSqsfX01AHPo2wBzig/tMVgBukD3VjytsbwBdCh7OiWSawdQeOAT7BWICZ/A58DS4DVwBps29fORp/pDJwKDATOxQao47AtZLF5DHg4we8GpRPwM/HupL+xfQNjsRXFchkKzCLumOUANitaUcwkTvD+xGbZuortr8a2ni2P5Mcy4reUwRiKjXJDBmw/1mx2DOxLNXAHlmihk2BKYF+iMZ+wgVoC9I/mjdEd2wsY0q8tNL99vVCMIlyAaoGngHbRvDmaO7EVvlA+To/nShg+JUxg/gPuiuhHS4zAnipC+LkNzdmGJIS6+/8BronoR2sYhJ0qCuHvfRH9kDIHfTAOATfHdKIELgC2o/d5PQV8IjiNMFu4747pRBmMJcwTz7iYTii4D30Q3o7qQfk8gN73OVE9EPAt2gBsRD+5E4oq7HCI0v99FMd/zsQe0ZQBuCmqB9kZiA1WlTG4NaoHGZiK1vEFcc2X8QTaOLwa1/zyWYDW8VFxzZdxClZ0QhWHjXHNL48atGvsn8U1X84stDfDeXHNL53BaB2eENd8Of3RjoeCLBApJxkuFuraCXwo1JeCdcBSob7BQl0NKBNAefZtHjaZVHTeEeoaJNTVgDIBBgh1Fb3/r0fpR5AEUPIjuv7urLimB6MK7WqhfEJI2QKotjXvBn4T6UpNHbBSqK+vUBegS4CuQBeRrjVY4CqFNUJdJwt1AdoEUFGISY8S2CDUpbrJGlAlQHuRHrAZtEpit1BXm0iAPUJdeUCZALntApQJUCn1i+tRblyVj41UCaCsqN1ZqCsPKMdH8kLVqgTYLtIDtqUsz9wEfAAsxqp8HK8EnDIBcjs72h7dwofyuVnN4xxt71paHpzNbuY75cpYtUNKdqJxch/aMYWKs7EzCc3Z/FIL31OeKYx9CqokVqJzdHhk21vDRI5tby3Nn1doh26HdC1wgtop5VTwT0JdY4S6VLT0CFYFvIidG2zMJegOrW7Bjo9LyWsCjBfqikUf4Lkm/1P68YNQVwPKBFgt1DUWq9pRNCYBNx7+uwq4Xqj7O6GuBpQJ8JVQVwfgNqG+mDwP9AAuw7aIqwiSAGo2oRsIriFbiRc1k2m97W9hp5lUsagjwFJwCNSHQm+Ja36LlJIAddhhVlUclOOrI1CfPF0s1vcoAR59IqGM7SKhriNQJ8A8tOsCA4BpQn1FZX5qA0rhI7TdwH6s2FRqSu0CVLKVgKVwQhQfmCvW1xEbW3QS6y0Kc7Ep6MLQBe25uHqZS9q9AqlagAtDOhWiBdhFmNOsE4CnA+jNM0uxxaTC0dLKWVaZSZqWIEULkNeaSK1CPRHSWF4jfmXt2AmwlrR1EDNzPmHLxC7BKpLEInYCTIzjVlheIGyQ/sLWDGJ0CTET4DsKWB6uOXoR58UMi7GqnSGJlQC1FLA0XEtMI17g5gGXE6ZFiJUAhSsLdzyqsceZWM1nHbaSOAMYJvQjRgLsA04X2pwbzsWci5kE9bISq/OftU+N1QIsoEJfIDWFNAlQL0vI9h6gmIPAHRR3Q0yLvELaJNiA7d0rhxQTQe9TYV1CR2zrWMokWE55Eyyp1gK2UfyKaUfQB/iVtElwbxl2p0qAenmT/B+bazX9CfeShdbIZko/fZQ6AeqAVYgPz6aabVoHXInN5KWgNzA60W9nYRDiwWHK6caV2EuTNyX6/ZElfj4vmzKGKJWlnm9ehd2JPyb47V4lfl558CULqW6YoHQHPiZufzqrRBtrsLd6phwD7CTNO42jUA08RLiNJE1lahk29gUWRrKvqfyCHTaVksd6PFdgRRVCZ/pI4Msyv9uDuHsRdmMD50MRfzMpXYFn0Z6uaSxryWfyO00YA6xAnwCTYzrhZKMK2xxZX0I2q3yK3/2FpD32zuAsLcI3VNB0alvmUuygyAFaf/E/4OgSLk7B6YZV5XiX5jec/Ic1+demMjDvVFJf2Al7s9YArLvYgtXV2ZrSKMdxHMdxHMdxHMdxHMdxHMdxHMdxHMdxHMdxHMdxnBj8Dw7pAm2zQeEZAAAAAElFTkSuQmCC";
    return Frame;
}(Element2D));
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
            var extraProperties = ['lockScalingX', 'lockScalingY', 'lockRotation', 'lockMovementX', 'lockMovementY'];
            var object = element.object.toJSON(extraProperties);
            var excludedOptions = ObjectOptions.excludedNativeOptions[element.object.type];
            for (var _i = 0, _a = ObjectOptions.nativeOptions; _i < _a.length; _i++) {
                var property = _a[_i];
                if (object[property] !== undefined && (!excludedOptions || !excludedOptions[property])) {
                    this[property] = object[property];
                    if (property === "text") {
                        this[property] = this[property].split("\n").join("<br>");
                        this[property] = escape(this[property]);
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
            if (value[property] !== undefined)
                object[property] = value[property];
            if (property == 'fontFamily') {
                setTimeout(function () { return ObjectOptions.renderFont(object); }, 100);
                setTimeout(function () { return ObjectOptions.renderFont(object); }, 500);
            }
            else if (property == 'text') {
                object[property] = unescape(value[property]);
            }
        }
        return object;
    };
    ObjectOptions.renderFont = function (object) {
        fabric.util.clearFabricFontCache();
        Constructor.instance.getActiveSide().canvas.renderAll();
    };
    ObjectOptions.prototype.toObject = function () {
        var options = {};
        for (var _i = 0, _a = ObjectOptions.nativeOptions; _i < _a.length; _i++) {
            var property = _a[_i];
            if (this[property] !== undefined)
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
        "charSpacing",
        "textBackgroundColor",
        'underline',
        'overline',
        'linethrough',
        "top",
        "transformMatrix",
        "type",
        "width",
        "visible",
        "lockScalingX",
        "lockScalingY",
        "lockRotation",
        "lockMovementX",
        "lockMovementY"
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
        if (!state) {
            return false;
        }
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
        _this.productPicture = side.productPicture || '';
        _this.mask = side.mask || '';
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Side2D = (function (_super) {
    __extends(Side2D, _super);
    function Side2D(htmlElement, width, height, roundCorners, name, price, productPicture, mask) {
        var _this = _super.call(this, htmlElement) || this;
        _this.elements = [];
        _this.price = 0;
        _this.id = Math.random() * 1e18;
        _this.history = new HistoryList();
        _this.width = width;
        _this.height = height;
        _this.name = name;
        _this.price = price || 0;
        _this.productPicture = productPicture;
        _this.mask = mask;
        _this.canvasElement = document.createElement(Constants.CANVAS);
        _this.initializeContainer(width, height, productPicture);
        _this.canvas = new fabric.Canvas(_this.canvasElement, null);
        _this.canvasElement.style.background = Constructor.instance.background;
        _this.canvas.setWidth(width);
        _this.canvas.setHeight(height);
        _this.canvas.selection = false;
        _this.canvas.on(Constants.MOUSE_UP, function () {
            _this.hideGuides();
            _this.saveState();
        });
        _this.canvas.on(Constants.TEXT_EDITING_ENTERED, function () {
            Constructor.onTextEditingEnteredHandler();
        });
        _this.canvas.on(Constants.SELECTION_CLEARED, function () {
            _this.selection = null;
            _this.changed();
            Constructor.instance.changed();
        });
        _this.canvas.on(Constants.SELECTION_UPDATED, function () {
            _this.changed();
            Constructor.instance.changed();
        });
        _this.canvas.on(Constants.SELECTION_CREATED, function () {
            _this.changed();
            Constructor.instance.changed();
        });
        _this.canvas.on(Constants.AFTER_RENDER, function () {
            Constructor.instance.onElementModificationHandler && Constructor.instance.onElementModificationHandler();
        });
        _this.horizontalGuide = new HorizontalGuide(height);
        _this.verticalGuide = new VerticalGuide(width);
        _this.canvas.add(_this.horizontalGuide);
        _this.canvas.add(_this.verticalGuide);
        _this.canvas.controlsAboveOverlay = true;
        _this.setZoom(1);
        _this.hideGuides();
        _this.hide();
        _this.needsHistoryUpdate = false;
        _this.roundCorners = roundCorners;
        if (roundCorners)
            _this.setRoundCorners();
        _this.canvasElement.style.border = Constants.LINE_STYLE_PREFIX + Color.GRAY.toHex();
        _this.createWorkingArea();
        return _this;
    }
    Side2D.prototype.initializeContainer = function (width, height, productPicture) {
        if (Constructor.instance.is2dEditorMode()) {
            this.mainContainer = document.createElement(Constants.DIV);
            this.mainContainer.className = "side-container";
            this.mainContainer.style.width = width + "px";
            this.mainContainer.style.height = height + "px";
            Constructor.instance.spinner.show();
            this.image = new Image();
            this.image.src = productPicture;
            this.image.onload = function () {
                Constructor.instance.spinner.hide();
            };
            this.mainContainer.appendChild(this.image);
            this.mainContainer.appendChild(this.canvasElement);
            this.container.appendChild(this.mainContainer);
            this.canvasElement.parentElement.style.top = '0%';
            this.canvasElement.parentElement.style.left = '0%';
        }
        else {
            this.container.appendChild(this.canvasElement);
        }
    };
    Side2D.prototype.createWorkingArea = function () {
        var _this = this;
        if (!Constructor.instance.is2dEditorMode()) {
            return;
        }
        var canvas = new fabric.Canvas(null);
        canvas.setWidth(this.canvas.getWidth());
        canvas.setHeight(this.canvas.getHeight());
        canvas.setZoom(this.canvas.getZoom());
        canvas.loadFromJSON(this.mask, function () {
            canvas.renderAll();
            var mask = canvas.getObjects()[0];
            mask.dirty = true;
            mask.absolutePositioned = true;
            if (!_this.canvas.clipPath) {
                _this.canvas.clipPath = mask;
            }
            _this.canvas.renderAll();
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
            var border = canvas.getObjects()[1];
            border.set({
                strokeUniform: true
            });
            _this.canvas.add(border);
        });
    };
    Side2D.prototype.getName = function () {
        return this.name || this.getIndex().toString();
    };
    Side2D.prototype.setName = function (value) {
        this.name = value;
    };
    Side2D.prototype.setRoundCorners = function () {
        if (this.roundCorners == 100) {
            this.canvasElement.style.borderRadius = 1e5 + Constants.PX;
        }
        else {
            var smallestSide = Math.min(this.canvasElement.width, this.canvasElement.height);
            this.canvasElement.style.borderRadius = smallestSide / 2 * (this.roundCorners / 100) + Constants.PX;
        }
    };
    Side2D.prototype.centerPosition = function () {
        var canvasContainer = this.canvasElement.parentElement;
        var dw = this.container.clientWidth - canvasContainer.clientWidth;
        var dh = this.container.clientHeight - canvasContainer.clientHeight;
        this.setRoundCorners();
    };
    Side2D.prototype.setZoom = function (value, cx, cy, checkZoom) {
        if (cx === void 0) { cx = 0; }
        if (cy === void 0) { cy = 0; }
        if (checkZoom === void 0) { checkZoom = true; }
        if (value >= Side2D.maxZoom && value <= Side2D.minZoom)
            return;
        var canvasContainer = this.canvasElement.parentElement;
        this.canvas.setZoom(value);
        this.canvas.setWidth(this.width * value);
        this.canvas.setHeight(this.height * value);
        this.canvas.renderAll();
        if (Constructor.instance.is2dEditorMode()) {
            this.mainContainer.style.width = this.width * value + "px";
            this.mainContainer.style.height = this.height * value + "px";
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
        }
        else {
            var dh = this.container.clientHeight - canvasContainer.clientHeight;
            if (dh < 0) {
                canvasContainer.style.top = "5px";
                canvasContainer.style.transform = "translateY(0%)";
            }
            else {
                canvasContainer.style.top = "50%";
                canvasContainer.style.transform = "translateY(-50%)";
            }
            if (cx) {
                canvasContainer.scrollLeft = canvasContainer.scrollWidth * cx;
            }
            if (cy) {
                canvasContainer.scrollTop = canvasContainer.scrollHeight * cx;
            }
        }
        this.setRoundCorners();
    };
    Side2D.prototype.getZoom = function () {
        return this.canvas ? this.canvas.getZoom() : 1;
    };
    Side2D.prototype.resetZoom = function () {
        this.canvas.setZoom(1);
        this.canvas.setWidth(this.width);
        this.canvas.setHeight(this.height);
        this.canvas.renderAll();
    };
    Side2D.prototype.zoomToFit = function () {
        var _this = this;
        var value = Math.min(this.container.clientWidth / this.width, this.container.clientHeight / this.height);
        if (!value) {
            setTimeout(function () { return _this.zoomToFit(); }, 10);
        }
        else {
            value *= 0.8;
            this.setZoom(value);
        }
    };
    Side2D.prototype.getRatio = function () {
        return this.width / this.height;
    };
    Side2D.prototype.getElement = function () {
        return this.mainContainer ? this.mainContainer : this.canvas.getElement().parentElement;
    };
    Side2D.prototype.getIndex = function () {
        for (var i = 0; i < Constructor.instance.sides.length; i++) {
            if (Constructor.instance.sides[i].equals(this)) {
                return i;
            }
        }
        return -1;
    };
    Side2D.prototype.getImageSources = function () {
        var sources = [];
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.object && element.object.fill && element.object.fill.source) {
                var image = element.object.fill.source;
                if (image instanceof HTMLImageElement) {
                    var src = image.src;
                    if (src != null) {
                        if (!sources.includes(src)) {
                            sources.push(src);
                        }
                    }
                }
            }
        }
        return sources;
    };
    Side2D.prototype.fixElementPosition = function (element) {
        if (!element.object.isOnScreen(true)) {
            this.resetElementPosition(element);
        }
    };
    Side2D.prototype.resetElementPosition = function (element) {
        element.object.left = this.width / 2;
        element.object.top = this.height / 2;
        this.canvas.setZoom(this.canvas.getZoom());
    };
    Side2D.prototype.add = function (element) {
        var _this = this;
        if (this.elements.length >= 20) {
            alert("Too many objects on the canvas! Please consider removing some objects before adding new.");
            return null;
        }
        Utils.logMethodName();
        element.side = this;
        this.elements.push(element);
        this.canvas.add(element.object);
        setTimeout(function () { return _this.fixElementPosition(element); }, 200);
        element.fitIntoMargins();
        element.object.setCoords();
        this.canvas.requestRenderAll();
        setTimeout(function () { return _this.canvas.renderAll(); }, null);
        this.changed();
        return element;
    };
    Side2D.prototype.addElement = function (type) {
        Utils.logMethodName();
        return this.add(new Element2D(type, this));
    };
    Side2D.prototype.setProductColor = function (color) {
        var image = this.mainContainer.childNodes[0];
        image.style.backgroundColor = color;
    };
    Side2D.prototype.getProductColor = function () {
        var image = this.mainContainer.childNodes[0];
        return image.style.backgroundColor !== "" ? image.style.backgroundColor : Constructor.instance.background;
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
        this.saveState();
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
    Side2D.prototype.freeze = function () {
        this.elements.forEach(function (element) {
            element.setFrozen(true);
        });
    };
    Side2D.prototype.unfreeze = function () {
        this.elements.forEach(function (element) {
            element.setFrozen(false);
        });
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
        if (Constructor.instance.is2dEditorMode()) { }
        var side = new Side2D(Constructor.instance.getElement(), state.width, state.height, state.roundCorners, null, null, state.productPicture, state.mask);
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
        this.createWorkingArea();
        this.saveState();
    };
    Side2D.prototype.removeElements = function () {
        Utils.logMethodName();
        while (this.elements.length) {
            this.elements[0].remove();
        }
        this.saveState();
    };
    Side2D.prototype.addImageFromObjectOptions = function (objectOptions, callback) {
        var _this = this;
        Utils.logMethodName();
        var object = objectOptions.toObject();
        var side = this;
        fabric.Image.fromObject(object, function (image) {
            if (image === null) {
                callback && callback();
                return;
            }
            var element = new Element2D(ElementType.IMAGE);
            element.side = _this;
            element.object = image;
            element.setOptions(element.object);
            side.add(element);
            callback && callback(element);
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
        Utils.logMethodName();
        this.history.lock();
        this.clear();
        this.addNextObject(state.objects);
    };
    Side2D.prototype.addNextObject = function (objectsBuffer) {
        var _this = this;
        if (objectsBuffer.length == 0) {
            this.saveToLocalStorage(this.getState());
            this.canvas.requestRenderAll();
            Constructor.instance.changed();
            this.history.unlock();
            return;
        }
        var objectOptions = objectsBuffer.shift();
        if (objectOptions.type === 'image') {
            this.addImageFromObjectOptions(objectOptions, function () { return _this.addNextObject(objectsBuffer); });
        }
        else {
            var element_2 = Element2D.prototype.deserialize(objectOptions);
            this.add(element_2);
            element_2.object.dirty = true;
            if (element_2.type === ElementType.TEXT) {
                setTimeout(function () { return element_2.setFontFamily(element_2.getFontFamily()); }, 0);
            }
            this.addNextObject(objectsBuffer);
        }
    };
    Side2D.prototype.getLocalStorageKey = function () {
        return Constructor.settings.localStorage.keyPrefix + this.getIndex();
    };
    Side2D.prototype.saveToLocalStorage = function (state) {
        if (!this.history.isLocked()) {
            Utils.logMethodName();
            var json = JSON.stringify(state);
            if (json.length < 1e5) {
                localStorage.setItem(this.getLocalStorageKey(), json);
            }
            else {
                console.error("state.length > " + 1e5);
            }
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
        this.history.add(JSON.stringify(state));
        this.saveToLocalStorage(state);
        this.changed();
        Constructor.instance.changed();
    };
    Side2D.prototype.undo = function () {
        if (this.history.isLocked()) {
            return;
        }
        var state = Side2DStateObjects.parse(this.history.back());
        this.history.lock();
        if (state)
            this.setState(state);
    };
    Side2D.prototype.redo = function () {
        if (this.history.isLocked()) {
            return;
        }
        var state = Side2DStateObjects.parse(this.history.forward());
        this.history.lock();
        if (state)
            this.setState(state);
    };
    Side2D.prototype.generatePreview = function (maxSize) {
        var _this = this;
        if (!Constructor.instance.is2dEditorMode()) {
            return '';
        }
        var w = this.canvas.getWidth();
        var h = this.canvas.getHeight();
        var border = this.canvas.getObjects().filter(function (obj) { return obj.id === Constants.OBJECT_2D_BORDER; });
        this.toggleBorderVisibility(border[0]);
        var objects = this.canvas.getObjects();
        var group = new fabric.Group(this.canvas.getObjects());
        group.set({
            clipPath: this.canvas.clipPath
        });
        this.canvas.clipPath = null;
        this.canvas.clear();
        this.canvas.add(group);
        var bgImage = new fabric.Image(this.image, {
            left: 0,
            top: 0,
        });
        this.canvas.add(bgImage);
        bgImage.sendToBack();
        var multiplier = maxSize ? maxSize / Math.max(w, h) : 1;
        var data = this.canvas.toDataURL({ format: ImageType.PNG, multiplier: multiplier });
        this.toggleBorderVisibility(border[0]);
        this.canvas.clipPath = group.clipPath;
        group.destroy();
        this.canvas.remove(group);
        this.canvas.remove(bgImage);
        objects.map(function (object) { return _this.canvas.add(object); });
        return data;
    };
    Side2D.prototype.exportImage = function (maxSize, format) {
        var lastScale = this.canvas.getZoom();
        var w = this.canvas.getWidth();
        var h = this.canvas.getHeight();
        var bound = { left: 0, top: 0, width: w, height: h };
        var border = this.canvas.getObjects().filter(function (obj) { return obj.id === Constants.OBJECT_2D_BORDER; });
        this.toggleBorderVisibility(border[0]);
        if (Constructor.instance.is2dEditorMode()) {
            this.canvas.setZoom(1);
            bound = this.canvas.clipPath.getBoundingRect();
        }
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
            if (bound.left) {
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
            var src = this.canvas.toDataURL(__assign({ format: 'image/jpeg', multiplier: multiplier, quality: 0.5 }, bound));
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
            });
        }
        var data = this.canvas.toDataURL(__assign({ format: Constants.PNG, multiplier: multiplier }, bound));
        this.toggleBorderVisibility(border[0]);
        this.canvas.setZoom(lastScale);
        return data;
    };
    Side2D.prototype.toggleBorderVisibility = function (border) {
        if (border) {
            border.set({
                opacity: border.opacity == 1 ? 0 : 1
            });
        }
    };
    Side2D.prototype.lock = function () {
        this.getLayers().forEach(function (element) {
            element.object.selectable = false;
        });
        this.canvas.renderAll();
    };
    Side2D.prototype.unlock = function () {
        this.getLayers().forEach(function (element) {
            element.object.selectable = true;
        });
        this.canvas.renderAll();
    };
    Side2D.prototype.getTotalPrice = function () {
        return this.isEmpty() ? 0 : this.price;
    };
    Side2D.prototype.getState = function () {
        return new Side2DState(this);
    };
    Side2D.prototype.equals = function (side) {
        return this.id == side.id;
    };
    Side2D.prototype.isEmpty = function () {
        return this.elements.length == 0;
    };
    Side2D.maxZoom = 10;
    Side2D.minZoom = 0.001;
    return Side2D;
}(View));
var Side2D1 = (function (_super) {
    __extends(Side2D1, _super);
    function Side2D1(htmlElement, width, height, roundCorners, name, price) {
        var _this = _super.call(this, htmlElement) || this;
        _this.elements = [];
        _this.price = 0;
        _this.id = Math.random() * 1e18;
        _this.history = new HistoryList();
        _this.width = width;
        _this.height = height;
        _this.name = name;
        _this.price = parseInt(price) || 0;
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
        _this.canvas.on(Constants.TEXT_EDITING_ENTERED, function () {
            Constructor.onTextEditingEnteredHandler();
        });
        _this.canvas.on(Constants.SELECTION_CLEARED, function () {
            _this.selection = null;
            _this.changed();
            Constructor.instance.changed();
        });
        _this.canvas.on(Constants.SELECTION_UPDATED, function () {
            _this.changed();
            Constructor.instance.changed();
        });
        _this.canvas.on(Constants.SELECTION_CREATED, function () {
            _this.changed();
            Constructor.instance.changed();
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
    Side2D1.prototype.getName = function () {
        return this.name || this.getIndex().toString();
    };
    Side2D1.prototype.setName = function (value) {
        this.name = value;
    };
    Side2D1.prototype.setRoundCorners = function () {
        if (this.roundCorners == 100) {
            this.canvasElement.style.borderRadius = 1e5 + Constants.PX;
        }
        else {
            var smallestSide = Math.min(this.canvasElement.width, this.canvasElement.height);
            this.canvasElement.style.borderRadius = smallestSide / 2 * (this.roundCorners / 100) + Constants.PX;
        }
    };
    Side2D1.prototype.centerPosition = function () {
        var canvasContainer = this.canvasElement.parentElement;
        var dw = this.container.clientWidth - canvasContainer.clientWidth;
        var dh = this.container.clientHeight - canvasContainer.clientHeight;
        this.setRoundCorners();
    };
    Side2D1.prototype.setZoom = function (value, cx, cy, checkZoom) {
        if (cx === void 0) { cx = 0; }
        if (cy === void 0) { cy = 0; }
        if (checkZoom === void 0) { checkZoom = true; }
        if (value >= Side2D.maxZoom && value <= Side2D.minZoom)
            return;
        this.canvas.setZoom(value);
        this.canvas.setWidth(this.width * value);
        this.canvas.setHeight(this.height * value);
        this.canvas.renderAll();
        var canvasContainer = this.canvasElement.parentElement;
        var dh = this.container.clientHeight - canvasContainer.clientHeight;
        if (dh < 0) {
            console.log("dh < 0");
            canvasContainer.style.top = "5px";
            canvasContainer.style.transform = "translateY(0%)";
        }
        else {
            console.log("dh > 0");
            canvasContainer.style.top = "50%";
            canvasContainer.style.transform = "translateY(-50%)";
        }
        if (cx) {
            canvasContainer.scrollLeft = canvasContainer.scrollWidth * cx;
        }
        if (cy) {
            canvasContainer.scrollTop = canvasContainer.scrollHeight * cx;
        }
        this.setRoundCorners();
    };
    Side2D1.prototype.getZoom = function () {
        return this.canvas ? this.canvas.getZoom() : 1;
    };
    Side2D1.prototype.resetZoom = function () {
        this.canvas.setZoom(1);
        this.canvas.setWidth(this.width);
        this.canvas.setHeight(this.height);
        this.canvas.renderAll();
    };
    Side2D1.prototype.zoomToFit = function () {
        var _this = this;
        var value = Math.min(this.container.clientWidth / this.width, this.container.clientHeight / this.height);
        if (!value) {
            setTimeout(function () { return _this.zoomToFit(); }, 10);
        }
        else {
            value *= 0.8;
            this.setZoom(value);
        }
    };
    Side2D1.prototype.getRatio = function () {
        return this.width / this.height;
    };
    Side2D1.prototype.getElement = function () {
        return this.canvas.getElement().parentElement;
    };
    Side2D1.prototype.getIndex = function () {
        for (var i = 0; i < Constructor.instance.sides.length; i++) {
            if (Constructor.instance.sides[i].equals(this)) {
                return i;
            }
        }
        return -1;
    };
    Side2D1.prototype.fixElementPosition = function (element) {
        if (!element.object.isOnScreen(true)) {
            this.resetElementPosition(element);
        }
    };
    Side2D1.prototype.resetElementPosition = function (element) {
        element.object.left = this.width / 2;
        element.object.top = this.height / 2;
    };
    Side2D1.prototype.add = function (element) {
        var _this = this;
        if (this.elements.length >= 20) {
            alert("Too many objects on the canvas! Please consider removing some objects before adding new.");
            return null;
        }
        Utils.logMethodName();
        element.side = this;
        this.elements.push(element);
        this.canvas.add(element.object);
        setTimeout(function () { return _this.fixElementPosition(element); }, 200);
        element.fitIntoMargins();
        element.object.setCoords();
        this.canvas.requestRenderAll();
        setTimeout(function () { return _this.canvas.renderAll(); }, null);
        this.changed();
        return element;
    };
    Side2D1.prototype.addElement = function (type) {
        Utils.logMethodName();
        return this.add(new Element2D(type, this));
    };
    Side2D1.prototype.getLayers = function () {
        var layers = [];
        for (var i = 0; i < this.elements.length; i++) {
            layers.unshift(this.elements[i]);
        }
        return layers;
    };
    Side2D1.prototype.moveLayer = function (from, to) {
        var element = this.getLayers()[from];
        element.toLayer(to);
        this.changed();
    };
    Side2D1.prototype.remove = function (element) {
        this.canvas.remove(element.object);
        this.elements.splice(this.elements.indexOf(element), 1);
        this.deselect();
        this.canvas.renderAll();
        this.saveState();
    };
    Side2D1.prototype.getPointSize = function () {
        return 96 / 72 * this.getZoom();
    };
    Side2D1.prototype.getInchSize = function () {
        return 72 * this.getPointSize();
    };
    Side2D1.prototype.getCentimeterSize = function () {
        return this.getInchSize() / 2.54;
    };
    Side2D1.prototype.getMillimeterSize = function () {
        return this.getCentimeterSize() / 10;
    };
    Side2D1.prototype.select = function (element) {
        this.deselect();
        this.selection = element;
        this.canvas.setActiveObject(element.object);
        this.canvas.renderAll();
        return element;
    };
    Side2D1.prototype.deselect = function () {
        this.selection = null;
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
    };
    Side2D1.prototype.freeze = function () {
        this.elements.forEach(function (element) {
            element.setFrozen(true);
        });
    };
    Side2D1.prototype.unfreeze = function () {
        this.elements.forEach(function (element) {
            element.setFrozen(false);
        });
    };
    Side2D1.prototype.hideGuides = function () {
        this.horizontalGuide.hide();
        this.verticalGuide.hide();
        this.canvas.renderAll();
    };
    Side2D1.prototype.serialize = function () {
        return new Side2DState(this);
    };
    Side2D1.prototype.deserialize = function (state) {
        var side = new Side2D(Constructor.instance.getElement(), state.width, state.height, state.roundCorners);
        if (state.objects) {
            var json = '{"objects":' + JSON.stringify(state.objects) + '}';
            var objects = Side2DStateObjects.parse(json);
            side.setState(objects);
        }
        return side;
    };
    Side2D1.prototype.clear = function () {
        Utils.logMethodName();
        this.elements = [];
        this.selection = null;
        this.canvas.clear();
        this.canvas.add(this.horizontalGuide);
        this.canvas.add(this.verticalGuide);
        this.saveState();
    };
    Side2D1.prototype.removeElements = function () {
        Utils.logMethodName();
        while (this.elements.length) {
            this.elements[0].remove();
        }
        this.saveState();
    };
    Side2D1.prototype.addImageFromObjectOptions = function (objectOptions, callback) {
        var _this = this;
        Utils.logMethodName();
        var object = objectOptions.toObject();
        var side = this;
        fabric.Image.fromObject(object, function (image) {
            if (image === null) {
                callback && callback();
                return;
            }
            var element = new Element2D(ElementType.IMAGE);
            element.side = _this;
            element.object = image;
            element.setOptions(element.object);
            side.add(element);
            callback && callback(element);
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
    Side2D1.prototype.setState = function (state) {
        Utils.logMethodName();
        this.history.lock();
        this.clear();
        this.addNextObject(state.objects);
    };
    Side2D1.prototype.addNextObject = function (objectsBuffer) {
        var _this = this;
        if (objectsBuffer.length == 0) {
            this.saveToLocalStorage(this.getState());
            this.canvas.requestRenderAll();
            Constructor.instance.changed();
            this.history.unlock();
            return;
        }
        var objectOptions = objectsBuffer.shift();
        if (objectOptions.type === 'image') {
            this.addImageFromObjectOptions(objectOptions, function () { return _this.addNextObject(objectsBuffer); });
        }
        else {
            var element_3 = Element2D.prototype.deserialize(objectOptions);
            this.add(element_3);
            element_3.object.dirty = true;
            if (element_3.type === ElementType.TEXT) {
                setTimeout(function () { return element_3.setFontFamily(element_3.getFontFamily()); }, 0);
            }
            this.addNextObject(objectsBuffer);
        }
    };
    Side2D1.prototype.getLocalStorageKey = function () {
        return Constructor.settings.localStorage.keyPrefix + this.getIndex();
    };
    Side2D1.prototype.saveToLocalStorage = function (state) {
        if (!this.history.isLocked()) {
            Utils.logMethodName();
            var json = JSON.stringify(state);
            if (json.length < 1e5) {
                localStorage.setItem(this.getLocalStorageKey(), json);
            }
            else {
                console.error("state.length > " + 1e5);
            }
        }
    };
    Side2D1.prototype.loadFromLocalStorage = function () {
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
    Side2D1.prototype.saveState = function () {
        Utils.logMethodName();
        var state = new Side2DStateObjects(this);
        this.history.add(JSON.stringify(state));
        this.saveToLocalStorage(state);
        this.changed();
        Constructor.instance.changed();
    };
    Side2D1.prototype.undo = function () {
        if (this.history.isLocked()) {
            return;
        }
        var state = Side2DStateObjects.parse(this.history.back());
        this.history.lock();
        if (state)
            this.setState(state);
    };
    Side2D1.prototype.redo = function () {
        if (this.history.isLocked()) {
            return;
        }
        var state = Side2DStateObjects.parse(this.history.forward());
        this.history.lock();
        if (state)
            this.setState(state);
    };
    Side2D1.prototype.exportImage = function (maxSize, format) {
        var w = this.canvas.getWidth();
        var h = this.canvas.getHeight();
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
            var src = this.canvas.toDataURL({ format: 'image/jpeg', multiplier: multiplier, quality: 0.5 });
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
    Side2D1.prototype.lock = function () {
        this.getLayers().forEach(function (element) {
            element.object.selectable = false;
        });
        this.canvas.renderAll();
    };
    Side2D1.prototype.unlock = function () {
        this.getLayers().forEach(function (element) {
            element.object.selectable = true;
        });
        this.canvas.renderAll();
    };
    Side2D1.prototype.getTotalPrice = function () {
        return this.isEmpty() ? 0 : this.price;
    };
    Side2D1.prototype.getState = function () {
        return new Side2DState(this);
    };
    Side2D1.prototype.equals = function (side) {
        return this.id == side.id;
    };
    Side2D1.prototype.isEmpty = function () {
        return this.elements.length == 0;
    };
    Side2D1.maxZoom = 10;
    Side2D1.minZoom = 0.001;
    return Side2D1;
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
var ScreenPosition;
(function (ScreenPosition) {
    ScreenPosition[ScreenPosition["topLeft"] = 0] = "topLeft";
    ScreenPosition[ScreenPosition["top"] = 1] = "top";
    ScreenPosition[ScreenPosition["topRight"] = 2] = "topRight";
    ScreenPosition[ScreenPosition["right"] = 3] = "right";
    ScreenPosition[ScreenPosition["bottomRight"] = 4] = "bottomRight";
    ScreenPosition[ScreenPosition["bottom"] = 5] = "bottom";
    ScreenPosition[ScreenPosition["bottomLeft"] = 6] = "bottomLeft";
    ScreenPosition[ScreenPosition["left"] = 7] = "left";
    ScreenPosition[ScreenPosition["center"] = 8] = "center";
})(ScreenPosition || (ScreenPosition = {}));
var LocalizedStrings = (function () {
    function LocalizedStrings() {
    }
    LocalizedStrings.translate = function (key) {
        if (key == '$' && ConstructorUI.instance.currencySymbol) {
            return ConstructorUI.instance.currencySymbol;
        }
        if (constructorConfiguration
            && constructorConfiguration.languageItems
            && constructorConfiguration.languageItems[key]) {
            return constructorConfiguration.languageItems[key];
        }
        if (this.translation[key]) {
            return this.translation[key];
        }
        return key;
    };
    LocalizedStrings.translation = {
        'Share link': 'Поделиться ссылкой',
        'Product Types': 'Тип продукта',
        'Clear Side': 'Очистить холст',
        'Export JPEG': 'Сохранить в JPEG',
        'Export PNG': 'Сохранить в PNG',
        'Export SVG': 'Сохранить в SVG',
        'Photos': 'Примеры продукции',
        'Circle': 'Добавить круг',
        'Rectangle': 'Добавить квадрат',
        'Triangle': 'Добавить треугольник',
        'Containers': 'Добавить контейнер',
        'Text': 'Текст',
        'Image': 'Загрузить фото',
        'Alignment': 'Выравнивание',
        'Font': 'Стиль шрифта',
        'Font Family': 'Выбор шрифта',
        'Font Size': 'Размер шрифта',
        'Color': 'Цвет',
        'Transparency': 'Прозрачность',
        'Letter Spacing': 'Межбуквенный интервал',
        'Line Height': 'Межстрочный интервал',
        'Shadow': 'Тень',
        'Brightness': 'Яркость',
        'Darkness': 'Затемнение',
        'Emboss': 'Рельеф',
        'Blur': 'Размытие',
        'Sharpen': 'Резкость',
        'Invert': 'Инверсия',
        'Grayscale': 'Перевести в ЧБ',
        'Reset Filters': 'Сбросить фильтры',
        'Option Required': 'Выберите опции',
        'Please select required options!': 'Пожалуйста, выберите необходимые опции',
        'Add to Cart': 'Добавить в корзину',
        'Quantity': 'Количество',
        'Price': 'Цена',
        'Price without discount': 'Цена без скидки',
        'Price with discount': 'Итоговая стоимость',
        'Discount': 'Ваша скидка',
        'Cancel': 'Отмена',
        'Product added to cart': 'Продукт добавлен',
        'Share as Link': 'Поделиться ссылкой',
        'Choose other product': 'Выбрать другую модель',
        'Real Product Photos': 'Примеры работ',
        'Page': 'Объекты',
        'Layers': 'Слои',
        'Stickers': 'Стикеры',
        'Properties': 'Свойства объекта',
        'Fonts': 'Шрифты',
        'Filters': 'Фильтры',
        'Product Info': 'Продукт',
        'Export & Sharing': 'Экспорт',
        'Options': 'Опции',
        'Side': 'Сторона печати',
        'Toggle Sidebar': 'Компактный вид',
        'Zoom In': 'Приблизить',
        'Zoom Out': 'Отдалить',
        'Zoom to Fit': 'На весь экран',
        'Snap to Grid': 'Притягивание к сетке',
        'Snap to Objects': 'Притягивание к объектам',
        'Toggle 3D Mode': '2D/3D-режим',
        'Undo': 'Отменить',
        'Redo': 'Вернуть',
        'Duplicate': 'Клонировать',
        'Delete': 'Удалить',
        'The link is copied to clipboard!': 'Ссылка скопирована в буфер обмена!',
        'Copy to Clipboard': 'Скопировать в буфер обмена',
        '$': '₽',
        '3D-Preview': 'Просмотр в 3D',
        'Exit 3D-Preview': 'Выйти из просмотра',
        'Add Text': 'Добавить текст',
        'Error': 'Ошибка',
        'Please select one file of Jpeg or Png or Heic type!': 'Пожалуйста, выберите один файл!',
        'Please select Jpeg or Png or Heic image!': 'Пожалуйста, выберите файл изображения в формате .jpg, .png или .heic!',
        'Failed to upload HEIC file!': 'Извините, ваш HEIC файл не может быть распознан нашей системой!',
        'Uploading HEIC file will take some time!': 'Загрузка и обработка HEIC файла может занять некоторое время, пожалуйста подождите',
    };
    return LocalizedStrings;
}());
var UIControl = (function (_super) {
    __extends(UIControl, _super);
    function UIControl(tag) {
        var _this = _super.call(this, tag ? document.createElement(tag) : Utils.div()) || this;
        _this.children = [];
        _this.id = UIControl.nextId++;
        UIControl.map[_this.id] = _this;
        _this.c = Constructor.instance;
        _this.container.className = _this.getClassName();
        return _this;
    }
    UIControl.prototype.translate = function (key) {
        return LocalizedStrings.translate(key);
    };
    UIControl.prototype.getClassName = function () {
        return "control";
    };
    UIControl.prototype.getId = function () {
        return this.id;
    };
    UIControl.prototype.showWhen = function (trigger, condition) {
        var _this = this;
        trigger.onChange(function () { return _this.update(); }, this);
        this.showCondition = condition;
        return this;
    };
    UIControl.prototype.update = function () {
        if (this.showCondition && this.showCondition()) {
            this.show();
        }
        else if (this.showCondition && !this.showCondition()) {
            this.hide();
        }
    };
    UIControl.prototype.getElement = function () {
        return this.container;
    };
    UIControl.getById = function (id) {
        return this.map[id];
    };
    UIControl.prototype.appendChild = function (control) {
        if (control && control.container) {
            this.children.push(control);
            this.container.appendChild(control.container);
        }
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
    UIControl.prototype.removeChild = function (index) {
        if (this.children[index]) {
            var children = this.children.splice(index, 1)[0];
            children.clear();
            children.container.remove();
            delete UIControl.map[children.id];
            return children;
        }
    };
    UIControl.prototype.moveChild = function (from, to) {
        var htmlElement = this.children[from].container;
        var before = this.children[to].container;
        this.children.splice(to, 0, this.removeChild(from));
        this.container.insertBefore(htmlElement, before);
    };
    UIControl.prototype.clear = function () {
        this.getElement().innerHTML = "";
        this.children.forEach(function (child) {
            child.clear();
            child.container.remove();
            delete UIControl.map[child.id];
        });
        this.children = [];
    };
    UIControl.prototype.tooltip = function (value, persistent) {
        if (!value || Utils.isCompact()) {
            return this;
        }
        var tooltip = document.createElement('span');
        tooltip.classList.add('tp');
        tooltip.classList.add('desktop');
        tooltip.innerHTML = this.translate(value);
        this.container.appendChild(tooltip);
        var parent = this;
        this.container.onmouseover = function (e) {
            var parentWidth = parent.container.offsetWidth;
            var halfWidth = tooltip.offsetWidth / 2 - parentWidth / 2;
            var dx = 0;
            var dy = 0;
            switch (parent.getPositionOnScreen()) {
                case ScreenPosition.topLeft:
                case ScreenPosition.center:
                case ScreenPosition.left:
                default:
                    dx = parentWidth;
                    break;
                case ScreenPosition.top:
                    dx = -halfWidth;
                    dy = tooltip.offsetHeight;
                    break;
                case ScreenPosition.bottom:
                    dx = -halfWidth;
                    dy = -tooltip.offsetHeight;
                    break;
                case ScreenPosition.bottomLeft:
                    dx = parentWidth;
                    dy = -tooltip.offsetHeight;
                    break;
                case ScreenPosition.bottomRight:
                    dx = -tooltip.offsetWidth;
                    dy = -tooltip.offsetHeight;
                    break;
                case ScreenPosition.right:
                    dx = -tooltip.offsetWidth;
                    break;
                case ScreenPosition.topRight:
                    dx = -tooltip.offsetWidth;
                    dy = -tooltip.offsetHeight;
                    break;
            }
            tooltip.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
            tooltip.style.visibility = 'visible';
            if (!persistent) {
                setTimeout(function () { return tooltip.style.visibility = 'hidden'; }, 1000);
            }
        };
        this.container.onmouseleave = function (e) {
            tooltip.style.visibility = 'hidden';
        };
        tooltip.onmousemove = function (e) { return tooltip.style.visibility = 'hidden'; };
        return this;
    };
    UIControl.prototype.getPositionOnScreen = function () {
        var width = 100;
        var height = 100;
        var spaceRight = window.innerWidth - this.container.offsetLeft;
        var spaceLeft = this.container.offsetLeft;
        var spaceTop = this.container.offsetTop;
        var spaceBottom = window.innerHeight - this.container.offsetTop;
        if (spaceLeft < width) {
            if (spaceTop < height) {
                return ScreenPosition.topLeft;
            }
            if (spaceBottom < height) {
                return ScreenPosition.bottomLeft;
            }
            return ScreenPosition.left;
        }
        if (spaceRight < width) {
            if (spaceTop < height) {
                return ScreenPosition.topRight;
            }
            if (spaceBottom < height) {
                return ScreenPosition.bottomRight;
            }
            return ScreenPosition.right;
        }
        if (spaceTop < height) {
            return ScreenPosition.top;
        }
        if (spaceBottom < height) {
            return ScreenPosition.bottom;
        }
        return ScreenPosition.center;
    };
    UIControl.prototype.calculateBoundingClientRect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var element = _this.container.cloneNode(true);
            element.style.visibility = "hidden";
            element.style.position = "absolute";
            document.body.appendChild(element);
            resolve(element.getBoundingClientRect());
            element.remove();
        });
    };
    UIControl.prototype.show = function () {
        _super.prototype.show.call(this);
        this.showed();
    };
    UIControl.prototype.showed = function () {
        this.children.forEach(function (child) { return child.showed(); });
    };
    UIControl.prototype.isSelected = function () {
        return this.container.classList.contains("selected");
    };
    UIControl.prototype.select = function () {
        this.container.classList.add("selected");
    };
    UIControl.prototype.deselect = function () {
        this.container.classList.remove("selected");
    };
    UIControl.map = {};
    UIControl.nextId = 0;
    return UIControl;
}(View));
var Popover = (function (_super) {
    __extends(Popover, _super);
    function Popover(title, content, show) {
        var controls = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            controls[_i - 3] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.permanent = true;
        var frame = new Container().addClass("vertical");
        if (controls.length === 0 && (title || content)) {
            _this.permanent = false;
            if (title) {
                frame.append(new Row(new Spacer(), new LabelControl(title).addClass("title"), new Spacer()));
            }
            if (content) {
                frame.append(new Row(new Spacer(), new LabelControl(content).allowUserSelect(), new Spacer()));
            }
            frame.append(new Row(new Spacer(), new Button(function () {
                _this.hide();
            }, null, "OK"), new Spacer()));
            _this.container.onclick = function (e) {
                if (e.target === _this.container) {
                    _this.hide();
                }
            };
            _this.frame = frame;
            _this.append(frame);
            document.body.appendChild(_this.container);
            _this.show();
        }
        else {
            frame.append.apply(frame, controls);
            _this.container.onclick = function (e) {
                if (e.target === _this.container) {
                    _this.hide();
                }
            };
            _this.frame = frame;
            if (show != true)
                _this.hide();
            _this.append(frame);
        }
        return _this;
    }
    Popover.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " popover";
    };
    Popover.prototype.show = function () {
        var _this = this;
        Popover.instance = this;
        this.container.style.display = null;
        setTimeout(function () {
            _this.container.style.opacity = "1";
            _this.frame.container.style.bottom = "0";
        });
    };
    Popover.prototype.hide = function () {
        var _this = this;
        if (this.permanent) {
            setTimeout(function () {
                _this.container.style.display = Constants.NONE;
            }, 500);
            this.container.style.opacity = "0";
            this.frame.container.style.bottom = "-100vh";
        }
        else {
            document.body.removeChild(this.container);
        }
        Popover.instance = null;
    };
    return Popover;
}(UIControl));
var AddToCartPopover = (function (_super) {
    __extends(AddToCartPopover, _super);
    function AddToCartPopover() {
        var _this = _super.call(this, null, null, false, new Row(new Spacer(), new LabelControl("Add to Cart").addClass("title"), new Spacer()), new Row(new LabelControl("Quantity"), new Spacer(), new ConditionalButton(function () { return ConstructorUI.instance.order.decrementQuantity(); }, function () { return ConstructorUI.instance.order.getQuantity() > 1; }, Icon.MINUS_CIRCLE, null, ConstructorUI.instance.order), new Button(function () { return ConstructorUI.instance.order.incrementQuantity(); }, Icon.PLUS_CIRCLE), new NumberInputControl(function (v) { return ConstructorUI.instance.order.setQuantity(v); }, function () { return ConstructorUI.instance.order.getQuantity(); }, ConstructorUI.instance.order)), new Row(new LabelControl("Price"), new Spacer(), new TriggeredLabelControl(ConstructorUI.instance.order, function (control) {
            var price = ConstructorUI.instance.order.getTotalCostWithoutDiscount();
            if (ConstructorUI.instance.order.hasDiscount()) {
                control.addClass("price-without-discount");
            }
            else {
                control.removeClass("price-without-discount");
            }
            return price;
        })), new Row(new TriggeredLabelControl(ConstructorUI.instance.order, function () {
            var discount = ConstructorUI.instance.order.getTotalDiscount();
            return (discount ? 'Discount' : '');
        }), new Spacer(), new TriggeredLabelControl(ConstructorUI.instance.order, function () {
            var discount = ConstructorUI.instance.order.getTotalDiscount();
            return (discount ? discount : '');
        }).addClass('discount')), new Row(new TriggeredLabelControl(ConstructorUI.instance.order, function () {
            var discount = ConstructorUI.instance.order.getTotalDiscount();
            return (discount ? 'Price with discount' : '');
        }), new Spacer(), new TriggeredLabelControl(ConstructorUI.instance.order, function () {
            var price = ConstructorUI.instance.order.getTotalCostWithDiscount();
            return ConstructorUI.instance.order.hasDiscount() ? price : '';
        })), new Row(), new Row(new Spacer(), new Button(function () { return _this.hide(); }, null, "Cancel"), new Spacer(), new Spacer(), new Button(function () {
            ConstructorUI.instance.order.addToCart();
            _this.hide();
        }, null, "OK"), new Spacer())) || this;
        return _this;
    }
    AddToCartPopover.prototype.show = function () {
        ConstructorUI.instance.order.updateDiscount();
        if (ConstructorUI.instance.order.isValid()) {
            _super.prototype.show.call(this);
        }
        else {
            this.hide();
        }
    };
    return AddToCartPopover;
}(Popover));
var Column = (function (_super) {
    __extends(Column, _super);
    function Column() {
        var controls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            controls[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.append(new Spacer());
        controls.forEach(function (control) {
            _this.append(control);
            _this.append(new Spacer());
        });
        return _this;
    }
    Column.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " column";
    };
    return Column;
}(UIControl));
var ConstructorController = (function (_super) {
    __extends(ConstructorController, _super);
    function ConstructorController() {
        var _this = _super.call(this) || this;
        var sharedState = constructorConfiguration && constructorConfiguration.sharedState;
        var categoryId = constructorConfiguration.categoryId;
        if (sharedState) {
            _this.c = new Constructor(_this.container, sharedState);
        }
        else {
            _this.c = new Constructor(_this.container);
        }
        _this.container.onclick = function (e) {
            if (e.target === _this.container) {
                Constructor.instance.getActiveSide().deselect();
            }
        };
        return _this;
    }
    ConstructorController.prototype.getClassName = function () {
        return "constructor-container";
    };
    return ConstructorController;
}(UIControl));
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        var controls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            controls[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.append.apply(_this, controls);
        return _this;
    }
    ToolBar.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " toolbar";
    };
    return ToolBar;
}(UIControl));
var TriggeredUIControl = (function (_super) {
    __extends(TriggeredUIControl, _super);
    function TriggeredUIControl(trigger, tag) {
        var _this = _super.call(this, tag) || this;
        trigger.onChange(function () { return _this.update(); }, _this);
        trigger.onVisibilityChange(function () { return _this.updateVisibility(); });
        _this.trigger = trigger;
        return _this;
    }
    TriggeredUIControl.prototype.updateVisibility = function () {
    };
    return TriggeredUIControl;
}(UIControl));
var ModelsPanel = (function (_super) {
    __extends(ModelsPanel, _super);
    function ModelsPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.append(new Row(new Button(function () { return window.location = '3Dconstructor'; }, Icon.BACKWARD, 'Choose other product')));
        return _this;
    }
    ModelsPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " models-panel vertical";
    };
    return ModelsPanel;
}(TriggeredUIControl));
var ConstructorUI = (function (_super) {
    __extends(ConstructorUI, _super);
    function ConstructorUI() {
        var _this = _super.call(this) || this;
        _this.touchDist = 0;
        _this.touchStartX = 0;
        _this.touchStartY = 0;
        _this.touchCenterX = 0;
        _this.touchCenterY = 0;
        _this.touchX0 = 0;
        _this.touchY0 = 0;
        _this.touchScrollX = 0;
        _this.touchScrollY = 0;
        _this.touchZoom = 1;
        _this.touchPan = false;
        ConstructorUI.instance = _this;
        try {
            _this.currencySymbol = (constructorConfiguration && constructorConfiguration.currencySymbol) ? constructorConfiguration.currencySymbol : _this.translate('$');
        }
        catch (e) {
            _this.currencySymbol = _this.translate('$');
        }
        try {
            _this.domain = constructorConfiguration.domain;
        }
        catch (e) {
            _this.domain = "";
        }
        var host = document.getElementById("constructor-ui");
        if (!host) {
            console.log("'#constructor-ui' element not found");
            return _this;
        }
        _this.order = new Order();
        _this.constructorControl = new ConstructorController();
        _this.toolBar = new ToolBar();
        _this.sidePanel = new SidePanel();
        _this.sideBar = new SideBar();
        _this.topBar = new TopBar();
        _this.bottomBar = new BottomBar();
        _this.addToCartPopover = new AddToCartPopover();
        _this.pagerBar = new Pager()
            .showWhen(Constructor.instance, function () { return Constructor.instance.sides.length > 1 && Constructor.instance.is2D(); })
            .addClass('pager-toolbar')
            .addClass('desktop')
            .tooltip('Side');
        _this.pagerBarMobile = new Row(new Spacer(), new ConditionalButton(function () { return Constructor.instance.setActiveSide(Constructor.instance.getActiveSide().getIndex() - 1); }, function () { return Constructor.instance.getActiveSide().getIndex() > 0; }, Icon.CHEVRON_CIRCLE_LEFT), new TriggeredLabelControl(Constructor.instance, function () { return Constructor.instance.getActiveSide().name; }), new ConditionalButton(function () { return Constructor.instance.setActiveSide(Constructor.instance.getActiveSide().getIndex() + 1); }, function () { return Constructor.instance.getActiveSide().getIndex() < Constructor.instance.sides.length - 1; }, Icon.CHEVRON_CIRCLE_RIGHT), new Spacer()).showWhen(Constructor.instance, function () { return Constructor.instance.sides.length > 1 && Constructor.instance.is2D(); })
            .addClass('pager-toolbar-mobile')
            .addClass('mobile')
            .tooltip('Side');
        _this.append(_this.constructorControl, _this.toolBar, _this.sidePanel, _this.sideBar, _this.topBar, _this.bottomBar, _this.addToCartPopover, _this.pagerBar, _this.pagerBarMobile);
        host.appendChild(_this.container);
        _this.bindDelKey();
        _this.bindDoubleClick();
        window.addEventListener("load", function () {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 0);
            setTimeout(function () { return window.scrollTo(0, 1); }, 1000);
        });
        window.addEventListener("orientationchange", function () {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 0);
        });
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 100);
        Constructor.onReadyHandler && Constructor.onReadyHandler();
        ConstructorUI.instance.sidePanel.layersPanel.update(true);
        window.addEventListener("touchstart", function (e) {
            if (e.touches.length === 2) {
                console.log("touchstart");
                Constructor.instance.addClass("notransition");
                e.preventDefault();
                var side = Constructor.instance.getActiveSide();
                side.freeze();
                _this.touchZoom = Constructor.instance.getZoom();
                _this.touchDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
                _this.touchStartX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
                _this.touchStartY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                _this.touchX0 = e.touches[0].pageX;
                _this.touchY0 = e.touches[0].pageY;
                _this.touchScrollX = side.container.scrollLeft;
                _this.touchScrollY = side.container.scrollTop;
                _this.touchCenterX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
                _this.touchCenterY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                _this.touchPan = false;
            }
        });
        window.addEventListener("touchmove", function (e) {
            if (e.touches.length === 2) {
                console.log("touchmove");
                e.preventDefault();
                var side = Constructor.instance.getActiveSide();
                side.deselect();
                var d = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
                if (!_this.touchPan) {
                    if (Math.abs(_this.touchDist - d) <= 1) {
                        _this.touchPan = true;
                    }
                }
                if (!_this.touchPan) {
                    var z = _this.touchZoom * (1 - ((_this.touchDist - d) / 200));
                    if (z >= 0.1) {
                        side.setZoom(z);
                        var page = Constructor.instance.getActiveSide().container;
                        if (page.clientWidth < page.scrollWidth) {
                            var offsetX = _this.container.offsetLeft;
                            var percentX = (_this.touchCenterX - offsetX) / _this.container.offsetWidth;
                            var maxScrollX = page.scrollWidth - page.clientWidth;
                            var scrollX_1 = _this.touchScrollX + maxScrollX * percentX;
                            side.container.scrollLeft = scrollX_1;
                        }
                        if (page.clientHeight < page.scrollHeight) {
                            var offsetY = _this.container.offsetTop;
                            var percentY = (_this.touchCenterY - offsetY) / _this.container.offsetHeight;
                            var maxScrollY = page.scrollHeight - page.clientHeight;
                            var scrollY_1 = _this.touchScrollX + maxScrollY * percentY;
                            side.container.scrollTop = scrollY_1;
                        }
                    }
                }
                else {
                    side.container.scrollLeft = _this.touchScrollX + _this.touchX0 - e.touches[0].pageX;
                    side.container.scrollTop = _this.touchScrollY + _this.touchY0 - e.touches[0].pageY;
                }
            }
        });
        window.addEventListener("touchend", function (e) {
            Constructor.instance.removeClass("notransition");
            Constructor.instance.getActiveSide().unfreeze();
        });
        window.addEventListener("touchcancel", function (e) {
            Constructor.instance.removeClass("notransition");
            Constructor.instance.getActiveSide().unfreeze();
        });
        return _this;
    }
    ConstructorUI.prototype.getClassName = function () {
        return "constructor-ui-container";
    };
    ConstructorUI.onReady = function (handler) {
        console.log("onReady");
        Constructor.onReadyHandler = handler();
    };
    ConstructorUI.init = function () {
        document.addEventListener("DOMContentLoaded", function () {
            new ConstructorUI();
        });
    };
    ConstructorUI.prototype.loadCategory = function (categoryId) {
        var _this = this;
        var c = Constructor.instance;
        if (c.preview && constructorConfiguration && constructorConfiguration.previewBackground) {
            c.preview.setSceneBackgroundColor(constructorConfiguration.previewBackground);
        }
        this.getCategoryOptions(categoryId, function (options) {
            if (!options || !options.constructor_models) {
                console.error('error loading category options for category #' + categoryId);
                return;
            }
            _this.options = options;
            var modelLoaded = c.preview.modelName != null;
            _this.sidePanel.modelsPanel.append(new LabelControl("Product Types").addClass('title'));
            var modelsContainer = new FlowControl(3, false);
            _this.sidePanel.modelsPanel.append(modelsContainer);
            options.constructor_models.forEach(function (model) {
                var active = false;
                if (!modelLoaded) {
                    active = true;
                    try {
                        c.loadModel(model.file_main, model.mode, function () {
                            if (constructorConfiguration && constructorConfiguration.sharedState) {
                                c.setMode(Mode.Mode3D);
                                _this.show3D();
                            }
                        }, function (error) { return alert(error); });
                        modelLoaded = true;
                    }
                    catch (e) {
                        alert(e.message);
                    }
                    _this.loadModelOptions(model, options);
                }
                else if (!_this.order.model && c.preview.modelName == model.file_main) {
                    _this.loadModelOptions(model, options);
                    _this.show3D();
                }
                var url = model.thumb;
                var button = new ToggleButton(function () {
                    c.loadModel(model.file_main, model.mode, function () {
                        if (constructorConfiguration && constructorConfiguration.sharedState) {
                            _this.show3D();
                        }
                    });
                    _this.loadModelOptions(model, options);
                    Constructor.instance.changed();
                }, function () {
                    if (!ConstructorUI.instance.order.model) {
                        return false;
                    }
                    return ConstructorUI.instance.order.model.constructor_model_id == model.constructor_model_id;
                }, null).append(new ImageControl(url).addClass('zoom'))
                    .tooltip(model.description, true);
                modelsContainer.append(button);
                if (active) {
                    button.addClass('active');
                }
            });
        });
    };
    ConstructorUI.prototype.show3D = function () {
        if (!Constructor.instance.is2dEditorMode()) {
            Constructor.instance.setMode(Mode.Mode3D);
            if (!this.order.model || !this.order.model.constructor_model_option || !this.order.model.constructor_model_option.length) {
                ConstructorUI.instance.sidePanel.modelsPanel.show();
            }
            else {
                ConstructorUI.instance.sidePanel.optionsPanel.show();
            }
        }
    };
    ConstructorUI.prototype.show2D = function () {
        Constructor.instance.setMode(Mode.Mode2D);
        if (!Constructor.instance.getActiveSide() || Constructor.instance.getActiveSide().isEmpty()) {
            ConstructorUI.instance.sidePanel.newElementPanel.show();
        }
        else {
            ConstructorUI.instance.sidePanel.layersPanel.show();
        }
    };
    ConstructorUI.prototype.createSides = function (printareas) {
        Constructor.instance.deleteAllSides();
        printareas.forEach(function (area) {
            Constructor.instance.addSide(area.width, area.height, parseInt(area.roundCorners), area.name, parseFloat(area.price), area.productImage, area.mask);
            Constructor.instance.zoomToFit();
        });
        Constructor.instance.sides.forEach(function (side) { return side.changed(); });
        this.bottomBar.update();
    };
    ConstructorUI.prototype.loadModelOptions = function (model, options) {
        var _this = this;
        this.sidePanel.optionsPanel.clear();
        if (!constructorConfiguration || !constructorConfiguration.sharedState || Constructor.instance.sides.length != model.printareas.length || Constructor.instance.sides[0].name != model.printareas[0].name) {
            if (Constructor.instance.sides.length != model.printareas.length) {
                this.createSides(model.printareas);
            }
            else {
                for (var i = 0; i < Constructor.instance.sides.length; i++) {
                    var side = Constructor.instance.sides[i];
                    var area = model.printareas[i];
                    if (side.width != area.width || side.height != area.height) {
                        this.createSides(model.printareas);
                        break;
                    }
                    if (side.name != area.name) {
                        side.name = area.name;
                    }
                    side.price = parseInt(area.price) || 0;
                    side.name = area.name;
                }
            }
            Constructor.instance.changed();
        }
        this.order.setModel(model);
        this.order.selectedOptions = [];
        var selectedOptions = [];
        if (constructorConfiguration && constructorConfiguration.selectedOptions && constructorConfiguration.selectedOptions.length) {
            for (var i = 0; i < constructorConfiguration.selectedOptions.length; i++) {
                var selectedOption = constructorConfiguration.selectedOptions[i];
                selectedOptions.push(selectedOption);
            }
        }
        var groupPanels = [];
        options.options.forEach(function (optionGroup) {
            var groupPanel = new OptionGroupPanel(optionGroup);
            groupPanels.push(groupPanel);
        });
        model.constructor_model_option.forEach(function (option) {
            groupPanels.forEach(function (groupPanel) {
                if (option.namegroup == groupPanel.option.name) {
                    var optionButton = groupPanel.addOption(option);
                    if (selectedOptions.indexOf(option.id) != -1) {
                        optionButton.select();
                    }
                }
            });
        });
        groupPanels.forEach(function (groupPanel) {
            if (groupPanel.values.length > 0) {
                _this.sidePanel.optionsPanel.append(groupPanel);
            }
        });
        ConstructorUI.instance.order.changed();
        ConstructorUI.instance.sidePanel.layersPanel.update(true);
    };
    ConstructorUI.prototype.bindDelKey = function () {
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 46 && (!Popover.instance || !Popover.instance.isVisible())) {
                var selection = Constructor.instance.getSelection();
                if (selection && !selection.isEditing() && document.activeElement == document.body) {
                    selection.remove();
                }
            }
            else if (e.keyCode == 27) {
                Popover.instance.hide();
            }
        }, false);
    };
    ConstructorUI.prototype.bindDoubleClick = function () {
        Constructor.onTextEditingEntered(function () {
            setTimeout(function () {
                ConstructorUI.instance.sidePanel.selectionPanel.show();
            }, 100);
        });
    };
    ConstructorUI.prototype.getCategoryOptions = function (categoryId, callback) {
        var url = '/index.php?route=product/category/category&category_id=' + categoryId;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
        xhr.onreadystatechange = function (res) {
            if (xhr.readyState === 4 && callback) {
                callback(JSON.parse(xhr.response));
            }
        };
        xhr.send();
    };
    ConstructorUI.test = ConstructorUI.init();
    ConstructorUI.onReadyHandler = function () { return true; };
    return ConstructorUI;
}(UIControl));
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        var controls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            controls[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.append.apply(_this, controls);
        return _this;
    }
    Container.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this);
    };
    Container.prototype.setValue = function (value) {
        this.container.innerText = value;
    };
    return Container;
}(UIControl));
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        var controls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            controls[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.append.apply(_this, controls);
        return _this;
    }
    Row.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " row";
    };
    return Row;
}(UIControl));
var CopyToClipboardPopover = (function (_super) {
    __extends(CopyToClipboardPopover, _super);
    function CopyToClipboardPopover(title, value) {
        var _this = _super.call(this, null, null, true, new Row(new Spacer(), new LabelControl(title).addClass("title"), new Spacer()), new Row(new Spacer(), new Button(function () { return _this.copy(); }, null, value).addClass('copy-text'), new Spacer()), CopyToClipboardPopover.message, new Row(new Spacer(), new Button(function () { return _this.hide(); }, null, "OK"), new Spacer())) || this;
        _this.permanent = false;
        document.body.appendChild(_this.container);
        return _this;
    }
    CopyToClipboardPopover.prototype.show = function () {
        CopyToClipboardPopover.message.clear();
        _super.prototype.show.call(this);
    };
    CopyToClipboardPopover.prototype.copy = function () {
        var node = document.querySelector('.copy-text .label');
        var range = document.createRange();
        range.selectNode(node);
        window.getSelection().addRange(range);
        var successful = false;
        try {
            successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy email command was ' + msg);
        }
        catch (err) {
            console.log('Oops, unable to copy');
        }
        CopyToClipboardPopover.message.clear();
        if (successful) {
            CopyToClipboardPopover.message.append(new Spacer(), new LabelControl('The link is copied to clipboard!'), new Spacer());
        }
    };
    CopyToClipboardPopover.message = new Row();
    return CopyToClipboardPopover;
}(Popover));
var Divider = (function (_super) {
    __extends(Divider, _super);
    function Divider(vertical) {
        var _this = _super.call(this) || this;
        if (vertical) {
            _this.append(new Row(new Spacer().addClass("v-divider")));
            _this.addClass("vertical");
        }
        else {
            _this.append(new Row(new Spacer(), new Spacer()
                .addClass("h-divider")));
        }
        _this.container.addEventListener("touchstart", function (e) {
            e.preventDefault();
        });
        return _this;
    }
    Divider.prototype.getClassName = function () {
        return "divider";
    };
    Divider.prototype.update = function () {
    };
    return Divider;
}(UIControl));
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FlowControl = (function (_super) {
    __extends(FlowControl, _super);
    function FlowControl(maxColumns, autoFlow) {
        var _this = _super.call(this) || this;
        _this.maxColumns = maxColumns || 6;
        _this.autoFlow = autoFlow == null ? true : autoFlow;
        return _this;
    }
    FlowControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + ' flow';
    };
    FlowControl.prototype.showed = function () {
        if (this.autoFlow) {
            this.reflow();
        }
    };
    FlowControl.prototype.reflow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maxColumnWidth, i, rect, columns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxColumnWidth = 0;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.children.length)) return [3, 4];
                        return [4, this.children[i].calculateBoundingClientRect()];
                    case 2:
                        rect = _a.sent();
                        maxColumnWidth = Math.max(maxColumnWidth, rect.width);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        columns = Math.floor(this.container.clientWidth / maxColumnWidth);
                        this.setColumns(columns);
                        return [2];
                }
            });
        });
    };
    FlowControl.prototype.setColumns = function (value) {
        if (value == 0) {
            return;
        }
        this.columns = Math.min(value, this.maxColumns, this.children.length);
        var gap = this.columns == 1 ? 0 : (6 / this.columns);
        var percent = 100 / this.columns - gap;
        this.container.style.gridTemplateColumns = 'repeat(' + this.columns + ', ' + percent + '%)';
    };
    FlowControl.prototype.append = function () {
        var controls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            controls[_i] = arguments[_i];
        }
        _super.prototype.append.apply(this, controls);
        var columns = Math.min(this.maxColumns, this.children.length);
        this.setColumns(columns);
        return this;
    };
    return FlowControl;
}(UIControl));
var IconControl = (function (_super) {
    __extends(IconControl, _super);
    function IconControl(icon) {
        var _this = _super.call(this) || this;
        _this.container.innerHTML = icon;
        return _this;
    }
    IconControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " icon";
    };
    IconControl.prototype.setValue = function (icon) {
        this.container.innerHTML = icon;
    };
    IconControl.prototype.getValue = function () {
        return this.container.innerHTML;
    };
    return IconControl;
}(UIControl));
var ImageControl = (function (_super) {
    __extends(ImageControl, _super);
    function ImageControl(value, clickable) {
        var _this = _super.call(this, Constructor.instance, "img") || this;
        _this.src = value;
        _this.container.src = (value || "");
        if (clickable) {
            _this.container.onclick = function () {
                var selection = Constructor.instance.getSelection();
                if (selection != null && selection.object != null) {
                    if (selection.object.fill != null && selection.object.fill.source != null) {
                        selection.object.fill.source.src = value;
                    }
                    else {
                        selection.object.fill = new fabric.Pattern({
                            source: value,
                            repeat: "no-repeat"
                        });
                    }
                    setTimeout(function () {
                        Constructor.instance.getActiveSide().canvas.renderAll();
                    });
                }
                else {
                    Constructor.instance.addFrame(_this.container.src);
                }
                Constructor.instance.changed();
            };
        }
        return _this;
    }
    ImageControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " image button sticker";
    };
    ImageControl.prototype.update = function () {
        if (this.src) {
            var selection = Constructor.instance.getSelection();
            if (selection
                && selection.object
                && selection.object.fill
                && selection.object.fill.source
                && this.src == selection.object.fill.source.src) {
                this.select();
            }
            else {
                this.deselect();
            }
        }
    };
    ImageControl.prototype.setValue = function (value) {
        this.container.src = value;
    };
    return ImageControl;
}(TriggeredUIControl));
var LabelControl = (function (_super) {
    __extends(LabelControl, _super);
    function LabelControl(value) {
        var _this = _super.call(this) || this;
        _this.container.innerHTML = (value ? _this.translate(value) : "");
        return _this;
    }
    LabelControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " label";
    };
    LabelControl.prototype.setValue = function (value) {
        this.container.innerHTML = this.translate(value);
    };
    return LabelControl;
}(UIControl));
var Spacer = (function (_super) {
    __extends(Spacer, _super);
    function Spacer() {
        return _super.call(this) || this;
    }
    Spacer.prototype.getClassName = function () {
        return "spacer";
    };
    Spacer.prototype.update = function () {
    };
    return Spacer;
}(UIControl));
var StickerControl = (function (_super) {
    __extends(StickerControl, _super);
    function StickerControl(value) {
        var _this = _super.call(this, "img") || this;
        _this.container.setAttribute("data-src", value || "");
        _this.container.onclick = function () {
            Constructor.instance.addImage(_this.container.src);
        };
        return _this;
    }
    StickerControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button sticker";
    };
    StickerControl.prototype.setValue = function (value) {
        this.container.src = value;
    };
    return StickerControl;
}(UIControl));
var TriggeredLabelControl = (function (_super) {
    __extends(TriggeredLabelControl, _super);
    function TriggeredLabelControl(trigger, getter) {
        var _this = _super.call(this, trigger) || this;
        _this.control = _this;
        _this.getter = getter;
        setTimeout(_this.update, 100);
        _this.update();
        return _this;
    }
    TriggeredLabelControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " label";
    };
    TriggeredLabelControl.prototype.setValue = function (value) {
        this.container.innerText = value;
    };
    TriggeredLabelControl.prototype.update = function () {
        var value = null;
        try {
            value = this.translate(this.getter(this.control));
        }
        catch (e) { }
        if (value != null) {
            this.setValue(value.toString());
        }
    };
    return TriggeredLabelControl;
}(TriggeredUIControl));
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(action, icon, label) {
        var _this = _super.call(this) || this;
        if (icon) {
            _this.append(new IconControl(icon));
        }
        if (label) {
            _this.append(new LabelControl(label), new Spacer());
        }
        _this.container.onclick = function () { return action(); };
        return _this;
    }
    Button.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button";
    };
    Button.of = function (action) {
        var controls = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            controls[_i - 1] = arguments[_i];
        }
        var button = new Button(action);
        button.append.apply(button, controls);
        return button;
    };
    return Button;
}(UIControl));
var TriggeredButton = (function (_super) {
    __extends(TriggeredButton, _super);
    function TriggeredButton(action, icon, label, trigger) {
        var _this = _super.call(this, trigger || Constructor.instance) || this;
        if (icon) {
            _this.append(new IconControl(_this.translate(icon)));
        }
        if (label) {
            _this.append(new LabelControl(label));
        }
        _this.container.onclick = function () { return action(); };
        return _this;
    }
    TriggeredButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button";
    };
    return TriggeredButton;
}(TriggeredUIControl));
var ConditionalButton = (function (_super) {
    __extends(ConditionalButton, _super);
    function ConditionalButton(action, check, icon, label, trigger) {
        var _this = _super.call(this, function () {
            if (!_this.hasClass("disabled")) {
                action();
            }
        }, icon, label, trigger) || this;
        _this.check = check;
        _this.update();
        return _this;
    }
    ConditionalButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button conditional";
    };
    ConditionalButton.prototype.update = function () {
        this.check()
            ? this.removeClass("disabled")
            : this.addClass("disabled");
    };
    return ConditionalButton;
}(TriggeredButton));
var FontFamilyButton = (function (_super) {
    __extends(FontFamilyButton, _super);
    function FontFamilyButton(fontFamily) {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.fontFamily = fontFamily;
        var font = new FontFaceObserver(fontFamily);
        var element = _this;
        var icon = new IconControl(Icon.CIRCLE);
        _this.icon = icon;
        font.load(FontFamilyButton.charset)
            .then(function () {
            element.append(new LabelControl(fontFamily)
                .setFontFamily(fontFamily));
        })
            .catch(function (e) {
        });
        _this.container.onclick = function () {
            _this.c.getSelection().setFontFamily(fontFamily, true);
            _this.c.getSelection().setColor(_this.c.getSelection().getColor().toHex());
        };
        return _this;
    }
    FontFamilyButton.initCharset = function () {
        var s = "";
        for (var i = 32; i <= 1024; i++)
            s += String.fromCharCode(i);
        return s;
    };
    FontFamilyButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button font-family";
    };
    FontFamilyButton.prototype.update = function () {
        if (this.c.hasTextSelection() && this.c.getSelection().getFontFamily() == this.fontFamily) {
            this.icon.setValue(Icon.CHECK_CIRCLE);
            this.addClass("selected");
        }
        else if (!this.isEmpty()) {
            this.icon.setValue(Icon.CIRCLE);
            this.removeClass("selected");
        }
    };
    FontFamilyButton.charset = FontFamilyButton.initCharset();
    return FontFamilyButton;
}(TriggeredUIControl));
var ToggleButton = (function (_super) {
    __extends(ToggleButton, _super);
    function ToggleButton(action, check, iconOn, iconOff, enabledCheck, label, trigger) {
        var _this = _super.call(this, trigger || Constructor.instance) || this;
        _this.action = action;
        _this.check = check;
        _this.enabledCheck = enabledCheck;
        _this.iconOn = iconOn;
        _this.iconOn = iconOn;
        _this.iconOff = (iconOff || iconOn);
        if (_this.iconOn != _this.iconOff) {
            _this.addClass("active");
        }
        _this.container.onclick = function () { return _this.action(); };
        _this.update();
        if (iconOn) {
            _this.icon = new IconControl(iconOn);
            _this.append(_this.icon);
        }
        if (label) {
            _this.label = new LabelControl(label);
            _this.append(_this.label);
        }
        _this.container.onclick = function () {
            if (!_this.enabledCheck || _this.enabledCheck()) {
                action();
            }
        };
        _this.update();
        return _this;
    }
    ToggleButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button toggle";
    };
    ToggleButton.of = function (trigger, action, check) {
        var controls = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            controls[_i - 3] = arguments[_i];
        }
        var button = new ToggleButton(action, check, null, null, null, null, trigger);
        button.append.apply(button, controls);
        return button;
    };
    ToggleButton.prototype.updateEnabled = function () {
        if (this.enabledCheck) {
            if (this.enabledCheck()) {
                this.removeClass("disabled");
            }
            else {
                this.addClass("disabled");
            }
        }
    };
    ToggleButton.prototype.update = function () {
        this.updateEnabled();
        var isOn = false;
        try {
            isOn = this.check();
        }
        catch (e) {
            console.log(e.message);
        }
        if (isOn) {
            if (this.icon && this.iconOn != this.iconOff) {
                this.icon.setValue(this.iconOn);
            }
            else {
                this.addClass("active");
            }
        }
        else {
            if (this.icon && this.iconOn != this.iconOff) {
                this.icon.setValue(this.iconOff);
            }
            else if (this.iconOn == this.iconOff) {
                this.removeClass("active");
            }
        }
    };
    return ToggleButton;
}(TriggeredUIControl));
var FullScreenButton = (function (_super) {
    __extends(FullScreenButton, _super);
    function FullScreenButton() {
        var _this = _super.call(this, function () { return _this.toggleFullscreen(); }, function () { return Utils.isFullscreen(); }, Icon.COMPRESS, Icon.EXPAND) || this;
        return _this;
    }
    FullScreenButton.prototype.toggleFullscreen = function () {
        var _this = this;
        Utils.isFullscreen()
            ? document.exitFullscreen()
            : this.c.container.requestFullscreen();
        setTimeout(function () { return _this.update(); }, 100);
    };
    FullScreenButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " fullscreen";
    };
    return FullScreenButton;
}(ToggleButton));
var LayoutButton = (function (_super) {
    __extends(LayoutButton, _super);
    function LayoutButton(layout) {
        var _this = _super.call(this) || this;
        var size = 60;
        var margin = 4;
        var innerSize = size - margin;
        _this.container.style.width = size + "px";
        _this.container.style.height = size + "px";
        _this.container.style.border = "1px solid #ddd";
        _this.container.style.position = "relative";
        for (var i = 0; i < layout.length; i++) {
            var block = layout[i];
            var div = document.createElement("div");
            div.style.position = "absolute";
            div.style.background = "#ddd";
            div.style.width = block[0] * innerSize / 100 - margin + "px";
            div.style.height = block[1] * innerSize / 100 - margin + "px";
            div.style.left = block[2] * innerSize / 100 + margin + "px";
            div.style.top = block[3] * innerSize / 100 + margin + "px";
            _this.container.append(div);
        }
        _this.container.onclick = function () { return _this.addFrames(layout); };
        return _this;
    }
    LayoutButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button layout";
    };
    LayoutButton.prototype.addFrames = function (layout) {
        var side = Constructor.instance.getActiveSide();
        var size;
        if (side.canvas.clipPath) {
            size = Math.min(side.canvas.clipPath.width, side.canvas.clipPath.width);
        }
        else {
            size = Math.min(side.width, side.height);
        }
        var margin = 4;
        var innerSize = size - margin;
        var sideCenterX = side.width / 2;
        var sideCenterY = side.height / 2;
        var startX = sideCenterX - innerSize / 2;
        var startY = sideCenterY - innerSize / 2;
        for (var i = 0; i < layout.length; i++) {
            var block = layout[i];
            var w = block[0] * innerSize / 100 - margin;
            var h = block[1] * innerSize / 100 - margin;
            var x = block[2] * innerSize / 100 + margin + startX + w / 2;
            var y = block[3] * innerSize / 100 + margin + startY + h / 2;
            var dimensions = new Block(w, h, x, y);
            console.error("block[2] * innerSize / 100 + margin + startX", block[2] * innerSize / 100 + margin + startX);
            console.error("dimensions ", dimensions);
            Constructor.instance.addFrame(null, dimensions);
        }
        side.canvas.renderAll();
    };
    return LayoutButton;
}(UIControl));
var Block = (function () {
    function Block(width, height, left, top) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        this.width = 100;
        this.height = 100;
        this.left = 0;
        this.top = 0;
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
    }
    return Block;
}());
var RightButton = (function (_super) {
    __extends(RightButton, _super);
    function RightButton(action, icon, label) {
        var _this = _super.call(this) || this;
        if (label) {
            _this.append(new LabelControl(label), new Spacer());
        }
        if (icon) {
            _this.append(new IconControl(icon));
        }
        _this.container.onclick = function () { return action(); };
        return _this;
    }
    RightButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button";
    };
    return RightButton;
}(UIControl));
var SwitchButton = (function (_super) {
    __extends(SwitchButton, _super);
    function SwitchButton(view, icon, visibility) {
        var _this = _super.call(this, view) || this;
        _this.visibility = visibility;
        _this.container.innerHTML = icon;
        _this.container.onclick = function () {
            _this.trigger.show();
        };
        return _this;
    }
    SwitchButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " button";
    };
    SwitchButton.prototype.updateVisibility = function () {
        this.update();
    };
    SwitchButton.prototype.update = function () {
        if (this.visibility && !this.visibility()) {
            this.hide();
        }
        else {
            this.show();
        }
        if (this.trigger.isVisible()) {
            this.addClass("active");
        }
        else {
            this.removeClass("active");
        }
    };
    return SwitchButton;
}(TriggeredUIControl));
var InputControl = (function (_super) {
    __extends(InputControl, _super);
    function InputControl(type, setter, getter, min, max, step, trigger) {
        var _this = _super.call(this, (trigger || Constructor.instance), "input") || this;
        _this.getter = getter;
        _this.setter = setter;
        var element = _this.container;
        element.type = type;
        element.min = min || 0;
        element.max = max || 100;
        element.step = step || 10;
        element.value = getter();
        element.onchange = function () {
            Trigger.preventUpdate = false;
            var value = _this.container.value;
            _this.setter(value);
            _this.changed();
        };
        element.oninput = function (e) {
            console.log("Trigger.preventUpdate = true;");
            Trigger.preventUpdate = true;
            var value = _this.container.value;
            _this.setter(value);
        };
        return _this;
    }
    InputControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " input";
    };
    InputControl.prototype.update = function () {
        if ((this.trigger === this.c && this.c.hasSelection()) || this.trigger != this.c) {
            this.updateValue();
        }
    };
    InputControl.prototype.updateValue = function () {
        this.container.value = this.getter();
    };
    return InputControl;
}(TriggeredUIControl));
var ColorControl = (function (_super) {
    __extends(ColorControl, _super);
    function ColorControl(setter, getter) {
        return _super.call(this, "color", setter, getter) || this;
    }
    ColorControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " color";
    };
    return ColorControl;
}(InputControl));
var NumberInputControl = (function (_super) {
    __extends(NumberInputControl, _super);
    function NumberInputControl(setter, getter, trigger) {
        var _this = _super.call(this, 'text', setter, getter, 1, NumberInputControl.max, 1, trigger) || this;
        _this.setAttribute('pattern', '[0-9]*');
        _this.container.oninput = function (e) {
            var inputEvent = e;
            if (inputEvent.data) {
                if (!inputEvent.data.match(/[0-9]+/g)) {
                    _this.container.value = _this.container.value.substring(0, _this.container.value.length - inputEvent.data.length);
                }
            }
            if (_this.container.value === '0') {
                _this.container.value = 1;
            }
            if (parseInt(_this.container.value) > NumberInputControl.max) {
                _this.container.value = NumberInputControl.max;
            }
            _this.setter(_this.container.value);
        };
        _this.container.addEventListener("paste", function (e) { return e.preventDefault(); });
        return _this;
    }
    NumberInputControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " number-input";
    };
    NumberInputControl.max = 999;
    return NumberInputControl;
}(InputControl));
var RangeControl = (function (_super) {
    __extends(RangeControl, _super);
    function RangeControl(setter, getter, min, max, step) {
        return _super.call(this, "range", setter, getter, min, max, step) || this;
    }
    RangeControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " input";
    };
    return RangeControl;
}(InputControl));
var SelectControl = (function (_super) {
    __extends(SelectControl, _super);
    function SelectControl(setter, getter, min, max, step, valuesGetter) {
        var _this = _super.call(this, Constructor.instance, "select") || this;
        _this.values = [];
        if (valuesGetter) {
            _this.valuesGetter = valuesGetter;
        }
        else {
            for (var i = (min || 0); i <= (max || 100); i += (step || 10)) {
                var option = document.createElement("option");
                option.value = i.toString();
                option.innerText = i.toString();
                _this.container.appendChild(option);
            }
        }
        _this.getter = getter;
        _this.setter = setter;
        _this.container.value = getter();
        _this.container.onchange = function () {
            var value = _this.container.value;
            _this.setter(value);
            _this.changed();
        };
        return _this;
    }
    SelectControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " select";
    };
    SelectControl.prototype.update = function () {
        if (this.valuesGetter) {
            var values = this.valuesGetter();
            if (values.length <= 1) {
                this.hide();
                return;
            }
            else {
                this.show();
            }
            if (this.values.length < values.length) {
                this.values = values;
                this.container.innerHTML = '';
                for (var i = 0; i < this.values.length; i++) {
                    var option = document.createElement("option");
                    option.value = this.values[i].value ? this.values[i].value : i;
                    option.innerText = this.values[i].text ? this.values[i].text : this.values[i];
                    this.container.appendChild(option);
                }
            }
        }
    };
    return SelectControl;
}(TriggeredUIControl));
var SelectPropertyControl = (function (_super) {
    __extends(SelectPropertyControl, _super);
    function SelectPropertyControl(label, setter, getter, min, max, step) {
        var _this = _super.call(this) || this;
        _this.append(new Row(new LabelControl(label), new Spacer(), new SelectControl(setter, getter, min, max, step)));
        return _this;
    }
    SelectPropertyControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " property-control select";
    };
    return SelectPropertyControl;
}(UIControl));
var SelectRangePropertyControl = (function (_super) {
    __extends(SelectRangePropertyControl, _super);
    function SelectRangePropertyControl(label, setter, getter, min, max, step) {
        var _this = _super.call(this) || this;
        _this.input = Utils.isIos()
            ? new SelectControl(setter, getter, min, max, step)
            : new RangeControl(setter, getter, min, max, step);
        _this.append(new Row(new LabelControl(label), new Spacer(), _this.input));
        return _this;
    }
    SelectRangePropertyControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " property-control";
    };
    return SelectRangePropertyControl;
}(UIControl));
var SelectionColorControl = (function (_super) {
    __extends(SelectionColorControl, _super);
    function SelectionColorControl(label, setter, getter, max, step) {
        var _this = _super.call(this) || this;
        _this.append(new Row(new LabelControl(label), new Spacer(), new ColorControl(setter, getter)));
        return _this;
    }
    SelectionColorControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " property-control color";
    };
    SelectionColorControl.prototype.update = function () {
    };
    return SelectionColorControl;
}(UIControl));
var TextInputControl = (function (_super) {
    __extends(TextInputControl, _super);
    function TextInputControl(setter, getter, trigger) {
        var _this = _super.call(this, 'text', setter, getter, null, null, null, trigger) || this;
        _this.container.oninput = function (e) {
            _this.setter(_this.container.value);
        };
        return _this;
    }
    TextInputControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " text-input";
    };
    return TextInputControl;
}(InputControl));
var TogglePropertyControl = (function (_super) {
    __extends(TogglePropertyControl, _super);
    function TogglePropertyControl(icons, label, setter, getter) {
        var _this = _super.call(this) || this;
        _this.append(new Row(new LabelControl(label), new Spacer(), new ToggleButton(setter, getter, label, label)));
        return _this;
    }
    TogglePropertyControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " property-control toggle";
    };
    return TogglePropertyControl;
}(UIControl));
var ExportPanel = (function (_super) {
    __extends(ExportPanel, _super);
    function ExportPanel() {
        var _this = _super.call(this) || this;
        _this.append(new Row(new Button(function () { return _this.download(ImageType.JPG); }, null, "Export JPEG")), new Row(new Button(function () { return _this.download(ImageType.PNG); }, null, "Export PNG")), new Row(new ConditionalButton(function () { return _this.download(ImageType.SVG); }, function () { return Constructor.instance.is2D() && !Constructor.instance.is2dEditorMode(); }, "Export SVG")), new Row(new Button(function () { return ConstructorUI.instance.order.shareLink(); }, null, "Share link")));
        return _this;
    }
    ExportPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " share-panel vertical";
    };
    ExportPanel.prototype.download = function (format) {
        var data;
        if (Constructor.instance.is3D()) {
            data = Constructor.instance.preview.exportImageSync(window.outerWidth, format);
        }
        else {
            data = Constructor.instance.getActiveSide().exportImage(window.outerWidth, format);
        }
        if (format == ImageType.SVG) {
            data = 'data:image/svg+xml;charset=utf-8,' + data;
        }
        var downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = data;
        downloadLink.target = '_self';
        var extension;
        if (format == ImageType.SVG) {
            extension = "svg";
        }
        else if (format == ImageType.JPG) {
            extension = "jpg";
        }
        else {
            extension = format.substr("image/".length, 3);
        }
        downloadLink.download = "image-" + new Date().toLocaleString() + "." + extension;
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    ExportPanel.prototype.update = function () {
    };
    return ExportPanel;
}(UIControl));
var FiltersPanel = (function (_super) {
    __extends(FiltersPanel, _super);
    function FiltersPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.addFilterButton(Filter.BRIGHTNESS, "Brightness");
        _this.addFilterButton(Filter.DARKNESS, "Darkness");
        _this.addFilterButton(Filter.BLUR, "Blur");
        _this.addFilterButton(Filter.SHARPEN, "Sharpen");
        _this.addFilterButton(Filter.EMBOSS, "Emboss");
        _this.addFilterButton(Filter.INVERT, "Invert");
        _this.addFilterButton(Filter.GRAYSCALE, "Grayscale");
        _this.append(new Row(new Spacer(), new ConditionalButton(function () { return Constructor.instance.getSelection().resetFilters(); }, function () { return Constructor.instance.getSelection() && Constructor.instance.getSelection().hasFilters(); }, "Reset Filters"), new Spacer()));
        _this.update();
        return _this;
    }
    FiltersPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " filters vertical";
    };
    FiltersPanel.prototype.addFilterButton = function (filter, label) {
        if (filter.isBoolean) {
            this.append(new Row(new LabelControl(label), new Spacer(), new ToggleButton(function () { return Constructor.instance.getSelection().addFilter(filter); }, function () { return Constructor.instance.hasSelection() && Constructor.instance.getSelection().hasFilter(filter); }, Icon.TOGGLE_ON, Icon.TOGGLE_OFF)));
        }
        else {
            this.append(new Row(new LabelControl(label), new Spacer(), new ConditionalButton(function () { return Constructor.instance.getSelection().removeFilter(filter); }, function () { return Constructor.instance.getSelection() && Constructor.instance.getSelection().hasFilter(filter); }, Icon.MINUS_CIRCLE), new Button(function () { return Constructor.instance.getSelection().addFilter(filter); }, Icon.PLUS_CIRCLE)));
        }
    };
    FiltersPanel.prototype.show = function () {
        _super.prototype.show.call(this);
        this.update();
    };
    return FiltersPanel;
}(TriggeredUIControl));
var FontFamilyPanel = (function (_super) {
    __extends(FontFamilyPanel, _super);
    function FontFamilyPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        document.fonts.ready.then(function () {
            if (constructorConfiguration.fonts) {
                for (var i = 0; i < constructorConfiguration.fonts.length; i++) {
                    var fontFamily = constructorConfiguration.fonts[i];
                    _this.append(new FontFamilyButton(fontFamily));
                }
            }
        });
        return _this;
    }
    FontFamilyPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " font-family-panel vertical";
    };
    FontFamilyPanel.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    FontFamilyPanel.prototype.update = function () {
    };
    FontFamilyPanel.prototype.updateVisibility = function () {
        this.trigger.getMode() == Mode.Mode2D && this.trigger.hasTextSelection()
            ? this.show()
            : this.hide();
    };
    FontFamilyPanel.prototype.getFontFamilies = function () {
        var fonts = document.fonts;
        var iterator = fonts.entries();
        var list = [];
        var done = false;
        while (!done) {
            var font = iterator.next();
            if (!font.done) {
                var fontFamily = font.value.family;
                if (!fontFamily) {
                    fontFamily = font.value[0].family;
                }
                if (!list.includes(fontFamily) && !fontFamily.includes("Awesome")) {
                    if (constructorConfiguration
                        && constructorConfiguration.fonts
                        && constructorConfiguration.fonts.length
                        && !constructorConfiguration.fonts.includes(fontFamily)) {
                        continue;
                    }
                    list.push(fontFamily);
                }
            }
            else {
                done = font.done;
            }
        }
        return list;
    };
    return FontFamilyPanel;
}(TriggeredUIControl));
var FramesPanel = (function (_super) {
    __extends(FramesPanel, _super);
    function FramesPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.append(new Row(new Spacer(), new LabelControl("Containers"), new Spacer()));
        _this.append(new Row(new Spacer(), new LayoutButton([
            [90, 90, 5, 5],
        ]), new Spacer(), new LayoutButton([
            [50, 50, 0, 0],
            [50, 50, 50, 0],
            [100, 50, 0, 50],
        ]), new Spacer(), new LayoutButton([
            [100 / 3, 100 / 3, 0, 0],
            [100 / 3, 100 / 3, 100 / 3, 0],
            [100 / 3, 100 / 3, 100 / 3 * 2, 0],
            [100, 100 / 3 * 2, 0, 100 / 3],
        ]), new Spacer()), new Row(new Spacer(), new LayoutButton([
            [33, 33, 0, 0],
            [33, 33, 0, 0],
            [33, 33, 0, 33],
            [33, 33, 0, 66],
            [33, 33, 33, 0],
            [33, 33, 33, 33],
            [33, 33, 33, 66],
            [33, 33, 66, 0],
            [33, 33, 66, 33],
            [33, 33, 66, 66],
        ]), new Spacer(), new LayoutButton([
            [50, 50, 0, 0],
            [50, 50, 50, 0],
            [50, 50, 0, 50],
            [50, 50, 50, 50],
        ]), new Spacer(), new LayoutButton([
            [33, 33, 0, 0],
            [33, 33, 33, 0],
            [33, 33, 66, 0],
            [66, 66, 0, 33],
            [33, 33, 66, 0],
            [33, 33, 66, 33],
            [33, 33, 66, 66],
        ]), new Spacer()), new Row(new Spacer(), new LayoutButton([
            [60, 100, 0, 0],
            [40, 50, 60, 0],
            [40, 50, 60, 50],
        ]), new Spacer(), new LayoutButton([
            [100, 50, 0, 0],
            [100, 50, 0, 50],
        ]), new Spacer(), new LayoutButton([
            [50, 100, 0, 0],
            [50, 100, 50, 0],
        ]), new Spacer()));
        _this.append(new Row(new ConditionalButton(function () { return _this.c.getActiveSide().clear(); }, function () { return !_this.c.getActiveSide() || !_this.c.getActiveSide().isEmpty(); }, null, "Clear Side")));
        _this.update();
        return _this;
    }
    FramesPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " vertical";
    };
    FramesPanel.prototype.show = function () {
        _super.prototype.show.call(this);
        this.update();
    };
    FramesPanel.prototype.updateVisibility = function () {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    };
    FramesPanel.prototype.addButton = function (label, type, icon) {
        var _this = this;
        this.append(new Row(new Button(function () { return _this.c.addElement(type); }, icon, label)));
    };
    return FramesPanel;
}(TriggeredUIControl));
var LayerUIControl = (function (_super) {
    __extends(LayerUIControl, _super);
    function LayerUIControl(element, layers) {
        var _this = _super.call(this, element) || this;
        _this.iconCanvas = new fabric.Canvas(document.createElement("canvas"));
        _this.updateLocked = false;
        _this.updateQueued = false;
        _this.parent = layers;
        var grip = new Container(new Container())
            .addClass("grip");
        _this.container.onclick = function (e) { return _this.trigger.side.select(_this.trigger); };
        _this.iconContainerElement = document.createElement(Constants.DIV);
        _this.container.style.userSelect = "none";
        _this.container.draggable = true;
        grip.container.ontouchstart = function (e) {
            e.preventDefault();
            LayerUIControl.touchStart = e.touches.item(0).clientY;
            _this.addClass("source");
        };
        grip.container.ontouchmove = function (e) {
            e.preventDefault();
            _this.addClass("selected");
            _this.addClass("touch");
            _this.addClass("drag-over");
            var y = e.touches.item(0).clientY;
            var scrollY = _this.container.parentElement.parentElement.parentElement.scrollTop;
            var deltaY = (_this.container.offsetTop - scrollY) - y;
            var deltaIndex = Math.floor(deltaY / _this.container.clientHeight) + 1;
            var layerIndex = _this.trigger.getLayerIndex();
            var to = layerIndex - deltaIndex;
            if (to >= _this.parent.children.length) {
                to = _this.parent.children.length - 1;
            }
            else if (to < 0) {
                to = 0;
            }
            LayerUIControl.dragTo = to;
            for (var i = 0; i < _this.parent.children.length; i++) {
                var layer = _this.parent.children[i];
                if (i === LayerUIControl.dragTo && i != layerIndex) {
                    layer
                        .addClass("touch")
                        .addClass("drag-over")
                        .swapIcon(_this.iconElement.data);
                }
                else {
                    layer
                        .removeClass("touch")
                        .removeClass("drag-over")
                        .swapIcon();
                }
            }
        };
        grip.container.ontouchend = function (e) {
            _this.trigger.side.moveLayer(_this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            _this.trigger.side.select(_this.trigger);
            _this.removeClass("selected");
            _this.removeClass("touch");
            _this.removeClass("source");
            _this.removeClass("drag-over");
            for (var i = 0; i < _this.parent.children.length; i++) {
                _this.parent.children[i]
                    .removeClass("touch")
                    .removeClass("drag-over");
            }
        };
        _this.container.ontouchcancel = function (e) {
            console.log("ontouchcancel", _this.trigger.getLayerIndex());
            _this.removeClass("touch")
                .removeClass("drag-over");
        };
        _this.container.ondragstart = function (e) {
            LayerUIControl.dragSource = _this;
            _this.addClass("source");
        };
        _this.container.ondragover = function (e) {
            e.preventDefault();
            LayerUIControl.dragTo = _this.trigger.getLayerIndex();
            _this
                .addClass("drag-over")
                .swapIcon(LayerUIControl.dragSource.iconElement.data);
        };
        _this.container.ondragleave = function (e) {
            _this
                .removeClass("drag-over")
                .removeClass("source")
                .swapIcon();
        };
        _this.container.ondragend = function (e) {
            _this.trigger.side.moveLayer(_this.trigger.getLayerIndex(), LayerUIControl.dragTo);
            _this.trigger.side.select(_this.trigger);
        };
        _this.iconElement = document.createElement("object");
        _this.iconContainerElement.className = "icon-frame";
        _this.container.appendChild(_this.iconContainerElement);
        _this.iconContainerElement.appendChild(_this.iconElement);
        _this.append(new Spacer(), new ToggleButton(function () { return element.toggleVisibility(); }, function () { return element.isVisible(); }, Icon.EYE, Icon.EYE_SLASH), new Spacer(), new ToggleButton(function () { return element.toggleLock(); }, function () { return element.isLocked(); }, Icon.LOCK, Icon.UNLOCK_ALT), new Spacer(), new Button(function () { return _this.c.duplicate(); }, Icon.CLONE), new Spacer(), new Button(function () { return element.remove(); }, Icon.TRASH), new Spacer(), grip);
        _this.update();
        return _this;
    }
    LayerUIControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " layer";
    };
    LayerUIControl.prototype.select = function () {
        this.addClass("select");
    };
    LayerUIControl.prototype.deselect = function () {
        this.removeClass("select");
    };
    LayerUIControl.prototype.swapIcon = function (src) {
        if (!src && this.cachedIcon) {
            this.iconElement.data = this.cachedIcon;
            this.cachedIcon = null;
        }
        else if (src && !this.cachedIcon) {
            this.cachedIcon = this.iconElement.data;
            this.iconElement.data = src;
        }
    };
    LayerUIControl.prototype.traverseLayerIndex = function (element) {
        if (element.classList && element.classList.contains("layer")) {
            for (var i = 0; i < element.parentElement.childNodes.length; i++) {
                if (element.parentElement.childNodes[i] === element) {
                    return i;
                }
            }
        }
    };
    LayerUIControl.prototype.update = function () {
        if (this.updateLocked) {
            this.updateQueued = true;
            return;
        }
        this.updateLocked = true;
        this.removeClass("drag-over");
        var maxSize = Math.max(this.trigger.object.width * this.trigger.object.scaleX, this.trigger.object.height * this.trigger.object.scaleY);
        if (this.trigger.isVisible()) {
            this.getIcon(maxSize);
        }
        else if (this.iconElement.data) {
        }
        else {
            this.trigger.show();
            this.getIcon(maxSize);
            this.trigger.hide();
        }
        if (this.trigger.isSelected()) {
            this.addClass("selected");
        }
        else {
            this.removeClass("selected");
        }
        var that = this;
        setTimeout(function () {
            that.updateLocked = false;
        }, 200);
    };
    LayerUIControl.prototype.getIcon = function (maxSize) {
        this.getPngIcon(maxSize);
    };
    LayerUIControl.prototype.getPngIcon = function (maxSize) {
        var multiplier = LayerUIControl.iconSize / maxSize;
        var options = {
            format: "png",
            multiplier: multiplier * 4
        };
        var src = this.trigger.object.toDataURL(options).toString();
        this.iconElement.data = src;
    };
    LayerUIControl.prototype.getSvgIcon = function () {
        var _this = this;
        var defs;
        if (this.trigger.isText()) {
            var fontFamily = this.trigger.getFontFamily();
            defs =
                '<defs>' +
                    '   <style type="text/css">@import url(\'' + '/catalog/view/theme/pechatphoto/stylesheet/custom-fonts.css\');</style>' +
                    '</defs>';
        }
        var w = this.trigger.object.width * this.trigger.object.scaleX;
        var h = this.trigger.object.height * this.trigger.object.scaleY;
        this.iconCanvas.clear();
        this.iconCanvas.setWidth(w);
        this.iconCanvas.setHeight(h);
        this.trigger.object.clone(function (o) {
            _this.iconCanvas.add(o);
            o.left = w / 2;
            o.top = h / 2;
            var svg = _this.iconCanvas.toSVG({ width: LayerUIControl.iconSize, height: LayerUIControl.iconSize });
            svg = svg.replace(/<defs>[\s\S.]+<\/defs>/m, defs);
            var data = 'data:image/svg+xml;charset=utf-8,' + svg;
            if (_this.iconElement.data.length != data.length) {
                console.log("data set");
                _this.iconElement.data = data;
            }
        });
    };
    LayerUIControl.prototype.updateVisibility = function () {
        this.update();
    };
    LayerUIControl.iconSize = 38;
    LayerUIControl.dragTo = 0;
    LayerUIControl.touchStart = 0;
    return LayerUIControl;
}(TriggeredUIControl));
var LayersPanelUIControl = (function (_super) {
    __extends(LayersPanelUIControl, _super);
    function LayersPanelUIControl() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.update();
        return _this;
    }
    LayersPanelUIControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " layers-panel";
    };
    LayersPanelUIControl.prototype.update = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force || this.children.length - 1 != this.c.sides.length) {
            this.clear();
            for (var i = 0; i < this.trigger.sides.length; i++) {
                var side = this.trigger.sides[i];
                this.append(new LayersUIControl(side));
            }
            this.append(new Row(new ConditionalButton(function () { return Constructor.instance.getActiveSide().clear(); }, function () { return !Constructor.instance.getActiveSide() || !_this.c.getActiveSide().isEmpty(); }, null, "Clear Side")));
        }
    };
    LayersPanelUIControl.prototype.updateVisibility = function () {
        this.trigger.is2D() ? this.show() : this.hide();
    };
    LayersPanelUIControl.prototype.show = function () {
        _super.prototype.show.call(this);
        this.update();
    };
    return LayersPanelUIControl;
}(TriggeredUIControl));
var LayersUIControl = (function (_super) {
    __extends(LayersUIControl, _super);
    function LayersUIControl(side) {
        var _this = _super.call(this, side) || this;
        _this.isUpdating = false;
        _this.update();
        return _this;
    }
    LayersUIControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " layers vertical";
    };
    LayersUIControl.prototype.update = function () {
        if (!this.isVisible() || this.isUpdating) {
            return;
        }
        var layerControls = this.children;
        var layers = this.trigger.getLayers();
        if (layers.length != layerControls.length) {
            this.repopulate();
            return;
        }
        for (var i = 0; i < layers.length; i++) {
            var controlLayer = layerControls[i] || null;
            var sideLayer = layers[i];
            if (!controlLayer || controlLayer.trigger.hash != sideLayer.hash) {
                this.repopulate();
                return;
            }
        }
        this.updateVisibility();
    };
    LayersUIControl.prototype.getLayerControls = function () {
        var layerControls = [];
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof LayerUIControl) {
                layerControls.push(this.children[i]);
            }
        }
        return layerControls;
    };
    LayersUIControl.prototype.clear = function () {
        this.getElement().innerHTML = "";
    };
    LayersUIControl.prototype.repopulate = function () {
        this.isUpdating = true;
        var scroll;
        try {
            scroll = this.container.parentElement.parentElement.scrollTop;
        }
        catch (e) {
        }
        this.clear();
        this.children = [];
        var layers = this.trigger.getLayers();
        for (var i = 0; i < layers.length; i++) {
            this.append(new LayerUIControl(layers[i], this));
        }
        if (scroll) {
            this.container.parentElement.parentElement.scrollTop = scroll;
        }
        this.updateVisibility();
        this.isUpdating = false;
    };
    LayersUIControl.prototype.updateVisibility = function () {
        if (this.isVisible() != this.trigger.isVisible()) {
            if (!this.isVisible()) {
                this.show();
            }
            else {
                this.hide();
            }
        }
    };
    return LayersUIControl;
}(TriggeredUIControl));
var NewElementPanel = (function (_super) {
    __extends(NewElementPanel, _super);
    function NewElementPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.imageContainer = new FlowControl(2, true);
        var form = document.createElement("form");
        var input = document.createElement("input");
        var text = document.createElement("input");
        text.type = 'text';
        text.name = 'constructor';
        text.value = '1';
        input.type = "file";
        input.name = "file";
        input.accept = "image/jpeg, image/png, .heic";
        input.size = 24;
        input.hidden = true;
        form.append(input);
        form.append(text);
        form.style.display = 'none';
        input.onchange = function (e) {
            var target = e.target || window.event.srcElement;
            var files = target.files;
            if (FileReader && files && files.length) {
                if (files.length > 1) {
                    new Popover("Error", "Please select one file of Jpeg or Png or Heic type!");
                    return;
                }
                else {
                    if (!files[0].name.toLowerCase().endsWith('.jpg')
                        && !files[0].name.toLowerCase().endsWith('.jpeg')
                        && !files[0].name.toLowerCase().endsWith('.png')
                        && !files[0].name.toLowerCase().endsWith('.heic')) {
                        new Popover("Error", "Please select Jpeg or Png or Heic image!");
                        return;
                    }
                }
                var reader = new FileReader();
                reader.onload = function () { return __awaiter(_this, void 0, void 0, function () {
                    var image, src, data, formData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                image = null;
                                if (!files[0].name.toLowerCase().endsWith('.heic')) return [3, 2];
                                Constructor.instance.spinner.show();
                                return [4, this.convertHeicToJpg(files[0])];
                            case 1:
                                src = _a.sent();
                                return [3, 3];
                            case 2:
                                src = reader.result;
                                _a.label = 3;
                            case 3:
                                image = Constructor.instance.addFrame(src);
                                Constructor.instance.spinner.hide();
                                data = new URLSearchParams();
                                formData = new FormData(form);
                                formData.forEach(function (value, key) {
                                    data.append(key, value);
                                });
                                fetch('index.php?route=tool/upload', {
                                    method: 'POST',
                                    body: formData,
                                    headers: {
                                        accept: 'application/json, text/javascript, */*; q=0.01'
                                    }
                                }).then(function (response) {
                                    response.json().then(function (json) {
                                        var width = image.object.width;
                                        var height = image.object.height;
                                        var imagePath = (constructorConfiguration.imagesPath || 'image/') + json.files[0].path;
                                        image.object.setSrc(imagePath, function () {
                                            image.object.width = width;
                                            image.object.height = height;
                                            image.side.canvas.renderAll();
                                            console.log('image src replaced from local to:', imagePath);
                                            image.side.saveState();
                                        });
                                    });
                                });
                                return [2];
                        }
                    });
                }); };
                reader.readAsDataURL(files[0]);
            }
        };
        _this.container.appendChild(form);
        _this.append(new Row(new Button(function () { return _this.openFileChooser(input); }, Icon.IMAGE, "Image")));
        _this.append(new Row(new Button(function () { return _this.c.addText(LocalizedStrings.translate('Text')); }, Icon.FONT, 'Add Text')));
        _this.addButton("Circle", ElementType.CIRCLE, Icon.CIRCLE);
        _this.addButton("Rectangle", ElementType.RECTANGLE, Icon.SQUARE);
        _this.addButton("Triangle", ElementType.TRIANGLE, Icon.PLAY);
        _this.append(new Row(new ConditionalButton(function () { return _this.c.getActiveSide().clear(); }, function () { return !_this.c.getActiveSide() || !_this.c.getActiveSide().isEmpty(); }, null, "Clear Side")));
        _this.append(_this.imageContainer);
        _this.update();
        return _this;
    }
    NewElementPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " vertical";
    };
    NewElementPanel.prototype.openFileChooser = function (input) {
        if (constructorConfiguration.onFileChooserRequest) {
            constructorConfiguration.onFileChooserRequest.call(this);
        }
        else {
            input.click();
        }
    };
    NewElementPanel.prototype.show = function () {
        _super.prototype.show.call(this);
        this.update();
    };
    NewElementPanel.prototype.updateVisibility = function () {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    };
    NewElementPanel.prototype.addButton = function (label, type, icon) {
        var _this = this;
        this.append(new Row(new Button(function () { return _this.c.addElement(type); }, icon, label)));
    };
    NewElementPanel.prototype.convertHeicToJpg = function (blob) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            var blobJpg, reader_1, _a, _b, error_1;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _c.trys.push([0, 4, , 5]);
                                        return [4, heic2any({ blob: blob, toType: "image/jpg" })];
                                    case 1:
                                        blobJpg = _c.sent();
                                        reader_1 = new FileReader();
                                        reader_1.readAsDataURL(blobJpg);
                                        _a = reader_1;
                                        return [4, function () {
                                                resolve(reader_1.result);
                                            }];
                                    case 2:
                                        _a.onloadend = _c.sent();
                                        _b = reader_1;
                                        return [4, function (error) {
                                                new Popover("Error", "Failed to upload HEIC file!");
                                                console.log(error);
                                            }];
                                    case 3:
                                        _b.onerror = _c.sent();
                                        return [3, 5];
                                    case 4:
                                        error_1 = _c.sent();
                                        new Popover("Error", "Failed to upload HEIC file!");
                                        console.log(error_1);
                                        return [3, 5];
                                    case 5: return [2];
                                }
                            });
                        });
                    })];
            });
        });
    };
    return NewElementPanel;
}(TriggeredUIControl));
var OptionsPanel = (function (_super) {
    __extends(OptionsPanel, _super);
    function OptionsPanel() {
        return _super.call(this, Constructor.instance) || this;
    }
    OptionsPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " options-panel vertical";
    };
    OptionsPanel.prototype.update = function () {
    };
    return OptionsPanel;
}(TriggeredUIControl));
var OrderPanel = (function (_super) {
    __extends(OrderPanel, _super);
    function OrderPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.append(new Row(new Spacer(), new ConditionalButton(function () { return Constructor.instance.getSelection().resetFilters(); }, function () { return Constructor.instance.getSelection() && Constructor.instance.getSelection().hasFilters(); }, "Reset Filters"), new Spacer()));
        _this.update();
        return _this;
    }
    OrderPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " order vertical";
    };
    return OrderPanel;
}(TriggeredUIControl));
var SamplesPanel = (function (_super) {
    __extends(SamplesPanel, _super);
    function SamplesPanel() {
        var _this = _super.call(this, ConstructorUI.instance.order) || this;
        _this.modelId = null;
        _this.samples = new LabelControl()
            .addClass('samples')
            .addClass('vertical');
        _this.title = new LabelControl("Real Product Photos").addClass('title');
        _this.update();
        return _this;
    }
    SamplesPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " samples-panel vertical";
    };
    SamplesPanel.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateSamples();
        if (!this.trigger.model || this.modelId == this.trigger.model.constructor_model_id) {
            return;
        }
        this.modelId = this.trigger.model.constructor_model_id;
        var model = this.trigger.model;
        var options = ConstructorUI.instance.options;
        this.clear();
        this.append(new Row(new LabelControl(options.name).addClass('title')), new Row(new LabelControl(options.description)), new Row(new LabelControl(model.name).addClass('title')), new Row(new ImageControl(model.thumb)), new Row(new LabelControl(model.description)), new Row(new Spacer()), new Row(this.title), this.samples);
    };
    SamplesPanel.prototype.updateSamples = function () {
        if (this.samples.container.innerHTML != this.trigger.samplesHtml) {
            this.samples.setValue(this.trigger.samplesHtml);
        }
        if (this.samples.isEmpty()) {
            this.samples.hide();
            this.title.hide();
        }
        else {
            this.samples.show();
            this.title.show();
        }
    };
    return SamplesPanel;
}(TriggeredUIControl));
var SelectionPanel = (function (_super) {
    __extends(SelectionPanel, _super);
    function SelectionPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.update();
        return _this;
    }
    SelectionPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " selection-panel vertical";
    };
    SelectionPanel.prototype.show = function () {
        _super.prototype.show.call(this);
        this.update();
    };
    SelectionPanel.prototype.update = function () {
        var _this = this;
        this.clear();
        if (!this.c.getSelection()) {
            return;
        }
        this.append(new SelectRangePropertyControl("Transparency", function (value) { return _this.c.getSelection().setAlpha(value / 100); }, function () { return _this.c.getSelection().getAlpha() * 100; }, 10, 100, 10), new SelectRangePropertyControl("Shadow", function (value) { return _this.c.getSelection().setShadow(value / 10); }, function () { return _this.c.getSelection().getShadow() * 10; }));
        if (!this.c.hasImageSelection()) {
            this.append(new SelectionColorControl("Color", function (value) { return _this.c.getSelection().setColor(value); }, function () { return _this.c.getSelection().getColor().toHex(); }));
        }
        if (this.c.hasTextSelection()) {
            this.append(new Row(new LabelControl("Text"), new Spacer(), new TextInputControl(function (value) { return _this.c.getSelection().setText(value); }, function () { return _this.c.getSelection().getText(); })), new SelectRangePropertyControl("Font Size", function (value) { return _this.c.getSelection().setFontSize(value); }, function () { return _this.c.getSelection().getFontSize(); }, 32, 124, 8), new SelectRangePropertyControl("Letter Spacing", function (value) { return _this.c.getSelection().setLetterSpacing(value); }, function () { return _this.c.getSelection().getLetterSpacing(); }, -200, 2000, 50), new SelectRangePropertyControl("Line Height", function (value) { return _this.c.getSelection().setLineHeight(value); }, function () { return _this.c.getSelection().getLineHeight(); }, 0.5, 3, 0.25), new Row(new LabelControl("Font Family"), new Spacer(), new Button(function () { return ConstructorUI.instance.sidePanel.fontFamilyPanel.show(); }, null, this.c.getSelection().getFontFamily())), new Row(new LabelControl("Font"), new Spacer(), this.textPropertyToggleButton("Bold"), this.textPropertyToggleButton("Italic"), this.textPropertyToggleButton("Underline"), this.textPropertyToggleButton("Linethrough")), new Row(new LabelControl("Alignment"), new Spacer(), this.textAlignmentButton(TextAlignment.LEFT, Icon.ALIGN_LEFT), this.textAlignmentButton(TextAlignment.CENTER, Icon.ALIGN_CENTER), this.textAlignmentButton(TextAlignment.RIGHT, Icon.ALIGN_RIGHT), this.textAlignmentButton(TextAlignment.JUSTIFY, Icon.ALIGN_JUSTIFY)));
        }
    };
    SelectionPanel.prototype.updateVisibility = function () {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    };
    SelectionPanel.prototype.textAlignmentButton = function (alignment, icon) {
        var _this = this;
        return new ToggleButton(function () { return _this.c.getSelection().setTextAlignment(alignment); }, function () { return _this.c.hasTextSelection() && _this.c.getSelection().getTextAlignment() == alignment; }, icon);
    };
    SelectionPanel.prototype.textPropertyToggleButton = function (property) {
        var _this = this;
        return new ToggleButton(function () {
            Constructor.instance.getSelection()["toggle" + property]();
            _this.update();
        }, function () { return Constructor.instance.getSelection()["is" + property](); }, Icon[property.toUpperCase()]);
    };
    return SelectionPanel;
}(TriggeredUIControl));
var SidePanel = (function (_super) {
    __extends(SidePanel, _super);
    function SidePanel() {
        var _this = _super.call(this) || this;
        _this.modelsPanel = new ModelsPanel();
        _this.layersPanel = new LayersPanelUIControl();
        _this.stickersPanel = new StickersPanel();
        _this.selectionPanel = new SelectionPanel();
        _this.newElementPanel = new NewElementPanel();
        _this.framesPanel = new FramesPanel();
        _this.galleryPanel = new GalleryPanel();
        _this.fontFamilyPanel = new FontFamilyPanel();
        _this.samplesPanel = new SamplesPanel();
        _this.optionsPanel = new OptionsPanel();
        _this.filtersPanel = new FiltersPanel();
        _this.sharePanel = new ExportPanel();
        _this.append(_this.newElementPanel, _this.framesPanel, _this.galleryPanel, _this.layersPanel, _this.stickersPanel, _this.selectionPanel, _this.fontFamilyPanel, _this.modelsPanel, _this.samplesPanel, _this.optionsPanel, _this.filtersPanel, _this.sharePanel, new Container()
            .addClass('sidepanel-freespace')
            .addClass('mobile'));
        _this.container.onclick = function (e) {
            if (Constructor.instance && e.target === _this.container) {
                Constructor.instance.getActiveSide().deselect();
            }
        };
        return _this;
    }
    SidePanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " sidepanel";
    };
    return SidePanel;
}(ToolBar));
var StickersPanel = (function (_super) {
    __extends(StickersPanel, _super);
    function StickersPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.stickers = {};
        _this.loadCategories();
        _this.update();
        var config = {
            rootMargin: '0px 0px 50px 0px',
            threshold: 0
        };
        _this.observer = new IntersectionObserver(function (entries, self) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    _this.loadLazyImage(entry.target);
                    self.unobserve(entry.target);
                }
            });
        }, config);
        return _this;
    }
    StickersPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " stickers-panel vertical";
    };
    StickersPanel.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    StickersPanel.prototype.loadCategories = function () {
        var _this = this;
        this.append(new Row(new Spacer(), new LabelControl("Stickers").addClass('bold'), new Spacer()));
        if (constructorConfiguration.stickerCategories) {
            var categories_1 = [];
            for (var i = 0; i < constructorConfiguration.stickerCategories.length; i++) {
                var category = constructorConfiguration.stickerCategories[i];
                categories_1.push({
                    value: category.id,
                    text: category.name,
                });
            }
            var flow = new FlowControl(2, true);
            flow.append(new SelectControl(function (value) {
                _this.loadStickers(+value);
            }, function () { return +categories_1[0].value; }, null, null, null, function () { return categories_1; }));
            this.append(flow);
            this.loadStickers(+categories_1[0].value);
        }
    };
    StickersPanel.prototype.loadStickers = function (category) {
        var _this = this;
        this.category = +category;
        if (!this.stickers[category]) {
            fetch("/index.php?route=constructor/constructor/getCliparts&category=" + category, {
                method: 'GET',
                headers: {
                    accept: 'application/json, text/javascript, */*; q=0.01'
                }
            }).then(function (response) {
                response.json().then(function (json) {
                    var flow = new FlowControl(2, true);
                    _this.removeChild(2);
                    _this.stickers[category] = json.map(function (item) { return new StickerControl(item); });
                    _this.stickers[category].map(function (sticker) { return flow.append(sticker); });
                    _this.append(flow);
                    var imgs = document.querySelectorAll('[data-src]');
                    imgs.forEach(function (img) {
                        _this.observer.observe(img);
                    });
                });
            }).catch(function (error) {
                console.log(error);
                new Popover("Error");
            });
        }
        else {
            var flow_1 = new FlowControl(2, true);
            this.removeChild(2);
            this.stickers[category].map(function (sticker) { return flow_1.append(sticker); });
            this.append(flow_1);
        }
    };
    StickersPanel.prototype.loadLazyImage = function (image) {
        image.src = image.getAttribute("data-src");
        image.onload = function () {
            image.removeAttribute("data-src");
        };
    };
    StickersPanel.prototype.test = function () {
        var _this = this;
        var imgs = document.querySelectorAll('[data-src]');
        imgs.forEach(function (img) {
            _this.observer.observe(img);
        });
    };
    StickersPanel.prototype.showed = function () {
        _super.prototype.showed.call(this);
        this.update();
    };
    StickersPanel.prototype.updateVisibility = function () {
        this.trigger.getMode() == Mode.Mode2D && this.trigger.hasTextSelection()
            ? this.show()
            : this.hide();
    };
    return StickersPanel;
}(TriggeredUIControl));
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var OptionButton = (function (_super) {
    __extends(OptionButton, _super);
    function OptionButton(value, parent) {
        var _this = _super.call(this, function () { return _this.select(); }, function () { return ConstructorUI.instance.order.hasOption(value); }, Icon.CHECK_SQUARE, Icon.SQUARE, null, value.type == 'color' ? null : value.name, ConstructorUI.instance.order) || this;
        _this.tooltip(value.description);
        _this.parent = parent;
        _this.value = value;
        if (value.type == 'color') {
            _this.addClass('color');
        }
        _this.icon.setColor(value.constructor_value);
        _this.tooltip(value.name + " " + value.priceText);
        _this.enabledCheck = function () {
            if (_this.isSelected() || ConstructorUI.instance.order.selectedOptions.length == 0) {
                return true;
            }
            var compatibleOptionIds = {};
            for (var i = 0; i < _this.value.option_s.length; i++) {
                var compatibleOptionId = _this.value.option_s[i].option_value_relation_id;
                compatibleOptionIds[compatibleOptionId] = true;
            }
            for (var j = 0; j < ConstructorUI.instance.order.selectedOptions.length; j++) {
                var selectedOption = ConstructorUI.instance.order.selectedOptions[j];
                if (selectedOption.option_id != _this.value.option_id) {
                    if (!compatibleOptionIds[selectedOption.id]) {
                        return false;
                    }
                }
                else if (selectedOption.id != _this.value.id) {
                    return false;
                }
            }
            return true;
        };
        return _this;
    }
    OptionButton.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " ";
    };
    OptionButton.prototype.select = function () {
        var _a;
        var fillsArray;
        var order = ConstructorUI.instance.order;
        if (this.value.zalivka) {
            fillsArray = this.value.zalivka.split(',').map(function (s) { return parseInt(s); });
            (_a = Constructor.instance.preview).setFills.apply(_a, __spreadArrays([null], fillsArray));
        }
        if (order.hasOption(this.value)) {
            ConstructorUI.instance.order.removeSelectedOption(this.value);
            if (this.value.zalivka) {
                Constructor.instance.preview.clearFills();
            }
            return;
        }
        ConstructorUI.instance.order.addSelectedOption(this.value);
        if (this.value.zalivka) {
            this.setFillsAsync(fillsArray);
        }
    };
    OptionButton.prototype.setFillsAsync = function (fillsArray) {
        var _a;
        var _this = this;
        if (Constructor.instance.preview.isLoaded) {
            (_a = Constructor.instance.preview).setFills.apply(_a, __spreadArrays([this.value.constructor_value], fillsArray));
        }
        else {
            setTimeout(function () { return _this.setFillsAsync(fillsArray); }, 100);
        }
    };
    OptionButton.prototype.isSelected = function () {
        return ConstructorUI.instance.order.hasOption(this.value);
    };
    return OptionButton;
}(ToggleButton));
var OptionGroupPanel = (function (_super) {
    __extends(OptionGroupPanel, _super);
    function OptionGroupPanel(option) {
        var _this = _super.call(this) || this;
        _this.values = [];
        _this.flow = new FlowControl();
        _this.option = option;
        _this.append(new Row(new Spacer(), new LabelControl(option.name).addClass("bold"), new Spacer()));
        _this.append(_this.flow);
        return _this;
    }
    OptionGroupPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " options-group vertical";
    };
    OptionGroupPanel.prototype.addOption = function (option) {
        var optionButton = new OptionButton(option, this);
        this.values.push(optionButton);
        this.flow.append(optionButton);
        return optionButton;
    };
    return OptionGroupPanel;
}(UIControl));
var Order = (function (_super) {
    __extends(Order, _super);
    function Order() {
        var _this = _super.call(this) || this;
        _this.selectedOptions = [];
        _this.quantity = 1;
        _this.discountPricePerItem = 0;
        _this.samplesHtml = '';
        _this.changed();
        Constructor.onUpdate(function () { return ConstructorUI.instance.order.changed(); });
        return _this;
    }
    Order.prototype.hasDiscount = function () {
        return this.discountPricePerItem && this.discountPricePerItem < this.getPricePerItem();
    };
    Order.prototype.getDiscountPricePerItem = function () {
        return this.discountPricePerItem;
    };
    Order.prototype.getPricePerItem = function () {
        var price = this.model && this.model.price ? parseInt(this.model.price) : 0;
        price += this.getOptionsPrice();
        price += this.getSidePrice();
        return price;
    };
    Order.prototype.getTotalCostWithoutDiscount = function () {
        return this.getPricePerItem() * this.quantity;
    };
    Order.prototype.getTotalCostWithDiscount = function () {
        return this.hasDiscount()
            ? this.discountPricePerItem * this.quantity
            : this.getTotalCostWithoutDiscount();
    };
    Order.prototype.getTotalDiscount = function () {
        return this.hasDiscount()
            ? this.getTotalCostWithoutDiscount() - this.getTotalCostWithDiscount()
            : 0;
    };
    Order.prototype.setModel = function (model) {
        this.model = model;
        this.updateSamples();
        this.changed();
    };
    Order.prototype.setQuantity = function (value) {
        this.quantity = value;
        this.updateDiscount();
        this.changed();
    };
    Order.prototype.incrementQuantity = function () {
        if (this.quantity < Order.max) {
            this.quantity++;
            this.changed();
            this.updateDiscount();
        }
    };
    Order.prototype.decrementQuantity = function () {
        this.quantity--;
        this.updateDiscount();
        this.changed();
    };
    Order.prototype.getQuantity = function () {
        return this.quantity;
    };
    Order.prototype.setSelectedOptions = function (value) {
        this.selectedOptions = value;
        this.changed();
    };
    Order.prototype.addSelectedOption = function (value) {
        if (value.type == 'color' && Constructor.instance.is2dEditorMode()) {
            Constructor.instance.sides.map(function (side) {
                side.setProductColor(value.constructor_value);
            });
        }
        for (var i = 0; i < this.selectedOptions.length; i++) {
            var selectedOption = this.selectedOptions[i];
            if (selectedOption.id == value.id) {
                return;
            }
            if (selectedOption.option_id == value.option_id) {
                this.removeSelectedOption(selectedOption);
            }
        }
        this.selectedOptions.push(value);
        this.changed();
    };
    Order.prototype.addSelectedOptionById = function (id) {
        for (var i = 0; i < this.model.constructor_model_option.length; i++) {
            var option = this.model.constructor_model_option[i];
            if (option.id == id) {
                this.addSelectedOption(option);
            }
        }
    };
    Order.prototype.removeSelectedOption = function (option) {
        if (option.type == 'color' && Constructor.instance.is2dEditorMode()) {
            Constructor.instance.getActiveSide().setProductColor(Constructor.instance.background);
            Constructor.instance.sides.map(function (side) {
                side.setProductColor(Constructor.instance.background);
            });
        }
        this.removeSelectedOptionId(option.id);
    };
    Order.prototype.removeSelectedOptionId = function (optionId) {
        for (var i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i].id === optionId) {
                this.selectedOptions.splice(i, 1);
                this.changed();
                return;
            }
        }
    };
    Order.prototype.hasColorOption = function () {
        for (var i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i].type == 'color') {
                return true;
            }
        }
        return false;
    };
    Order.prototype.hasOption = function (option) {
        return this.hasOptionId(option.id);
    };
    Order.prototype.hasOptionId = function (optionId) {
        for (var i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i].id === optionId) {
                return true;
            }
        }
        return false;
    };
    Order.prototype.hasGroupId = function (groupId) {
        for (var i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i].option_id === groupId) {
                return true;
            }
        }
        return false;
    };
    Order.prototype.isValid = function () {
        if (this.model.constructor_model_require) {
            var keys = Object.keys(this.model.constructor_model_require);
            main: for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var color = false;
                for (var i = 0; i < ConstructorUI.instance.options.options.length; i++) {
                    var option = ConstructorUI.instance.options.options[i];
                    if (option.option_id == key) {
                        if (option.type == 'color' && this.hasColorOption()) {
                            color = true;
                            continue main;
                        }
                    }
                }
                var value = this.model.constructor_model_require[key];
                if (parseInt(value) != 0 && !this.hasGroupId(key)) {
                    new Popover('Option Required', 'Please select required options!');
                    ConstructorUI.instance.sidePanel.optionsPanel.show();
                    return false;
                }
            }
        }
        return true;
    };
    Order.prototype.updateSamples = function () {
        var _this = this;
        fetch('index.php?route=constructor/constructor/get_add_img', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' }),
            body: Utils.toUrlParameters({
                constructor_model_id: this.model.constructor_model_id
            })
        }).then(function (response) {
            response.text().then(function (html) {
                _this.samplesHtml = html;
                _this.changed();
            });
        });
    };
    Order.prototype.addToCart = function () {
        var _this = this;
        var c = Constructor.instance;
        var stateJson = c.getState();
        var preview = "";
        c.setActiveSide(0);
        var holst_1 = c.getActiveSide().exportImage(Constructor.settings.printWidth);
        c.setActiveSide(1);
        var holst_2 = c.getActiveSide().exportImage(Constructor.settings.printWidth);
        c.setActiveSide(2);
        var holst_3 = c.getActiveSide().exportImage(Constructor.settings.printWidth);
        c.setActiveSide(3);
        var holst_4 = c.getActiveSide().exportImage(Constructor.settings.printWidth);
        var optionsEncoded = "";
        var selectedOptionsIds = [];
        var selectedSides = [];
        this.selectedOptions.forEach(function (option) {
            optionsEncoded += "+++++" + option.id;
            selectedOptionsIds.push(parseInt(option.id));
        });
        for (var i = 0; i < Constructor.instance.sides.length; i++) {
            var side = Constructor.instance.sides[i];
            if (!side.isEmpty()) {
                selectedSides.push(i);
            }
        }
        var body = Utils.toUrlParameters({
            json: stateJson,
            price: this.getDiscountPricePerItem(),
            category: this.model.category_id,
            constructor_model_id: this.model.constructor_model_id,
            text_type: this.model.name,
            holst_1: holst_1,
            holst_2: holst_2,
            holst_3: holst_3,
            holst_4: holst_4,
            preview: preview,
            option: optionsEncoded,
            selectedOptions: JSON.stringify(selectedOptionsIds),
            selectedSides: JSON.stringify(selectedSides),
            quantity: this.quantity
        });
        this.updateDiscount();
        var headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded' });
        var post = 'POST';
        Constructor.instance.spinner.show();
        fetch('index.php?route=constructor/constructor/add_product_by_constructor', {
            method: post,
            headers: headers,
            body: body,
        }).then(function (response) {
            response.json().then(function (productId) {
                console.log("productId", productId);
                fetch('index.php?route=constructor/constructor/rendering', {
                    method: post,
                    headers: headers,
                    body: Utils.toUrlParameters({
                        product_id: productId,
                        preview: Constructor.instance.sides[0].generatePreview(Constants.PREVIEW_SIZE)
                    })
                });
                fetch('index.php?route=checkout/cart/add', {
                    method: post,
                    headers: headers,
                    body: Utils.toUrlParameters({
                        product_id: productId,
                        quantity: _this.quantity
                    })
                }).then(function (response) {
                    response.json().then(function (result) {
                        Constructor.instance.spinner.hide();
                        console.log(result);
                        var url = result.success.match(/(<a\s.+?\/a>)/)[1];
                        url += '<br>' + result.success.match(/.+(<a\s.+\/a>)/)[1];
                        new Popover('Product added to cart', url).addClass('popover-added');
                    });
                });
            });
        });
    };
    Order.prototype.shareLink = function () {
        Constructor.instance.spinner.show();
        var selectedOptionsIds = [];
        var selectedSides = [];
        var optionsEncoded = "";
        this.selectedOptions.forEach(function (option) {
            optionsEncoded += "+++++" + option.id;
        });
        this.selectedOptions.forEach(function (option) {
            selectedOptionsIds.push(parseInt(option.id));
        });
        for (var i = 0; i < Constructor.instance.sides.length; i++) {
            var side = Constructor.instance.sides[i];
            if (!side.isEmpty()) {
                selectedSides.push(i);
            }
        }
        var headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded' });
        var post = 'POST';
        fetch('index.php?route=constructor/constructor/get_url_post', {
            method: post,
            headers: headers,
            body: Utils.toUrlParameters({
                data_u: btoa(Constructor.instance.getState()),
                category: this.model.category_id,
                text_type: this.model.name,
                quantity: this.quantity,
                option: optionsEncoded,
                selectedOptions: JSON.stringify(selectedOptionsIds),
                selectedSides: JSON.stringify(selectedSides),
            })
        }).then(function (response) {
            Constructor.instance.spinner.hide();
            response.json().then(function (link) {
                console.log(link);
                var url = 'https://' + window.location.hostname + '/create_constructor?url=' + link;
                new CopyToClipboardPopover('Share as Link', url).show();
            });
        });
    };
    Order.prototype.getOptionsPrice = function () {
        var price = 0;
        this.selectedOptions.forEach(function (option) {
            price += (parseInt(option.price) || 0);
        });
        return price;
    };
    Order.prototype.getSidePrice = function () {
        var price = 0;
        Constructor.instance.sides.forEach(function (side) {
            price += side.getTotalPrice();
        });
        return price;
    };
    Order.prototype.updateDiscount = function () {
        var _this = this;
        var body = Utils.toUrlParameters({
            constructor_model_id: this.model.constructor_model_id,
            quantity: this.quantity,
            priceWithOption: -1,
            priceOption: this.getOptionsPrice(),
            priceSide: this.getSidePrice(),
        });
        fetch('index.php?route=constructor/constructor/calcPriceAjax', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/x-www-form-urlencoded' }),
            body: body
        }).then(function (response) {
            response.text().then(function (text) {
                var discountPrice = parseInt(text);
                if (_this.discountPricePerItem != discountPrice) {
                    _this.discountPricePerItem = discountPrice;
                    _this.changed();
                }
            });
        });
    };
    Order.max = 999;
    return Order;
}(Trigger));
var BottomBar = (function (_super) {
    __extends(BottomBar, _super);
    function BottomBar() {
        var _this = _super.call(this) || this;
        _this.update();
        return _this;
    }
    BottomBar.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " bottom";
    };
    BottomBar.prototype.update = function () {
        var _this = this;
        this.clear();
        var previewButtons = [];
        if (!Constructor.instance.is2dEditorMode()) {
            previewButtons.push(new ToggleButton(function () {
                if (_this.c.is2D()) {
                    ConstructorUI.instance.show3D();
                }
                else {
                    ConstructorUI.instance.show2D();
                }
                setTimeout(function () { return window.dispatchEvent(new Event('resize')); }, 100);
            }, function () { return _this.c.is3D(); }, Icon.DICE_D6, null, null, null).addClass('mobile'));
            previewButtons.push(new Button(function () {
                ConstructorUI.instance.show3D();
                setTimeout(function () { return window.dispatchEvent(new Event('resize')); }, 100);
            }, Icon.DICE_D6, Utils.isCompact() ? null : "3D-Preview").showWhen(Constructor.instance, function () { return _this.c.is2D(); })
                .addClass('desktop')
                .addClass('preview-3d'));
            previewButtons.push(new Button(function () {
                ConstructorUI.instance.show2D();
                setTimeout(function () { return window.dispatchEvent(new Event('resize')); }, 100);
            }, Icon.DICE_D6, Utils.isCompact() ? null : "Exit 3D-Preview").showWhen(Constructor.instance, function () { return _this.c.is3D(); })
                .addClass('desktop')
                .addClass('preview-3d')
                .addClass('preview-3d-exit'));
        }
        this.append.apply(this, __spreadArrays([new Button(function () {
                ConstructorUI.instance.toggleClass("collapsed");
                ConstructorUI.instance.sidePanel.toggleVisibility();
                ConstructorUI.instance.sideBar.buttons.forEach(function (button) { return button.toggleVisibility(); });
                window.dispatchEvent(new Event('resize'));
            }, Icon.BARS).tooltip('Toggle Sidebar'), new Spacer(), new Button(function () {
                _this.c.zoomIn();
            }, Icon.SEARCH_PLUS).tooltip('Zoom In'),
            new Button(function () {
                _this.c.zoomOut();
            }, Icon.SEARCH_MINUS).tooltip('Zoom Out'),
            new ConditionalButton(function () { return _this.c.zoomToFit(); }, function () { return _this.c.is2D(); }, Icon.SEARCH).tooltip('Zoom to Fit')], previewButtons, [new Spacer(), Button.of(function () { return ConstructorUI.instance.addToCartPopover.show(); }, new TriggeredLabelControl(ConstructorUI.instance.order, function () { return ConstructorUI.instance.order.getPricePerItem(); }), new LabelControl('$'), new IconControl(Icon.CART_PLUS)).addClass('price-bottom')
                .addClass('desktop'),
            new TriggeredLabelControl(ConstructorUI.instance.order, function () { return ConstructorUI.instance.order.getPricePerItem() + _this.translate('$'); }).addClass('mobile').addClass('price-bottom'),
            new Button(function () { return ConstructorUI.instance.addToCartPopover.show(); }, Icon.CART_PLUS).addClass('mobile').tooltip('Add to Cart')]));
    };
    return BottomBar;
}(ToolBar));
var Pager = (function (_super) {
    __extends(Pager, _super);
    function Pager() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.index = 0;
        _this.sideNames = [];
        _this.update();
        return _this;
    }
    Pager.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " toolbar pager";
    };
    Pager.prototype.update = function () {
        var _this = this;
        if (Constructor.instance.sides.length < 2) {
            this.clear();
            return;
        }
        var sideNames = [];
        for (var i = 0; i < Constructor.instance.sides.length; i++) {
            sideNames.push(Constructor.instance.sides[i].name + ("(" + Constructor.instance.sides[i].price + ")"));
        }
        if (this.sideNames == sideNames) {
            return;
        }
        this.clear();
        this.append(new Spacer());
        if (Constructor.instance.is2D() && Constructor.instance.sides.length > 1) {
            var _loop_2 = function (i) {
                var side = this_2.c.sides[i];
                this_2.append(new ToggleButton(function () {
                    Constructor.instance.setActiveSide(i);
                    _this.index = i;
                }, function () {
                    return Constructor.instance.getActiveSide().getIndex() === i;
                }, null, null, null, side.getName() + ((+side.price > 0) ? "(" + (side.price + LocalizedStrings.translate('$')) + ")" : '')));
            };
            var this_2 = this;
            for (var i = 0; i < this.c.sides.length; i++) {
                _loop_2(i);
            }
        }
        this.append(new Spacer());
    };
    return Pager;
}(TriggeredUIControl));
var VerticalToolBarUIControl = (function (_super) {
    __extends(VerticalToolBarUIControl, _super);
    function VerticalToolBarUIControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VerticalToolBarUIControl.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " vertical";
    };
    return VerticalToolBarUIControl;
}(ToolBar));
var SideBar = (function (_super) {
    __extends(SideBar, _super);
    function SideBar() {
        var _this = _super.call(this) || this;
        _this.buttons = [];
        var panel = ConstructorUI.instance.sidePanel;
        _this.append(_this.createSwitch(panel.modelsPanel, Icon.MUG_HOT).tooltip('Product Types'), _this.createSwitch(panel.newElementPanel, Icon.SHAPES, function () { return Constructor.instance.is2D(); }).tooltip('Page'), _this.createSwitch(panel.framesPanel, Icon.TH_LARGE, function () { return Constructor.instance.is2D(); }).tooltip('Frames'), _this.createSwitch(panel.galleryPanel, Icon.IMAGES, function () { return Constructor.instance.is2D() && Constructor.instance.hasImages(); }).tooltip('Gallery'), _this.createSwitch(panel.stickersPanel, Icon.SPLOTCH, function () { return Constructor.instance.is2D(); }).tooltip('Stickers'), _this.createSwitch(panel.layersPanel, Icon.LAYER_GROUP, function () { return Constructor.instance.is2D(); }).tooltip('Layers'), _this.createSwitch(panel.selectionPanel, Icon.SLIDERS_H, function () { return Constructor.instance.hasSelection(); }).tooltip('Properties'), _this.createSwitch(panel.fontFamilyPanel, Icon.FONT, function () { return Constructor.instance.hasTextSelection(); }).tooltip('Fonts'), _this.createSwitch(panel.filtersPanel, Icon.TINT, function () { return Constructor.instance.hasImageSelection(); }).tooltip('Filters'), _this.createSwitch(panel.optionsPanel, Icon.CLIPBOARD_LIST, function () { return ConstructorUI.instance.order.model && ConstructorUI.instance.order.model.constructor_model_option && ConstructorUI.instance.order.model.constructor_model_option.length > 0; }).tooltip('Options'), _this.createSwitch(panel.samplesPanel, Icon.INFO_CIRCLE).tooltip('Product Info'), _this.createSwitch(panel.sharePanel, Icon.FILE_DOWNLOAD).tooltip('Export & Sharing'), new Spacer());
        _this.hideOthers(!_this.c.getActiveSide() || _this.c.getActiveSide().isEmpty() ? panel.newElementPanel : panel.layersPanel);
        return _this;
    }
    SideBar.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " sidebar";
    };
    SideBar.prototype.createSwitch = function (control, icon, visibility) {
        var _this = this;
        var button = new SwitchButton(control, icon, visibility);
        this.buttons.push(button);
        Constructor.instance.onChange(function () { return button.update(); }, button);
        control.onVisibilityChange(function (trigger) {
            if (trigger.isVisible()) {
                _this.hideOthers(trigger);
            }
        });
        return button;
    };
    SideBar.prototype.hideOthers = function (activeTrigger) {
        this.buttons.forEach(function (button) {
            if (button.trigger != activeTrigger) {
                button.trigger.hide();
                button.removeClass("selected");
            }
            else {
                button.addClass("selected");
            }
        });
    };
    return SideBar;
}(VerticalToolBarUIControl));
var TextBar = (function (_super) {
    __extends(TextBar, _super);
    function TextBar() {
        var _this = _super.call(this) || this;
        _this.update();
        return _this;
    }
    TextBar.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " text";
    };
    TextBar.prototype.update = function () {
        this.clear();
        this.append();
    };
    return TextBar;
}(ToolBar));
var TriggeredToolBar = (function (_super) {
    __extends(TriggeredToolBar, _super);
    function TriggeredToolBar() {
        var controls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            controls[_i] = arguments[_i];
        }
        var _this = _super.call(this, Constructor.instance) || this;
        _this.append.apply(_this, controls);
        return _this;
    }
    TriggeredToolBar.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " toolbar";
    };
    return TriggeredToolBar;
}(TriggeredUIControl));
var TopBar = (function (_super) {
    __extends(TopBar, _super);
    function TopBar() {
        var _this = _super.call(this) || this;
        _this.append(new Spacer(), new ToggleButton(function () { return _this.c.toggleSnapToGrid(); }, function () { return _this.c.snapToGrid; }, Icon.BORDER_ALL, null, function () { return _this.c.is2D(); }).tooltip('Snap to Grid'), new ToggleButton(function () { return _this.c.toggleSnapToObjects(); }, function () { return _this.c.snapToObjects; }, Icon.VECTOR_SQUARE, null, function () { return _this.c.is2D(); }).tooltip('Snap to Objects'), new ConditionalButton(function () { return _this.c.undo(); }, function () { return _this.c.getActiveSide().history.hasPrevious(); }, Icon.UNDO_ALT).tooltip('Undo'), new ConditionalButton(function () { return _this.c.redo(); }, function () { return _this.c.getActiveSide().history.hasNext(); }, Icon.REDO_ALT).tooltip('Redo'), new ConditionalButton(function () { return _this.c.duplicate(); }, function () { return _this.c.hasSelection(); }, Icon.CLONE).tooltip('Duplicate'), new ConditionalButton(function () { return _this.c.getSelection().remove(); }, function () { return _this.c.hasSelection(); }, Icon.TRASH).tooltip('Delete'), new Spacer());
        return _this;
    }
    TopBar.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " top";
    };
    TopBar.prototype.update = function () {
        this.trigger.is2D() ? this.show() : this.hide();
    };
    return TopBar;
}(TriggeredToolBar));
var GalleryPanel = (function (_super) {
    __extends(GalleryPanel, _super);
    function GalleryPanel() {
        var _this = _super.call(this, Constructor.instance) || this;
        _this.imageContainer = new FlowControl(2, true);
        _this.images = [];
        _this.append(_this.imageContainer);
        _this.update();
        setTimeout(function () { return _this.updateImages(); }, 200);
        return _this;
    }
    GalleryPanel.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) + " vertical";
    };
    GalleryPanel.prototype.updateImages = function () {
        for (var _i = 0, _a = Constructor.instance.sides; _i < _a.length; _i++) {
            var side = _a[_i];
            for (var _b = 0, _c = side.getImageSources(); _b < _c.length; _b++) {
                var src = _c[_b];
                if (this.images && this.images.indexOf(src) == -1) {
                    this.images.push(src);
                    var imageControl = new ImageControl(src, true);
                    this.imageContainer.append(imageControl);
                }
            }
        }
    };
    GalleryPanel.prototype.show = function () {
        _super.prototype.show.call(this);
        this.update();
    };
    GalleryPanel.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateImages();
        var selection = Constructor.instance.getSelection();
        if (selection instanceof Frame && !selection.src) {
            if (!this.isVisible()) {
                this.show();
            }
        }
    };
    GalleryPanel.prototype.updateVisibility = function () {
        this.trigger.getMode() == Mode.Mode2D ? this.show() : this.hide();
    };
    GalleryPanel.prototype.addButton = function (label, type, icon) {
        var _this = this;
        this.append(new Row(new Button(function () { return _this.c.addElement(type); }, icon, label)));
    };
    return GalleryPanel;
}(TriggeredUIControl));
//# sourceMappingURL=constructor.js.map