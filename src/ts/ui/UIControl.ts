/// <reference path="../Utils.ts"/>
/// <reference path="ScreenPosition.ts"/>
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
        let parent = this;
        this.container.onmouseover = e => {
            let parentWidth = parent.container.offsetWidth;
            let halfWidth = tooltip.offsetWidth / 2 - parentWidth / 2;
            tooltip.innerHTML = ScreenPosition[parent.getPositionOnScreen()];
            let dx = 0;
            let dy = 0;

            switch (parent.getPositionOnScreen()){
                case ScreenPosition.topLeft:
                case ScreenPosition.center:
                case ScreenPosition.left:
                default:
                    dx = parentWidth;
                    break;
                case ScreenPosition.top:
                    dx = -halfWidth;
                    dy = tooltip.offsetHeight;
                    break;
                case ScreenPosition.bottom:
                    dx = -halfWidth;
                    dy = -tooltip.offsetHeight;
                    break;
                case ScreenPosition.bottomLeft:
                    dx = parentWidth;
                    dy = -tooltip.offsetHeight;
                    break;
                case ScreenPosition.bottomRight:
                    dx = -tooltip.offsetWidth;
                    dy = -tooltip.offsetHeight;
                    break;
                case ScreenPosition.right:
                    dx = -tooltip.offsetWidth;
                    break
                case ScreenPosition.topRight:
                    dx = -tooltip.offsetWidth;
                    dy = -tooltip.offsetHeight;
                    break
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

    getPositionOnScreen(): ScreenPosition {
        let width = 100;
        let height = 100;
        let spaceRight = window.innerWidth - this.container.offsetLeft
        let spaceLeft = this.container.offsetLeft;
        let spaceTop = this.container.offsetTop;
        let spaceBottom = window.innerHeight - this.container.offsetTop;

        if (spaceLeft < width) {
            if (spaceTop < height){
                return ScreenPosition.topLeft
            }
            if (spaceBottom < height){
                return ScreenPosition.bottomLeft
            }
            return ScreenPosition.left;
        }

        if (spaceRight < width) {
            if (spaceTop < height){
                return ScreenPosition.topRight;
            }
            if (spaceBottom < height){
                return ScreenPosition.bottomRight;
            }
            return ScreenPosition.right;
        }

        if (spaceTop < height){
            return ScreenPosition.top;
        }

        if (spaceBottom < height){
            return ScreenPosition.bottom;
        }

        return ScreenPosition.center;
    }

}