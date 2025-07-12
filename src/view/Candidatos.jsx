import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import BotaoVoltar from "../components/BotaoVoltar";

const Candidatos = () => {
  const [propostaSelecionada, setPropostaSelecionada] = useState();
  const [propostas, setPropostas] = useState([]);
  const [filtroProposta, setFiltroProposta] = useState(0);
  const [filtroRegime, setFiltroRegime] = useState(0);
  const [filtroModalidade, setFiltroModalidade] = useState(0);
  const [filtroCompetencia, setFiltroCompetencia] = useState(0);



  useEffect(() => {
    carregarFiltrarPropostas();
    if (propostas.length > 0) {
      setPropostaSelecionada(propostas[0]);
    }
  }, []);

  const carregarFiltrarPropostas = () => {
    axios
      .get("http://localhost:3000/propostas/list")
      .then((res) => {
        if (res.data.success) {
          let propostasFiltradas = res.data.data.filter(
            (p) => p.estado === true
          );

          if (filtroProposta !== 0) {
            propostasFiltradas = propostasFiltradas.filter(
              (p) => p.id_tipo_de_propostas === filtroProposta
            );
          }

          if (filtroRegime !== 0) {
            propostasFiltradas = propostasFiltradas.filter(
              (p) => p.id_regimes_de_propostas === filtroRegime
            );
          }

          if (filtroModalidade !== 0) {
            propostasFiltradas = propostasFiltradas.filter(
              (p) => p.id_modalidades_de_propostas === filtroModalidade
            );
          }

          if (filtroCompetencia !== 0) {
            propostasFiltradas = propostasFiltradas.filter(
              (p) => p.id_competencias === filtroCompetencia
            );
          }

          setPropostas(propostasFiltradas);
        }
      })
      .catch((err) => alert("Erro ao carregar propostas: " + err));
  };

  return (
    <div>
      {/* NAVBAR */}
      <BotaoVoltar backUrl="/utilizadores/login" />
      <nav className="navbar bg-body-tertiary fixed-top">
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
            <ul className="list-group">
              <li className="list-group-item">Recebeu uma nova proposta!</li>
              <li className="list-group-item">
                Esta proposta já não se encontra disponível.
              </li>
              <li className="list-group-item">
                A sua candidatura foi enviada com sucesso.
              </li>
            </ul>
          </ul>
        </div>
      </div>

      {/* OFFCANVAS NAVBAR */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <img src="/img/OportUnii.png" alt="Logo" height="50" />
          <h5 className="offcanvas-title ms-2" id="offcanvasNavbarLabel">
            
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <button to="/propostas/remover">Pedir para remover conta</button>
          <Link className="nav-link text-danger" to="/">
            Terminar sessão
          </Link>
        </div>
      </div>

      {/* HERO E FILTROS */}
      <div className="pt-5">
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <h1 className="title hero-title">
              Encontra a proposta ideal para ti!
            </h1>
            <div className="searchbar-container d-flex gap-3">
              <div>
                <label className="form-label">
                  <b>Proposta</b>
                </label>
                <select
                  className="form-select"
                  onChange={(e) => setFiltroProposta(Number(e.target.value))}
                >
                  <option value={0}>Selecione uma opção</option>
                  <option value={1}>Emprego</option>
                  <option value={2}>Estágio</option>
                  <option value={3}>Formação</option>
                </select>
              </div>

              <div>
                <label className="form-label">
                  <b>Regime</b>
                </label>
                <select
                  className="form-select"
                  onChange={(e) => setFiltroRegime(Number(e.target.value))}
                >
                  <option value={0}>Selecione uma opção</option>
                  <option value={1}>Tempo Integral</option>
                  <option value={2}>Tempo Parcial</option>
                </select>
              </div>

              <div>
                <label className="form-label">
                  <b>Modalidade</b>
                </label>
                <select
                  className="form-select"
                  onChange={(e) => setFiltroModalidade(Number(e.target.value))}
                >
                  <option value={0}>Selecione uma opção</option>
                  <option value={1}>Presencial</option>
                  <option value={2}>Híbrido</option>
                  <option value={3}>Remoto</option>
                </select>
              </div>

              <div>
                <label className="form-label">
                  <b>Competências</b>
                </label>
                <select
                  className="form-select"
                  onChange={(e) => setFiltroCompetencia(Number(e.target.value))}
                >
                  <option value={0}>Selecione uma opção</option>
                  <option value={1}>JavaScript</option>
                  <option value={2}>BootStrap</option>
                  <option value={3}>Adobe Photoshop</option>
                  <option value={4}>Adobe Illustrator</option>
                  <option value={5}>Adobe Premiere</option>
                </select>
              </div>

              <div>
                <button
                  onClick={() => carregarFiltrarPropostas()}
                  className="btn btn-success botao-arredondado px-4 py-2"
                >
                  Procurar
                </button>
              </div>
            </div>
          </div>
        </section>

        <p className="container descricao text-center mt-4">
          A OportUni conecta alunos e ex-alunos do IPV às melhores oportunidades
          de trabalho. Com filtros inteligentes, encontra rapidamente vagas
          alinhadas aos teus interesses e qualificações.
        </p>

        <h1 className="match mt-2">Match</h1>

        {/* LISTA DE PROPOSTAS */}
        <div className="container pb-5" style={{ minHeight: "250px" }}>
          <div className="row">
            <div
              className="col-md-4 border-end"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {propostas.map((p, index) => (
                <div
                  key={index}
                  className={`p-3 mb-2 rounded ${
                    propostaSelecionada?.id_propostas === p.id_propostas
                      ? "bg-success text-white"
                      : "bg-light"
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setPropostaSelecionada(p)}
                >
                  <strong>{p.titulo}</strong>
                  <div>{p.descricao.substring(0, 50)}...</div>
                  <small className="text-muted">
                    Validade: {p.prazo_de_candidaturas}
                  </small>
                </div>
              ))}
            </div>

            <div className="col-md-8">
              {propostaSelecionada ? (
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{propostaSelecionada.titulo}</h5>
                    <p>{propostaSelecionada.descricao}</p>
                    <p>
                      <strong>Localização:</strong>{" "}
                      {propostaSelecionada.localizacao}
                    </p>
                    <p>
                      <strong>Competências</strong>{" "}
                      {propostaSelecionada.id_competencias?.designacao}
                    </p>
                    <p>
                      <strong>Horário:</strong>{" "}
                      {propostaSelecionada.regime?.designacao}
                    </p>
                    <p>
                      <strong>Modalidade:</strong>{" "}
                      {propostaSelecionada.modalidade?.designacao}
                    </p>
                    <p>
                      <strong>Tipo de Proposta:</strong>{" "}
                      {propostaSelecionada.tipo?.designacao}
                    </p>
                    <p>
                      <strong>Validade:</strong>{" "}
                      {propostaSelecionada.prazo_de_candidaturas}
                    </p>
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
};

export default Candidatos;
