import { useContext } from 'react';
import CartContext from '../../../store/CartContext';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const Mealitem=(props)=>{  
    const cartctx= useContext(CartContext);

    const price=`$${props.price.toFixed(2)}`;
    // const price="$" +props.price.toFixed(2);
    const additemhandler=(amount)=>{ 
        cartctx.additem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        });
    }

    return <li className={classes.meal}> 
    <div>   
    <h3>{props.name}</h3> 
    <div className={classes.description}>{props.description}</div>
    <div className={classes.price}>{price}</div>
    </div>

    <div> <MealItemForm onaddtocart={additemhandler} id={props.id}/> </div>
    
    </li>   
}
export default Mealitem;