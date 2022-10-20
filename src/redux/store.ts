import {
    Action,
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
  } from 'redux'
  import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { breadcrumbsReducer } from './breadcrumbs-reducer'
  
  import { productsReducer } from './products-reducer'
  
  let rootReducer = combineReducers({
    products: productsReducer,
    breadcrumbs: breadcrumbsReducer
    //   sidebar: sidebarReducer,
    //   auth: authReducer,
    //   form: formReducer,
    // app: appReducer,
  })
  
  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
  //let store = createStore(reducers, applyMiddleware(thunkMiddleware));
  
  // @ts-ignore
  window.__store__ = store
  
  export default store
  
  // Types
  type RootReducerType = typeof rootReducer
  /**
   * @param A action
   * @param R returned type. "Promise void" by default.
   */
  export type CommonThunkType<
    A extends Action = Action,
    R = Promise<void>
  > = ThunkAction<R, AppStateType, unknown, A>
  /**
   * @param T an object in which values are functions.
   * Example: let actions = {
   * actionOne: (arg1) => { type: "actionType", userId: arg1},
   * actionTwo: () => { type: "actionTypeTwo"}, ...
   * }
   * @returns enumeration of return types of functions. Example: {type: string, userId: number} | {type: string} | ...
   */
  export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: any[]) => infer U
  }
    ? U
    : never
  export type AppStateType = ReturnType<RootReducerType>
  