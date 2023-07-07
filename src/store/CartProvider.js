import { useReducer } from "react";
import CartContext from "./CartContext";

const cartreducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedamount =
      state.totalamount + action.item.price * action.item.amount;

    let updateditems,
      checkitem = false;

    state.items.filter((item) => {
      if (item.id === action.item.id) {
        checkitem = true;
        item.amount = action.item.amount + item.amount;
        updateditems = state.items.concat();
      }
      return 0;
    });
    !checkitem && (updateditems = state.items.concat(action.item));
     return {
      items: updateditems,
      totalamount: updatedamount,
    };
  }
  if (action.type === "REMOVE") {
    let updatedamount,updateditems;
    state.items.filter((item)=>{if(item.id===action.id){
    updatedamount=state.totalamount-item.price;
    if(item.amount===1){
      updateditems=state.items.filter(items=>items.id !== action.id)
    }
    else{
      item.amount=item.amount-1;
      updateditems=state.items;
    }}
    return 0;})
     return {
      items: updateditems,
      totalamount: updatedamount,
    };
  } 
  if(action.type==='CLEAR'){
    return defaultcartstate;
  }
};

const defaultcartstate = {
  items: [],
  totalamount: 0,
};
const CartProvider = (props) => {
  const [Cartstate, dispatchCart] = useReducer(cartreducer, defaultcartstate);   

  const additemhandler = (item) => {  
    dispatchCart({ type: "ADD", item: item });
  };
  const removeitemhandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const clearitemhandler=()=>{
    dispatchCart({type:'CLEAR'})
  }

  const contextval = {
    item: Cartstate.items,
    totalamount: Cartstate.totalamount,
    additem: additemhandler,
    removeitem: removeitemhandler,
    clearitem: clearitemhandler,
  };

  return (
    <CartContext.Provider value={contextval}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
