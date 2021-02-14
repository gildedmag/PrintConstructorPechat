/// <reference path="../TriggeredUIControl.ts" />
class StickersPanel extends TriggeredUIControl<Constructor> {

    flow: FlowControl;
    category: number;
    stickers = {};

    getClassName(): string {
        return super.getClassName() + " stickers-panel vertical";
    }

    constructor() {
        super(Constructor.instance);
        this.loadCategories();
        this.update();
    }

    show() {
        super.show();
    }



    loadCategories() {
        this.append(
            new Row(
                new Spacer(),
                new LabelControl("Stickers").addClass('bold'),
                new Spacer(),
            ),
        );
        if (constructorConfiguration.stickerCategories) {
            let flow = new FlowControl(2, true);
            for (let i = 0; i < constructorConfiguration.stickerCategories.length; i++) {

                let category = constructorConfiguration.stickerCategories[i];
                flow.append(
                    new Button(() => {
                        this.category = +category.id;
                        this.loadStickers(+category.id);
                        this.update();
                    }, null, category.name)
                )
            }
            this.append(flow);
        }
    }

    loadStickers(category: number) {
        if (!this.stickers[category]) {
            fetch(`/index.php?route=constructor/constructor/getCliparts&category=${category}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json, text/javascript, */*; q=0.01'
                }
            }).then(response => {
                response.json().then(json => {
                    let flow = new FlowControl(2, true);

                    this.clear();
                    this.loadCategories();
                    this.stickers[category] = json.map(item => new StickerControl(item));
                    this.stickers[category].map(sticker => flow.append(sticker));
                    this.append(flow);
                    flow = null;
                })
            }).catch(error => {
                console.log(error);
                new Popover("Error")
            })
        } else {
            let flow = new FlowControl(2, true);
            this.clear();
            this.loadCategories();
            this.stickers[category].map(sticker => flow.append(sticker));
            this.append(flow);
        }

    }

    showed() {
        super.showed();
        this.update();
    }

    updateVisibility() {
        this.trigger.getMode() == Mode.Mode2D && this.trigger.hasTextSelection()
            ? this.show()
            : this.hide();
    }
}
