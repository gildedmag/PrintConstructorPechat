class FlowControl extends UIControl {

    maxColumns: number;
    columns: number;

    getClassName(): string {
        return super.getClassName() + ' flow';
    }

    constructor(maxColumns?: number) {
        super();
        this.maxColumns = maxColumns || 5;
    }


    append(...controls): UIControl {
        super.append(...controls);
        this.columns = Math.min(this.maxColumns, this.children.length);
        this.container.style.gridTemplateColumns = 'repeat(' + this.columns + ', ' + Math.round(100 / this.columns) + '%)';
        //this.checkOverflow();
        //setTimeout(() => this.checkOverflow(), 1000);
        return this;
    }

    checkOverflow() {
        if (this.isOverflown() && this.columns > 1) {
            console.log('isOverflown!!!');
            this.columns--;
            this.container.style.gridTemplateColumns = 'repeat(' + this.columns + ', ' + Math.round(100 / this.columns) + '%)';
            setTimeout(() => this.checkOverflow(), 1000);
        } else {
            this.container.style.gridTemplateColumns = 'repeat(' + this.columns + ', ' + Math.round(100 / this.columns) + '%)';
        }
    }

    isOverflown() {
        let width = this.container.clientWidth;
        console.log('this.container.clientWidth', this.container.clientWidth);
        if (width == 0) {
            return false;
        }
        let rowWidth = 0;
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i].container;
            rowWidth += child.clientWidth;
            if ((i-1) % this.columns == 0) {
                if (rowWidth > width) {
                    console.log('rowWidth', rowWidth);
                    return true;
                }
                rowWidth = 0;
            }
        }
        return false;
    }

}