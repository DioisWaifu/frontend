import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar bg-body-tertiary static-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/img/OportUnii.png" alt="Logo" height="30" />
          </a>
          <div className="d-flex align-items-center ms-auto">
            <i
              className="bi bi-bell me-3"
              style={{ cursor: "pointer", fontSize: "1.8rem" }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNotificacoes"
            ></i>

            <i
              className="bi bi-person-circle"
              style={{ cursor: "pointer", fontSize: "1.8rem" }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            ></i>
          </div>
        </div>
      </nav>

      <OffcanvasComponent />
    </>
  );
}

const OffcanvasComponent = () => {
  return (
    <>
      {/* Offcanvas Notificações */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNotificacoes">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Notificações</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            <li className="list-group-item">Nova proposta recebida</li>
            <li className="list-group-item">Pedido de validação pendente</li>
            <li className="list-group-item">Estudante removido com sucesso</li>
          </ul>
        </div>
      </div>

      {/* Offcanvas Perfil */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <img src="/img/OportUnii.png" alt="Logo" height="50" />
          <h5 className="offcanvas-title ms-2" id="offcanvasNavbarLabel">Administrador</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <a className="nav-link" href="#">Pedidos de remoção de estudante</a>
              
            </li>
          </ul>
          <Link className="nav-link text-danger" href="#" to="/">Terminar sessão</Link>
        </div>
      </div>
    </>
  );
};