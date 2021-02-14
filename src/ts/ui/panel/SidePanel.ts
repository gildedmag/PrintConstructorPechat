/// <reference path="ModelsPanel.ts" />
class SidePanel extends ToolBar {

    layersPanel: LayersPanelUIControl;
    stickersPanel: StickersPanel;
    newElementPanel: NewElementPanel;
    selectionPanel: SelectionPanel;
    fontFamilyPanel: FontFamilyPanel;
    modelsPanel: ModelsPanel;
    samplesPanel: SamplesPanel;
    optionsPanel: OptionsPanel;
    filtersPanel: FiltersPanel;
    sharePanel: ExportPanel;

    getClassName(): string {
        return super.getClassName() + " sidepanel";
    }

    constructor() {
        super();

        this.layersPanel = new LayersPanelUIControl();
        this.stickersPanel = new StickersPanel();
        this.selectionPanel = new SelectionPanel();
        this.newElementPanel = new NewElementPanel();
        this.fontFamilyPanel = new FontFamilyPanel();
        this.modelsPanel = new ModelsPanel();
        this.samplesPanel = new SamplesPanel();
        this.optionsPanel = new OptionsPanel();
        this.filtersPanel = new FiltersPanel();
        this.sharePanel = new ExportPanel();

        this.append(
            this.newElementPanel,
            this.layersPanel,
            this.stickersPanel,
            this.selectionPanel,
            this.fontFamilyPanel,
            this.modelsPanel,
            this.samplesPanel,
            this.optionsPanel,
            this.filtersPanel,
            this.sharePanel,
            new Container()
                .addClass('sidepanel-freespace')
                .addClass('mobile')
        );

        this.container.onclick = e => {
            if (Constructor.instance && e.target === this.container){
                Constructor.instance.getActiveSide().deselect();
            }
        }
    }

}
