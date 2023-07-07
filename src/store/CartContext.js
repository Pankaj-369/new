import React from "react";

const CartContext=React.createContext({
    item:[],
    totalamount:0,
    additem:(item)=>{},
    removeitem:(id)=>{},
    clearitem:()=>{}
});
export default CartContext;