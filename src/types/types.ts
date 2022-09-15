export type ProductType = {
    id: string, // unique string
    name: string,
    price: number, // uah
    units: UnitsType,
    description: string,
    photo: PhotosType,
    quantity: number
}

export type UnitsType = 'mm' | 'cm' | 'm'

// photo (string)
export type PhotosType = {
    small: string | null,
    large: string | null
}