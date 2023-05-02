import { Link, useLocation } from "react-router-dom";
import './index.scss';

const Detail = () => {

  const {state} = useLocation();

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {state._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {state.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {state.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {state.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;