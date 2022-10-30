export type ProductType = {
    id: string, // uuid v4
    name: string,
    price: string,
    price_currency: string,
    image: string | undefined,
    quantity: number,
    description: string,
    units: UnitsType,
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



// // photo (string)
// export type ImagesType = {
//     small: string | null,
//     large: string | null
// }