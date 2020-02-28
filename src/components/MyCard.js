import React from 'react'
import './card.css';
import  Product from "./Product";
import { useContext } from 'react';
import ShopIcon from './svg/Shop';
import { ProductContext } from '../Contexts/ProductContext';

const styleCard = {
    marginRight: "4%"
}

export default function MyCard() {

    const context = useContext(ProductContext);
    const products = context.state.card ? context.state.card.data : [];
    const totalprice = context.state.card.totalprice || 0;
    return (
        <div id="card_container">
            <div>
                <h1><ShopIcon style={{styleCard}} />My Card ({products.length})</h1>
            </div>
            <div>
                {products && products.map((p, index) => 
                    <Product key={index} product={p} index={index} card={true}/>
                )}
            </div>
            {context.state.load && <div id="loading">Loading ...</div>}
            {products && products.length > 0 && <div id="action_zone">
                <div id="price">
                    <div id="total_text">
                        Total price
                    </div>
                    <div id="total_text">
                        {totalprice}.00 MAD
                    </div>
                </div>
                <div id="action">
                    <button id="pay_btn" onClick={context.buy}> Buy </button>
                </div>
            </div>}
        </div>
    )
}
