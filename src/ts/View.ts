/** @hidden */
/// <reference path="./Trigger.ts" />
abstract class View<T> extends Trigger<T> {

    container: HTMLElement;

    abstract getElement(): HTMLElement;

    constructor(container: HTMLElement) {
        super();
        this.container = container;
    }

    show(): void {
        this.getElement().style.display = Constants.BLOCK;
    }

    hide(): void {
        this.getElement().style.display = Constants.NONE;
    }

    setVisible(value: boolean): void {
        if (value != this.isVisible()){
            value ? this.show() : this.hide();
        }
    }

    clear() {
        this.getElement().innerHTML = "";
    }

    isVisible(): boolean {
        return this.getElement() != null
            && this.getElement().style != null
            && this.getElement().style.display != Constants.NONE;
    }

    getClassName(): string {
        return "";
    }

}
