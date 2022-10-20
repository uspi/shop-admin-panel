export type ProductType = {
    id: string, // uuid v4
    name: string,
    price: string,
    price_currency: string,
    image: string | null,
    quantity: number,
    description: string,
    units: UnitsType,
    created_at: string,
    length: string,
    width: string,
    height: string
}

export type UnitsType = 'mm' | 'cm' | 'm'

export type ColorModeType = 'dark' | 'default' | undefined



// // photo (string)
// export type ImagesType = {
//     small: string | null,
//     large: string | null
// }