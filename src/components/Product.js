import React, { useContext, useState } from 'react';
import './product.css';
import { ProductContext } from '../Contexts/ProductContext';
import Plus from './images/plus.png';
import Stop from './images/stop.png';
import Eye from './images/see.png';

export default function Product(props) {
    const product = props.product || {};
    const context = useContext(ProductContext);
    const [details, setdetails] = useState(false);
    
    return (
        <div id="product_card">
            <div id="image_zone">
                <img id="product_image" src={`https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-2.jpg`} alt="product" />
            </div>
            <div id="info_zone">
                <div id="name_price">
                    <div>
                        {product.name}
                    </div>
                    <div>
                        {product.price}.00 MAD
                    </div>
                </div>
                <div id="description">
                    {product.description}
                </div>
                {!props.card && <div>
                    <img onClick={() => context.addToCard(product)} src={Plus} alt="plus" id="plus_icon" />
                </div>}
                {!props.card && <div>
                    <img onClick={() => setdetails(!details)} src={Eye} style={{marginRight : "1%"}} alt="details" id="plus_icon" />
                </div>}
                {props.card && <div>
                    <img onClick={() => context.deleteFromCard(props.index, product.price)} src={Stop} alt="Stop" id="plus_icon" />
                </div>}
                {details && <div id="details">
                        <div>
                            {product.category}<small>{`(${product.parentCategory})`}</small>
                        </div>
                        <div >
                            {product.attrs && product.attrs.map((attr, index) => 
                                    <div key={index} id="attrs">
                                        <div id="attrName">
                                            {attr.name}
                                        </div>
                                        <div key={index}  id="attrElement">
                                            {attr.values && attr.values.map((val, index) => <div key={index} id="attribute">
                                                {val}
                                            </div>)}
                                        </div>
                                    </div>
                                )}
                        </div>
                </div>}
            </div>
        </div>
    )
}