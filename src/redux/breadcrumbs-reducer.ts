import { EuiBreadcrumbProps } from '@elastic/eui/src/components/breadcrumbs/breadcrumb'
import { InferActionsTypes } from './store'

// STATE STRUCTURE
const initialState = {
    breadcrumbs: undefined as EuiBreadcrumbProps[] | undefined,
    lastUpdate: null as number | null
}

// REDUCER
export const breadcrumbsReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case 'SHOP/ADMIN-PANEL/SET-BREADCRUMBS': {
            return {
                ...state,
                breadcrumbs: action.payload.breadcrumbs,
                lastUpdate: Date.now(),
            }
        }
        case 'SHOP/ADMIN-PANEL/SET-TOP-BREADCRUMB': {
            return {
                ...state,
                breadcrumbs: setTopBreadcrumbHelper(
                    state.breadcrumbs,
                    action.payload.topBreadcrumb,
                    action.payload.offset),
                lastUpdate: Date.now(),
            }
        }
        default:
            return state
    }
}


// ACTIONS STRUCTURE
export const actions = {
    setBreadcrumbs: (breadcrumbs: EuiBreadcrumbProps[]) =>
    ({
        type: 'SHOP/ADMIN-PANEL/SET-BREADCRUMBS',
        payload: {
            breadcrumbs,
        }
    } as const),
    setTopBreadCrumb: (topBreadcrumb: EuiBreadcrumbProps, offset: number) =>
    ({
        type: 'SHOP/ADMIN-PANEL/SET-TOP-BREADCRUMB',
        payload: {
            topBreadcrumb,
            offset
        }
    } as const),
    setError: (error: any, stringEquivalent?: string) =>
    ({
        type: 'SHOP/ADMIN-PANEL/SET-BREADCRUMBS-ERROR',
        payload: !error ? null : {
            stringEquivalent,
            error,
        },
    } as const),
}

// THUNKS


// HELPERS
const setTopBreadcrumbHelper = (
    currentBreadcrumbs: EuiBreadcrumbProps[] | undefined,
    topBreadcrumb: EuiBreadcrumbProps | undefined,
    offset?: number
): EuiBreadcrumbProps[] | undefined => {
    if (!topBreadcrumb) {
        actions.setError('TOP BREADCRUMB IS UNDEFINED')
        return currentBreadcrumbs
    }

    // if (currentBreadcrumbs && currentBreadcrumbs.length === 1) {
        
    // }

    // if breadcrumbs not empty, get top then replace it
    if (currentBreadcrumbs) {
        let newBreadcrumbs: EuiBreadcrumbProps[] | undefined = []

        if (offset && currentBreadcrumbs.length - 1 <= offset) {
            newBreadcrumbs = [...currentBreadcrumbs, topBreadcrumb]
            return newBreadcrumbs
        }

        //newBreadcrumbs = currentBreadcrumbs?.filter(b => b !== currentBreadcrumbs[currentBreadcrumbs.length - 1])
        newBreadcrumbs = currentBreadcrumbs?.splice(currentBreadcrumbs.length - 1, 1, topBreadcrumb)

        return newBreadcrumbs
    }

    // if breadcrumbs totally empty just set them
    return [topBreadcrumb]
}


// types
type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState