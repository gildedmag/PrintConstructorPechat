abstract class UIControl extends View<UIControl> {

    c: Constructor;
    children: UIControl[] = [];

    abstract getClassName(): string

    update(){

    }

    getElement(): HTMLElement {
        return this.container;
    }

    constructor() {
        super(Utils.div());
        this.c = Constructor.instance;
        this.container.className = this.getClassName();
    }

    private appendChild(control: UIControl): UIControl {
        this.children.push(control);
        this.container.appendChild(control.container);
        return this;
    }

    append(...controls: UIControl[]): UIControl {
        controls.forEach(control => this.appendChild(control));
        return this;
    }

}