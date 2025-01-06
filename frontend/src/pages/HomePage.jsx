import { useEffect, useState } from 'react';
import Card from '../component/ProductCard/Card';

import { response } from 'express';

import axios from 'axios';
function HomePage() {
  const [data, setdata] = useState();
    const fetchProduct = async () => {
      const response = await axios.get(
        'http://localhost:8080/product/get-products'
       );
      setdata(response.data.data);
    };
    
useEffect(()=>{
  console.log('clicked');
  const callhandle = async()=>{
    await fetchProduct();
  };
  callhandle(); 
},[]);
console.log(data);

  return (
    <div>
      <h1 className="text-center">'Home Page for Follow along'</h1>

      <div className="grid grid-cols-3">

        {data?.map((ele, index) => {
          return (
            <div style={{ margin: 'auto' }} className="border border-white">
              <Card 
              title={ele.title} 
              image = {ele.image[0] ? ele.image[0]: 'product is missing'} 

        {data.map((ele, index) => {
          return (
            <div style={{ margin: 'auto' }} className="border border-white">
              <Card title={ele.title} image = {ele.image[0] ? ele.image[0]: 'product is missing'} 

              Index={index} 
              description = {ele.description}
              originalPrice = {ele.originalPrice}
              discountedPrice = {ele.discountedPrice}

              rating = {ele.rating}
              />


/>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;