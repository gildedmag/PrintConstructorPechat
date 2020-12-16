/// <reference path="Row.ts" />
class CopyToClipboardPopover extends Popover {

    static message = new Row();

    constructor(title: string, value: string) {
        super(null, null, true,
            new Row(
                new Spacer(),
                new LabelControl(title).addClass("title"),
                new Spacer(),
            ),
            new Row(
                new Spacer(),
                new Button(
                    () => this.copy(),
                    null,
                    value
                ).addClass('copy-text'),
                new Spacer(),
            ),
            CopyToClipboardPopover.message,
            new Row(
                new Spacer(),
                new Button(
                    () => this.hide(),
                    null,
                    "OK"
                ),
                new Spacer(),
            ),
        );
        this.permanent = false;
        document.body.appendChild(this.container);
        //this.copy();
    }

    show() {
        CopyToClipboardPopover.message.clear();
        super.show();
    }

    copy() {
        let node = document.querySelector('.copy-text .label');
        let range = document.createRange();
        range.selectNode(node);
        window.getSelection().addRange(range);
        let successful = false;
        try {
            successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy email command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        CopyToClipboardPopover.message.clear();
        if (successful){
            CopyToClipboardPopover.message.append(
                new Spacer(),
                new LabelControl('The link is copied to clipboard!'),
                new Spacer(),
            );
        }
    }

}