import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const [btnislighted,setbtnislighted]=useState(false);
  const cartctx = useContext(CartContext);
const {item}=cartctx;

  const val =item.reduce((curnum, item) => {
    return curnum + item.amount;
  }, 0);

  const btnclasses=`${classes.button} ${btnislighted ? classes.bump : '' }`;

  useEffect(()=>{
    if(item.length ===0){ 
      return;
    }
    setbtnislighted(true);

   const timer= setTimeout(()=>{
      setbtnislighted(false);
    },300);
    return()=>{
      clearTimeout(timer);
    };
  },[item])

  return (
    <button className={btnclasses} onClick={props.onshowcart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{val}</span>
    </button>
  );
};
export default HeaderCartButton;
