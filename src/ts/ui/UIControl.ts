abstract class UIControl<T> extends View {

    abstract getClassName(): string;
    model: T;

    getElement(): HTMLElement {
        return this.container;
    }

    constructor(model: T) {
        let element: HTMLElement = document.createElement(Constants.DIV);
        //element.style.display = "block";
        //element.style.float = "left";
        super(element);
        this.model = model;
        element.className = this.getClassName();
    }

}