import { useRef, useState } from "react";
import classes from "./checkout.module.css";
import {GoogleLogin} from "react-google-login";

const Checkoutform = (props) => {
  const [validity, setvalidity] = useState({
    name: true,
    address: true,
    pincode: true,
    city: true,
  });

  const nameinputref = useRef();
  const addressinputref = useRef();
  const pincodeinputref = useRef();
  const cityinputref = useRef();

  const isempty = (value) => {
    return value.trim() === "";
  };
  const isfivechar = (value) => {
    return value.trim().length === 5;
  };

  const confirmhandler = (event) => {
    event.preventDefault();

    const enteredname = nameinputref.current.value;
    const enteredaddress = addressinputref.current.value;
    const enteredpincode = pincodeinputref.current.value;
    const enteredcity = cityinputref.current.value;

    const enterednameisvalid =!isempty(enteredname);
    const enteredaddressisvalid =!isempty(enteredaddress);
    const enteredpincodeisvalid =isfivechar(enteredpincode);
    const enteredcityisvalid =!isempty(enteredcity);

    setvalidity({
      name:  enterednameisvalid,
      address: enteredaddressisvalid,
      pincode: enteredpincodeisvalid,
      city:  enteredcityisvalid,
    });

    const formisvalid=enterednameisvalid && enteredaddressisvalid && enteredpincodeisvalid && enteredcityisvalid

    if(!formisvalid){
        return;
    }
props.onconfirm({
  name:enteredname,
  address:enteredaddress,
  pincode:enteredpincode,
  city:enteredcity
});
  };
  
  const nameinputclasses = `${classes.control} ${
    validity.name ? '' : classes.invalid
  }`;
  const addressinputclasses = `${classes.control} ${
    validity.address ? '' : classes.invalid
  }`;
  const pincodeinputclasses = `${classes.control} ${
    validity.pincode ? '' : classes.invalid
  }`;
  const cityinputclasses = `${classes.control} ${
    validity.city ? '': classes.invalid
  }`;

  const clientId="775928307652-14svo23u8k6nqmnpekej8jp1uoi337gd.apps.googleusercontent.com" 

  return (
    <form className={classes.form} onSubmit={confirmhandler}>
    <div className={classes.control}>
    <GoogleLogin
    clientId={clientId}
    buttonText="Login"
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
    />
    </div>
      <div className={nameinputclasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameinputref}></input>
        {!validity.name && <p>Please enter a valid name!!!</p>}
      </div>
      <div className={addressinputclasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressinputref}></input>
        {!validity.address && <p>Please enter a valid address!!!</p>}
      </div>
      <div className={pincodeinputclasses}>
        <label htmlFor="Pincode">Pincode</label>
        <input type="text" id="Pincode" ref={pincodeinputref}></input>
        {!validity.pincode && <p>Please enter a valid pincode!!!</p>}
      </div>
      <div className={cityinputclasses}>
        <label htmlFor="City">City</label>
        <input type="text" id="City" ref={cityinputref}></input>
        {!validity.city && <p>Please enter a valid city!!!</p>}
      </div>
      <div className={classes.actions}>
        <button onClick={props.oncancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkoutform;
