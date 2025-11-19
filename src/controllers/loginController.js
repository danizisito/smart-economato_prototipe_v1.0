import { AuthService } from "../services/authServices.js";
import { LoginUI } from "../views/login-ui.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-formulario");


    form.addEventListener("submit", async (event) => {

        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;


        try {
            if (!username || !password) {
                throw new Error("El usuario y la contraseña son obligatorios");
            }
            const user = await AuthService.login(username, password);
            if (user) {
                window.location.href = './economato.html';
            } else {
                throw new Error("ERROR");
            }

        } catch (error) {
            //Vamos viendo que poner
            LoginUI.showMessage(error.message, "error");
        }
    }
    )
}
)
