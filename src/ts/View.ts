/** @hidden */
abstract class View {

    container: HTMLElement;

    abstract getElement(): HTMLElement;

    public constructor(container: HTMLElement) {
        this.container = container;
    }

    show(): void {
        this.getElement().style.display = Constants.BLOCK;
    }

    hide(): void {
        this.getElement().style.display = Constants.NONE;
    }

    clear() {
        this.getElement().innerHTML = "";
    }

    isVisible(): boolean {
        return this.getElement() != null
            && this.getElement().style != null
            && this.getElement().style.display != Constants.NONE;
    }

}
