class Filter extends Associated<Filter> {

    private nativeFilter: any;
    isBoolean: boolean;

    constructor(name: string, filter: any, isBoolean?: boolean) {
        super(name);
        this.nativeFilter = filter;
        this.isBoolean = isBoolean;
    }

    getFilter(): fabric.IBaseFilter {
        return this.nativeFilter as fabric.IBaseFilter;
    }

    static GRAYSCALE = new Filter("grayscale", new fabric.Image.filters.Grayscale(), true);

    static INVERT = new Filter("invert", new fabric.Image.filters.Invert(), true);

    static BRIGHTNESS = new Filter("brightness", new fabric.Image.filters.Brightness({brightness: 100}));

    static BLUR = new Filter(
        "blur",
        new fabric.Image.filters.Convolute({
            matrix: [
                1 / 9, 1 / 9, 1 / 9,
                1 / 9, 1 / 9, 1 / 9,
                1 / 9, 1 / 9, 1 / 9
            ]
        })
    );

    static SHARPEN = new Filter(
        "sharpen",
        new fabric.Image.filters.Convolute({
            matrix: [
                0, -1, 0,
                -1, 5, -1,
                0, -1, 0
            ]
        })
    );

    static EMBOSS = new Filter(
        "emboss",
        new fabric.Image.filters.Convolute({
            matrix: [
                1, 1, 1,
                1, 0.7, -1,
                -1, -1, -1
            ]
        })
    );

}