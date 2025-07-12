import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Link } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

const nomesEstado = {
  activa: "Ativa",
  desactiva: "Desativa",
};
function PropostaEmpresasAdd() {
  const [form, setForm] = useState({
    id_regimes_de_propostas: "",
    id_tipo_de_propostas: "",
    id_modalidades_de_propostas: "",
    id_competencias: [],
    titulo: "",
    descricao: "",
    localizacao: "",
    data_de_publicacao: "",
    prazo_de_candidaturas: "",
    estado: false,
  });
};

 const competenciasDisponiveis = [
    { id: 1, nome: "JavaScript" },
    { id: 2, nome: "BootStrap" },
    { id: 3, nome: "Adobe Photoshop" },
    { id: 4, nome: "Adobe Illustrator" },
    { id: 5, nome: "Adobe Premiere" },
  ];
export default function PropostasPageAdmin() {
  const [propostas, setPropostas] = useState([]);
  const [filtro, setFiltro] = useState("activa");
  const [propostaAtiva, setPropostaAtiva] = useState(null);
  const navigate = useNavigate();

  const utilizador = JSON.parse(localStorage.getItem("utilizadores"));
  const role = utilizador?.role;

  useEffect(() => {
    carregarPropostas();
  }, []);

  const carregarPropostas = () => {
    axios
      .get("http://localhost:3000/propostas/list")
      .then((res) => {
        if (res.data.success) {
          const propostasConvertidas = res.data.data.map((p) => ({
            ...p,
            estado: p.estado === true ? "activa" : "desactiva",
          }));
          setPropostas(propostasConvertidas);
          setPropostaAtiva(propostasConvertidas[0] || null);
        }
      })
      .catch((err) => alert("Erro ao carregar propostas: " + err));
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Não será possível recuperar esta proposta!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, elimina-a!",
      cancelButtonText: "Não, voltar atrás",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:3000/propostas/delete", { id })
          .then(() => {
            Swal.fire(
              "Eliminada!",
              "A proposta foi eliminada com sucesso.",
              "success"
            );
            carregarPropostas();
          })
          .catch(() =>
            Swal.fire("Erro", "Erro ao eliminar proposta.", "error")
          );
      }
    });
  };

  const onToggleEstado = (p) => {
    const novoEstado = p.estado === "activa" ? false : true;
    axios
      .put(`http://localhost:3000/propostas/update/${p.id_propostas}`, {
        ...p,
        estado: novoEstado,
      })
      .then(() => carregarPropostas())
      .catch(() =>
        Swal.fire("Erro", "Não foi possível atualizar o estado.", "error")
      );
  };

  const propostasFiltradas =
    filtro === "todos"
      ? propostas
      : propostas.filter((p) => p.estado === filtro);

  return (
    <div>
      {/* NAVBAR DIRETA */}
      <BotaoVoltar backUrl="/utilizadores/login" />
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

      <div className="container pt-5">
        <button
          className="btn text-white mt-2 btn-gradiente w-100"
          onClick={() => navigate("/admin/add")}
          style={{ minHeight: "10vh", fontSize: "20px" }}
        >
          <i className="bi bi-plus-circle me-2"></i> Nova Proposta
        </button>
      </div>

      <div className="container pt-5">
        {/* Título + botão alinhado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 mt-2">Dashboard</h2>
        </div>

        {/* Botões de Filtro (Verdes) */}
        <div className="mb-4">
          <button
            className={`btn me-2 ${
              filtro === "activa" ? "btn-gradiente" : "btn-outline-success"
            }`}
            onClick={() => setFiltro("activa")}
          >
            Ativas
          </button>
          <button
            className={`btn me-2 ${
              filtro === "desactiva" ? "btn-gradiente" : "btn-outline-success"
            }`}
            onClick={() => setFiltro("desactiva")}
          >
            Desativas
          </button>
          <button
            className={`btn ${
              filtro === "todos" ? "btn-gradiente" : "btn-outline-success"
            }`}
            onClick={() => setFiltro("todos")}
          >
            Todas
          </button>
        </div>

        <div className="row pb-5">
          {/* Lista de propostas */}
          <div
            className="col-md-4 border-end"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            {propostasFiltradas.map((p) => (
              <div
                key={p.id_propostas}
                className={`p-3 mb-2 rounded ${
                  propostaAtiva?.id_propostas === p.id_propostas
                    ? "bg-light-gradient text-white"
                    : "bg-light"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setPropostaAtiva(p)}
              >
                <strong>{p.titulo}</strong>
                <div className="cut-overflow">
                  {p.descricao?.substring(0, 50)}...
                </div>
                <small className="text-muted">
                  Validade: {p.prazo_de_candidaturas}
                </small>
              </div>
            ))}
            {propostasFiltradas.length === 0 && (
              <p className="text-muted">Nenhuma proposta encontrada.</p>
            )}
          </div>

          {/* Detalhes da proposta */}
          <div className="col-md-8">
            {propostaAtiva ? (
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{propostaAtiva.titulo}</h5>
                  <p>
                    <strong>Estado:</strong> {nomesEstado[propostaAtiva.estado]}
                  </p>
                  <p>{propostaAtiva.descricao}</p>
                  <p>
                    <strong>Localização:</strong>{" "}
                    {propostaAtiva.localizacao || "—"}
                  </p>
                  <p>
                    <strong>Competências:</strong>{" "}
                    {propostaAtiva.id_competencias?.designacao || "—"}
                  </p>
                  <p>
                    <strong>Horário:</strong>{" "}
                    {propostaAtiva.regime?.designacao || "—"}
                  </p>
                  <p>
                    <strong>Modalidade:</strong>{" "}
                    {propostaAtiva.modalidade?.designacao || "—"}
                  </p>
                  <p>
                    <strong>Tipo de Proposta:</strong>{" "}
                    {propostaAtiva.tipo?.designacao || "—"}
                  </p>
                  <p>
                    <strong>Validade:</strong>{" "}
                    {propostaAtiva.prazo_de_candidaturas || "—"}
                  </p>


                  <div className="d-flex gap-2 mt-3">
                    {/* ATIVAS: Editar + Eliminar */}
                    {propostaAtiva.estado === "activa" && (
                      <>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() =>
                            navigate(
                              `/admin/edit/${propostaAtiva.id_propostas}`
                            )
                          }
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(propostaAtiva.id_propostas)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}

                    {/* DESATIVAS: Ativar + Eliminar (mostrados para todos) */}
                    {propostaAtiva.estado === "desactiva" && (
                      <>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => onToggleEstado(propostaAtiva)}
                        >
                          Ativar
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(propostaAtiva.id_propostas)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted">
                Seleciona uma proposta para ver os detalhes.
              </p>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-dark text-white pt-4 pb-3 mt-5">
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-uppercase">A Nossa Empresa</h5>
              <p>
                Oferecemos soluções para conectar candidatos com oportunidades
                de emprego em várias áreas. Crava as melhores oportunidades de
                emprego connosco!
              </p>
            </div>

            <div className="col-md-6 mb-3 text-md-end">
              <div className="d-inline-block text-start">
                <h5 className="text-uppercase">Contactos</h5>
                <p>Email: CrocodilloUni@gmail.com Telefone: +351 912 345 678</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer text-white">
        <div
          className="py-3 w-100"
          style={{ background: "linear-gradient(to right, #4CBA7B, #1F9588)" }}
        >
          <div className="container">
            <div className="row">
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
        </div>
      </div>
    </div>
  );
}
