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
            new Row(
                new LabelControl("Discounted Price"),
                new Spacer(),
                new TriggeredLabelControl(
                    this.order,
                    () => this.order.getDiscountPrice()
                ).addClass('discount'),
            ).showWhen(this.order, () => this.order.getDiscountPrice() != this.order.getPrice()),
            new Row(),
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
                    c.loadModel(model.file_main);
                }

                let url = model.thumb;
                this.sidePanel.modelsPanel.append(
                    Button.of(
                        () => {
                            c.loadModel(model.file_main);
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

    loadModelOptions(model: ConstructorModel, options: Options) {
        console.log(model);
        let group = "";
        this.sidePanel.optionsPanel.clear();

        if (!constructorConfiguration || !constructorConfiguration.state){
            Constructor.instance.deleteAllSides();
            model.printareas.forEach(area => {
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

        this.order.setModel(model);

        let groupPanels: OptionGroupPanel[] = [];

        options.options.forEach(optionGroup => {
            let groupPanel = new OptionGroupPanel(optionGroup);
            groupPanels.push(groupPanel);
        });

        model.constructor_model_option.forEach(option => {
            groupPanels.forEach(groupPanel => {
                if (option.namegroup == groupPanel.option.name){
                    groupPanel.addOption(option);
                }
            })
        })

        groupPanels.forEach(groupPanel => {
            if (groupPanel.values.length > 0){
                this.sidePanel.optionsPanel.append(groupPanel);
            }
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