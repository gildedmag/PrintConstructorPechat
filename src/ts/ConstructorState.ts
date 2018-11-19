class ConstructorState implements Equalable<ConstructorState> {

    model: string;
    fills: number[];
    sides: Side2DState[];

    constructor() {
        this.model = null;
        this.fills = [];
        this.sides = [];
    }

    equals(state: ConstructorState): boolean {
        let a = JSON.stringify(this);
        let b = JSON.stringify(state);
        return a === b;
    }

}