import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Loading from "./Loading";
import Error from "./Error";
import "./Category.css";
const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(undefined);
  const [components, setComponents] = useState(undefined);
  const [status, setStatus] = useState(200);
  const [imageStrings, setImageStrings] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const splitArray = (arr, size) => {
    let resArr = [];
    for (let i = 0; i < arr.length; i += size) {
      let x = arr.slice(i, i + size);
      resArr.push(x);
    }
    return resArr;
  };
  useEffect(() => {
    Promise.all([
      fetch(process.env.REACT_APP_API_URL + "/category/" + id),
      fetch(process.env.REACT_APP_API_URL + "/component/all"),
    ])
      .then((res) => {
        setStatus(Math.max(res[0].status, res[1].status));
        return Promise.all([res[0].json(), res[1].json()]);
      })
      .then((res) => {
        const strArr = [];
        res[1].components.forEach((component) => {
          let str = "";
          splitArray(component.image.data.data, 10000).forEach((i) => {
            str += String.fromCharCode(...i);
          });
          strArr.push(
            "data:" + component.image.contentType + ";base64," + btoa(str)
          );
        });
        setImageStrings(strArr);
        setCategory(res[0].category);
        setComponents(res[1].components.filter((i) => i.category._id === id));
      })
      .catch(err=>setStatus('NetworkError'));
  }, []);

  if (status !== 200) return <Error code={status} />;
  if (!category || !components) return <Loading />;
  return (
    <div>
      <div className="info">
        <h3>{category.name}</h3>
        <div className="mod">
          <Link className="btn btn-link" to={"/category/update/" + id}>
            Update
          </Link>
          <Link className="btn btn-link" to={"/category/delete/" + id}>
            Delete
          </Link>
        </div>
        <p>{category.description}</p>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {components.map((i, id) => {
            return (
              <tr key={id}>
                <th scope="row">
                  <img
                    src={imageStrings[id]}
                    alt={i.name}
                    style={{ width: "40px", height: "40px" }}
                  />
                  <Link to={"/component/" + i._id}>{" " + i.name}</Link>
                </th>
                <td>{i.manufacturer}</td>
                <td>{i.stock}</td>
                <td>{"$" + i.price}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      addToCart(i);
                      navigate("/");
                    }}
                    disabled={i.stock <= 0}
                  >
                    Add
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
