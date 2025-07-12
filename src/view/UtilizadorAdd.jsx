import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import { Link } from "react-router-dom";


function UtilizadorAdd() {
  const [form, setForm] = useState({
    // UTILIZADORES
    id_tipo_de_utilizadores: "", // 1 - Candidato, 2 - Empresa, 3 - Gestor
    id_gestores: "",
    id_empresas: "",
    id_candidatos: "",
    nome: "",
    email: "",
    senha: "",
    remover_conta: false,
    // EMPRESAS
    contacto: "",
    localizacao: "",
    descricao: "",
    website: "",
    // CANDIDATOS
    diplomado: false, 
  });

  const [tipos, setTipos] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/tiposdeutilizador/list")
      .then((res) => setTipos(res.data.data || []))
      .catch(() => setTipos([]));

    axios
      .get("http://localhost:3000/gestores/list")
      .then((res) => setGestores(res.data.data || []))
      .catch(() => setGestores([]));

    axios
      .get("http://localhost:3000/empresas/list")
      .then((res) => setEmpresas(res.data.data || []))
      .catch(() => setEmpresas([]));

    axios
      .get("http://localhost:3000/candidatos/list")
      .then((res) => setCandidatos(res.data.data || []))
      .catch(() => setCandidatos([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "id_tipo_de_utilizadores") {
      setForm((prev) => ({
        ...prev,
        id_tipo_de_utilizadores: newValue,
        id_gestores: "",
        id_empresas: "",
        id_candidatos: "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

if (form.id_tipo_de_utilizadores === "1" && form.diplomado === undefined) {
  alert("Deves indicar se o candidato é diplomado.");
  return;
}


    if (form.id_tipo_de_utilizadores === "2") {
      if (
        !form.contacto ||
        !form.localizacao ||
        !form.descricao ||
        !form.website
      ) {
        alert("Deves preencher todos os dados da empresa.");
        return;
      }
    }

    if (form.id_tipo_de_utilizadores === "3" && !form.id_gestores) {
      alert("Deves escolher um Gestor.");
      return;
    }

    axios
      .post("http://localhost:3000/utilizadores/create", form)
      .then(() => navigate("/utilizadores"))
      .catch((err) => {
        console.error("Erro ao adicionar utilizador:", err);
        alert("Erro ao adicionar utilizador. Ver consola para detalhes.");
      });
  };

  return (
    <div>
      <BotaoVoltar backUrl="/utilizadores/list" />
      <div className="container">
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
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNotificacoes">
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
          <h5 className="offcanvas-title ms-2" id="offcanvasNavbarLabel">Admin</h5>
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

    <div className="container mt-4">
      <h2 className="ms-3 pb-3">Adicionar Utilizador</h2>
      <form onSubmit={handleSubmit}>
        {/** CAMPOS DEFAULT UTILIZADORES ------------------------------------------------------------------------------*/}
        <div className="mb-3">
          <label className="ms-3 pb-1">Nome</label>
          <input
            type="text"
            className="form-control"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="ms-3 pb-1">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="ms-3 pb-1">Senha</label>
          <input
            type="text"
            className="form-control"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check mb-3 pb-1">
          <input
            type="checkbox"
            id="remover_conta"
            name="remover_conta"
            checked={form.remover_conta}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="remover_conta" className="form-check-label">
            Remover Conta
          </label>
        </div>

        <div className="mb-3">
          <label className="ms-3 pb-1">Tipo de Utilizador</label>
          <select
            className="form-control"
            name="id_tipo_de_utilizadores"
            value={form.id_tipo_de_utilizadores}
            onChange={handleChange}
            required
          >
            <option value="">Escolher...</option>
            {tipos.map((t) => (
              <option
                key={t.id_tipo_de_utilizadores}
                value={t.id_tipo_de_utilizadores}
              >
                {t.designacao}
              </option>
            ))}
          </select>
        </div>

        {/** GESTOR ------------------------------------------------------------------------------*/}
        {form.id_tipo_de_utilizadores === "3" && (
          <div className="mb-3 pb-1">
            <label className="ms-3">Gestor</label>
            <select
              className="form-control"
              name="id_gestores"
              value={form.id_gestores || ""}
              onChange={handleChange}
              required
            >
              <option value="">Escolher...</option>
              {gestores.map((g) => (
                <option key={g.id_gestores} value={g.id_gestores}>
                  {g.departamento?.designacao || "Sem departamento"}
                </option>
              ))}
            </select>
          </div>
        )}

        {/** EMPRESA -----------------------------------------------------------------------------*/}
        {form.id_tipo_de_utilizadores === "2" && (
          <>
            {/* Campos para criar/editar empresa */}
            <div className="mb-3 pb-1">
              <label className="ms-3">Contacto</label>
              <input
                type="text"
                className="form-control"
                name="contacto"
                value={form.contacto || ""}
                onChange={handleChange}
                required={!form.id_empresas}
              />
            </div>

            <div className="mb-3">
              <label className="ms-3 pb-1">Localização</label>
              <input
                type="text"
                className="form-control"
                name="localizacao"
                value={form.localizacao || ""}
                onChange={handleChange}
                required={!form.id_empresas}
              />
            </div>

            <div className="mb-3">
              <label className="ms-3 pb-1">Descrição</label>
              <textarea
                className="form-control"
                name="descricao"
                value={form.descricao || ""}
                onChange={handleChange}
                required={!form.id_empresas}
              />
            </div>

            <div className="mb-3">
              <label className="ms-3 pb-1">Website</label>
              <input
                type="url"
                className="form-control"
                name="website"
                value={form.website || ""}
                onChange={handleChange}
                required={!form.id_empresas}
              />
            </div>
          </>
        )}

        {/** CANDIDATO ---------------------------------------------------------------------------*/}
        {form.id_tipo_de_utilizadores === "1" && (

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="diplomado"
                  name="diplomado"
                  checked={form.diplomado || false}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="diplomado" className="form-check-label">
                  Diplomado
                </label>
              </div>
            )}

        <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-gradiente container_gradiente mb-5">
              Adicionar
            </button>
          </div>
      </form>
    </div>
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
}

export default UtilizadorAdd;