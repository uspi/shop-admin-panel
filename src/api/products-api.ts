import { PostgrestResponse } from '@supabase/supabase-js'
import axios, { AxiosResponse } from 'axios'
import { ProductType } from '../types/types'
import { v4 as uuid } from 'uuid'
import { dbInstanse } from './api'

// ONLINE DB
// export const productsAPI = {
//     async getProductsList() {
//         // Make a request
//         const { data, error }: PostgrestResponse<ProductType>  = await dbInstanse.from('Products').select('*')
//         console.log(data)
//         //console.log(error)
//         return data

//         // let dataPromise: Promise<AxiosResponse<any>>

//         // try {
//         //     dataPromise = axios.get('products, {}')
//         // }
//     },

//     async setProduct(productId: string, newProduct: ProductType){
//         const { data, error }: PostgrestResponse<ProductType>  = await dbInstanse.from('Products').update(newProduct)
//     }
// }

export const productsAPI = {
    getProducts(productId: string) {
        const products = this.getProductsAll()

        return products?.filter(p => p.id === productId)
    },

    getProductsAll(): ProductType[] | undefined {
        // check is has products array
        const currentProductStr = localStorage.getItem('products')

        // if products empty
        if (currentProductStr === null) { return undefined }

        return JSON.parse(currentProductStr) as ProductType[]
    },

    updateProduct(
        productId: string,
        updated: ProductType,
        isSetCurrentTime: boolean = false
    ) {
        const products = this.getProductsAll()
        if (!products) { return }

        // current time
        const time = new Date(Date.now()).toUTCString()

        isSetCurrentTime && localStorage.setItem(
            'products',
            JSON.stringify(products.map((value, index, array) => {
                if (value.id !== productId) return value;
                return { ...updated, created_at: time }
            })
            ))

        isSetCurrentTime || localStorage.setItem(
            'products',
            JSON.stringify(products.map((value, index, array) => {
                if (value.id !== productId) return value;
                return { ...updated }
            })
            ))
    },

    deleteProduct(productId: string) {
        const products = this.getProductsAll()

        if (!products) { return }

        const newProduct = products.filter(p => p.id !== productId)

        localStorage.setItem('products', JSON.stringify(newProduct))
    },

    // ovveride all old data
    setProducts(
        products: ProductType[],
        isSetCurrentTime: boolean = false
    ) {
        // localStorage.clear()
        // this.addProducts(products, isSetCurrentTime)



        products.forEach((product, index) => {
            // get id
            const newId = uuid()

            // current time
            const time = new Date(Date.now()).toUTCString()

            // ignoring old data
            if (index === 0) {
                isSetCurrentTime && localStorage.setItem(
                    'products',
                    JSON.stringify([{ ...product, id: newId, created_at: time }])
                )
                isSetCurrentTime || localStorage.setItem(
                    'products', JSON.stringify([{ ...product, id: newId }])
                )

                return
            }

            // values before
            const currentProductsStr = localStorage.getItem('products')
            if (currentProductsStr === null) return
            const currentProductsList: ProductType[] = JSON.parse(currentProductsStr) as ProductType[]
            
            isSetCurrentTime && localStorage.setItem(
                'products',
                JSON.stringify([...currentProductsList, { ...product, id: newId, created_at: time }])
            )
            isSetCurrentTime || localStorage.setItem(
                'products',
                JSON.stringify([...currentProductsList, { ...product, id: newId }])
            )
        });
    },

    // old data + product
    addProduct(
        product: ProductType,
        isSetCurrentTime: boolean = false
    ): string {
        // get id
        const newId = uuid()

        // current time
        const time = new Date(Date.now()).toUTCString()

        // check is has purchases array
        const currentProductsStr = localStorage.getItem('products')

        // if purchases empty
        if (currentProductsStr === null) {
            isSetCurrentTime && localStorage.setItem(
                'products',
                JSON.stringify([{ ...product, id: newId, created_at: time }])
            )
            isSetCurrentTime || localStorage.setItem(
                'products', JSON.stringify([{ ...product, id: newId }])
            )
            return newId
        }

        // if products was stored values
        const currentProductsList = JSON.parse(currentProductsStr) as ProductType[]
        isSetCurrentTime && localStorage.setItem(
            'products',
            JSON.stringify([...currentProductsList, { ...product, id: newId, created_at: time }])
        )
        isSetCurrentTime || localStorage.setItem(
            'products',
            JSON.stringify([...currentProductsList, { ...product, id: newId }])
        )
        return newId
    },

    // old data + products
    addProducts(products: ProductType[], isSetCurrentTime: boolean = false) {
        products.forEach(e => {
            this.addProduct(e, isSetCurrentTime)
        });
    }
}