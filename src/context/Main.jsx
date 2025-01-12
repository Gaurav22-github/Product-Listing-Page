import React, { createContext, useEffect, useState } from 'react';
const Context = createContext();

export default function Main(props) {
    const [cart, setCart] = useState([0]);
    // is prkar ek array bn jya ga [1,2,3,4,5,6]
    const addToCart = (product_id) => {
        // console.log("product_id", product_id);
        if (cart.includes(product_id)) {
            return
        }
        setCart([
            ...cart,
            product_id
        ])

        //JSON.stringfy -> Array to JSON String // banata ha 
    }
    useEffect(
        () => {
            if (cart.length == 0) { return }
            localStorage.setItem("cart", JSON.stringify(cart));
        }, [cart] // first render pr b chalta ha //
    )
    useEffect(
        () => {
            const lsCart = localStorage.getItem("cart");
            if (lsCart) {
                setCart(JSON.parse(lsCart));
                //JSON.Parse() JSON string -> Array//
            }
        }, [] //first render pr he only work kr na ha //
    )

    // console.log(cart)
    return (
        <Context.Provider value={{
                cart, addToCart
            }
        }>
            {props.children}
        </Context.Provider>
    )
}
export { Context };
