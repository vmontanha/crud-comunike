import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  quantidade: "",
  value: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, quantidade, value } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleProduct(id);
    }
  }, [id]);

  const getSingleProduct = async (id) => {
    const response = await axios.get(`http://localhost:8080/product/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const addProduct = async (data) => {
    const response = await axios.post("http://localhost:8080/product", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateProduct = async (data, id) => {
    const response = await axios.put(`http://localhost:8080/product/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quantidade || !value) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        addProduct(state);
        return
      }
    }
  };
  return (
    <div className="container">
      <form className="form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ex: Caneta Azul"
          onChange={handleInputChange}
          value={name}
        />
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          placeholder="Ex: 114 un"
          onChange={handleInputChange}
          value={quantidade}
        />
        <input
          type="number"
          id="value"
          name="value"
          placeholder="Ex: 20"
          onChange={handleInputChange}
          value={value}
        />
        <input type="submit" value="Adicionar Produto" />
      </form>
    </div>
  );
};

export default AddEdit;
