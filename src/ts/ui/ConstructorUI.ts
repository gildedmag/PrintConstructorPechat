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
    pagerBarMobile: UIControl;
    bottomBar: BottomBar;
    addToCartPopover: AddToCartPopover;

    options: pechat.Options;
    order: Order;

    currencySymbol: string;

    static instance: ConstructorUI;
    static test = ConstructorUI.init();

    dist = 0;
    startX = 0;
    startY = 0;
    x0 = 0;
    y0 = 0;
    scrollX = 0;
    scrollY = 0;
    zoom = 1;
    unlockSelectionAfterTouchEnd = false;


    getClassName(): string {
        return "constructor-ui-container";
    }

    static onReadyHandler = () => true;

    static onReady(handler: () => any) {
        console.log("onReady");
        Constructor.onReadyHandler = handler();
    }

    private constructor() {
        super();
        ConstructorUI.instance = this;

        try {
            this.currencySymbol = (constructorConfiguration && constructorConfiguration.currencySymbol) ? constructorConfiguration.currencySymbol : this.translate('$');
        } catch (e) {
            this.currencySymbol = this.translate('$');
        }

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
            .showWhen(Constructor.instance, () => Constructor.instance.sides.length > 1 && Constructor.instance.is2D())
            .addClass('pager-toolbar')
            .addClass('desktop')
            .tooltip('Side');
        this.pagerBarMobile = new Row(
            new Spacer(),
            new ConditionalButton(
                () => Constructor.instance.setActiveSide(Constructor.instance.getActiveSide().getIndex() - 1),
                () => Constructor.instance.getActiveSide().getIndex() > 0,
                Icon.CHEVRON_CIRCLE_LEFT
            ),
            //new Spacer(),
            new TriggeredLabelControl(
                Constructor.instance,
                () => Constructor.instance.getActiveSide().name
            ),
            //new Spacer(),
            new ConditionalButton(
                () => Constructor.instance.setActiveSide(Constructor.instance.getActiveSide().getIndex() + 1),
                () => Constructor.instance.getActiveSide().getIndex() < Constructor.instance.sides.length - 1,
                Icon.CHEVRON_CIRCLE_RIGHT
            ),
            new Spacer(),
        ).showWhen(Constructor.instance, () => Constructor.instance.sides.length > 1 && Constructor.instance.is2D())
            .addClass('pager-toolbar-mobile')
            .addClass('mobile')
            //.addClass('pager')
            .tooltip('Side');

        this.append(
            this.constructorControl,
            // this.toolBar,
            // this.sidePanel,
            // this.sideBar,
            this.topBar,
            //this.bottomBar,
            // this.addToCartPopover,
            // this.pagerBar,
            // this.pagerBarMobile,
        );

        Constructor.instance.addElement(ElementType.CIRCLE)
        Constructor.instance.addElement(ElementType.RECTANGLE)
        Constructor.instance.addElement(ElementType.TRIANGLE)
        Constructor.instance.addElement(ElementType.TEXT)

        host.appendChild(this.container);
        this.bindDelKey();
        this.bindDoubleClick();

        window.addEventListener("load", function () {
            setTimeout(function () {
                // document.head.innerHTML = document.head.innerHTML + '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1" /><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />'
                window.scrollTo(0, 0);
            }, 0);
            setTimeout(() => window.scrollTo(0, 1), 1000);
        });
        window.addEventListener("orientationchange", function () {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 0);
        });
        //window.addEventListener("load", function () {


        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 0);
        //});

        Constructor.onReadyHandler && Constructor.onReadyHandler();
        ConstructorUI.instance.sidePanel.layersPanel.update(true);

        window.addEventListener("touchstart", e => {
            document.getElementsByClassName("toolbar top")[0].innerText = "touchstart";
            //document.getElementById("console").innerText = "123456";
            //Constructor.instance.getElement().addEventListener("touchstart", e => {
            if (e.touches.length === 2) {

                Constructor.instance.addClass("notransition");
                e.preventDefault();

                //Constructor.instance.getActiveSide().lock();
                let side = Constructor.instance.getActiveSide();
                // if (side.selection != null && !side.selection.isLocked()){
                //     this.unlockSelectionAfterTouchEnd = true;
                //     side.selection.setLocked(true);
                //     side.selection.object.editable = false;
                // }
                //side.deselect();
                side.freeze();
                this.zoom = Constructor.instance.getZoom();
                this.dist = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY);
                this.startX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
                this.startY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                this.x0 = e.touches[0].pageX;
                this.y0 = e.touches[0].pageY;
                scrollX = side.container.scrollLeft;
                scrollY = side.container.scrollTop;
                //document.getElementById("console").innerText = dist;
            }
        });

        this.toggleClass("collapsed");

        window.addEventListener("touchmove", e => {
            if (e.touches.length === 2) {
                e.preventDefault();
                let side = Constructor.instance.getActiveSide();
                side.deselect();
                var d = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY);
                if (Math.abs(this.dist - d) > 1) {
                    //document.getElementById("console").innerText = "zoom " + (dist - d);
                    //Constructor.instance.toggleClass("notransition");
                    let z = this.zoom * (1 - ((this.dist - d) / 1000))
                    if (z >= 0.8) {
                        //document.getElementsByClassName("toolbar top")[0].innerText = z;
                        side.setZoom(z);
                        //Constructor.instance.toggleClass("notransition");
                        let page = Constructor.instance.getActiveSide().getElement();
                        if (page.clientWidth != page.scrollWidth || page.clientHeight != page.scrollHeight) {

                        }
                    }
                } else {
                    // centerX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
                    // centerY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                    side.container.scrollLeft = scrollX + this.x0 - e.touches[0].pageX;
                    side.container.scrollTop = scrollY + this.y0 - e.touches[0].pageY;
                    //document.getElementById("console").innerText = "pan " + (dist - d);
                }
            }
        });

        window.addEventListener("touchend", e => {
            document.getElementsByClassName("toolbar top")[0].innerText = "touchend";
            Constructor.instance.removeClass("notransition");
            Constructor.instance.getActiveSide().unfreeze();
            // if (this.unlockSelectionAfterTouchEnd){
            //     this.unlockSelectionAfterTouchEnd = false;
            //     Constructor.instance.getSelection().setLocked(false);
            // }
        });



        let dateUTC = ConstructorUI.fetchHeader(location.origin + "/render/js/constructor.js", 'Last-Modified');
        let date = new Date(dateUTC);
        document.getElementsByClassName("toolbar top")[0].innerText = (date.getHours() + ":" + date.getMinutes());
    }

    static fetchHeader(url, wch) {
        try {
            var req = new XMLHttpRequest();
            req.open("HEAD", url, false);
            req.send(null);
            if (req.status == 200) {
                return req.getResponseHeader(wch);
            } else return false;
        } catch (er) {
            return er.message;
        }
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

        this.getCategoryOptions(categoryId, options => {
            if (!options || !options.constructor_models) {
                console.error('error loading category options for category #' + categoryId)
                return;
            }
            this.options = options;
            let modelLoaded = c.preview.modelName != null;
            this.sidePanel.modelsPanel.append(
                new LabelControl("Product Types").addClass('title'),
            );
            let modelsContainer = new FlowControl(3, false);
            this.sidePanel.modelsPanel.append(modelsContainer);
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
                                    this.show3D();
                                }
                            },
                            error => alert(error)
                        );
                        modelLoaded = true;
                    } catch (e) {
                        alert(e.message);
                    }
                } else if (!this.order.model && c.preview.modelName == model.file_main) {
                    this.loadModelOptions(model, options);
                    this.show3D();
                }

                let url = model.thumb;
                let button = new ToggleButton(
                    () => {
                        c.loadModel(model.file_main, () => {
                            if (constructorConfiguration && constructorConfiguration.sharedState) {
                                this.show3D();
                            }
                        });
                        this.loadModelOptions(model, options);
                        Constructor.instance.changed();
                    },
                    () => {
                        if (!ConstructorUI.instance.order.model) {
                            return false;
                        }
                        return ConstructorUI.instance.order.model.constructor_model_id == model.constructor_model_id;
                    },
                    null
                ).append(new ImageControl(url).addClass('zoom'))
                    .tooltip(model.description, true);
                modelsContainer.append(button);
                if (active) {
                    button.addClass('active');
                }
            });
        })
    }

    show3D() {
        Constructor.instance.setMode(Mode.Mode3D);
        if (!this.order.model || !this.order.model.constructor_model_option || !this.order.model.constructor_model_option.length) {
            ConstructorUI.instance.sidePanel.modelsPanel.show();
        } else {
            ConstructorUI.instance.sidePanel.optionsPanel.show();
        }
    }

    show2D() {
        Constructor.instance.setMode(Mode.Mode2D);
        if (!Constructor.instance.getActiveSide() || Constructor.instance.getActiveSide().isEmpty()) {
            ConstructorUI.instance.sidePanel.newElementPanel.show();
        } else {
            ConstructorUI.instance.sidePanel.layersPanel.show();
        }
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
        Constructor.instance.sides.forEach(side => side.changed());
    }

    loadModelOptions(model: ConstructorModel, options: Options) {
        this.sidePanel.optionsPanel.clear();

        if (!constructorConfiguration || !constructorConfiguration.sharedState || Constructor.instance.sides.length != model.printareas.length || Constructor.instance.sides[0].name != model.printareas[0].name) {
            if (Constructor.instance.sides.length != model.printareas.length) {
                this.createSides(model.printareas);
            } else {
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
        ConstructorUI.instance.sidePanel.layersPanel.update(true);
    }

    bindDelKey() {
        document.addEventListener("keydown", e => {
            if (e.keyCode == 46 && (!Popover.instance || !Popover.instance.isVisible())) {
                let selection = Constructor.instance.getSelection();
                if (selection && !selection.isEditing() && document.activeElement == document.body) {
                    selection.remove();
                }
            } else if (e.keyCode == 27) {
                Popover.instance.hide();
            }
        }, false);
    }

    bindDoubleClick() {
        Constructor.onTextEditingEntered(() => {
            console.log("onTextEditingEntered");
            setTimeout(() => {
                ConstructorUI.instance.sidePanel.selectionPanel.show();
            }, 100);
        })
        // Constructor.instance.onSelect()
        // Constructor.instance.container.addEventListener("dblclick", e => {
        //     console.log(e);
        //     setTimeout(() => {
        //         console.log("dblclk");
        //         let selection = Constructor.instance.getSelection();
        //             ConstructorUI.instance.sidePanel.selectionPanel.show();
        //         if (selection && !selection.isEditing() && Constructor.instance.is2D()) {
        //         }
        //     }, 100);
        // }, false);
    }


    getCategoryOptions(categoryId: number, callback: (options: Options) => any) {
        let url = 'index.php?route=product/category/category&category_id=' + categoryId;
        //let url = this.domain + 'index.php?route=product/category/category&category_id=' + categoryId;
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest')
        xhr.onreadystatechange = (res) => {
            if (xhr.readyState === 4 && callback) {
                callback(JSON.parse(xhr.response) as Options);
            }
        };
        xhr.send();
    }


}
