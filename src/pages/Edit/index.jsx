import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Input from "../../components/Input";

const Edit = () => {

  const {state} = useLocation();
  const [name, setName] = useState(state.name);
  const [price, setPrice] = useState(state.price);
  const [stock, setStock] = useState(state.stock);
  const [active, setActive] = useState(state.active);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const timeout = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3001/api/update-product', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: state._id,
        name,
        price,
        stock,
        active
      })
    })
    .then(() => {
      setDataSubmitted(true);
      timeout.current = setTimeout(() => setDataSubmitted(false), 3000);
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    }
  }, []);

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange={(event) => setName(event.target.value)}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(event) => setPrice(event.target.value)}/>
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock} onChange={(event) => setStock(event.target.value)}/>
          <Input name="status" type="checkbox" label="Active" checked={active && true} onChange={(event) => setActive(event.target.value)}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
        <br />
        {dataSubmitted && <small className='submit-message'>Berhasil menyimpan informasi produk</small>}
      </div>
    </div>
  )
}

export default Edit;