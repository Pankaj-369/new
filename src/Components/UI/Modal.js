import React, { Fragment } from 'react'; 
import reactDom from 'react-dom';
import classes from './Modal.module.css';


const Backdrop=(props)=>{
    return <div className={classes.backdrop} onClick={props.hidecart} />
}

const Overlay=(props)=>{
    return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
    </div>
}

const portaldiv=document.getElementById('modal');

const Modal=(props)=>{
return<Fragment>
{reactDom.createPortal(<Backdrop hidecart={props.hidecart}/>,portaldiv)}
{reactDom.createPortal(<Overlay>{props.children}</Overlay>,portaldiv)}

</Fragment>
}
export default Modal;