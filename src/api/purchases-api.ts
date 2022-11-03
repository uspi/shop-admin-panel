import { PostgrestResponse } from '@supabase/supabase-js'
import { v4 as uuid } from 'uuid'
import { PurchaseType } from '../types/types'
import { dbInstanse } from './api'

export const purchasesAPI = {

    getPurchase(purchaseId: string) {
        const purchases = this.getPurchasesAll()

        return purchases?.filter(p => p.id === purchaseId)
    },

    getPurchasesAll(): PurchaseType[] | undefined {
        // check is has purchases array
        const currentPurchasesStr = localStorage.getItem('purchases')

        // if purchases empty
        if (currentPurchasesStr === null) { return undefined }

        return JSON.parse(currentPurchasesStr) as PurchaseType[]
    },

    updatePurchase(
        purchaseId: string,
        updated: PurchaseType,
        isSetCurrentTime: boolean = false
    ) {
        const purchases = this.getPurchasesAll()
        if (!purchases) { return }

        // current time
        const time = new Date(Date.now()).toUTCString()

        const newPurchases = purchases.filter(p => p.id !== purchaseId)

        isSetCurrentTime && localStorage.setItem(
            'purchases',
            JSON.stringify(purchases.map((value, index, array)=> {
                if(value.id !== purchaseId) return value;
                return {...updated, created_at: time }
            })
        ))
        
        isSetCurrentTime || localStorage.setItem(
            'purchases',
            JSON.stringify(purchases.map((value, index, array)=> {
                if(value.id !== purchaseId) return value;
                return {...updated }
            })
        ))


        // const newPurchases = purchases.filter(p => p.id !== purchaseId)

        // isSetCurrentTime && localStorage.setItem(
        //     'purchases',
        //     JSON.stringify([...newPurchases, { ...updated, id: purchaseId, created_at: time }])
        // )
        // isSetCurrentTime || localStorage.setItem(
        //     'purchases',
        //     JSON.stringify([...newPurchases, { ...updated, id: purchaseId }])
        // )
    },

    deletePurchase(purchaseId: string) {
        const purchases = this.getPurchasesAll()

        if (!purchases) { return }

        const newPurchases = purchases.filter(p => p.id !== purchaseId)

        localStorage.setItem('purchases', JSON.stringify(newPurchases))
    },

    // ovveride all old data
    setPurchases(
        purchases: PurchaseType[],
        isSetCurrentTime: boolean = false
    ) {
        // localStorage.clear()
        // this.addPurchases(purchases, isSetCurrentTime)

        purchases.forEach((purchase, index) => {
            // get id
            const newId = uuid()

            // current time
            const time = new Date(Date.now()).toUTCString()

            // ignoring old data
            if (index === 0) {
                isSetCurrentTime && localStorage.setItem(
                    'purchases',
                    JSON.stringify([{ ...purchase, id: newId, created_at: time }])
                )
                isSetCurrentTime || localStorage.setItem(
                    'purchases', JSON.stringify([{ ...purchase, id: newId }])
                )

                return
            }

            // values before
            const currentpurchasesStr = localStorage.getItem('purchases')
            if (currentpurchasesStr === null) return
            const currentpurchasesList: PurchaseType[] = JSON.parse(currentpurchasesStr) as PurchaseType[]
            
            isSetCurrentTime && localStorage.setItem(
                'purchases',
                JSON.stringify([...currentpurchasesList, { ...purchase, id: newId, created_at: time }])
            )
            isSetCurrentTime || localStorage.setItem(
                'purchases',
                JSON.stringify([...currentpurchasesList, { ...purchase, id: newId }])
            )
        });
    },

    // old data + purchase
    addPurchase(
        purchase: PurchaseType,
        isSetCurrentTime: boolean = false
    ): string {
        // get id
        const newId = uuid()

        // current time
        const time = new Date(Date.now()).toUTCString()

        // check is has purchases array
        const currentPurchasesStr = localStorage.getItem('purchases')

        // if purchases empty
        if (currentPurchasesStr === null) {
            isSetCurrentTime && localStorage.setItem(
                'purchases',
                JSON.stringify([{ ...purchase, id: newId, created_at: time }])
            )
            isSetCurrentTime || localStorage.setItem(
                'purchases', JSON.stringify([{ ...purchase, id: newId }])
            )
            return newId
        }

        // if purchases was stored values
        const currentPurchasesList = JSON.parse(currentPurchasesStr) as PurchaseType[]
        isSetCurrentTime && localStorage.setItem(
            'purchases',
            JSON.stringify([...currentPurchasesList, { ...purchase, id: newId, created_at: time }])
        )
        isSetCurrentTime || localStorage.setItem(
            'purchases',
            JSON.stringify([...currentPurchasesList, { ...purchase, id: newId }])
        )
        return newId
    },

    // old data + purchases
    addPurchases(purchases: PurchaseType[], isSetCurrentTime: boolean = false) {
        purchases.forEach(e => {
            this.addPurchase(e, isSetCurrentTime)
        });
    }
}