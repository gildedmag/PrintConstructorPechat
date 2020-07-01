/** @hidden */
class HorizontalGuide extends Guide {

    constructor(h: number) {
        super();
        this.height = h;
    }

    update(x: number){
        this.left = x;
        this.show();
    }

}