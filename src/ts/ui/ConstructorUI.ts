/// <reference path="UIControl.ts" />
/// <reference path="toolbar/ToolBar.ts" />
/// <reference path="panel/ModelsPanel.ts" />
/// <reference path="ConstructorController.ts" />
/// <reference path="pechat.photo/Options.ts" />

import ConstructorModel = pechat.ConstructorModel;

class ConstructorUI extends UIControl {

    constructorControl: ConstructorController;
    sideBar: SideBar;
    sidePanel: SidePanel;
    toolBar: ToolBar;
    topBar: TopBar;
    bottomBar: BottomBar;
    orderPopover: Popover;
    sharePopover: SharePopover;

    options: pechat.Options;

    static instance: ConstructorUI;
    static test = ConstructorUI.init();

    order: Order = new Order();

    getClassName(): string {
        return "constructor-ui-container";
    }

    private constructor() {
        super();
        ConstructorUI.instance = this;

        let host = document.getElementById("constructor-ui");
        if (!host) {
            console.log("'#constructor-ui' element not found");
            return;
        }

        this.constructorControl = new ConstructorController();
        this.toolBar = new ToolBar();
        this.sidePanel = new SidePanel();
        this.sideBar = new SideBar();
        this.topBar = new TopBar();
        this.bottomBar = new BottomBar();
        this.orderPopover = new Popover(
            new Row(
                new Spacer(),
                new LabelControl("Add to Cart").addClass("title"),
                new Spacer(),
            ),
            new Row(
                new LabelControl("Quantity"),
                new Spacer(),
                new ConditionalButton(
                    () => this.order.decrementQuantity(),
                    () => this.order.getQuantity() > 1,
                    Icon.MINUS_CIRCLE,
                    null,
                    this.order
                ),
                new Button(
                    () => this.order.incrementQuantity(),
                    Icon.PLUS_CIRCLE,
                ),
                new NumberInputControl(
                    v => this.order.setQuantity(v),
                    () => this.order.getQuantity(),
                    this.order
                ),
            ),
            new Row(
                new LabelControl("Price"),
                new Spacer(),
                new TriggeredLabelControl(
                    this.order,
                    () => this.order.getPrice()
                ),
            ),
            new Row(),
            //new Divider(true),
            new Row(
                new Spacer(),
                new Button(
                    () => this.orderPopover.hide(),
                    null,
                    "Cancel"
                ),
                new Spacer(),
                new Spacer(),
                new Button(
                    () => {
                        this.order.addToCart();
                        this.orderPopover.hide();
                    },
                    null,
                    "OK"
                ),
                new Spacer(),
            )
        );

        this.sharePopover = new SharePopover();

        this.append(
            this.constructorControl,
            this.toolBar,
            this.sidePanel,
            this.sideBar,
            this.topBar,
            this.bottomBar,
            this.orderPopover,
            this.sharePopover,
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

    }

    public static init() {
        document.addEventListener("DOMContentLoaded", function () {
            new ConstructorUI();
        });
    }

    loadCategory(categoryId: number) {

        PechatUtils.getCategforyOptions(categoryId, options => {
            Constructor.instance.preview.modelName = null;
            // options.constructor_setting.forEach(value => {
            //     console.log('!!!options.constructor_setting', value);
            // })
            // options.options.forEach(option => {
            //     option.option_values.forEach(value => {
            //         //value
            //         //console.log("option.value = ", value);
            //     });
            // });
            options.constructor_models.forEach(model => {


                // if (model.file_main == Constructor.instance.preview.modelName) {
                // }

                if (!Constructor.instance.preview.modelName) {
                    this.loadModelOptions(model);
                    Constructor.instance.loadModel(model.file_main);
                }

                let url = model.thumb;
                let modelUrl = model.file_main
                this.sidePanel.modelsPanel.append(
                    Button.of(
                        () => {
                            Constructor.instance.loadModel(model.file_main);
                            this.loadModelOptions(model);
                            // PechatUtils.getModel(model.file_main, json => {
                            //     Constructor.instance.preview.setModel(model.file_main, json);
                            // })
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

    loadModelOptions(model: ConstructorModel) {
        console.log(model);
        let group = "";
        this.sidePanel.optionsPanel.clear();

        Constructor.instance.deleteAllSides();
        model.printareas.forEach(area => {
            Constructor.instance.addSide(
                area.width,
                area.height,
                parseInt(area.roundCorners),
                area.name
            );
            Constructor.instance.zoomToFit();
        });

        let state = constructorConfiguration && constructorConfiguration.sharedState;
        if (state){
            Constructor.instance.setState(state);
        }

        this.order.setModel(model);

        model.constructor_model_option.forEach(option => {
            if (option.namegroup != group) {
                group = option.namegroup;
                this.sidePanel.optionsPanel.append(
                    new Row(
                        new Spacer()
                    ),
                    new Row(
                        new Spacer(),
                        new LabelControl(group).addClass("bold"),
                        new Spacer(),
                    )
                );
            }
            let array = option.zalivka.split(',').map(s => parseInt(s));
            this.sidePanel.optionsPanel.append(
                ToggleButton.of(
                    this.order,
                    () => {
                        this.order.setSelectedOptions([option])
                        Constructor.instance.preview.clearFills();
                        Constructor.instance.preview.setFills(option.constructor_value, ...array);
                    },
                    () => this.order.hasOption(option),
                    new IconControl(Icon.SQUARE)
                        .setColor(option.constructor_value),
                    new LabelControl(option.name),
                    new Spacer(),
                    //new LabelControl(option.price),
                    new LabelControl(option.priceText),
                )
            );
        })
    }

    bindDelKey() {
        document.addEventListener("keydown", e => {
            if (e.keyCode == 46) {
                let selection = Constructor.instance.getSelection();
                if (selection && !selection.isEditing()) {
                    selection.remove();
                }
            }
        }, false);
    }


}