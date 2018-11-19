var Icon = (function () {
    function Icon(data, id) {
        var _this = this;
        this.frame = 0;
        this.playing = false;
        this.direction = 1;
        this.delay = 50;
        this.drag = true;
        this.container = document.createElement("img");
        document.body.appendChild(this.container);
        this.frames = data.split(Icon.separator);
        this.container.onmousemove = function (e) { return _this.play(e); };
        this.container.onmouseleave = function () { return _this.stop(); };
        this.container.src = this.frames[0];
        this.container.id = id ? id : Math.random().toString(36).slice(2);
        Icon.instances[this.container.id] = this;
    }
    Icon.getById = function (id) {
        return Icon.instances[id];
    };
    Icon.prototype.play = function (e) {
        var x = e.pageX - this.container.offsetLeft;
        var w = this.container.clientWidth / 2;
        if (this.drag) {
            this.frame = Math.floor(this.frames.length * x / w);
            if (this.frame === undefined)
                this.frame = 0;
            else if (this.frame >= this.frames.length)
                this.frame %= this.frames.length;
            this.container.src = this.frames[this.frame];
        }
        else {
            this.direction = (x > w) ? 1 : -1;
            if (!this.playing) {
                this.playing = true;
                this.nextFrame();
            }
        }
    };
    ;
    Icon.prototype.stop = function () {
        this.playing = false;
    };
    ;
    Icon.prototype.nextFrame = function () {
        var _this = this;
        if (this.playing) {
            this.frame += this.direction;
            if (this.frame === this.frames.length)
                this.frame = 0;
            else if (this.frame < 0)
                this.frame = this.frames.length - 1;
            this.container.src = this.frames[this.frame];
            setTimeout(function () { return _this.nextFrame(); }, this.delay);
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
