class Color extends fabric.Color implements Equalable<Color> {

    static WHITE = new Color(255, 255, 255);
    static BLACK = new Color(0, 0, 0);
    static GRAY = new Color(127, 127, 127);
    static BACKGROUND_GRAY = new Color(221, 221, 221);
    static LIGHT_GRAY = new Color(240, 240, 240);
    static DARK_GRAY = new Color(70, 70, 70);
    static TRANSPARENT = new Color(0, 0, 0, 0);
    static TRANSPARENT_BLACK = new Color(0, 0, 0, 0.5);
    static GUIDE = new Color(0, 255, 0, 0.5);

    /** @hidden */
    constructor(...args: any[]) {
        if (args.length === 1) {
            if (typeof args[0] === Constants.STRING) super(...args);
            else super(args[0].toRgba());
        }
        else super(Color.componentsToRgbaString(...args));
    }

    toHex(): string {
        return '#' + super.toHex();
    }

    toNumber(): number {
        let c = this.getSource();
        return (c[3] << 24) + (c[2] << 16) + (c[1] << 8) + c[0];
    }

    toRgba(): string {
        return super.toRgba();
    }

    static random(): Color {
        return new Color(Utils.randomInt(256), Utils.randomInt(256), Utils.randomInt(256), 1);
    }

    private static componentsToRgbaString(...components: number[]): string {
        let s = components.length < 4 ? "rgb(" : "rgba(";
        return s + components.join(",") + ")";
    }

    serialize(): string {
        return this.toRgba();
    }

    static deserialize(value: string): Color {
        return new Color(value);
    }

    equals(color: Color): boolean {
        if (this.getSource().length != color.getSource().length) {
            return false;
        }
        for (let i = 0; i < this.getSource().length; i++) {
            if (this.getSource()[i] != color.getSource()[i]) {
                return false;
            }
        }
        return true;
    }

}