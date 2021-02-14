declare var constructorConfiguration: {
    createDefaultSide: boolean,
    currencySymbol: string,
    domain: string,
    previewBackground: string,
    modelsUrl: string,
    categoryId: string,
    printWidth: string,
    sharedState: any,
    selectedOptions: object,
    stickerCategories: [{ id: number, name: string }],
    fonts: [any],
}

declare var clipboardData: any;

declare function heic2any(
    {
        blob,
        toType,
        quality,
        gifInterval,
        multiple,
    }: {
        blob: Blob;
        multiple?: true;
        toType?: string;
        quality?: number;
        gifInterval?: number;
    }
): Promise<Blob>;
