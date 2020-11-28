class SharePopover extends Popover {

    link: string;

    constructor() {
        super();
    }

    update() {
        this.frame.clear();
        this.frame.append(
            new Row(
                new Spacer(),
                new LabelControl("Share as Link").addClass("title"),
                new Spacer(),
            ),
            new Row(
                new LabelControl("https://pechat.photo/create_constructor?url=" + this.link)
                    .allowUserSelect(),
            ),
            new Row(
                new Spacer(),
                new Button(
                    () => {
                        this.hide();
                    },
                    null,
                    "OK"
                ),
                new Spacer(),
            )
        );
    }

    setValue(link: string) {
        this.link = link;
        this.update();
    }


}