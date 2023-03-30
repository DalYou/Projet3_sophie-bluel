const formulaireCon = document.querySelector("#login");
formulaireCon.addEventListener("submit", function(event) {
    event.preventDefault();
    //Création de l'objet du nouvel avis.
    const credentiel = {
        email: event.target.querySelector("[name=email").value,
        password: event.target.querySelector("[name=password").value,
    };
    //Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(credentiel);
    console.log(chargeUtile);
    //Appel de la fonction fetch avec toutes les informations nécessaires

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        })
        .then((response) => {
            //En cas d'erreur se rendre directement à la section ".catch"
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
            console.log(response.token);
        })
        .then ((data) => {
            //Affiche l'id de l'utilisateur et le token
            console.log("My data ", data);
            //Enregistrer le token dans le localstorage
            localStorage.setItem("bearer", JSON.stringify(data.token));
            localStorage.setItem("token", data.token);
            //redirection vers une nouvelle page après connexion validée
            location.replace("index.html");
        })
        .catch((err) => {
            console.log("My error", err);
            alert("Erreur dans l'identifiant ou le mot de passe");
        });
});


