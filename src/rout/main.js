import { comprobarLogin } from "../utils/authGuard.js";
import { inicializar } from "../controllers/almacenController.js";

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    //  🔐 PROTEGER TODA LA APLICACIÓN
    // ==========================================
    comprobarLogin();

    const links = document.querySelectorAll(".navBar a");
    const contenido = document.querySelector(".contenido");

    // ==========================================
    //  📄 CAMBIO DE PÁGINAS
    // ==========================================
    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();

            const page = e.target.dataset.page;
            if (!page) return;

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

            } catch (error) {
                contenido.innerHTML = `<p style="color:red">${error.message}</p>`;
            }
        });
    });

    // ==========================================
    //  🚪 LOGOUT
    // ==========================================
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
