import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";
import Loading from "./Loading";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { cart, removeFromCart, emptyCart } = useContext(CartContext);
  const [categories, setCategories] = useState(undefined);
  const [status, setStatus] = useState(200);
  const navigate = useNavigate();
  
  let total = 0;
  Object.entries(cart).forEach(([, i]) => (total += i.price));
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/category/all")
      .then((res) => {
        setStatus(res.status);
        return res.json();
      })
      .then((res) => setCategories(res.categories))
      .catch(err=>setStatus('NetworkError'));
  }, []);
  if (status !== 200) return <Error code={status} />;
  if (!categories) return <Loading />;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Component</th>
            <th scope="col">Selection</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {categories.map((i, id) => {
            return cart[i.name] ? (
              <tr key={id}>
                <th scope="row">{i.name}</th>
                <td>{cart[i.name].name}</td>
                <td>{"$" + cart[i.name].price}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(i.name)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={id}>
                <th scope="row">{i.name}</th>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/category/" + i._id)}
                  >
                    {"Choose " + i.name}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>{"Total: $" + total}</p>
      <button className="btn btn-primary" onClick={() => emptyCart()}>
        Checkout
      </button>
    </div>
  );
};

export default App;
