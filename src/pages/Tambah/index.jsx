import {useEffect, useRef, useState} from 'react';
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [active, setActive] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const timeout = useRef(null);

  const handleSubmit = (event) => {

    event.preventDefault();
    setDataSubmitted(false);
    fetch('https://eager-pear-handbag.cyclic.app/api/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        price,
        stock,
        active
      })
    })
    .then(() => {
      setDataSubmitted(true);
      timeout.current = setTimeout(() => setDataSubmitted(false), 1000);
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange={event => setName(event.target.value)}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={event => setPrice(event.target.value)}/>
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock} onChange={event => setStock(event.target.value)}/>
          <Input name="status" type="checkbox" label="Active" onChange={event => setActive(event.target.checked)}/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
        <br />
        {dataSubmitted && <small className='submit-message'>Berhasil menyimpan informasi produk</small>}
      </div>
    </div>
  )
}

export default Tambah;