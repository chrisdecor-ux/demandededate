const noButton  = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");

// ==============================
// Gestion des images sombres
// ==============================

// Si ajoute des images, change ces nombres
const NOMBRE_SOMBRE_GAUCHE = 8;
const NOMBRE_SOMBRE_DROITE = 25;

let indexSombreGauche = 0;
let indexSombreDroite = 0;

function afficherImagesSombres()
{
    document.getElementById("imageGauche").src =
        "images/sombre_gauche/sombre_gauche" + (indexSombreGauche + 1) + ".jpg";

    document.getElementById("imageDroite").src =
        "images/sombre_droite/sombre_droite" + (indexSombreDroite + 1) + ".jpg";
}

function changerImagesSombres()
{
    indexSombreGauche = (indexSombreGauche + 1) % NOMBRE_SOMBRE_GAUCHE;
    indexSombreDroite = (indexSombreDroite + 1) % NOMBRE_SOMBRE_DROITE;

    afficherImagesSombres();
}

// ==============================
// Bouton Oui
// ==============================

yesButton.addEventListener("click", function() {
    window.location.href = "page2.html";
});

// ==============================
// Bouton Non — position initiale + téléportation
// ==============================

function placerBoutonNon()
{
    const btnWidth  = noButton.offsetWidth;
    const btnHeight = noButton.offsetHeight;

    // Position de départ : centré en bas du cadre
    noButton.style.left = (window.innerWidth / 2 - btnWidth / 2) + "px";
    noButton.style.top  = (window.innerHeight / 2 + 60) + "px";
}

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

// ==============================
// Initialisation au chargement
// ==============================

// Affiche les images dès que la page est prête
afficherImagesSombres();

// Place le bouton Non à un endroit visible dès le départ
placerBoutonNon();
