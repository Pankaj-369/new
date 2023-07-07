import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import Mealitem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99, 
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals=()=>{

const [meals,setmeals]=useState([]);
const [loading,setloading]=useState(true);
const [httperror,sethttperror]=useState();

useEffect(()=>{
  const fetchdata=async()=>{

    try{
    const response=await fetch('https://react-p-d2050-default-rtdb.firebaseio.com/meals.json')

    if(!response.ok){
      throw new Error('something went wrong!')
    }
    const responsedata= await response.json();

    const loadedtask=[];

    for(const key in responsedata){
      loadedtask.push({
        id:key,
        name:responsedata[key].name,
        description:responsedata[key].description,
        price:responsedata[key].price,     
      })
    }
    setmeals(loadedtask);
  setloading(false);
  }
  catch(error){
    setloading(false)
    sethttperror(error.message);
  }
  }
  fetchdata()
},[]);

if(loading){
  return(
    <section className={classes.load}>
    <p>Loading...</p>
    </section>
  )
}

if(httperror){
  console.log("error")
  return(
    <section className={classes.error}>
    <p>{httperror}</p>
    </section>
  )
}

const Mealsitem=meals.map(meals=>
   <Mealitem 
  key={meals.id} 
  id={meals.id} 
  name={meals.name} 
  description={meals.description} 
  price={meals.price}/>) 


return  <section className={classes.meals}>
<Card>
<ul>{Mealsitem}</ul>
</Card>
</section>
}

export default AvailableMeals;
