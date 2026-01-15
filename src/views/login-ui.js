export const LoginUI = {

    showMessage(message, type) {
        const msgElement = document.getElementById("loginMessage");
        msgElement.textContent = message;
        msgElement.className = `${type}`;

        // CORRECCIÓN FASE 4: Accesibilidad
        // Si el mensaje es un error, añadir role="alert"
        if (type.includes("red") || type.includes("error")) {
            msgElement.setAttribute("role", "alert");
        } else {
            msgElement.setAttribute("role", "status");
        }
    }
}