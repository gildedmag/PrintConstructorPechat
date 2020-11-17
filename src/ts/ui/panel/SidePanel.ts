class SidePanel extends ToolBar {

    layersPanel: LayersPanelUIControl;
    newElementPanel: NewElementPanel;
    selectionPanel: SelectionPanel;
    fontFamilyPanel: FontFamilyPanel;

    getClassName(): string {
        return super.getClassName() + " sidepanel";
    }

    constructor() {
        super();

        this.layersPanel = new LayersPanelUIControl();
        this.selectionPanel = new SelectionPanel();
        this.newElementPanel = new NewElementPanel();
        this.fontFamilyPanel = new FontFamilyPanel();

        this.append(
            this.newElementPanel,
            this.layersPanel,
            this.selectionPanel,
            this.fontFamilyPanel
        );

        //this.switch(1);
    }

    // public switch(index: number) {
    //     for (let i = 0; i < this.children.length; i++) {
    //         i == index
    //             ? this.children[i].show()
    //             : this.children[i].hide();
    //     }
    // }

    update() {

    }

}