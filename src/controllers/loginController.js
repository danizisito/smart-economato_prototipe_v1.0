import { AuthService } from "../services/authServices.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-formulario");
    const message = document.getElementById("loginMessage");
    const card = document.querySelector(".login-container");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validación básica
        if (!username || !password) {
            message.textContent = "Debes rellenar todos los campos.";
            message.style.color = "red";

            // Activar animación
            card.classList.add("shake");
            setTimeout(() => card.classList.remove("shake"), 300);
            return;
        }

        const result = await AuthService.login(username, password);


        // ERRORES ESPECÍFICOS

        if (result.error === "usuarioIncorrecto") {
            message.textContent = "Usuario o Contraseña incorrecta.";
            message.style.color = "red";

            card.classList.add("shake");
            setTimeout(() => card.classList.remove("shake"), 300);
            return;
        }

        if (result.error === "passwordIncorrecta") {
            message.textContent = "Usuario o Contraseña incorrecta.";
            message.style.color = "red";

            card.classList.add("shake");
            setTimeout(() => card.classList.remove("shake"), 300);
            return;
        }

        if (result.error === "errorServidor") {
            message.textContent = "Error al conectar con el servidor.";
            message.style.color = "red";

            card.classList.add("shake");
            setTimeout(() => card.classList.remove("shake"), 300);
            return;
        }


        // LOGIN CORRECTO

        sessionStorage.setItem("usuario", JSON.stringify(result));
        message.textContent = "Inicio de sesión correcto.";
        message.style.color = "green";

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 500);
    });
});
