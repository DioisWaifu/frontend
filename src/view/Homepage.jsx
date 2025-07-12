import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate("/utilizadores/login");
    
  };

  return (
    <>
      <nav className="container navbar bg-body-tertiary">
        <div className="container-fluid nav-margin">
          <a className="navbar-brand" href="#">
            <img src="/img/OportUnii.png" alt="Brand Logo" height="30" />
          </a>

          <div className="dropdown">
            <button
              href="#"
              className="d-flex align-items-center text-decoration-none text-body"
              aria-expanded="false"
              onClick={irParaLogin}

            >
              Iniciar Sessão
            </button> 

          </div>
        </div>
      </nav>

      <div className="container-fluid p-0">
        <div
          className="hero-image"
          style={{
            backgroundImage:
              "url('img/labor-union-members-working-together 1.png')",
            height: "700px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div
            className="hero-text"
            style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textalign: "center",
          }}
          >
            <h1>Encontra o emprego</h1>
            <h1>ideal para ti!</h1>
          </div>
        </div>
      </div>

      <div className="container ajuste">
        <p>
          A OportUni conecta alunos e ex-alunos do IPV às melhores oportunidades
          de trabalho, com filtros inteligentes, encontra rapidamente vagas
          alinhadas aos teus interesses e qualificações profissionais. Crava as
          melhores oportunidades de emprego connosco!
         
        </p>
      </div>

      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <img
              src="/img/business_center_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.png"
              alt="Ofertas Ativas"
              style={{width: "60px", height: "auto"}}
            />
            <h5 className="mt-3 fw-bold">117</h5>
            <p>Ofertas Ativas</p>
          </div>

          <div className="col-md-4 mb-4">
            <img
              src="/img/corporate_fare_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.png"
              alt="Empresas Registadas"
              style={{width: "60px", height: "auto"}}
            />
            <h5 className="mt-3 fw-bold">32</h5>
            <p>Empresas Registadas</p>
          </div>

          <div className="col-md-4 mb-4">
            <img
              src="/img/groups_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.png"
              alt="Alunos Inscritos"
              style={{width: "60px", height: "auto"}}
            />
            <h5 className="mt-3 fw-bold">2 077</h5>
            <p>Alunos Inscritos</p>
          </div>
        </div>
      </div>

      <div className="container">
        <h1>Sobre nós</h1>
        <p>Politécnico de Viseu</p>
        <p>+1 (555) 123-4567</p>
        <p>CrocodilloUni@gmail.com</p>
      </div>
      <div className="pt-5">
        <div className="container"></div>
      </div>

      <footer className="bg-dark text-white pt-4 pb-3">
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
          style={{background: "linear-gradient(to right, #4CBA7B, #1F9588)"}}
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
    </>
  );
};


export default HomePage;
