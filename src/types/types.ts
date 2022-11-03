export type ProductType = {
    id: string, // uuid v4
    name: string,
    price: string,
    price_currency: string,
    image: string | undefined,
    quantity: number,
    description: string,
    units: UnitsType | undefined,
    created_at: string,
    length: string,
    width: string,
    height: string
}

export type PurchaseType = {
    id: string,
    product_id: string,
    customer_name: string,
    quantity: string,
    created_at: string,
    item_name: string,
    product_price: string,
    price_currency: string, 
    purchase_status: string
}

export type UnitsType = 'mm' | 'cm' | 'm'
export type PurchaseStatus = 'waiting' | 'processing' | 'delivery in progress' | 'delivered' | 'problem' | 'done'
export type ColorModeType = 'dark' | 'default' | undefined

export const UnitsTypeList = ['mm', 'cm', 'm']
export const PurchaseStatusList = [
    'waiting', 'processing', 'delivery in progress', 'delivered', 'problem', 'done']
export const PriceCurrencyList = ['UAH', 'USD', 'EUR']

export const formatBytes = (bytes: number, decimals = 2): string => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

// // photo (string)
// export type ImagesType = {
//     small: string | null,
//     large: string | null
// }