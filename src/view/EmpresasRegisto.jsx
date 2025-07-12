import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import BotaoVoltar from "../components/BotaoVoltar";

function EmpresaRegisto() {
  {
    /* ------ MUDAR ------ */
  }
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Formulário enviado.");
    navigate("/propostas/list");
  };

  return (
    <div className="bg-white min-vh-100">
        <BotaoVoltar backUrl="/utilizadores/login" />
      <header className="py-4 text-center">
        <img
          src="/img/OportUnii.png"
          alt="OportUni"
          style={{ height: 40, marginBottom: 10 }}
        />
      </header>

      <div className="container">
        <div
          className="d-flex align-items-center shadow-sm p-3 p-md-4 mb-4 bg-white"
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
            Para criar a sua empresa na nossa plataforma, precisamos dos seus
            dados para autenticação, receberá um email caso a sua empresa seja
            aprovada no nosso site
          </span>
        </div>
      </div>

      <div className="container my-5">
        <div className="card shadow-lg rounded-4 p-4">
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="col-12 ">
                <div className="row g-3">
                  {/* Nome da empresa */}
                  <div className="col-md-6">
                    <label className="form-label">Nome da empresa*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Monsters Inc..."
                      required
                    />
                  </div>

                  {/* Website */}
                  <div className="col-md-6">
                    <label className="form-label">Website*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="text"
                      className="form-control"
                      placeholder="https://www.oportuni.pt"
                      required
                    />
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
                      className="form-control"
                      placeholder="R. Mendonça, 3510-156 Viseu"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">Email*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="email"
                      className="form-control"
                      placeholder="oportuni@gmail.com"
                      required
                    />
                  </div>

                  {/* Contactos */}
                  <div className="col-md-6">
                    <label className="form-label">Contactos*</label>
                    <input
                      style={{
                        borderStyle: "solid",
                        borderColor: "#00b383",
                        borderWidth: 2,
                        borderRadius: 16,
                      }}
                      type="text"
                      className="form-control"
                      placeholder="XXX-XXX-XXX"
                      required
                    />
                  </div>

                  {/* Descrição */}
                  <div className="col-12">
                    <label className="form-label">Descrição*</label>
                    <textarea
                      className="form-control"
                      placeholder="Fale nos mais..."
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
                  <Link
                    to="/utilizadores/login"
                    className="btn btn-success px-4 rounded-pill"
                    style={{ backgroundColor: "#00b383" }}
                  >
                    Submeter
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmpresaRegisto;
{
  /* ------ MUDAR ------ */
}
