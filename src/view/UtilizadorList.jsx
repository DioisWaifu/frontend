import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/src/sweetalert2.scss";
import authHeader from "../view/auth-header";
import BotaoVoltar from "../components/BotaoVoltar.jsx";

const UtilizadorList = () => {
  const [utilizadores, setUtilizadores] = useState([]);
  const [tipoUtilizador, setTipoUtilizador] = useState(3);

  useEffect(() => {
    carregarUtilizadores();
  }, []);

  function LoadUtilizadores() {
    const url = "http://localhost:3000/utilizadores/list";
    console.log("Header enviado:", authHeader());

    axios
      .get(url, { headers: authHeader() })

      .then((res) => {
        console.log(res);
        if (res.data.success) {
          const data = res.data.data;
          setUtilizadores(data);
        } else {
          alert("Error Web Service!");
        }
      })

      .catch((error) => {
        alert(error);
      });
  }

  const carregarUtilizadores = () => {
    axios
      .get("http://localhost:3000/utilizadores/list")
      .then((res) => {
        if (res.data.success) {
          setUtilizadores(res.data.data);
        } else {
          alert("Erro na resposta da API.");
        }
      })
      .catch((error) => {
        alert("Erro ao carregar utilizadores: " + error);
      });
  };

  function OnDelete(id) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Não será possível recuperar este utilizador!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, elimina-o!",
      cancelButtonText: "Não, voltar atrás",
    }).then((result) => {
      if (result.value) {
        SendDelete(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado!", "O utilizador não foi eliminado", "error");
      }
    });
  }

  function SendDelete(id_utilizadores) {
    // url do backend
    const baseUrl = "http://localhost:3000/utilizadores/delete";
    // network
    axios
      .post(baseUrl, { headers: authHeader(), id: id_utilizadores })

      .then((response) => {
        if (response.data.success) {
          Swal.fire(
            "Eliminada!",
            "O utilizador foi eliminado com sucesso.",
            "success"
          );
          LoadUtilizadores();
        }
      })
      .catch((error) => {
        alert("Error 325 ");
      });
  }

  const LoadHeader = () => {
    switch (tipoUtilizador) {
      case 1: // Candidato
        return (
          <>
            <th className="text-center bg-dark text-white fw-bold text-center px-4 py-2">
              Diplomado
            </th>
          </>
        );
      case 2: // Empresa
        return (
          <>
            <th className="text-center bg-dark text-white fw-bold text-center px-4 py-2">
              Contacto
            </th>
            <th className="text-center bg-dark text-white fw-bold text-center px-4 py-2">
              Localização
            </th>
            <th className="text-center bg-dark text-white fw-bold text-center px-4 py-2">
              Descrição
            </th>
            <th className="text-center bg-dark text-white fw-bold text-center px-4 py-2">
              Website
            </th>
          </>
        );
      case 3: // Gestor
        return (
          <>
            <th className="text-center bg-dark text-white fw-bold text-center px-4 py-2">
              Departamento
            </th>
          </>
        );
      case 4: // Administrador
      default:
        return <></>;
    }
  };

  const LoadFillData = () => {
    return utilizadores.map((u, index) => {
      let colunasExtra; // Estas colunas dependem do tipo de utilizador

      if (u.id_tipo_de_utilizadores !== tipoUtilizador) {
        return null;
      }

      switch (tipoUtilizador) {
        case 1: // Candidato
          colunasExtra = (
            <td className="text-center">
              {u.candidatos?.length > 0
                ? u.candidatos[0].diplomado
                  ? "Sim"
                  : "Não"
                : "—"}
            </td>
          );
          break;
        case 2: // Empresa
          colunasExtra = (
            <>
              <td className="text-center">{u.empresas[0].contacto}</td>
              <td className="text-center">{u.empresas[0].localizacao}</td>
              <td
                className="text-center truncate-text"
                title={u.empresas[0].descricao}
              >
                {u.empresas[0].descricao}
              </td>
              <td className="text-center">
                {u.empresas[0].website ? (
                  <a
                    href={u.empresas[0].website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {u.empresas[0].website}
                  </a>
                ) : (
                  "—"
                )}
              </td>
            </>
          );
          break;
        case 3: // Gestor
          colunasExtra = (
            <td className="text-center">
              {u.gestores?.length > 0
                ? u.gestores[0].departamento?.designacao || "Sem departamento"
                : "—"}
              ;
            </td>
          );
          break;
        case 4: // Administrador
        default:
          colunasExtra = null;
          break;
      }

      return (
        <tr key={index}>
          {/* Colunas default antes */}
          <td className="text-center">{u.nome}</td>
          <td className="text-center">{u.email}</td>
          <td className="text-center">{u.senha}</td>

          {/* Colunas extra (dependem do tipo de utilizador) */}
          {colunasExtra}

          {/* Colunas default depois */}
          <td className="text-center">{u.remover_conta ? "Sim" : "Não"}</td>
          <td className="text-center">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <Link
                to={`/utilizadores/edit/${u.id_utilizadores}`}
                className=" content-center btn btn-outline-success ms-auto"
              >
                Editar
              </Link>
              <button
                className=" content-center btn btn-outline-danger me-auto"
                onClick={() => OnDelete(u.id_utilizadores)}
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  const handleTipoChange = (e) => {
    setTipoUtilizador(Number(e.target.value));
  };

  return (
    <div className="d-flex flex-column">
      <div className="container">
      <BotaoVoltar backUrl="/admin/list" />
      <nav className="navbar bg-body-tertiary fixed- cut-overflow">
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
            Admin
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
              <Link className="nav-link" to="/utilizadores/list">
                Gerir Utilizadores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/propostas/remover">
                Pedido de remoção de estudante
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-danger" to="/">
                Terminar sessão
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <main className="mt-4 flex-grow-1">
        <h2 className="pb-2">Lista de Utilizadores</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Dropdown para escolher Tipo de Utilizador */}
          <div>
            <label htmlFor="tipoUtilizador" className="me-2">
              Filtrar por:
            </label>
            <select
              id="tipoUtilizador"
              className="form-select d-inline-block w-auto"
              value={tipoUtilizador}
              onChange={handleTipoChange}
            >
              <option value={1}>Candidato</option>
              <option value={2}>Empresa</option>
              <option value={3}>Gestor</option>
              <option value={4}>Administrador</option>
            </select>
          </div>

          {/* Botão de Adicionar */}
          <Link
            to="/utilizadores/add"
            className="btn btn-outline-success border-2"
          >
            Adicionar Utilizador
          </Link>
        </div>

        <table
          className="table table-hover table-striped text-center align-middle mb-5"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead className="thead-dark">
            <tr>
              <th className="bg-dark text-white fw-bold text-center px-4 py-2">
                Nome
              </th>
              <th className="bg-dark text-white fw-bold text-center px-4 py-2">
                Email
              </th>
              <th className="bg-dark text-white fw-bold text-center px-4 py-2">
                Senha
              </th>
              {LoadHeader()}
              <th className="bg-dark text-white fw-bold text-center px-4 py-2">
                Remover Conta
              </th>
              <th className="text-center bg-dark text-white fw-bold text-center px-4 py-2">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>{LoadFillData()}</tbody>
        </table>
      </main>
      </div>
      <footer
        className="text-white mt-5"
        style={{
          background: "linear-gradient(to right, #4CBA7B, #1F9588)",
          width: "100%",
        }}
      >
        <div className="container py-3">
          <div className="row px-3">
            <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start mb-2 mb-md-0">
              <span>©2025 Crocodilo.OportUni</span>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#">
                <img src="/img/Facebook.png" alt="Facebook" height="24" />
              </a>
              <a href="#">
                <img src="/img/Instagram.png" alt="Instagram" height="24" />
              </a>
              <a href="#">
                <img src="/img/Pinterest.png" alt="Pinterest" height="24" />
              </a>
              <a href="#">
                <img src="/img/YouTube.png" alt="YouTube" height="24" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default UtilizadorList;
