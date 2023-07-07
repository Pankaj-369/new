import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkoutform from "./Checkout";

const Cart = (props) => {
  const cartctx = useContext(CartContext);

  const [checkout,setcheckout]=useState(false);
  const [submitting,setsubmitting]=useState(false);
  const [didsubmit,setdidsubmit]=useState(false);

  const totalamount = `$${cartctx.totalamount.toFixed(2)}`;
  const hasitems = cartctx.item.length > 0; 

  const removeitemcart = (id) => {
    cartctx.removeitem(id);
  };

  const additemcart = (item) => {
    cartctx.additem({...item,amount:1})
  };

  const cartitems = (
    <ul className={classes["cart-items"]}>
      {cartctx.item.map((item) => (
        <CartItem
          name={item.name}
          key={item.id}
          id={item.id}
          amount={item.amount}
          price={item.price}
          onRemove={removeitemcart.bind(null,item.id)}
          onAdd={additemcart.bind(null,item)}
        />
      ))}
    </ul>
  );
const orderhandler=()=>{
  setcheckout(true)
}

const submithandler=async(userdata)=>{
  setsubmitting(true);
  await fetch('https://react-p-d2050-default-rtdb.firebaseio.com/order.json',{
    method:'POST',
    body:JSON.stringify({
      user:userdata,
      ordereditems:cartctx.item
    })
  })
  setsubmitting(false);
  setdidsubmit(true);
  cartctx.clearitem();
}

const modalactions= <div className={classes.actions}>
<button className={classes["button-alt"]} onClick={props.hidecart}>
  Close
</button>
{hasitems && <button onClick={orderhandler} className={classes.button}>Order</button>}
</div>

const cartmodalcontent=
<Fragment>
{cartitems}
<div className={classes.total}>
  <span>Total Amount</span>
  <span>{totalamount}</span>
</div>
{checkout && <Checkoutform onconfirm={submithandler} oncancel={props.hidecart}/>}
{!checkout && modalactions}
</Fragment>

const issubmittingcontent=<p>Sending order data...</p>

const submitedcontent=
<Fragment>
<p>Successfully sent the order!..</p>
<div className={classes.actions}>
<button className={classes.button} onClick={props.hidecart}> 
  Close
</button> </div>
</Fragment>
  return (
    <Modal hidecart={props.hidecart}>
      {!submitting && !didsubmit  && cartmodalcontent}
      {submitting && issubmittingcontent}
      {!submitting && didsubmit && submitedcontent}
    </Modal>
  );
};
export default Cart;
