import React, { createContext, useReducer, useEffect } from 'react';

export const productContext = createContext();

export const ProductProvider = ({ children }) => {

    const initialeState = {
        products: {data: [], error: false, loading: false},
        card: [],
        alert: true
    };

    const productReducer = (state, action) => {
        if (action.type === "LOADING")
          return {...state, products: {...state.products, loading: true}};
        if (action.type === "ERROR")
          return {...state, products: {data: [], loading: false, error: true}}
        if (action.type === "FETCH_PRODUCTS")
          return {...state, products: {data: action.payload, loading: false}}
        if (action.type === "ADD_TO_CARD")
          return {...state, card: action.payload}
        if (action.type === "DELETE_FROM_CARD")
          return {...state, card: action.payload}
        return state;
    }

    const [state, dispatch] = useReducer(productReducer, initialeState);

    const changeAlert = () => {
        //setState({...state, alert: !state.alert});
    }

    const FetchProducts = async () => {
        try {
            dispatch({type: "LOADING"});
            const res = await fetch('http://test.act4com.wtf/api/products/available?parent_cat=&cat=')
            const result = await res.json();
            dispatch({type: "FETCH_PRODUCTS", payload: result});
        } catch (error) {
            dispatch({type: "ERROR"});
        }
    }

    const getProducts = () => {
        return state.products.data.data || []
    }

    const addToCard = (item) => {
        const all = state.card;
        all.push(item);
        dispatch({type: "ADD_TO_CARD", payload: all});
    }
    
    const deleteFromCard = (id) => {
        const all = state.card.filter(c => c._id !== id);
        dispatch({type: "DELETE_FROM_CARD", payload: all});
    }

    const products = getProducts();

    const value = { 
        addToCard,
        state,
        deleteFromCard,
        changeAlert,
        FetchProducts,
        getProducts,
        products 
    };
    
    useEffect(() => {
        FetchProducts();
    }, [])

    return (<productContext.Provider value={value}>
        {children}
    </productContext.Provider>)
}