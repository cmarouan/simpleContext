import React, { useContext } from 'react'
import { ProductContext } from '../Contexts/ProductContext';
import { ErrorComponent, SuccessComponent } from "./Alert";

export default function Display() {
    const context = useContext(ProductContext);

    return (
        <div>
            {context.state.alert && <SuccessComponent />}
            {!context.state.alert && <ErrorComponent />}
            <button onClick={context.changeAlert}> change Alert </button>
        </div>
    )
}
