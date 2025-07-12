import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

export default function RemoverContasAdmin() {
  const utilizadores = [
    { numero: "2021001", nome: "George R.R Martin", curso: "Ambiente" },
    { numero: "2021002", nome: "Markus Suzak", curso: "Engenharia Civil" },
    {
      numero: "2021003",
      nome: "George R.R Martin",
      curso: "Engenharia Electrotécnica",
    },
    {
      numero: "2021004",
      nome: "George R.R Martin",
      curso: "Engenharia de Madeiras",
    },
    {
      numero: "2021005",
      nome: "Markus Suzak",
      curso: "Engenharia Mecânica e Gestão Industrial",
    },
    { numero: "2021006", nome: "George R.R Martin", curso: "Informática" },
  ];

  const handleDesativar = (nome) => {
    if (window.confirm(`Deseja realmente desativar ${nome}?`)) {
      alert(`Usuário ${nome} desativado (simulação).`);
    }
  };

  return (
    <>
      {/* NAVBAR DIRETA */}

      <nav className="navbar bg-body-tertiary fixed-top">
        <BotaoVoltar backUrl="/admin/list" />
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

      {/* OFFCANVAS NOTIFICAÇÕES */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasNotificacoes"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Notificações</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            <li className="list-group-item">Nova proposta recebida</li>
            <li className="list-group-item">Pedido de validação pendente</li>
            <li className="list-group-item">Estudante removido com sucesso</li>
          </ul>
        </div>
      </div>

      {/* OFFCANVAS PERFIL */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <img src="/img/OportUnii.png" alt="Logo" height="50" />
          <h5 className="offcanvas-title ms-2" id="offcanvasNavbarLabel">
            Departamentos
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              {/* Aqui podes adicionar mais opções */}
            </li>
          </ul>
          <Link to="/propostas/remover">Pedido de remoção de estudante</Link>
          <Link className="nav-link text-danger" to="/">
            Terminar sessão
          </Link>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <main>
        <div className="container mt-5">
          <table className="table remover-tabela text-center align-middle">
            <thead>
              <tr>
                <th className="header-black">Nº Aluno</th>
                <th className="header-black">Nome</th>
                <th className="header-black">Curso</th>
                <th className="header-black">Ações</th>
              </tr>
            </thead>
            <tbody>
              {utilizadores.map((user, index) => (
                <tr key={index}>
                  <td>{user.numero}</td>
                  <td>{user.nome}</td>
                  <td>{user.curso}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-eliminar"
                      onClick={() => handleDesativar(user.nome)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
