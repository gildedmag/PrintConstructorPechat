/// <reference path="../Utils.ts"/>
/// <reference path="locale/ru/LocalizedStrings.ts" />

abstract class UIControl extends View<UIControl> implements Identifiable {

    static map: { [key: number]: UIControl; } = {};

    c: Constructor;
    children: UIControl[] = [];
    showCondition: () => boolean;
    readonly id: number;

    static nextId = 0;

    translate(key: string) {
        return LocalizedStrings.translate(key);
    }

    getClassName(): string {
        return "control"
    }

    getId(): number {
        return this.id;
    }

    showWhen(trigger: Trigger<any>, condition: () => boolean) {
        trigger.onChange(() => this.update(), this);
        this.showCondition = condition;
        return this;
    }

    update() {
        if (this.showCondition && this.showCondition()) {
            this.show();
        } else if (this.showCondition && !this.showCondition()) {
            this.hide();
        }
    }

    getElement(): HTMLElement {
        return this.container;
    }

    static getById(id: number): UIControl {
        return this.map[id];
    }

    constructor(tag?: string) {
        super(tag ? document.createElement(tag) : Utils.div());
        this.id = UIControl.nextId++;
        UIControl.map[this.id] = this;
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

    removeChild(index: number) {
        return this.children.splice(index, 1)[0];
    }

    moveChild(from: number, to: number) {
        let htmlElement = this.children[from].container;
        let before = this.children[to].container;
        this.children.splice(to, 0, this.removeChild(from));
        this.container.insertBefore(htmlElement, before);
    }

    clear() {
        this.getElement().innerHTML = "";
        this.children.forEach(child => {
            child.clear();
            child.container.remove();
            delete UIControl.map[child.id];
        });
        this.children = [];
    }

    tooltip(value: string) {
        let tooltip = document.createElement('span');
        tooltip.className = 'tp';
        tooltip.innerHTML = this.translate(value);
        this.container.appendChild(tooltip);
        let parent = this.container;
        this.container.onmouseover = e => {
            let dx = 0;
            let dy = 0;

            let spaceRight = window.innerWidth - parent.offsetLeft
            let spaceLeft = parent.offsetLeft;
            let spaceTop = parent.offsetTop;
            let spaceBottom = window.innerHeight - parent.offsetTop;

            if (spaceRight > tooltip.offsetWidth) {
                if (spaceLeft > tooltip.offsetWidth * 2 &&  spaceTop < tooltip.offsetHeight * 2) {
                    dx = -tooltip.offsetWidth / 2 + parent.offsetWidth / 2;
                    dy = tooltip.offsetHeight;
                } else if (spaceBottom < tooltip.offsetHeight * 2) {
                    dx = -tooltip.offsetWidth / 2 + parent.offsetWidth / 2;
                    dy = -tooltip.offsetHeight;
                } else {
                    dx = parent.offsetWidth;
                }
            } else if (spaceLeft > tooltip.offsetWidth) {
                if (spaceBottom < tooltip.offsetHeight * 2) {
                    dy = -tooltip.offsetHeight;
                }
                dx = -tooltip.offsetWidth + parent.offsetWidth;
            } else {
                dy = -parent.offsetHeight;
            }

            tooltip.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
            tooltip.style.visibility = 'visible';
        };
        this.container.onmouseleave = e => {
            tooltip.style.visibility = 'hidden';
        };
        tooltip.onmousemove
        return this;
    }

}