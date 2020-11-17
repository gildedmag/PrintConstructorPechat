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
        this.getElement().style.display = null;
        this.visibilityChanged();
    }

    hide(): void {
        this.getElement().style.display = Constants.NONE;
        this.visibilityChanged();
    }

    setVisible(value: boolean): void {
        if (value != this.isVisible()) {
            value ? this.show() : this.hide();
        }
    }

    toggleVisibility() {
        this.setVisible(!this.isVisible());
    }

    clear() {
        this.getElement().innerHTML = "";
        this.changed();
    }

    isVisible(): boolean {
        return this.getElement() != null
            && this.getElement().style != null
            && this.getElement().style.display != Constants.NONE;
    }

    getClassName(): string {
        return "";
    }

    addClass(className: string) {
        if (!this.hasClass(className)){
            this.container.classList.add(className);
        }
        return this;
    }

    removeClass(className: string) {
        if (this.hasClass(className)) {
            this.container.classList.remove(className);
        }
    }

    hasClass(className: string): boolean {
        return this.container.classList.contains(className);
    }

    toggleClass(className: string) {
        this.hasClass(className)
            ? this.removeClass(className)
            : this.addClass(className);
    }

    setFontFamily(fontFamily: string){
        this.container.style.fontFamily = fontFamily;
        return this;
    }

    setFontSize(fontSize: number){
        this.container.style.fontSize = fontSize + "px";
        return this;
    }

}
