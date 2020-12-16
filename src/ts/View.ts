/** @hidden */
/// <reference path="./Trigger.ts" />
abstract class View<T> extends Trigger<T> {

    container: HTMLElement | HTMLInputElement;

    abstract getElement(): HTMLElement;

    constructor(container: HTMLElement) {
        super();
        this.container = container;
    }

    show() {
        this.getElement().style.display = null;
        this.visibilityChanged();
        return this;
    }

    hide() {
        this.getElement().style.display = Constants.NONE;
        this.visibilityChanged();
        return this;
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

    allowUserSelect(){
        this.container.style.userSelect = 'all';
        return this;
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
        return this;
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

    isEmpty(): boolean {
        return this.container.innerHTML == "";
    }

    setColor(value: string){
        this.container.style.color = value;
        return this;
    }


    setBackgroundColor(value: string){
        this.container.style.backgroundColor = value;
        return this;
    }

    setAttribute(attributeName: string, value: string){
        this.container.setAttribute(attributeName, value);
        return this;
    }

}
