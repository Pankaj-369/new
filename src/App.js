import Header from "./Components/Layout/Header";
import {useState,} from "react";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Main from "./memo_usecallback/main";
import List from "./usememo/List";


function App() {

  const[showcart,setshowcart]=useState(false);

  const showcarthandler=()=>{
    setshowcart(true);
  }

  const hidecarthandler=()=>{
    setshowcart(false);
  }


  return (
    <CartProvider>
    
    {showcart && <Cart hidecart={hidecarthandler}/>}
    <Header onshowcart={showcarthandler}/>
    <main>
     <Meals/>
    </main>
    <Main/>
    <List/>
    </CartProvider>   
  );
}

export default App;
