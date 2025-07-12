import React, { useState } from "react";
import AuthService from "../view/auth.service";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../components/BotaoVoltar";
import { Link } from "react-router-dom";

export default function LoginComponent() {
  const [email, setemail] = useState("");
  const [senha, setsenha] = useState("");
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  async function HandleLogin(event) {
    event.preventDefault();
    setmessage("");
    setloading(true);

    AuthService.login(email, senha)
      .then((res) => {
        if (!res || !res.token) {
          setmessage("Autenticação falhou.");
          setloading(false);
        } else {
          const utilizador = AuthService.getCurrentUtilizador();

          // Redirecionamento com base no tipo de utilizador
          switch (utilizador.role) {
            case 1:
              navigate("/candidatos");
              break;
            case 2:
              navigate("/empresa/list");
              break;
            case 3:
              navigate("/departamento/list");
              break;
            default:
              navigate("/admin/list");
          }
        }
      })
      .catch(() => {
        setmessage("Autenticação falhou.");
        setloading(false);
      });
  }

  return (
    <>
      <BotaoVoltar backUrl="/" />
      <div className="login-page d-flex align-items-center justify-content-center">
        <div className="login-overlay">
          <div className="login-form-container p-4 shadow rounded bg-white">
            <nav className="navbar bg-body-tertiary mb-3"></nav>

            <h2 className="mb-4 text-center">Iniciar Sessão</h2>
            <form onSubmit={HandleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="exemplo@dominio.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Palavra-passe
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  value={senha}
                  onChange={(e) => setsenha(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary container_gradiente"
                  disabled={loading}
                >
                  {loading ? "A autenticar..." : "Login"}
                </button>
                <p className="m-2 text-center">
                  Se é uma empresa crie aqui a sua conta{" "}
                  <Link to="/utilizadores/registo">Criar Conta</Link>
                </p>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
