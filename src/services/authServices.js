const API_URL = 'http://localhost:3000';

export const AuthService = {
    async login(username, password) {
        const response = await fetch(`${API_URL}/usuarios?username=${username}&password=${password}`);
        const data = await response.json();
        //comprobamos si data tiene valores
        if (data.length === 0){ 
            
        }
        //No nos viene info del usuario
        const user = data[0];
        return user;
    }
}

