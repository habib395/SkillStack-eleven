import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Query from "../../Query/Query";
import axios, {isCancel, AxiosError} from 'axios';

const Queries = () => {
  const allProducts = useLoaderData();
  const [products, setProducts] = useState(allProducts);
  const [gridCols, setGridCols] = useState("grid-cols-1");
  const [search, setSearch] = useState("");
  // console.log(search)
  // console.log(products  )
  //   console.log(products);
  // const handleSortedPrice = () =>{
  //     const sortedProducts = [...products].sort((a, b) =>
  //         parseFloat(a.currentDate) - parseFloat(b.currentDate))
  //     setProducts(sortedProducts)}

  const handleGrid1 = () => setGridCols("grid-cols-1");
  const handleGrid2 = () => setGridCols("grid-cols-2");
  const handleGrid3 = () => setGridCols("grid-cols-3");

  useEffect(()=>{ 
  const fetchAllQueries = async () => {
    try{
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/addQueries?search=${search || ''}`
      )
      // {console.log(data)}
      // const sortedProducts = data.sort(
      //   (a, b) => new Date(b.readableDate) - new Date(a.readableDate)
      // )
      setProducts(data)
    }catch(error){
      console.error("Error fetching search queries:", error)
    }
  }
    fetchAllQueries()
  },[search])
  // console.log(products)



  return (
    <div className="container  mx-auto sm:p-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-400">
        SPORT EQUIPMENT
      </h1>
      <div className="flex justify-center mb-6 gap-4">
        <button onClick={handleGrid1} className="btn bg-green-500">
          1 Column
        </button>
        <button onClick={handleGrid2} className="btn bg-green-500">
          2 Column
        </button>
        <button onClick={handleGrid3} className="btn bg-green-500">
          3 Column
        </button>
        {/* <div>
      <input type="text" name="search" className="px-6 py-2" placeholder="Product Name"  />
      <button className="btn">Search</button>
      </div> */}
        <div className="flex">
          <input
            className="input input-bordered"
            name="search"
            onChange={e => setSearch(e.target.value)}
            placeholder="Product Name"
          />
          <button className="btn">Search</button>
        </div>
      </div>
      <div>
      </div>
      {/* <button onClick={handleSortedPrice} className="btn bg-green-500 m-2 sm:m-6">Sort By</button> */}
      <div className={`grid ${gridCols} gap-4 p-2 sm:p-10`}>
        {products?.map((product) => (
          <Query key={product._id} product={product}></Query>
        ))}
      </div>
    </div>
  );
};

export default Queries;
