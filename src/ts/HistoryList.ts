/** @hidden */
class HistoryList<T extends Equalable<T>> {

    state: DoubleLinkedNode<T>;
    private locked: boolean;

    constructor(value: T) {
        this.locked = false;
        this.state = new DoubleLinkedNode(value);
    }

    public isLocked(): boolean {
        return this.locked === true;
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        console.log('HISTORY UNLOCKED');
        this.locked = false;
    }

    current(): T {
        return this.state.value;
    }

    hasNext(): boolean {
        return !!this.state.next;
    }

    hasPrevious(): boolean {
        return !!this.state.previous;
    }

    back(): T {
        if (this.hasPrevious()) {
            let newState = new DoubleLinkedNode<T>(this.state.previous.value);
            newState.previous = this.state.previous;
            newState.next = this.state;
            this.state = newState;
            return this.state.value;
        }
        return null;
    }

    forward(): T {
        if (this.hasNext()) {
            let newState = new DoubleLinkedNode<T>(this.state.next.value);
            newState.previous = this.state;
            newState.next = this.state.next;
            this.state = newState;
            return this.state.value;
        }
        return null;
    }

    add(value: T) {
        if (!this.locked && !value.equals(this.current())) {
            console.log('history#add !!!!!!!!!', value.objects);
            let next = new DoubleLinkedNode(value);
            next.previous = this.state;
            this.state.next = next;
            this.state = next;
        }
    }

    print(){
        let cursor = this.state;
        while (cursor.previous){
            console.log(cursor.value.objects);
            cursor = cursor.previous;
        }
        console.log(cursor.value.objects);
    }

    printForward(){
        let cursor = this.state;
        while (cursor.next){
            console.log(cursor.value.objects);
            cursor = cursor.next;
        }
        console.log(cursor.value.objects);
    }

}