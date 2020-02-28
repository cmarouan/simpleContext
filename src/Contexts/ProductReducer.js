export const productReducer = (state, action) => {
    if (action.type === "LOADING")
      return {...state, products: {...state.products, loading: true}};
    if (action.type === "ERROR")
      return {...state, products: {data: [], loading: false, error: true}}
    if (action.type === "FETCH_PRODUCTS")
      return {...state, products: {...state.products, data: action.payload, loading: false}}
    if (action.type === "ADD_TO_CARD")
      return {...state, card: { totalprice: action.payload.totalprice ,data: action.payload.data }}
    if (action.type === "DELETE_FROM_CARD")
      return {...state, card: { totalprice: action.payload.totalprice ,data: action.payload.data }}
    if (action.type === "BUY")
      return {...state, card: { totalprice: 0 ,data: [] }}
    if (action.type === "SET_LOAD")
      return {...state, load: true}
    if (action.type === "REMOVE_LOAD")
      return {...state, load: false}
    if (action.type === "SORT_DATA")
      return {...state, products: {...state.products, data: {status : state.products.data.status, data : action.payload}}}
    return state;
}