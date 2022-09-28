import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (checked) => {
    setChecked(true);
  }
  const getUsers = async () => {
    const response = await axios.get("http://localhost:8080/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const onDeleteUser = async (id) => {
    const response = await axios.delete(`http://localhost:8080/user/${id}`);
    if (response.status === 200) {
      toast.success(response.data);
      getUsers();
    }
  };

  console.log("data=>", data);

  return (
    <div className="container">
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Produto</th>
            <th style={{ textAlign: "center" }}>Quantidade</th>
            <th style={{ textAlign: "center" }}>Valor</th>
            <th style={{ textAlign: "center" }}>Açao</th>
          </tr>
        </thead>
        <tbody>
          {data &&
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
                      onClick={() => onDeleteUser(item.id)}
                    >
                      <MdDelete />
                    </button>
                    <Switch className="isSales" onChange={handleChange} height={20} width={40} checked={checked} />
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
