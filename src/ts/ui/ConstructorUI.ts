/// <reference path="UIControl.ts" />
/// <reference path="toolbar/ToolBar.ts" />
/// <reference path="panel/ModelsPanel.ts" />
/// <reference path="ConstructorController.ts" />
/// <reference path="pechat.photo/Options.ts" />

class ConstructorUI extends UIControl {

    constructorControl: ConstructorController;
    sideBar: SideBar;
    sidePanel: SidePanel;
    toolBar: ToolBar;
    topBar: TopBar;
    bottomBar: BottomBar;

    options: pechat.Options;

    static instance: ConstructorUI;
    static test = ConstructorUI.init();

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

        this.append(
            this.constructorControl,
            this.toolBar,
            this.sidePanel,
            this.sideBar,
            this.topBar,
            this.bottomBar
        );

        host.appendChild(this.container);
        this.bindDelKey();

        this.loadPrintOptions();

        // setTimeout(() => {
        //     //alert("set");
        //     const viewportmeta = document.querySelector('meta[name=viewport]');
        //     viewportmeta.setAttribute('content', "initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0");
        // }, 1000)


    }

    public static init() {
        document.addEventListener("DOMContentLoaded", function () {
            new ConstructorUI();
        });
    }

    loadPrintOptions() {
        Constructor.settings.urls.models = 'https://pechat.photo/catalog/view/javascript/constructor/v2/models/';
        PechatUtils.getCategforyOptions(42, options => {
            console.log(options);
            options.options.forEach(option => {
                option.option_values.forEach(value => {
                    //value
                    //console.log("option.value = ", value);
                });
            });
            options.constructor_models.forEach(model => {


                if (model.file_main == Constructor.instance.preview.modelName.trim()) {
                    let group = "";
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
                            Button.of(
                                () => {
                                    Constructor.instance.preview.clearFills();
                                    Constructor.instance.preview.setFills(option.constructor_value, ...array);
                                },
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


                ;

                let url = model.thumb;
                let modelUrl = model.file_main
                this.sidePanel.modelsPanel.append(
                    Button.of(
                        () => {
                            PechatUtils.getModel(model.file_main, json => {
                                Constructor.instance.preview.setModel(model.file_main, json);
                            })
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