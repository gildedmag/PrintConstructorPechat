/// <reference path="UIControl.ts" />
/// <reference path="toolbar/ToolBar.ts" />
/// <reference path="panel/ModelsPanel.ts" />
/// <reference path="ConstructorController.ts" />
/// <reference path="pechat.photo/Options.ts" />

import ConstructorModel = pechat.ConstructorModel;
import Options = pechat.Options;

class ConstructorUI extends UIControl {

    domain: string;

    constructorControl: ConstructorController;
    sideBar: SideBar;
    sidePanel: SidePanel;
    toolBar: ToolBar;
    topBar: TopBar;
    bottomBar: BottomBar;
    addToCartPopover: AddToCartPopover;

    options: pechat.Options;
    order: Order;

    static instance: ConstructorUI;
    static test = ConstructorUI.init();


    getClassName(): string {
        return "constructor-ui-container";
    }

    static onReadyHandler = () => true;

    static onReady(handler: () => any) {
        Constructor.onReadyHandler = handler();
    }

    private constructor() {
        super();
        ConstructorUI.instance = this;

        try {
            this.domain = constructorConfiguration.domain;
        } catch (e) {
            this.domain = "";
        }

        let host = document.getElementById("constructor-ui");
        if (!host) {
            console.log("'#constructor-ui' element not found");
            return;
        }

        this.order = new Order();

        this.constructorControl = new ConstructorController();
        this.toolBar = new ToolBar();
        this.sidePanel = new SidePanel();
        this.sideBar = new SideBar();
        this.topBar = new TopBar();
        this.bottomBar = new BottomBar();
        this.addToCartPopover = new AddToCartPopover();

        this.append(
            this.constructorControl,
            this.toolBar,
            this.sidePanel,
            this.sideBar,
            this.topBar,
            this.bottomBar,
            this.addToCartPopover,
        );

        host.appendChild(this.container);
        this.bindDelKey();

        window.addEventListener("load", function () {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 0);
        });
        window.addEventListener("orientationchange", function () {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 0);
        });
        window.addEventListener("touchstart", function () {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 0);
        });

        Constructor.onReadyHandler && Constructor.onReadyHandler();

    }

    public static init() {
        document.addEventListener("DOMContentLoaded", function () {
            new ConstructorUI();
        });
    }

    loadCategory(categoryId: number) {

        let c = Constructor.instance;
        PechatUtils.getCategoryOptions(categoryId, options => {
            if (!options || !options.constructor_models) {
                console.error('error loading category options for category #' + categoryId)
                return;
            }
            this.options = options;
            c.preview.modelName = null;
            options.constructor_models.forEach(model => {

                if (!c.preview.modelName) {
                    this.loadModelOptions(model, options);
                    try {
                        c.loadModel(
                            model.file_main,
                            () => {
                                if (constructorConfiguration && constructorConfiguration.sharedState) {
                                    c.setMode(Mode.Mode3D);
                                }
                            },
                            error => alert(error)
                        );
                    } catch (e) {
                        alert(e.message);
                    }
                }

                let url = model.thumb;
                this.sidePanel.modelsPanel.append(
                    Button.of(
                        () => {
                            c.loadModel(model.file_main, () => {
                                if (constructorConfiguration && constructorConfiguration.sharedState) {
                                    c.setMode(Mode.Mode3D);
                                }
                            });
                            this.loadModelOptions(model, options);
                        },
                        new Row(
                            new Spacer(),
                            new ImageControl(url),
                            new Spacer(),
                        ),
                    ),
                    new Row(
                        new Spacer(),
                        new LabelControl(model.name),
                        new Spacer(),
                    )
                );
            })
        })
    }

    createSides(printareas: pechat.Printarea[]) {
        Constructor.instance.deleteAllSides();
        printareas.forEach(area => {
            Constructor.instance.addSide(
                area.width,
                area.height,
                parseInt(area.roundCorners),
                area.name,
                area.price
            );
            Constructor.instance.zoomToFit();
        });
    }

    loadModelOptions(model: ConstructorModel, options: Options) {
        console.log(model);
        this.sidePanel.optionsPanel.clear();

        if (!constructorConfiguration || !constructorConfiguration.sharedState) {
            if (Constructor.instance.sides.length != model.printareas.length) {
                this.createSides(model.printareas);
            }
            for (var i = 0; i < Constructor.instance.sides.length; i++) {
                let side = Constructor.instance.sides[i];
                let area = model.printareas[i];
                if (side.width != area.width || side.height != area.height) {
                    this.createSides(model.printareas);
                    break;
                }
                side.price = parseInt(area.price) || 0;
                side.name = area.name;
            }

        }

        this.order.setModel(model);

        let groupPanels: OptionGroupPanel[] = [];

        options.options.forEach(optionGroup => {
            let groupPanel = new OptionGroupPanel(optionGroup);
            groupPanels.push(groupPanel);
        });

        model.constructor_model_option.forEach(option => {
            groupPanels.forEach(groupPanel => {
                if (option.namegroup == groupPanel.option.name) {
                    groupPanel.addOption(option);
                }
            })
        })

        groupPanels.forEach(groupPanel => {
            if (groupPanel.values.length > 0) {
                this.sidePanel.optionsPanel.append(groupPanel);
            }
        })

        ConstructorUI.instance.order.changed();
    }

    bindDelKey() {
        document.addEventListener("keydown", e => {
            if (e.keyCode == 46 && (!Popover.instance || !Popover.instance.isVisible())) {
                let selection = Constructor.instance.getSelection();
                if (selection && !selection.isEditing()) {
                    selection.remove();
                }
            } else if (e.keyCode == 27) {
                Popover.instance.hide();
            }
        }, false);
    }


}