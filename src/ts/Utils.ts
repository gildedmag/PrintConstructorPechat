class Utils {

    static logMethodName(): void {
        if (Constructor.settings.debug) {
            let obj = {stack: ""};
            let message = "";
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

}