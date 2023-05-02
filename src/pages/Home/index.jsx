import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(false);
  const [products, setProducts] = useState({});
  const [productsCache, setProductsCache] = useState({});
  const [refetchTrigger, setRefetchTrigger] = useState(true);

  useEffect(() => {
    if (refetchTrigger) {
      fetch("https://eager-pear-handbag.cyclic.app/api/")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setRefetchTrigger(false)
      })
      .catch(error => console.error(error));
    }
  }, [refetchTrigger]);

  useEffect(() => {
    if (!searchQuery) {
      setProducts(productsCache);
    } else {
      setProductsCache(products);
      const filteredData = productsCache.filter(product => {
        let priceString = product.price.toString();
        let stockString = product.stock.toString();

        return (
          product.name.includes(searchQuery) || priceString.includes(searchQuery) 
          || stockString.includes(searchQuery) || product._id.includes(searchQuery)
        )
      });
      setProducts(filteredData);
    }
  }, [searchQuery])

  function dropProduct(productID) {
    fetch(`https://eager-pear-handbag.cyclic.app/api/delete-product/${productID}`, {
      method: "DELETE"
    })
    .then(() => {
      console.log("Deleted: " + productID);
      setRefetchTrigger(true);
    })
    .catch(error => console.error(error));
  }

  function productsRender() {
    if (products.length > 0) {
      return products.map((product, index) => (
        <tr key={index}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td className='text-right'>{product.price}</td>
          <td className="text-center">
            <Link 
              to={{
                pathname: "/detail",
                state: product
              }} 
              className="btn btn-sm btn-info"
              >Detail</Link>
            <Link 
              to={{
                pathname: "/edit",
                state: product
              }}
              className="btn btn-sm btn-warning"
              >Edit</Link>
            <button className='btn btn-sm btn-danger' onClick={() => dropProduct(product._id)}>Delete</button>
          </td>
        </tr>
      ))
    } else {
      return (
        <tr>
          <td><small>No data</small></td>
        </tr>
      )
    }
  }

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." onChange={event => setSearchQuery(event.target.value)}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className='text-right'>Price</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsRender()}
        </tbody>
      </table>
    </div>
  )
}

export default Home;