import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./view/login";
import AuthService from "./view/auth.service";
import HomePage from "./view/Homepage";

// Componentes Empresas
import PropostasPage from "./view/PropostaEmpresasList";
import PropostaEmpresasAdd from "./view/PropostaEmpresasAdd";
import PropostaEmpresasEdit from "./view/PropostaEmpresasEdit";

// Componentes Candidatos
import Candidatos from "./view/Candidatos";

// Componentes Utilizadores
import UtilizadorList from "./view/UtilizadorList";
import UtilizadorAdd from "./view/UtilizadorAdd";
import UtilizadorEdit from "./view/UtilizadorEdit";


// Componentes Departamentos
import PropostaPageDepartamento from "./view/DepartamentoPropostaList";
import PropostaDepartamentoAdd from "./view/DepartamentoPropostaAdd";
import PropostaDepartamentoEdit from "./view/DepartamentoPropostaEdit";
import RemoverContas from "./view/RemoverContas";

// Componentes Admin
import PropostasPageAdmin from "./view/AdminPropostaList";
import PropostaAdminAdd from "./view/AdminPropostaAdd";
import PropostaAdminEdit from "./view/AdminPropostaEdit";

import EmpresaRegisto from "./view/EmpresasRegisto";




function App() {

  
  return (
    <Router>
     
            <Routes>
                      <Route path="/" element={<HomePage />} />

              <Route path="utilizadores/login" element={<Login />} />
              <Route path="utilizadores/registo" element={<EmpresaRegisto />} />

              {/* Rotas Departamentos */}

              <Route path="/departamento/list" element={<PropostaPageDepartamento />} />
              <Route path="/departamento/add" element={<PropostaDepartamentoAdd />} />
              <Route path="/departamento/edit/:id" element={<PropostaDepartamentoEdit />} /> 
              
              {/* Rotas Candidatos */}
              <Route path="/candidatos" element={<Candidatos />} />  

              {/* Rotas Empresas */}
              <Route path="/empresa/list" element={<PropostasPage />} />
              <Route path="/empresa/add" element={<PropostaEmpresasAdd />} />
              <Route path="/empresa/edit/:id" element={<PropostaEmpresasEdit />} />

              {/* Rotas Remover contas estudantes */}
              <Route path="/RemoverContas" element={<RemoverContas />} />

              {/* Rotas Utilizadores - ADMIN */}
              <Route path="/admin/list" element={<PropostasPageAdmin />} />
              <Route path="/admin/add" element={<PropostaAdminAdd />} /> 
              <Route path="/admin/edit/:id" element={<PropostaAdminEdit />} />
              <Route path="/utilizadores/list" element={<UtilizadorList />} />
              <Route path="/utilizadores/add" element={<UtilizadorAdd />} />
              <Route path="/utilizadores/edit/:id" element={<UtilizadorEdit />}
              

              

            
              />
            </Routes>
         
    </Router>
  );
}

export default App;
/*
export default function AppComponent() {
const [currentUtilizador, setcurrentUtilizador] = useState("");
useEffect(() => {
const utilizadores = AuthService.getCurrentUtilizador();
if (utilizadores) {
setcurrentUser({ currentUtilizador: utilizadores });
}
}, []);
logOut(); {
AuthService.logout();
}};*/