import { ProductType } from '../types/types'
import { InferActionsTypes } from './store'

// STATE STRUCTURE
const initialState = {
    products: null as ProductType[] | null,
    lastUpdate: null as number | null
}

// REDUCER
export const productsReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case 'SHOP/ADMIN-PANEL/SET-PRODUCTS': {
            return {
                ...state,
                products: action.payload.products,
                lastUpdate: Date.now(),
            }
        }

        default:
            return state
    }
}

// ACTIONS STRUCTURE
export const actions = {
    setProducts: (products: ProductType[]) =>
    ({
        type: 'SHOP/ADMIN-PANEL/SET-PRODUCTS',
        payload: {
            products
        }
    } as const),
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
// export const 



// types
type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState