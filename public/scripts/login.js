function tryLogin() {
    document.getElementById('login-indicator').innerText = "";
    const formData = new FormData();
    formData.append("password", document.getElementById("password").value);
    const searchParams = new URLSearchParams(formData);
    fetch(`/auth/login`, {
        method: 'post',
        body: searchParams
    })
    .then(response => {
        console.log(response);
        if(response.ok)
            return response.json()
        else {
            if(response.status === 401) {
                response.text().then(text => {
                    const message = JSON.parse(text).message;
                    if(message === "not initialised") {
                        document.getElementById('login-indicator').innerText = "Nicht initialisiert!\nBitte gehen Sie zunächst unten zur Ersteinrichtung und legen ein Passwort fest.";
                    } else {
                        document.getElementById('login-indicator').innerText = "Falsches Passwort";
                        document.getElementById("password").value = "";
                    }
                });
            }
            throw new Error('Fehler');
        }
    })
    .then(data => {
        console.log(data);
        window.localStorage.setItem('dash_tkn', data.token);
        window.location.href = "/";
    })
    .catch((err) => {
        console.log(err);
    });
}