class LocalizedStrings {

    static translation = {
        'Share link': 'Поделиться ссылкой',
        'Product Types': 'Тип продукта',
        'Clear Side': 'Очистить холст',
        'Export JPEG': 'Сохранить в JPEG',
        'Export PNG': 'Сохранить в PNG',
        'Export SVG': 'Сохранить в SVG',
        'Photos': 'Примеры продукции',
        'Circle': 'Добавить круг',
        'Rectangle': 'Добавить Квадрат',
        'Triangle': 'Добавить треугольник',
        'Text': 'Добавить текст',
        'Image': 'Загрузить фото',
        'Alignment': 'Выравнивание',
        'Font': 'Стиль шрифта',
        'Font Family': 'Выбор шрифта',
        'Font Size': 'Размер шрифта',
        'Color': 'Цвет',
        'Letter Spacing ': 'Межсимвольный интервал',
        'Line Height': 'Межстрочный интервал',
        'Shadow': 'Тень',
        'Brightness': 'Яркость',
        'Darknness': 'Затемнение',
        'Blur': 'Размытие',
        'Sharpen': 'Резкость',
        'Invert': 'Инверсия',
        'Grayscale': 'Перевести в ЧБ',
        'Reset Filters': 'Сбросить фильтры',
        'Option Required': 'Выберите опции',
        'Please select required options!': 'Пожалуйста, выберите необходимые опции',
        'Add to Cart': 'Добавить в корзину',
        'Quantity': 'Количество',
        'Price': 'Цена',
        'Discount': 'Скидка',
        'Cancel': 'Отмена',
        'Product added to cart': 'Продукт добавлен',
        'Share as Link': 'Поделиться ссылкой',
        'Choose other product': 'Выбрать другую модель',
    }

    static translate(key: string): string {
        if (this.translation[key]) {
            return this.translation[key];
        }
        return key;
    }

}