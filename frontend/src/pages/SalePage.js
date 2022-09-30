import React, { useState, useEffect } from "react";
import "./SalePage.css";
import axios from "axios";
import { toast } from "react-toastify";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const SalePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSales();
  }, []);

  const getSales = async () => {
    const response = await axios.get("http://localhost:8080/products");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  console.log(data.values)

  ChartJS.register(ArcElement, Tooltip, Legend);

  const dataPProduct = {
    labels: ['Vendas', 'Estoque'],
    datasets: [
      {
        data: [data, data.length],
        backgroundColor: [
          'red',
          'green',
        ],
        borderWidth: 1
      },
    ],
  };

  return (
    <div className="container">
      <div className="container-sales">
        {data.length >= 1 ?
          <Doughnut data={dataPProduct} /> :
          <h1 className="sale-title">Estoque Vazio</h1>
        }
      </div>
    </div>
  );
};

export default SalePage;
