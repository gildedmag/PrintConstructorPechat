/** @hidden */
class Map<K, V> {

    private map: any = {};

    constructor(...values: (K|V)[]) {
        if (values.length % 2 != 0) throw new TypeError();
        for (let i = 0; i < values.length; i += 2) {
            let key: K = values[i] as K;
            let value: V = values[i + 1] as V;
            this.map.put(key, value);
        }
    }

    public put(key: K, value: V) {
        this.map[key] = value;
        new Map()
    }

    public get(key: K): V {
        return this.map[key];
    }



}