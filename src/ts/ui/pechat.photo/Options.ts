declare module pechat {

    export interface ConstructorModelOption {
        class: string;
        constructor_value: string;
        description: string;
        id: string;
        name: string;
        namegroup: string;
        option_id: string;
        option_s: any[];
        price: string;
        priceText: string;
        type: string;
        zalivka: string;
    }

    export interface Printarea {
        height: number;
        name: string;
        price: string;
        roundCorners: string;
        width: number;
    }

    export interface ConstructorModel {
        category_id: string;
        constructor_model_id: string;
        constructor_model_option: ConstructorModelOption[];
        constructor_setting: any[];
        date_added: string;
        description: string;
        file_fillarea: string;
        file_main: string;
        file_printarea: string;
        height: string;
        image: string;
        length: string;
        name: string;
        price: number;
        printareas: Printarea[];
        sort_order: string;
        status: string;
        thumb: string;
        weight: string;
        width: string;
    }

    export interface OptionValue {
        constructor_value: string;
        description: string;
        image: string;
        name: string;
        option_value_id: string;
        option_value_relation_id: any[];
        price: number;
        thumb: string;
        thumb_lg: string;
        thumb_md: string;
    }

    export interface Option {
        constructor_group: string;
        description: string;
        name: string;
        option_id: string;
        option_values: OptionValue[];
        type: string;
    }

    export interface Options {
        category_id: string;
        constructor_models: ConstructorModel[];
        constructor_setting: any[];
        description: string;
        images: string[];
        level: string;
        name: string;
        options: Option[];
        parent_id: string;
        quantity_max: string;
        quantity_min: string;
        quantity_step: string;
        thumb: string;
    }

}

