/** @hidden */
class ObjectOptions implements Equalable<ObjectOptions> {

    static nativeOptions = [
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

    static excludedNativeOptions = {
        "image": [
            "fill"
        ]
    };

    type: string;
    filters: string[];

    constructor(element?: Element2D) {
        if (element) {
            let extraProperties = ['lockScalingX', 'lockScalingY', 'lockRotation', 'lockMovementX', 'lockMovementY'];
            let object = element.object.toJSON(extraProperties);
            let excludedOptions = ObjectOptions.excludedNativeOptions[element.object.type];
            for (let property of ObjectOptions.nativeOptions) {
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
                for (let filter of element.filters) {
                    this.filters.push(filter.getName());
                }
            } else if (element.filtersCache && element.filtersCache.length) {
                this.filters = element.filtersCache;
            }
        }
    }

    static fromObject(value: object): ObjectOptions {
        let object = new ObjectOptions();
        for (let property of ObjectOptions.nativeOptions) {
            if (value[property] !== undefined) object[property] = value[property];
            if (property == 'fontFamily') {
                setTimeout(() => ObjectOptions.renderFont(object), 100);
                setTimeout(() => ObjectOptions.renderFont(object), 500);
            } else if (property == 'text') {
                object[property] = unescape(value[property]);
            }
        }
        return object;
    }

    static renderFont(object: ObjectOptions) {
        fabric.util.clearFabricFontCache();
        Constructor.instance.getActiveSide().canvas.renderAll();
    }

    toObject(): {} {
        let options = {} as any;
        for (let property of ObjectOptions.nativeOptions) {
            if (this[property] !== undefined) options[property] = this[property];
        }
        if (this.filters) options.filters = this.filters;
        return options
    }

    equals(object: ObjectOptions): boolean {
        let objectOptions = Object.getOwnPropertyNames(object);
        let options = Object.getOwnPropertyNames(this);
        if (objectOptions.length != options.length) {
            return false;
        }
        for (let i = 0; i < options.length; i++) {
            let a = options[i];
            let b = objectOptions[i];
            if (this[a] != object[a]) {
                return false;
            }
            if (a != b && this[b] != object[b]) {
                return false;
            }
        }
        return true;
    }

}
