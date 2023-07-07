import {Fragment} from "react";
import cake from '../../Assets/cake.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header=(props)=>{
    return(
        <Fragment>
        <header className={classes.header}>
        <h1>Hannah Bakers</h1>
        <p>~In the loving memory of our beloved hannah</p>
        <HeaderCartButton onshowcart={props.onshowcart}/>
        </header>

        <div className={classes['main-image']}>
        <img src={cake} alt='it is a cake'/>   
        </div>
        </Fragment>
    );
}
export default Header