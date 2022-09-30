import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { MdDelete, MdModeEdit, MdSend } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [sendProduct, setSendProduct] = useState("");


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8080/products");
    if (response.status === 200) {
      setData(response.data);
    }
  };
  const sendProductToSale = async () => {
    const response = await axios.post("http://localhost:8080/sales");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const onDeleteProduct = async (id) => {
    const response = await axios.delete(`http://localhost:8080/product/${id}`);
    if (response.status === 200) {
      toast.success(response.data);
      getProducts();
    }
  };

  console.log(data)


  return (
    <div className="container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Açao</th>
          </tr>
        </thead>
        <tbody>
          {data.length == 0 || null ? "" :
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.quantidade + " un"}</td>
                  <td>{"R$ " + item.value + ",00"}</td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit"><MdModeEdit /></button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDeleteProduct(item.id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => sendProductToSale(item.id)}
                      value={data}
                      onChange={(e) => e.target.value}
                    >
                      <MdSend />
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

export default Home;
