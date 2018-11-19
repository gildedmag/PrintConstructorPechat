class Icon {

    static separator = '_';
    static instances = {};

    container: HTMLImageElement;
    frame = 0;
    frames: string[];
    playing = true;
    interval = 1000 / 10;
    autoplay = false;

    constructor(data: string, id?: string) {
        this.container = document.createElement("img");
        document.body.appendChild(this.container);
        this.frames = data.split(Icon.separator);
        this.container.onmousemove = e => this.scroll(e);
        this.container.onmouseleave = () => this.playing = true;
        this.container.src = this.frames[0];
        this.container.id = id ? id : Math.random().toString(36).slice(2);
        Icon.instances[this.container.id] = this;
        this.play();
    }

    static getById(id: string) {
        return Icon.instances[id];
    }

    scroll(e: MouseEvent) {
        this.playing = false;
        let x = e.pageX - this.container.offsetLeft;
        let w = this.container.clientWidth / 2;
        this.frame = Math.floor(this.frames.length * x / w);
        if (this.frame === undefined) this.frame = 0;
        else if (this.frame >= this.frames.length) this.frame %= this.frames.length;
        this.container.src = this.frames[this.frame];
    };

    play() {
        if (this.autoplay && this.playing) {
            this.frame++;
            if (this.frame === this.frames.length) this.frame = 0;
            else if (this.frame < 0) this.frame = this.frames.length - 1;
            this.container.src = this.frames[this.frame];
        }
        setTimeout(() => this.play(), this.interval);
    };

    getSrc() {
        return this.frames.join(Icon.separator);
    }

    setSrc(data: string) {
        this.frames = data.split(Icon.separator);
        this.frame = 0;
        this.container.src = this.frames[0];
    }

    getElement(): HTMLElement {
        return this.container;
    }

}