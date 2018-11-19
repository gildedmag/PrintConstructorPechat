interface Serializable<S, T> {

    serialize(): T;

    deserialize(json: T): S;

}