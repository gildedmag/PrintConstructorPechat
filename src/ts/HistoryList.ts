/** @hidden */
class HistoryList<T extends Equalable<T>> {

    cursor = 0;
    history: T[] = [];
    private locked: boolean;

    constructor() {
        this.locked = false;
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
        if (this.history.length == 0) {
            return null;
        }
        return this.history[this.cursor];
    }

    hasNext(): boolean {
        return this.cursor < (this.history.length - 1);
    }

    hasPrevious(): boolean {
        return this.cursor > 0;
    }

    back(): T {
        if (this.hasPrevious()) {
            this.cursor--;
            return this.current();
        }
        return null;
    }

    forward(): T {
        if (this.hasNext()) {
            this.cursor++;
            return this.current();
        }
        return null;
    }

    add(value: T) {
        if (!this.locked && value != this.current()) {
            if (this.hasNext()) {
                this.history.splice(this.cursor);
            }
            this.history.push(value);
            this.forward();
        }
    }

}