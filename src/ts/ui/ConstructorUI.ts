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
    pagerBar: UIControl;
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
        this.pagerBar = new Pager()
            .showWhen(Constructor.instance, () => Constructor.instance.sides.length > 1)
            .addClass('pager-toolbar')
            .addClass('desktop')
            .tooltip('Side');

        this.append(
            this.constructorControl,
            this.toolBar,
            this.sidePanel,
            this.sideBar,
            this.topBar,
            this.bottomBar,
            this.addToCartPopover,
            this.pagerBar
        );

        host.appendChild(this.container);
        this.bindDelKey();

        window.addEventListener("load", function () {
            setTimeout(function () {
                document.head.innerHTML = document.head.innerHTML + '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1" /><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'
                window.scrollTo(0, 0);
            }, 0);
            setTimeout(() => window.scrollTo(0, 1), 1000);
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

        if (c.preview && constructorConfiguration && constructorConfiguration.previewBackground) {
            c.preview.setSceneBackgroundColor(constructorConfiguration.previewBackground);
        }

        PechatUtils.getCategoryOptions(categoryId, options => {
            if (!options || !options.constructor_models) {
                console.error('error loading category options for category #' + categoryId)
                return;
            }
            this.options = options;
            let modelLoaded = false;
            this.sidePanel.modelsPanel.append(
                new LabelControl("Product Types").addClass('title'),
            );
            let modelsContainer = new FlowControl(3);
            options.constructor_models.forEach(model => {
                let active = false;

                if (!modelLoaded) {
                    active = true;
                    this.loadModelOptions(model, options);
                    try {
                        c.loadModel(
                            model.file_main,
                            () => {
                                if (constructorConfiguration && constructorConfiguration.sharedState) {
                                    c.setMode(Mode.Mode3D);
                                    ConstructorUI.instance.sidePanel.optionsPanel.show();
                                }
                            },
                            error => alert(error)
                        );
                        modelLoaded = true;
                    } catch (e) {
                        alert(e.message);
                    }
                }

                let url = model.thumb;
                let button = new ToggleButton(
                    () => {
                        c.loadModel(model.file_main, () => {
                            if (constructorConfiguration && constructorConfiguration.sharedState) {
                                c.setMode(Mode.Mode3D);
                            }
                        });
                        this.loadModelOptions(model, options);
                    },
                    () => this.order.model.constructor_model_id == model.constructor_model_id,
                    null
                ).append(new ImageControl(url))
                    .tooltip(model.description);
                modelsContainer.append(button);
                if (active){
                    button.addClass('active');
                }
            });
            this.sidePanel.modelsPanel.append(modelsContainer);

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

        if (!constructorConfiguration || !constructorConfiguration.sharedState || Constructor.instance.sides.length != model.printareas.length || Constructor.instance.sides[0].name != model.printareas[0].name) {
            if (Constructor.instance.sides.length != model.printareas.length) {
                this.createSides(model.printareas);
            }
            for (let i = 0; i < Constructor.instance.sides.length; i++) {
                let side = Constructor.instance.sides[i];
                let area = model.printareas[i];
                if (side.width != area.width || side.height != area.height) {
                    this.createSides(model.printareas);
                    break;
                }
                if (side.name != area.name) {
                    side.name = area.name;
                }
                side.price = parseInt(area.price) || 0;
                side.name = area.name;
            }
            Constructor.instance.changed();
        }

        this.order.setModel(model);
        this.order.selectedOptions = [];

        let selectedOptions = [];
        if (constructorConfiguration && constructorConfiguration.selectedOptions && constructorConfiguration.selectedOptions.length) {
            for (let i = 0; i < constructorConfiguration.selectedOptions.length; i++) {
                let selectedOption = constructorConfiguration.selectedOptions[i];
                selectedOptions.push(selectedOption);
            }
        }

        let groupPanels: OptionGroupPanel[] = [];

        options.options.forEach(optionGroup => {
            let groupPanel = new OptionGroupPanel(optionGroup);
            groupPanels.push(groupPanel);
        });

        model.constructor_model_option.forEach(option => {
            groupPanels.forEach(groupPanel => {
                if (option.namegroup == groupPanel.option.name) {
                    let optionButton = groupPanel.addOption(option);
                    if (selectedOptions.indexOf(option.id) != -1) {
                        optionButton.select()
                    }
                }
            })
        });

        groupPanels.forEach(groupPanel => {
            if (groupPanel.values.length > 0) {
                this.sidePanel.optionsPanel.append(groupPanel);
            }
        });


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