import { inicializar } from "../controllers/almacenController.js";

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".navBar a");
    const content = document.querySelector(".contenido");

    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;

            // Activar link
            links.forEach(l => l.classList.remove("active"));
            e.target.classList.add("active");

            try {
                const response = await fetch(`../templates/${page}.html`);

                if (!response.ok) throw new Error("Página no encontrada");

                const html = await response.text();
                content.innerHTML = html; // Inyectamos el HTML

                // Inicializar funciones del economato si estamos en esa página
                if (page === "economato") {
                    // Llamamos a inicializar solo después de que el HTML exista en el DOM
                    inicializar();
                }

            } catch (error) {
                content.innerHTML = `<p style="color:red">${error.message}</p>`;
            }
        });
    });
});
