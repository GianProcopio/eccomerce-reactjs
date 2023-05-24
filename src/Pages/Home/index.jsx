import React, {useEffect, useState} from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import Loader from '../../Components/Loader';
import ProductDetail from '../../Components/ProductDetail';


function Home() {

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  
  
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await response.json();
        setProducts(data)
        setLoading(true)
      }catch(error){
        console.error(error);
      }
    }
    setTimeout(()=>{

      fetchData()
    }, 800)
  }, [])

  return (
    <Layout>
      {!loading && <Loader/>}

      <div className='grid place-content-center lg:grid-cols-4 gap-3 mt-5 w-full max-w-screen-lg md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>

      {loading && products.map(product=>{
      return<Card 
      key={product.id}
      name={product.title}
      category={product.category.name}
      img={product.images[0]}
      price={product.price}
      description={product.description}
      id={product.id}
      />
      })}

      </div>

      <ProductDetail/>
    </Layout>
  )
}

export default Home