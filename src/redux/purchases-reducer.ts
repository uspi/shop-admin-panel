import { purchasesAPI } from '../api/purchases-api'
import { PurchaseType } from '../types/types'
import { CommonThunkType, InferActionsTypes } from './store'

// STATE STRUCTURE
const initialState = {
    purchases: null as PurchaseType[] | null,
    lastUpdate: null as number | null
}

// REDUCER
export const purchasesReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case 'SHOP/ADMIN-PANEL/SET-PURCHASES': {
            return {
                ...state,
                purchases: action.payload.purchases,
                lastUpdate: Date.now(),
            }
        }

        default:
            return state
    }
}

// ACTIONS STRUCTURE
export const actions = {
    setPurchases: (purchases: PurchaseType[]) =>
    ({
        type: 'SHOP/ADMIN-PANEL/SET-PURCHASES',
        payload: {
            purchases
        }
    } as const),
    // getProduct: (id: string) =>
    // ({
    //     type: 'SHOP/ADMIN-PANEL/GET-PRODUCT',
    //     payload: {
    //         id
    //     }
    // } as const),
    setError: (error: any, stringEquivalent?: string) =>
    ({
        type: 'SHOP/ADMIN-PANEL/SET-ERROR',
        payload: !error ? null : {
            stringEquivalent,
            error,
        },
    } as const),
}

// THUNKS
// export const getPurchases = (
//     pageSize: number = 30
// ): CommonThunkType<ActionsTypes> => {
//     return async (dispatch, getState) => {
//         // reset error status
//         dispatch(actions.setError(null))

//         //let data = await purchasesAPI.getProductsList()
//         let array = [
//             {
//                 "id": "40f734ee-47ff-4734-afd0-7f1cfff3f0e8",
//                 "created_at": "2022-10-29 10:54:44+00",
//                 "product_id": "2d164dd8-0f74-48d2-b830-3179af7d9621",
//                 "customer_name": "John Stevenson",
//                 "quantity": "2", 
//                 "item_name": "Шкаф - купе трехдверный Roko",
//                 "product_price": "14870",
//                 "price_currency": "uah",
//                 "purchase_status": "waiting"
//             },
//             {
//                 "id": "90e55b2d-ce8e-490b-bc3a-6a6b9c2d7338",
//                 "created_at": "2022-10-29 10:56:33.954262+00",
//                 "product_id": "2d164dd8-0f74-48d2-b830-3179af7d9621",
//                 "customer_name": "Stanly Weird",
//                 "quantity": "1", 
//                 "item_name": "Шкаф - купе трехдверный Roko",
//                 "product_price": "14870",
//                 "price_currency": "uah",
//                 "purchase_status": "waiting"
//             },
//             {
//                 "id": "37e2efd7-a65d-4f91-972a-e6f9e5f7bf84",
//                 "created_at": "2022-10-29 10:57:14+00",
//                 "product_id": "8d9bd8f6-7391-4c78-aacd-9685658ab1d1",
//                 "customer_name": "Addy Anri",
//                 "quantity": "3", 
//                 "item_name": "Шкаф-купе Феникс",
//                 "product_price": "18315",
//                 "price_currency": "uah",
//                 "purchase_status": "waiting"
//             },
//         ]

//         let data: any = []
//         array.forEach(element => {
//             data = [...data, element]
//         });


//         // TODO: check for error

//         if (data) {
//             dispatch(actions.setPurchases(data))
//         }
//     }
// }

export const getPurchases = (
): CommonThunkType<ActionsTypes> => {
    return async (dispatch, getState) => {

        // reset error status
        dispatch(actions.setError(null))

        let data = purchasesAPI.getPurchasesAll()

        // TODO: check for error

        if (data) {
            dispatch(actions.setPurchases(data))
        }
    }
}
export const updatePurchase = (
    purchaseId: string,
    updated: PurchaseType,
    isSetCurrentTime: boolean = false
): CommonThunkType<ActionsTypes> => {
    return async (dispatch, getState) => {

        // reset error status
        dispatch(actions.setError(null))

        purchasesAPI.updatePurchase(purchaseId, updated, isSetCurrentTime)
        let data = purchasesAPI.getPurchasesAll()

        // TODO: check for error

        if (data) {
            dispatch(actions.setPurchases(data))
        }
    }
}
export const deletePurchase = (
    purchaseId: string
): CommonThunkType<ActionsTypes> => {
    return async (dispatch, getState) => {

        // reset error status
        dispatch(actions.setError(null))

        purchasesAPI.deletePurchase(purchaseId)
        let data = purchasesAPI.getPurchasesAll()

        // TODO: check for error

        if (data) {
            dispatch(actions.setPurchases(data))
        }
    }
}
export const addPurchase = (
    purchase: PurchaseType,
    isSetCurrentTime: boolean = false
): CommonThunkType<ActionsTypes> => {
    return async (dispatch, getState) => {

        // reset error status
        dispatch(actions.setError(null))

        purchasesAPI.addPurchase(purchase, isSetCurrentTime)
        let data = purchasesAPI.getPurchasesAll()

        // TODO: check for error

        if (data) {
            dispatch(actions.setPurchases(data))
        }
    }
}
export const addPurchases = (
    purchases: PurchaseType[],
    isSetCurrentTime: boolean = false
): CommonThunkType<ActionsTypes> => {
    return async (dispatch, getState) => {

        // reset error status
        dispatch(actions.setError(null))

        purchasesAPI.addPurchases(purchases, isSetCurrentTime)
        let data = purchasesAPI.getPurchasesAll()

        // TODO: check for error

        if (data) {
            dispatch(actions.setPurchases(data))
        }
    }
}
export const setPurchases = (
    purchases: PurchaseType[],
    isSetCurrentTime: boolean = false
): CommonThunkType<ActionsTypes> => {
    return async (dispatch, getState) => {

        // reset error status
        dispatch(actions.setError(null))

        purchasesAPI.setPurchases(purchases, isSetCurrentTime)
        let data = purchasesAPI.getPurchasesAll()

        // TODO: check for error

        if (data) {
            dispatch(actions.setPurchases(data))
        }
    }
}



// types
type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState