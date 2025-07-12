import axios from "axios";

class AuthService {
  login(email, senha) {
    return axios
      .post("http://localhost:3000/utilizadores/login", { email, senha })
      .then((res) => {
        if (res.data && res.data.token && res.data.role && res.data.id_utilizadores) {
          // Guarda tudo, incluindo o email se quiseres
          const utilizador = {
            token: res.data.token,
            role: res.data.role,
            id_utilizadores: res.data.id_utilizadores,
            email: email,
          };

          localStorage.setItem("utilizadores", JSON.stringify(utilizador));

          return utilizador;
        } else {
          return false; // Falha de autenticação
        }
      })
      .catch((err) => {
        console.error("Erro na tentativa de login:", err);
        return false;
      });
  }

  logout() {
    localStorage.removeItem("utilizadores");
  }

  getCurrentUtilizador() {
    return JSON.parse(localStorage.getItem("utilizadores"));
  }
}

export default new AuthService();
