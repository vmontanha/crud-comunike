import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  quantidade: "",
  value: "",
};

const Sample = () => {
  const [state, setState] = useState(initialState);

  const { name, quantidade, value } = initialState;

  const history = useHistory();
  const addContact = async (data) => {
    const response = await axios.post("http://localhost:8080/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.name);
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantidade || !value) {
      toast.error("Please provide value into each input field");
    } else {
      addContact(state);
      history.push("/");
    }
  };

  return (
    <div className="container">
      <form className="form-data"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Produto</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Caneta Azul"
          onChange={handleInputChange}
          value={name}
        />
        <label htmlFor="quantidade">Quantidade</label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          placeholder="114 un"
          onChange={handleInputChange}
          value={quantidade}
        />
        <label htmlFor="value">Valor</label>
        <input
          type="number"
          id="value"
          name="value"
          placeholder="R$ 2.00"
          onChange={handleInputChange}
          value={value}
        />
        <input type="submit" value="Adicionar Produto" />
      </form>
    </div>
  );
};

export default Sample;
