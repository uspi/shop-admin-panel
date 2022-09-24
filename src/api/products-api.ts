import { PostgrestResponse } from '@supabase/supabase-js'
import axios, { AxiosResponse } from 'axios'
import { ProductType } from '../types/types'
import { dbInstanse } from './api'

export const productsAPI = {
    async getProductsList() {
        // Make a request
        const { data, error }: PostgrestResponse<ProductType>  = await dbInstanse.from('Products').select('*')
        console.log(data)
        //console.log(error)
        return data
        
        // let dataPromise: Promise<AxiosResponse<any>>

        // try {
        //     dataPromise = axios.get('products, {}')
        // }
    }
}