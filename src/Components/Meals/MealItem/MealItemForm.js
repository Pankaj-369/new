import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealsItemForm.module.css';


const MealItemForm=(props)=>{
    const inputref=useRef();
    const [isvalid,setisvalild]=useState(true);

    const submithandler=(event)=>{
        event.preventDefault();
        // const amount=inputref.current.value;
        const amount=inputref.current.value;
        const enteredamount= +amount;

        if(amount.trim().length ===0 || enteredamount < 1 || enteredamount >5){
            setisvalild(false);
            return;
        }
 
        props.onaddtocart(enteredamount);
    }

    return(
    <form className={classes.form} onSubmit={submithandler}>
    <Input ref={inputref} label='Amount' input={{
        id:'amount_'+props.id,
        type:'number',
        max:'5',
        min:'1',
        step:'1',
        defaultValue:'1'
    }}/>
    <button>+Add</button>
    { !isvalid && <p>please enter a valid amount (1-5).</p>}
    </form>
    );
}
export default MealItemForm;