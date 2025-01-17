/** @hidden */
class Side2DStateObjects implements Equalable<Side2DStateObjects> {

    objects: ObjectOptions[];

    constructor(side?: Side2D) {
        this.objects = [];
        if (side) {
            for (let element of side.elements) {
                this.objects.push(element.serialize());
            }
        }
    }

    static parse(json: string): Side2DStateObjects {
        let objects = new Side2DStateObjects();
        let rawObjects: object[] = JSON.parse(json).objects;
        for (let rawObject of rawObjects) {
            let objectOptions = ObjectOptions.fromObject(rawObject);
            objects.objects.push(objectOptions);
        }
        return objects;
    }

    equals(state: Side2DStateObjects): boolean {
        if (state.objects.length != this.objects.length) {
            return false;
        }
        for (let i = 0; i < this.objects.length; i++) {
            let a = this.objects[i] as ObjectOptions;
            let b = state.objects[i] as ObjectOptions;
            if (!a.equals(b)) return false;
        }
        return true;
    }

}