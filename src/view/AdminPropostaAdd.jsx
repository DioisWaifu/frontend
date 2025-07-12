import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";

function PropostaAdminAdd() {
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

  const competenciasDisponiveis = [
    { id: 1, nome: "JavaScript" },
    { id: 2, nome: "BootStrap" },
    { id: 3, nome: "Adobe Photoshop" },
    { id: 4, nome: "Adobe Illustrator" },
    { id: 5, nome: "Adobe Premiere" },
  ];

  const [tipos, setTipos] = useState([]);
  const [regimes, setRegimes] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/tiposproposta/list")
      .then((res) => setTipos(res.data));
    axios
      .get("http://localhost:3000/regimes/list")
      .then((res) => setRegimes(res.data));
    axios
      .get("http://localhost:3000/modalidades/list")
      .then((res) => setModalidades(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleCheckboxChange = (e) => {
    const value = parseInt(e.target.value);
    const checked = e.target.checked;

    setForm((prevForm) => {
      const updatedCompetencias = checked
        ? [...prevForm.id_competencias, value] // add
        : prevForm.id_competencias.filter((id) => id !== value); // remove

      return {
        ...prevForm,
        id_competencias: updatedCompetencias,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados a enviar:", form); // Debug
    axios
      .post("http://localhost:3000/propostas/create", form)
      .then(() => navigate("/empresa/list"))
      .catch((err) => console.error("Erro ao adicionar proposta:", err));
  };

  return (
    <div className="bg-white min-vh-100">
      <BotaoVoltar backUrl="/admin/list" />
      <header className="py-4 text-center">
        <img
          src="/img/OportUnii.png"
          alt="OportUni"
          style={{ height: 40, marginBottom: 10 }}
        />
      </header>

      <div className="container">
        <div
          className="d-flex align-items-center shadow-sm  p-md-4 bg-white"
          style={{
            borderColor: "#cecece",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 64,
          }}
        >
          <img
            src="/img/exclamacao.png"
            alt="Aviso"
            style={{ width: 70, marginRight: 10, marginLeft: -10 }}
          />
          <span className="fw-semibold">
            Depois de submeter, apenas poderá editar a sua proposta após a mesma
            ser aceite.
          </span>
        </div>
      </div>
      <h2 className=" container mt-5 mb-4">Adicionar Proposta</h2>
      <div className="container">
        <div className="card shadow-lg rounded-4 p-4">
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="col-12 ">
                <div className="row g-3">
                  {/* Título da função */}
                  <div className="col-md-6">
                    <label className="form-label">Título da função*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="text"
                      name="titulo"
                      className="form-control"
                      placeholder="Assistente de Marketing/etc"
                      value={form.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Dropdown do regime - CORRIGIDO */}
                  <div className="col-md-6">
                    <label className="form-label">Horário*</label>
                    <select
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      name="id_regimes_de_propostas"
                      className="form-select"
                      value={form.id_regimes_de_propostas}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      {regimes && regimes.length > 0 ? (
                        regimes.map((regime, index) => (
                          <option
                            key={`regime-${
                              regime.id_regimes_de_propostas || index
                            }`}
                            value={regime.id_regimes_de_propostas}
                          >
                            {regime.designacao || `Regime ${index + 1}`}
                          </option>
                        ))
                      ) : (
                        <option disabled>Carregando...</option>
                      )}
                    </select>
                  </div>

                  {/* Dropdown do tipo - CORRIGIDO */}
                  <div className="col-md-6">
                    <label className="form-label">Tipo de proposta*</label>
                    <select
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      name="id_tipo_de_propostas"
                      className="form-select"
                      value={form.id_tipo_de_propostas}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      {tipos && tipos.length > 0 ? (
                        tipos.map((tipo, index) => (
                          <option
                            key={`tipo-${tipo.id_tipo_de_propostas || index}`}
                            value={tipo.id_tipo_de_propostas}
                          >
                            {tipo.designacao || `Tipo ${index + 1}`}
                          </option>
                        ))
                      ) : (
                        <option disabled>Carregando...</option>
                      )}
                    </select>
                  </div>

                  {/* Dropdown da modalidade - CORRIGIDO */}
                  <div className="col-md-6">
                    <label className="form-label">
                      Modalidade de trabalho*
                    </label>
                    <select
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      name="id_modalidades_de_propostas"
                      className="form-select"
                      value={form.id_modalidades_de_propostas}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione</option>
                      {modalidades && modalidades.length > 0 ? (
                        modalidades.map((modalidade, index) => (
                          <option
                            key={`modalidade-${
                              modalidade.id_modalidades_de_propostas || index
                            }`}
                            value={modalidade.id_modalidades_de_propostas}
                          >
                            {modalidade.designacao || `Modalidade ${index + 1}`}
                          </option>
                        ))
                      ) : (
                        <option disabled>Carregando...</option>
                      )}
                    </select>
                  </div>

                  {/* Localização */}
                  <div className="col-md-6">
                    <label className="form-label">Localização*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="text"
                      name="localizacao"
                      className="form-control"
                      placeholder="R. Mendonça, 3510-156 Viseu"
                      value={form.localizacao}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Data de publicação - CORRIGIDO */}
                  <div className="col-md-6">
                    <label className="form-label">Data de publicação*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="date"
                      name="data_de_publicacao"
                      className="form-control"
                      value={form.data_de_publicacao}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Prazo de candidaturas - CORRIGIDO */}
                  <div className="col-md-6">
                    <label className="form-label">Prazo de Candidaturas*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="date"
                      name="prazo_de_candidaturas"
                      className="form-control"
                      value={form.prazo_de_candidaturas}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Competências */}
                  <div className="col-md-12">
                    <label className="form-label">
                      <b>Competências</b>
                    </label>
                    <div className="d-flex flex-wrap gap-3">
                      {competenciasDisponiveis.map((comp) => (
                        <div key={comp.id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={comp.id}
                            id={`comp-${comp.id}`}
                            checked={form.id_competencias.includes(comp.id)}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`comp-${comp.id}`}
                          >
                            {comp.nome}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="col-12">
                    <label className="form-label">Descrição e contactos*</label>
                    <textarea
                      name="descricao"
                      className="form-control"
                      placeholder="Fale-nos mais..."
                      value={form.descricao}
                      onChange={handleChange}
                      required
                      rows={3}
                      style={{
                        minHeight: 200,
                        resize: "vertical",
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                    />
                  </div>
                </div>
                <div className="text-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-success px-4 rounded-pill"
                    style={{ backgroundColor: "#00b383" }}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="footer text-white mt-5">
        <div
          className="mt-7 py-3 w-100"
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

export default PropostaAdminAdd;