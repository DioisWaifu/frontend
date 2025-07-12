import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Navbar from "../components/Navbar.jsx";


const nomesEstado = {
  activa: "Ativa",
  desactiva: "Desativa",
  "por validar": "Por validar"
};

export default function PropostasPage() {
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
    axios.get("http://localhost:3000/propostas/list")
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
        axios.post("http://localhost:3000/propostas/delete", { id })
          .then(() => {
            Swal.fire("Eliminada!", "A proposta foi eliminada com sucesso.", "success");
            carregarPropostas();
          })
          .catch(() => Swal.fire("Erro", "Erro ao eliminar proposta.", "error"));
      }
    });
  };

  const onToggleEstado = (p) => {
    const novoEstado = p.estado === "activa" ? false : true;
    axios.put(`http://localhost:3000/propostas/update/${p.id_propostas}`, {
      ...p,
      estado: novoEstado
    })
      .then(() => carregarPropostas())
      .catch(() => Swal.fire("Erro", "Não foi possível atualizar o estado.", "error"));
  };

  const propostasFiltradas =
    filtro === "todos" ? propostas : propostas.filter((p) => p.estado === filtro);

  return (
    <div>
      <Navbar />

      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 mt-2">Dashboard</h2>
          <button
            className="btn btn-gradiente mt-2"
            onClick={() => navigate("/propostas/add")}
          >
            <i className="bi bi-plus-circle me-2"></i> Nova Proposta
          </button>
        </div>

        <div className="mb-4">
          <button
            className={`btn me-2 ${filtro === "activa" ? "btn-gradiente" : "btn-outline-success"}`}
            onClick={() => setFiltro("activa")}
          >
            Ativas
          </button>
          <button
            className={`btn me-2 ${filtro === "desactiva" ? "btn-gradiente" : "btn-outline-success"}`}
            onClick={() => setFiltro("desactiva")}
          >
            Desativas
          </button>
          <button
            className={`btn ${filtro === "todos" ? "btn-gradiente" : "btn-outline-success"}`}
            onClick={() => setFiltro("todos")}
          >
            Todas
          </button>
        </div>

        <div className="row">
          <div className="col-md-4 border-end" id="lista-propostas" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {propostasFiltradas.map((p) => (
              <div
                key={p.id_propostas}
                className={`list-group-item p-3 mb-2 rounded ${propostaAtiva?.id_propostas === p.id_propostas ? "active" : "bg-light"}`}
                onClick={() => setPropostaAtiva(p)}
              >
                <strong>{p.titulo}</strong>
                <div>{p.descricao?.substring(0, 50)}...</div>
                <small className="text-muted">Validade: {p.prazo_de_candidaturas}</small>
              </div>
            ))}
            {propostasFiltradas.length === 0 && (
              <p className="text-muted">Nenhuma proposta encontrada.</p>
            )}
          </div>

          <div className="col-md-8">
            {propostaAtiva ? (
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{propostaAtiva.titulo}</h5>
                  <p><strong>Estado:</strong> {nomesEstado[propostaAtiva.estado]}</p>
                  <p>{propostaAtiva.descricao}</p>
                  <p><strong>Validade:</strong> {propostaAtiva.prazo_de_candidaturas || "—"}</p>

                  <div className="d-flex gap-2 mt-3">
                    {propostaAtiva.estado === "activa" && (
                      <>
                        {(role === 2 || role === 3) && (
                          <button
                            className="btn btn-outline-info btn-sm"
                            onClick={() => navigate(`/propostas/edit/${propostaAtiva.id_propostas}`)}
                          >
                            Editar
                          </button>
                        )}
                        {role === 3 && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDelete(propostaAtiva.id_propostas)}
                          >
                            Eliminar
                          </button>
                        )}
                      </>
                    )}

                    {propostaAtiva.estado === "desactiva" && (
                      <>
                        <button
                          className="btn btn-outline-success btn-sm"
                          onClick={() => onToggleEstado(propostaAtiva)}
                        >
                          Ativar
                        </button>
                        {role === 3 && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDelete(propostaAtiva.id_propostas)}
                          >
                            Eliminar
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted">Seleciona uma proposta para ver os detalhes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}