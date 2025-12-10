export function comprobarLogin() {
    const usuario = sessionStorage.getItem("usuario");

    if (!usuario) {
        window.location.href = "./login.html";
    }
}
