document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".navBar a");
    const content = document.querySelector(".contenido");
    const navBar = document.querySelector(".navBar");

    // Cargar contenido dinámicamente
    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;

            // Cambiar estado activo del menú
            links.forEach(l => l.classList.remove("active"));
            e.target.classList.add("active");

            try {
                const response = await fetch(`${page}.html`);
                if (!response.ok) throw new Error("Página no encontrada");
                const html = await response.text();
                content.innerHTML = html;
                navBar.classList.remove("open"); // cerrar menú móvil
            } catch (error) {
                content.innerHTML = `<p style='color:red'>${error.message}</p>`;
            }
        });
    });
});
