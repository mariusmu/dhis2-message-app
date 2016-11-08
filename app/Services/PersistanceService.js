const CLIENT_TOKEN = "XU-DHIS2-ClientToken";

class PersistanceService {
    persistClientToken(token) {
        console.log("Will save client token to local storage", token);
        localStorage.setItem(CLIENT_TOKEN, token);
    }

    getClientToken() {
        console.log("Checking for client token");
        return localStorage.getItem(CLIENT_TOKEN);
    }

    deleteClientToken() {
        localStorage.removeItem(CLIENT_TOKEN);
    }
}

module.exports = new PersistanceService();