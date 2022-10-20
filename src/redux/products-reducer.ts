import { productsAPI } from '../api/products-api'
import { ProductType } from '../types/types'
import { CommonThunkType, InferActionsTypes } from './store'

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
export const getProducts = (
    pageSize: number = 30
): CommonThunkType<ActionsTypes> => {
    return async (dispatch, getState) => {
        // reset error status
        dispatch(actions.setError(null))

        //let data = await productsAPI.getProductsList()
        let array = [
            {
                "id": "2d164dd8-0f74-48d2-b830-3179af7d9621",
                "name": "Шкаф-купе трехдверный Roko",
                "price": "14870",
                "price_currency": "uah",
                "image": null,
                "quantity": 3,
                "description": "Шкаф отгружается в разобраном и упакованном виде\nУпаковка корпуса - гофрокартон, зеркальные фасады в деревянной обрешетке",
                "units": "cm",
                "created_at": "2022-09-15T18:27:23+00:00",
                "length": "60",
                "width": "209.2",
                "height": "242"
            },
            {
                "id": "8d9bd8f6-7391-4c78-aacd-9685658ab1d1",
                "name": "Шкаф-купе Феникс",
                "price": "18315",
                "price_currency": "uah",
                "image": null,
                "quantity": 1,
                "description": "Трехдверный с зеркалом.",
                "units": "cm",
                "created_at": "2022-09-15T18:29:01+00:00",
                "length": "60",
                "width": "220",
                "height": "240"
            }
        ]

        let data: any = []
        array.forEach(element => {
            data = [...data, element]
        });


        // TODO: check for error

        if (data) {
            dispatch(actions.setProducts(data))
        }


    }
}



// types
type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState