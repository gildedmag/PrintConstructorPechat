class Utils {

    static logMethodName(): void {
        if (Constructor.settings.debug) {
            let obj = {stack: ""};
            let message = "";
            if (!Error.captureStackTrace){
                return;
            }
            Error.captureStackTrace(obj, this.logMethodName);
            let first = true;
            obj.stack.split("\n").forEach(line => {
                if (line.includes("Constructor.") || line.includes("Side2D.") || line.includes("Element2D.")) {
                    line.split(" ").forEach(part => {
                        if (part.startsWith("Constructor.") || part.startsWith("Side2D.") || part.startsWith("Element2D.")) {
                            if (!first) {
                                message += "< " + part + "\n";
                            } else {
                                message += part + "\n";
                                first = false;
                            }
                        }
                    })

                }
            })
            if (message != "") {
                message = '-----------------------------------------------\n'
                    + message
                    + '-----------------------------------------------\n';
                console.log(message);
            }
        }
    }

    static

    randomInt(floor
                  :
                  number
    ):
        number {
        return Math.floor(Math.random() * floor)
    }

    static

    loadJSON(url
                 :
                 string, callback
                 :
                 (json: string) => void
    ) {
        let request = new XMLHttpRequest();
        request.overrideMimeType(Constants.APPLICATION_JSON);
        request.open(Constants.GET, url, true);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.responseText);
            }
        };
        request.send(null);
    }

    static

    arrayMove(arr
                  :
                  any[], from
                  :
                  number, to
                  :
                  number
    ) {
        let element = arr[from];
        arr.splice(from, 1);
        arr.splice(to, 0, element);
    }

    static

    arrayMoveToStart(arr
                         :
                         any[], from
                         :
                         number
    ) {
        this.arrayMove(arr, from, 0)
    }

    static

    arrayMoveToEnd(arr
                       :
                       any[], from
                       :
                       number
    ) {
        this.arrayMove(arr, from, arr.length - 1)
    }

    public static div(innerText?: string): HTMLDivElement {
        let div = document.createElement(Constants.DIV);
        if (innerText) {
            div.innerText = innerText;
        }
        return div;
    }

    public static input(): HTMLInputElement {
        return document.createElement(Constants.INPUT)
    }

    static isFullscreen() {
        return window.innerWidth == screen.width && window.innerHeight == screen.height
    }

    static isCompact(): boolean {
        return window.innerWidth < 1000;
    }

    static isIos() {
        return [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    static toUrlParameters(data: object){
        let url = Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
        console.log(url);
        return url;
    }

    static copyToClipboard(text): boolean {
        if (window.clipboardData && window.clipboardData.setData) {
            return clipboardData.setData("Text", text);
        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            }
            catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            }
            finally {
                document.body.removeChild(textarea);
            }
        }
    }

}