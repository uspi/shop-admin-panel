import { PostgrestResponse } from '@supabase/supabase-js'
import { ProductType } from '../types/types'
import { dbInstanse } from './api'

export const purchasesAPI = {
    async getPurchasesList() {
        // Make a request
        const { data, error }: PostgrestResponse<ProductType>  = await dbInstanse.from('Purchases').select('*')
        console.log(data)
        //console.log(error)
        return data
        
        // let dataPromise: Promise<AxiosResponse<any>>

        // try {
        //     dataPromise = axios.get('products, {}')
        // }
    },

    async setPurchase(productId: string, newProduct: ProductType){
        // TODO
        const { data, error }: PostgrestResponse<ProductType>  = await dbInstanse.from('Products').update(newProduct)
    }
}