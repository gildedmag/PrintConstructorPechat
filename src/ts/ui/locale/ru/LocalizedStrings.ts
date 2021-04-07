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
        'Rectangle': 'Добавить квадрат',
        'Triangle': 'Добавить треугольник',
        'Text': 'Текст',
        'Image': 'Загрузить фото',
        'Alignment': 'Выравнивание',
        'Font': 'Стиль шрифта',
        'Font Family': 'Выбор шрифта',
        'Font Size': 'Размер шрифта',
        'Color': 'Цвет',
        'Transparency': 'Прозрачность',
        'Letter Spacing': 'Межбуквенный интервал',
        'Line Height': 'Межстрочный интервал',
        'Shadow': 'Тень',
        'Brightness': 'Яркость',
        'Darkness': 'Затемнение',
        'Emboss': 'Рельеф',
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
        'Price without discount': 'Цена без скидки',
        'Price with discount': 'Итоговая стоимость',
        'Discount': 'Ваша скидка',
        'Cancel': 'Отмена',
        'Product added to cart': 'Продукт добавлен',
        'Share as Link': 'Поделиться ссылкой',
        'Choose other product': 'Выбрать другую модель',
        'Real Product Photos': 'Примеры работ',
        'Page': 'Объекты',
        'Layers': 'Слои',
        'Stickers': 'Стикеры',
        'Properties': 'Свойства объекта',
        'Fonts': 'Шрифты',
        'Filters': 'Фильтры',
        'Product Info': 'Продукт',
        'Export & Sharing': 'Экспорт',
        'Options': 'Опции',
        'Side': 'Сторона печати',
        'Toggle Sidebar': 'Компактный вид',
        'Zoom In': 'Приблизить',
        'Zoom Out': 'Отдалить',
        'Zoom to Fit': 'На весь экран',
        'Snap to Grid': 'Притягивание к сетке',
        'Snap to Objects': 'Притягивание к объектам',
        'Toggle 3D Mode': '2D/3D-режим',
        'Undo': 'Отменить',
        'Redo': 'Вернуть',
        'Duplicate': 'Клонировать',
        'Delete': 'Удалить',
        'The link is copied to clipboard!': 'Ссылка скопирована в буфер обмена!',
        'Copy to Clipboard': 'Скопировать в буфер обмена',
        '$': '₽',
        '3D-Preview': 'Просмотр в 3D',
        'Exit 3D-Preview': 'Выйти из просмотра',
        'Add Text': 'Добавить текст',
        'Error': 'Ошибка',
        'Please select one file of Jpeg or Png or Heic type!': 'Пожалуйста, выберите один файл!',
        'Please select Jpeg or Png or Heic image!': 'Пожалуйста, выберите файл изображения в формате .jpg, .png или .heic!',
        'Failed to upload HEIC file!': 'Извините, ваш HEIC файл не может быть распознан нашей системой!',
        'Uploading HEIC file will take some time!': 'Загрузка и обработка HEIC файла может занять некоторое время, пожалуйста подождите',

    }

    static translate(key: string): string {
        if (key == '$' && ConstructorUI.instance.currencySymbol){
            return ConstructorUI.instance.currencySymbol;
        }

        if (constructorConfiguration
            && constructorConfiguration.languageItems
            && constructorConfiguration.languageItems[key]
        ) {
            return constructorConfiguration.languageItems[key];
        }

        if (this.translation[key]) {
            return this.translation[key];
        }
        
        return key;
    }

}
