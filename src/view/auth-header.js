export default function authHeader() {
  const utilizador = JSON.parse(localStorage.getItem("utilizadores"));

  if (utilizador && utilizador.token) {
    return {
      Authorization: 'Bearer ' + utilizador.token,
    };
  } else {
    return {};
  }
}
