function tryInit() {
    const initPw = document.getElementById("initPw").value;
    const newPw  = document.getElementById("newPw").value;
    const newPwRepeat  = document.getElementById("newPwRepeat").value;

    document.getElementById('pw-already-valid').innerText = "";
    
    if(newPw.length < 8) {
        document.getElementById("newPw-valid").innerText = "Mindestens 8 Zeichen!";
        return;
    } else {
        document.getElementById("newPw-valid").innerText = "";
    }
    if(newPw != newPwRepeat) {
        document.getElementById("pwRepeat-valid").innerText = "Passwörter stimmen nicht überein!";
        return;
    } else {
        document.getElementById("pwRepeat-valid").innerText = "";
    }

    console.log("Hello");
    const formData = new FormData();
    formData.append("initPw", initPw);
    formData.append("newPw", newPw);
    const searchParams = new URLSearchParams(formData);
    // document.getElementById('login-indicator').innerText = "Authentifiziere...";
    fetch(`/auth/init`, {
        method: 'post',
        body: searchParams
    })
    .then(response => {
        console.log(response);
        if(response.ok)
            return response.json();
        else {
            if(response.status === 401) {
                response.text().then(text => {
                    const message = JSON.parse(text).message; //web-dashboard //12345678
                    if(message === "password already set") {
                        document.getElementById('pw-already-valid').innerText = "Netzwerk wurde bereits eingerichtet!\nBitte melden Sie sich mit dem von Ihnen vergebenen Passwort an oder installieren Sie den Server erneut.";
                    } else if(message === "wrong initPw") {
                        document.getElementById('initPw-valid').innerText = "Falsches Initialpasswort";
                    } else {
                        document.getElementById('pw-already-valid').innerText = "Initialisierungsfehler. Bitte überprüfen Sie Ihre eingaben und versuchen es erneut.";
                    }
                });                      
            } else {
                document.getElementById('pw-already-valid').innerText = "Initialisierungsfehler. Bitte überprüfen Sie Ihre eingaben und versuchen es erneut.";
            }
            throw new Error('Initialisierungsfehler');
        }
    })
    .then(data => {
        console.log(data);
        window.localStorage.setItem('dash_tkn', data.token);
        window.location.href = "/login.html";
    });
}