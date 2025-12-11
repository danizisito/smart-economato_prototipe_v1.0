import { comprobarLogin } from "../utils/authGuard.js";
import { inicializar } from "../controllers/almacenController.js";
import { inicializarRecepcion } from "../controllers/recepcionController.js";

document.addEventListener("DOMContentLoaded", () => {

    comprobarLogin();

    const links = document.querySelectorAll(".navBar a");
    const contenido = document.querySelector(".contenido");
    
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const body = document.body;
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            // Alternar el estado del menú
            mainNav.classList.toggle("is-open");
            body.classList.toggle("menu-open");
        });
    }

    //  CAMBIO DE PÁGINAS
    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();

            const page = e.target.dataset.page;
            if (!page) return;

            // CERRAR MENÚ AL HACER CLIC EN UN ENLACE
            if (mainNav && mainNav.classList.contains("is-open")) {
                mainNav.classList.remove("is-open");
                body.classList.remove("menu-open"); // Desbloquear scroll
            }

            try {
                // Detectar automáticamente dónde está index.html
                const basePath = window.location.pathname.includes("/templates/")
                    ? "./"
                    : "./templates/";

                console.log("Cargando:", basePath + page + ".html");

                const res = await fetch(`${basePath}${page}.html`);

                if (!res.ok) {
                    throw new Error(`No se encontró la página ${page}`);
                }

                const html = await res.text();
                contenido.innerHTML = html;

                // Si es Inventario, iniciar controlador
                if (page === "economato") {
                    inicializar();
                } 
                // Si es Recepcion, iniciar el controlador de recepción
                if (page === "Recepcion") { 
                    inicializarRecepcion();
                }

            } catch (error) {
                contenido.innerHTML = `<p style="color:red">${error.message}</p>`;
            }
        });
    });

    // LOGOUT
    const logoutBtn = document.getElementById("logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Borrar sesión
            sessionStorage.removeItem("usuario");

            // Redirigir
            window.location.href = "./login.html";
        });
    }
});