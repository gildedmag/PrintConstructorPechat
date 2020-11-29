namespace pechat {

    export class PrintUtils {

        private static url = 'https://pechat.photo/index.php?route=product/category/category&category_id='
        private static modelUrl = 'https://pechat.photo/catalog/view/javascript/constructor/v2/models/'


        static getCategoryOptions(categoryId: number, callback: (options: Options) => any) {
            let url = PrintUtils.url + categoryId;
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

        static getModel(modelName: string, callback: (json: string) => any) {
            let url = PrintUtils.modelUrl + modelName + '.json';
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url, true);
            xhr.withCredentials = true;
            //xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest')
            xhr.onreadystatechange = (res) => {
                if (xhr.readyState === 4 && callback) {
                    callback(xhr.response);
                }
            };
            try {
                xhr.send();
            } catch (e) {
                console.log(e.message);
            }
        }


    }

}

