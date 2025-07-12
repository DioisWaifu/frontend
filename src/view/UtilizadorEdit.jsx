import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import { Link } from "react-router-dom";


function UtilizadorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id_tipo_de_utilizadores: "",
    id_gestores: null,
    id_departamento: null,
    id_empresas: null,
    id_candidatos: null,
    nome: "",
    email: "",
    senha: "",
    remover_conta: false,
    contacto: "",
    localizacao: "",
    descricao: "",
    website: "",
    diplomado: false, 
  });

  const [tipos, setTipos] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    // Carregar listas para selects
    axios
      .get("https://backendai2.onrender.com/tiposdeutilizador/list")
      .then((res) => setTipos(res.data.data || []));
    axios
      .get("https://backendai2.onrender.com/gestores/list")
      .then((res) => setGestores(res.data.data || []));
    axios
      .get("https://backendai2.onrender.com/departamentos/list")
      .then((res) => setDepartamentos(res.data.data || []))
      .catch(() => setDepartamentos([]));
    axios
      .get("https://backendai2.onrender.com/empresas/list")
      .then((res) => setEmpresas(res.data.data || []));
    axios
      .get("https://backendai2.onrender.com/candidatos/list")
      .then((res) => setCandidatos(res.data.data || []));

    // Carregar dados do utilizador a editar
    axios
      .get(`https://backendai2.onrender.com/utilizadores/get/${id}`)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          const empresa =
            data.empresas && data.empresas.length > 0 ? data.empresas[0] : {};
          const candidato =
            data.candidatos && data.candidatos.length > 0
              ? data.candidatos[0]
              : null;

          setForm({
            id_tipo_de_utilizadores: Number(data.id_tipo_de_utilizadores) || "",
            id_gestores: data.id_gestores || null,
            id_departamento:
              (data.gestores &&
                data.gestores[0]?.departamento?.id_departamento) ||
              null,
            id_empresas: data.id_empresas || null,
            id_candidatos: candidato ? candidato.id_candidatos : null,
            nome: data.nome || "",
            email: data.email || "",
            senha: data.senha,
            remover_conta: data.remover_conta || false,
            contacto: empresa.contacto || "",
            localizacao: empresa.localizacao || "",
            descricao: empresa.descricao || "",
            website: empresa.website || "",
            diplomado: candidato ? candidato.diplomado : false,
          });
        }
      })
      .catch((err) => console.error("Erro ao carregar utilizador:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    if (
      [
        "id_tipo_de_utilizadores",
        "id_gestores",
        "id_departamento",
        "id_empresas",
        "id_candidatos",
      ].includes(name)
    ) {
      newValue = newValue === "" ? null : Number(newValue);
    }

    if (name === "id_gestores") {
      const gestorSelecionado = gestores.find(
        (g) => g.id_gestores === newValue
      );
      setForm((prev) => ({
        ...prev,
        id_gestores: newValue,
        id_departamento: gestorSelecionado
          ? gestorSelecionado.id_departamentos
          : null,
      }));
    } else if (name === "id_tipo_de_utilizadores") {
      // Resetar campos associados
      setForm((prev) => ({
        ...prev,
        id_tipo_de_utilizadores: newValue,
        id_gestores: null,
        id_departamento: null,
        id_empresas: null,
        id_candidatos: null,
        contacto: "",
        localizacao: "",
        descricao: "",
        website: "",
        diplomado: false,
      }));
    } else if (name === "id_empresas") {
      const empresaSelecionada = empresas.find(
        (e) => e.id_empresas === newValue
      );
      setForm((prev) => ({
        ...prev,
        id_empresas: newValue,
        contacto: empresaSelecionada?.contacto || "",
        localizacao: empresaSelecionada?.localizacao || "",
        descricao: empresaSelecionada?.descricao || "",
        website: empresaSelecionada?.website || "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações para não deixar campos em falta
    if (form.id_tipo_de_utilizadores === 1 && !form.id_candidatos) {
      alert("Deves escolher um Candidato.");
      return;
    }
    if (form.id_tipo_de_utilizadores === 2 && !form.id_empresas) {
      alert("Deves escolher uma Empresa.");
      return;
    }
    if (form.id_tipo_de_utilizadores === 3 && !form.id_gestores) {
      alert("Deves escolher um Gestor.");
      return;
    }

    axios
      .put(`https://backendai2.onrender.com/utilizadores/update/${id}`, form)
      .then(() => navigate("/utilizadores/list"))
      .catch((err) => {
        console.error("Erro ao atualizar utilizador:", err);
        alert("Erro ao atualizar utilizador.");
      });
  };

  return (
    <div className=" d-flex flex-column">
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
      
      <h2 className="pb-2">Editar Utilizador</h2>
      <form onSubmit={handleSubmit}>
        {/**CAMPOS DEFAULT UTILIZADORES------------------------------------------------------------------------------*/}
        <div className="mb-3">
          <label>Nome</label>
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
          <label>Email</label>
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
          <label>Senha </label>
          <input
            type="password"
            className="form-control"
            name="senha"
            value={form.senha}
            onChange={handleChange}
          />
        </div>
        <div className="form-check mb-3">
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
          <label>Tipo de Utilizador</label>
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
        {/**GESTORES --- MUDAR DEPARTAMENTO -------------------------------------------------------------------------*/}
        {form.id_tipo_de_utilizadores === 3 && (
          <div className="mb-3">
            <label>Gestor</label>
            <select
              className="form-control"
              name="id_gestores"
              value={form.id_gestores || ""}
              onChange={handleChange}
              required
            >
              <option value="">Escolher departamento</option>
              {gestores.map((g) => (
                <option key={g.id_gestores} value={g.id_gestores}>
                  {g.departamento?.designacao || "Sem departamento"}
                </option>
              ))}
            </select>
          </div>
        )}
        {/**EMPRESA --- MUDAR CONTACTO / LOCALIZAÇÃO / DESCRIÇÃO / WEBSITE-------------------------------------------*/}
        {form.id_tipo_de_utilizadores === 2 && (
          <>
            <div className="mb-3">
              <label>Contacto</label>
              <input
                type="text"
                className="form-control"
                name="contacto"
                value={form.contacto || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Localização</label>
              <input
                type="text"
                className="form-control"
                name="localizacao"
                value={form.localizacao || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Descrição</label>
              <textarea
                className="form-control"
                name="descricao"
                value={form.descricao || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Website</label>
              <input
                type="url"
                className="form-control"
                name="website"
                value={form.website || ""}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {/**CANDIDATO --- MUDAR DIPLOMADO ---------------------------------------------------------------------------*/}
        {form.id_tipo_de_utilizadores === 1 && (
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
        <button type="submit" className="btn btn-gradiente container_gradiente mb-5">
          Guardar
        </button>
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

export default UtilizadorEdit;
