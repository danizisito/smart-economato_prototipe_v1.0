import { AuthService } from "../services/authServices.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-formulario");


    form.addEventListener("submit", async (event) => {

        event.preventDefault();
        const usuario = document.getElementById("username").value;
        const contraseña = document.getElementById("password").value;

        try {

            const user = await AuthService.login(usuario, contraseña);
            window.location.href = './economato.html';

        } catch (error) {
            //Vamos viendo que poner
        }
    }
    )
}
)
