class Utils {

    static randomInt(floor: number): number {
        return Math.floor(Math.random() * floor)
    }

    static loadJSON(url: string, callback: (json: string) => void) {
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

    static arrayMove(arr: any[], from: number, to: number) {
        let element = arr[from];
        arr.splice(from, 1);
        arr.splice(to, 0, element);
    }

    static arrayMoveToStart(arr: any[], from: number) {
        this.arrayMove(arr, from, 0)
    }

    static arrayMoveToEnd(arr: any[], from: number) {
        this.arrayMove(arr, from, arr.length - 1)
    }

}