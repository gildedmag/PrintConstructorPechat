/// <reference path="./Map.ts" />

/** @hidden */
abstract class Associated<T> {

    static map = new ValueMap<string, any>();
    private name: string;

    constructor(name: string) {
        this.name = name;
        Object.getPrototypeOf(this).constructor.map.put(name, this);
    }

    static get(name: string): any {
        return this.map.get(name);
    }

    getName(): string {
        return this.name;
    }
}