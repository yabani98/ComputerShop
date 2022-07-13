import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import Loading from "./Loading";
import Error from "./Error";
import "./Component.css";

const Component = () => {
  const { addToCart } = useContext(CartContext);
  const [component, setComponent] = useState(undefined);
  const [imageString, setImageString] = useState("");
  const [status, setStatus] = useState(200);
  const { id } = useParams();
  const splitArray = (arr, size) => {
    let resArr = [];
    for (let i = 0; i < arr.length; i += size) {
      let x = arr.slice(i, i + size);
      resArr.push(x);
    }
    return resArr;
  };
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/component/" + id)
      .then((res) => {
        setStatus(res.status);
        return res.json();
      })
      .then((res) => {
        let str = "";
        splitArray(res.component.image.data.data, 10000).forEach((i) => {
          str += String.fromCharCode(...i);
        });

        setComponent(res.component);
        setImageString(
          "data:" + res.component.image.contentType + ";base64," + btoa(str)
        );
      })
      .catch(err=>setStatus('NetworkError'));
  }, []);
  if (status !== 200) return <Error code={status} />;
  if (!component) return <Loading />;

  return (
    <div className="component-container">
      <div className="sub-1">
        <h3>{component.name}</h3>
        <div className="mod">
          <Link className="btn btn-link" to={"/component/update/" + id}>
            Update
          </Link>
          <Link className="btn btn-link" to={"/component/delete/" + id}>
            Delete
          </Link>
        </div>
        <img src={imageString} alt={component.name} />
        <button
          className="btn btn-primary"
          onClick={() => addToCart(component)}
        >
          Add
        </button>
      </div>
      <div className="sub-2">
        <div className="div1">
          <div className="info">
            <div>Category</div>
            <div>
              <Link to={"/category/" + component.category._id}>
                {component.category.name}
              </Link>
            </div>
          </div>
          <div className="info">
            <div>Manufacturer</div>
            <div>{component.manufacturer}</div>
          </div>
          <div className="info">
            <div>Price</div>
            <div>{"$" + component.price}</div>
          </div>
          <div className="info">
            <div>Stock</div>
            <div>{component.stock}</div>
          </div>
        </div>
        <div className="div2">
          <div>features</div>
          <ul className="list-group list-group-flush">
            {component.features.split(",").map((i, id) => {
              return (
                <li key={id} className="list-group-item">
                  {i}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Component;
