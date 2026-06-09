const noButton  = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");

// ==============================
// Gestion des images sombres
// ==============================

// ⚠️ Si tu ajoutes des images, change ces nombres
const NOMBRE_SOMBRE_GAUCHE = 8;
const NOMBRE_SOMBRE_DROITE = 25;

let indexSombreGauche = 0;
let indexSombreDroite = 0;

function changerImagesSombres()
{
    indexSombreGauche = (indexSombreGauche + 1) % NOMBRE_SOMBRE_GAUCHE;
    indexSombreDroite = (indexSombreDroite + 1) % NOMBRE_SOMBRE_DROITE;

    document.getElementById("imageGauche").src =
        "images/sombre_gauche/sombre_gauche" + (indexSombreGauche + 1) + ".jpg";

    document.getElementById("imageDroite").src =
        "images/sombre_droite/sombre_droite" + (indexSombreDroite + 1) + ".jpg";
}

// ==============================
// Bouton Oui
// ==============================

yesButton.addEventListener("click", function() {
    window.location.href = "page2.html";
});

// ==============================
// Bouton Non — téléportation + changement d'image
// ==============================

noButton.addEventListener("mouseover", function() {

    const btnWidth  = noButton.offsetWidth;
    const btnHeight = noButton.offsetHeight;

    const x = Math.random() * (window.innerWidth  - btnWidth);
    const y = Math.random() * (window.innerHeight - btnHeight);

    noButton.style.left = x + "px";
    noButton.style.top  = y + "px";

    changerImagesSombres();
});

// Sur téléphone : changement au clic
noButton.addEventListener("click", function() {
    changerImagesSombres();
});
