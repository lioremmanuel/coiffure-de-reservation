(function () {
    emailjs.init("TON_USER_ID"); // Remplace par ton vrai ID utilisateur EmailJS
})();

function calculerPrix() {
    const coupe = parseFloat(document.getElementById("coupe").value);
    const longueur = parseFloat(document.getElementById("longueur").value);
    const extra = parseFloat(document.getElementById("extra").value);
    const meches = document.getElementById("meches").checked;
    const typeMeches = meches ? parseFloat(document.getElementById("typeMeches").value) : 0;
    const couleurMeches = meches ? parseFloat(document.getElementById("couleurMeches").value) : 0;

    const dateRDV = new Date(document.getElementById("dateRDV").value);
    const aujourdhui = new Date();
    const diffJours = Math.ceil((dateRDV - aujourdhui) / (1000 * 60 * 60 * 24));

    let prix = coupe + longueur + extra + typeMeches + couleurMeches;
    if (diffJours <= 3) prix *= 0.8;
    else if (diffJours <= 7) prix *= 0.9;

    document.getElementById("prixTotal").innerText = `Prix total estimé: ${prix.toFixed(2)}$`;
}

function envoyerEmail(event) {
    event.preventDefault();
    const form = document.getElementById("bookingForm");
    const prix = document.getElementById("prixTotal").innerText;

    const templateParams = {
        email: document.getElementById("email").value,
        coupe: document.getElementById("coupe").value,
        longueur: document.getElementById("longueur").value,
        extra: document.getElementById("extra").value,
        meches: document.getElementById("meches").checked ? "Oui" : "Non",
        typeMeches: document.getElementById("typeMeches").value,
        couleurMeches: document.getElementById("couleurMeches").value,
        dateRDV: document.getElementById("dateRDV").value,
        prixTotal: prix
    };

    emailjs.send("TON_SERVICE_ID", "TON_TEMPLATE_ID", templateParams)
        .then(() => {
            alert("Demande envoyée avec succès !");
            form.reset();
            document.getElementById("prixTotal").innerText = "Prix total estimé: 0$";
        }, (error) => {
            alert("Erreur lors de l'envoi: " + JSON.stringify(error));
        });
}
