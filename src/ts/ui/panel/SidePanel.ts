/// <reference path="ModelsPanel.ts" />
class SidePanel extends ToolBar {

    layersPanel: LayersPanelUIControl;
    newElementPanel: NewElementPanel;
    selectionPanel: SelectionPanel;
    fontFamilyPanel: FontFamilyPanel;
    modelsPanel: ModelsPanel;
    optionsPanel: OptionsPanel;
    filtersPanel: FiltersPanel;
    sharePanel: ExportPanel;

    getClassName(): string {
        return super.getClassName() + " sidepanel";
    }

    constructor() {
        super();

        this.layersPanel = new LayersPanelUIControl();
        this.selectionPanel = new SelectionPanel();
        this.newElementPanel = new NewElementPanel();
        this.fontFamilyPanel = new FontFamilyPanel();
        this.modelsPanel = new ModelsPanel();
        this.optionsPanel = new OptionsPanel();
        this.filtersPanel = new FiltersPanel();
        this.sharePanel = new ExportPanel();

        this.append(
            this.newElementPanel,
            this.layersPanel,
            this.selectionPanel,
            this.fontFamilyPanel,
            this.modelsPanel,
            this.optionsPanel,
            this.filtersPanel,
            this.sharePanel,
        );

        this.container.onclick = e => {
            if (e.target === this.container){
                Constructor.instance.getActiveSide().deselect();
            }
        }
    }

}