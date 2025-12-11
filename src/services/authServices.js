const API_URL = 'http://localhost:3000';

export const AuthService = {

    async login(username, password) {
        try {
            // Buscar usuario por nombre
            const response = await fetch(`${API_URL}/usuarios?username=${username}`);
            const data = await response.json();

            // Si no existe, devuelve error
            if (data.length === 0) {
                return { error: "usuarioIncorrecto" };
            }

            const user = data[0];

            // Contraseña incorrecta
            if (user.password !== password) {
                return { error: "passwordIncorrecta" };
            }

            // Login correcto
            return user;

        } catch (error) {
            return { error: "errorServidor" };
        }
    }

};