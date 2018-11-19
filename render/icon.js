var Icon = (function () {
    function Icon(data, id) {
        var _this = this;
        this.frame = 0;
        this.playing = true;
        this.delay = 1000 / 10;
        this.container = document.createElement("img");
        document.body.appendChild(this.container);
        this.frames = data.split(Icon.separator);
        this.container.onmousemove = function (e) { return _this.scroll(e); };
        this.container.onmouseleave = function () { return _this.playing = true; };
        this.container.src = this.frames[0];
        this.container.id = id ? id : Math.random().toString(36).slice(2);
        Icon.instances[this.container.id] = this;
        setInterval(function () { return _this.autoplay(); }, this.delay);
    }
    Icon.getById = function (id) {
        return Icon.instances[id];
    };
    Icon.prototype.scroll = function (e) {
        this.playing = false;
        var x = e.pageX - this.container.offsetLeft;
        var w = this.container.clientWidth / 2;
        this.frame = Math.floor(this.frames.length * x / w);
        if (this.frame === undefined)
            this.frame = 0;
        else if (this.frame >= this.frames.length)
            this.frame %= this.frames.length;
        this.container.src = this.frames[this.frame];
    };
    ;
    Icon.prototype.autoplay = function () {
        if (this.playing) {
            this.frame++;
            if (this.frame === this.frames.length)
                this.frame = 0;
            else if (this.frame < 0)
                this.frame = this.frames.length - 1;
            this.container.src = this.frames[this.frame];
        }
    };
    ;
    Icon.prototype.getSrc = function () {
        return this.frames.join(Icon.separator);
    };
    Icon.prototype.setSrc = function (data) {
        this.frames = data.split(Icon.separator);
        this.frame = 0;
        this.container.src = this.frames[0];
    };
    Icon.prototype.getElement = function () {
        return this.container;
    };
    Icon.separator = '_';
    Icon.instances = {};
    return Icon;
}());
