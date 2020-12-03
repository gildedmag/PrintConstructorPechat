/** Constructor settings */
class Settings {

    debug = false;
    createDefaultSide = (window.constructorConfiguration && window.constructorConfiguration.createDefaultSide) || false;
    ui = {
        layerIconSize: 38
    };
    urls = {
        textures: "textures/",
        maps: "textures/maps/",
        models: (window.constructorConfiguration && window.constructorConfiguration.modelsUrl) || "models/",
        presets: "presets/"
    };
    fileExtensions = {
        model: ".json",
        object: ".obj",
        archive: ".zip",
        presets: ".json",
        map: ".jpg",
    };
    elementDefaults = {
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
    rotationStep = 15;
    snapSize = 10;
    gridSize = 20;
    duplicateOffset = 10;

    /**
     * Undo/redo history capacity
     */
    stateBufferSize = 100;

    /**
     * Maximum size of rendered 2d-side projected on 3d-surface
     */
    previewTextureSize = 1024;
    previewBackgroundColor = "#eeeeee";
    fitIntoMargins = false;
    localStorage = {
        enabled: true,
        keyPrefix: "CONSTRUCTOR_STATE_"
    };
    autoSize = false;
    printWidth = window.constructorConfiguration ? window.constructorConfiguration.printWidth : 800;
    
    constructor() {
    }

}