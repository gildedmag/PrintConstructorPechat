class FlowControl extends UIControl {

    maxColumns: number;
    columns: number;
    autoFlow: boolean;

    getClassName(): string {
        return super.getClassName() + ' flow';
    }

    constructor(maxColumns?: number, autoFlow?: boolean) {
        super();
        this.maxColumns = maxColumns || 6;
        this.autoFlow = autoFlow == null ? true : autoFlow;
    }

    showed() {
        if (this.autoFlow){
            this.reflow();
        }
    }

    async reflow() {
        let maxColumnWidth = 0;
        for (let i = 0; i < this.children.length; i++) {
            const rect = await this.children[i].calculateBoundingClientRect();
            maxColumnWidth = Math.max(maxColumnWidth, rect.width);
        }
        let columns = Math.floor(this.container.clientWidth / maxColumnWidth);
        this.setColumns(columns);
    }

    setColumns(value: number){
        if (value == 0){
            return;
        }
        this.columns = Math.min(value, this.maxColumns, this.children.length);
        let gap = this.columns == 1 ? 0 : (6 / this.columns); //TODO: why 6?
        let percent = 100 / this.columns - gap
        this.container.style.gridTemplateColumns = 'repeat(' + this.columns + ', ' + percent + '%)';
    }

    append(...controls): UIControl {
        super.append(...controls);
        let columns = Math.min(this.maxColumns, this.children.length);
        this.setColumns(columns);
        return this;
    }

}