import React, { createContext, useReducer, useEffect } from 'react';
import { productReducer } from './ProductReducer';
import { initialeState } from './initState';
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [state, dispatch] = useReducer(productReducer, initialeState);

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
        const all = state.card.data;
        let totalprice = state.card.totalprice;
        all.push(item);
        totalprice = totalprice + (Number(item.price) || 0);
        dispatch({type: "ADD_TO_CARD", payload: {data : all, totalprice: totalprice}});
    }
    
    const deleteFromCard = (id, price) => {
        let totalprice = state.card.totalprice;
        let all = state.card.data.filter((p, index) => index !== id);
        totalprice = totalprice - (Number(price) || 0);
        dispatch({type: "DELETE_FROM_CARD", payload: {data : all, totalprice: totalprice}});
    }

    const buy = () => {
        dispatch({type: "SET_LOAD"});
        setTimeout(() => {
            dispatch({type: "BUY"});
            dispatch({type: "REMOVE_LOAD"});
        }, 1000);
    }

    const products = getProducts();

    const value = { 
        addToCard,
        state,
        deleteFromCard,
        FetchProducts,
        getProducts,
        products,
        buy
    };
    
    useEffect(() => {
        FetchProducts();
    }, [])

    return (<ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>)
}