/** @hidden */
class HistoryList<T extends Equalable<T>> {

    state: DoubleLinkedNode<T>;
    private locked: boolean;

    constructor(value: T) {
        this.locked = false;
        this.state = new DoubleLinkedNode(value);
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }

    current(): T {
        return this.state.value;
    }

    back(): T {
        if (this.state.previous) {
            this.state = this.state.previous;
            return this.state.value;
        }
        return null;
    }

    forward(): T {
        if (this.state.next) {
            this.state = this.state.next;
            return this.state.value;
        }
        return null;
    }

    add(value: T) {
        if (!this.locked && !value.equals(this.current())) {
            let next = new DoubleLinkedNode(value);
            next.previous = this.state;
            this.state.next = next;
            this.state = next;
        }
    }

}