const API_URL = 'http://localhost:3000';

export const AuthService = {

    async login(username, password) {
        try {
            // 1️⃣ Buscar usuario por nombre
            const response = await fetch(`${API_URL}/usuarios?username=${username}`);
            const data = await response.json();

            // Si no existe → usuario incorrecto
            if (data.length === 0) {
                return { error: "usuarioIncorrecto" };
            }

            const user = data[0];

            // 2️⃣ Contraseña incorrecta
            if (user.password !== password) {
                return { error: "passwordIncorrecta" };
            }

            // 3️⃣ Login correcto
            return user;

        } catch (error) {
            return { error: "errorServidor" };
        }
    }

};
