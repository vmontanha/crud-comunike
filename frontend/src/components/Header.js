import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddProduto");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);
  return (
    <div className="container">
      <div className="header">
        <p className="logo">Estoque de Produtos</p>
        <div className="header-right">
          <Link to="/">
            <p
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              Estoque
            </p>
          </Link>
          <Link to="/add">
            <p
              className={`${activeTab === "AddProduto" ? "active" : ""}`}
              onClick={() => setActiveTab("AddProduto")}
            >
              Adicionar Produto
            </p>
          </Link>
          <Link to="/about">
            <p
              className={`${activeTab === "About" ? "active" : ""}`}
              onClick={() => setActiveTab("About")}
            >
              Sobre
            </p>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Header;
