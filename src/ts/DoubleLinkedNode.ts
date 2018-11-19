/** @hidden */
class DoubleLinkedNode<T> {

    previous: DoubleLinkedNode<T>;
    next: DoubleLinkedNode<T>;
    value: T;

    constructor(value: T) {
        this.value = value;
    }

}