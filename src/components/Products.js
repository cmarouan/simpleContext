import React, { useContext, useState } from 'react'
import { ProductContext } from '../Contexts/ProductContext';
import Product from './Product';
import './products.css';

export default function Products() {
    const context = useContext(ProductContext);
    const allProducts = context.products ? context.products : [];
    const [products, setProducts] = useState(allProducts);
    const onChange = (e) => {
        const value = e.target.value;
        if (value.length){
            const filteredProduct = allProducts.filter(pro => pro.name.includes(value) 
            ? true  : false);
            setProducts(filteredProduct);
        }
        else
            setProducts(allProducts);
    }

    return (
        <div id="product_container">
            <div id="header">
                <h1>Products ({products.length || 0})</h1>
                <div>
                    <input type="text" placeholder="Search ..." id="search" onChange={onChange}/>
                </div>
                <div>
                    <input type="button" placeholder="Sort by price ..." id="btn" onClick={context.sortByPrice} value="Sort by price"/>
                </div>
            </div>
            <div>
                {products && products.map((p, index) => 
                        <Product key={index}  product={p} card={false} />
                )}
            </div>
        </div>
    )
}
