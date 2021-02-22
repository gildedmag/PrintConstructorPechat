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
            let categories = [];
            for (let i = 0; i < constructorConfiguration.stickerCategories.length; i++) {
                let category = constructorConfiguration.stickerCategories[i];
                categories.push({
                    value: category.id,
                    text: category.name,
                });
            }

            let flow = new FlowControl(2, true);
            flow.append(new SelectControl(
                 value => {
                    this.loadStickers(+value);
                },
                () => +categories[0].value,
                null,
                null,
                null,
                () => categories
            ))
            this.append(flow);
            this.loadStickers(+categories[0].value);
        }
    }

    loadStickers(category: number) {
        this.category = +category;
        if (!this.stickers[category]) {
            fetch(`/index.php?route=constructor/constructor/getCliparts&category=${category}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json, text/javascript, */*; q=0.01'
                }
            }).then(response => {
                response.json().then(json => {
                    let flow = new FlowControl(2, true);
                    this.removeChild(2);
                    this.stickers[category] = json.map(item => new StickerControl(item));
                    this.stickers[category].map(sticker => flow.append(sticker));
                    this.append(flow);

                })
            }).catch(error => {
                console.log(error);
                new Popover("Error")
            })
        } else {
            let flow = new FlowControl(2, true);
            this.removeChild(2);
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