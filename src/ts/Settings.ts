/** Constructor settings */
class Settings {

    debug = false;
    bindDeleteKey = true;
    ui = {
        layerIconSize: 24
    };
    urls = {
        textures: "textures/",
        maps: "textures/maps/",
        models: "models/",
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
            text: "Текст",
            fontSize: 25,
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
    previewBackgroundColor = "#dddddd";
    fitIntoMargins = false;
    localStorage = {
        enabled: true,
        keyPrefix: "CONSTRUCTOR_STATE_"
    };
    autoSize = false;
    
    constructor() {
    }

}