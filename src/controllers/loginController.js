import { AuthService } from "../services/authServices";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-container");

    form.addEventListener("submit", XXXXX => {


        const usuario = document.getElementById("username").value;
        const contraseña = document.getElementById("password").value;

        try {

            const user = AuthService.login(usuario, contraseña);
            window.location.href = './templates/main.html';

        } catch (error) {
            //Vamos viendo que poner
        }
    }
    )
}
)
