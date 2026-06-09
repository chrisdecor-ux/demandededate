// ==============================
// Configuration Supabase
// ==============================

const SUPABASE_URL = "https://cgdkwaefhmsnzvojbpzj.supabase.co";
const SUPABASE_KEY = "sb_publishable_5fnDp4vdz-zHUVZUZjl8JQ_xr8IPq3s";

function getAppareilId()
{
    let id = localStorage.getItem("appareil_id");
    if(!id)
    {
        id = crypto.randomUUID();
        localStorage.setItem("appareil_id", id);
    }
    return id;
}

async function enregistrerChoix(choix)
{
    await fetch(`${SUPABASE_URL}/rest/v1/choix`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({
            activite:    choix,
            appareil_id: getAppareilId()
        })
    });
}

// ==============================
// Gestion des images joyeuses
// ==============================

// ⚠️ Si tu ajoutes des images, change ces nombres
const NOMBRE_JOYEUX_GAUCHE = 17;
const NOMBRE_JOYEUX_DROITE = 7;

// On commence à 0 = joyeux_gauche1 et joyeux_droite1
let indexJoyeuxGauche = 0;
let indexJoyeuxDroite = 0;

function changerImagesJoyeuses()
{
    indexJoyeuxGauche = (indexJoyeuxGauche + 1) % NOMBRE_JOYEUX_GAUCHE;
    indexJoyeuxDroite = (indexJoyeuxDroite + 1) % NOMBRE_JOYEUX_DROITE;

    document.getElementById("imageGauche").src =
        "images/joyeux_gauche/joyeux_gauche" + (indexJoyeuxGauche + 1) + ".jpg";

    document.getElementById("imageDroite").src =
        "images/joyeux_droite/joyeux_droite" + (indexJoyeuxDroite + 1) + ".jpg";
}

// ==============================
// Logique des choix
// ==============================

let historyStack = [];

function modifierChoix()
{
    // Remet la question et les choix principaux
    // sans recharger la page — les compteurs continuent !
    historyStack = [];

    document.getElementById("backButton").classList.remove("visible");

    document.getElementById("question").innerHTML =
        "Quelle ambiance te tente le plus ?";

    document.getElementById("choices").innerHTML = `
        <button onclick="showCategory('exterieur')">
            🌲 Activité extérieure
        </button>
        <button onclick="showCategory('interieur')">
            🏠 Activité intérieure
        </button>
        <button onclick="showCategory('cafe')">
            ☕ Café
        </button>
        <button onclick="showCategory('repas')">
            🍽️ Repas
        </button>
    `;

    changerImagesJoyeuses();
}

function goBack()
{
    if(historyStack.length === 0) return;

    const previous = historyStack.pop();

    document.getElementById("question").innerHTML = previous.question;
    document.getElementById("choices").innerHTML  = previous.choices;

    changerImagesJoyeuses();

    if(historyStack.length === 0)
    {
        document.getElementById("backButton").classList.remove("visible");
    }
}

function showCategory(category)
{
    historyStack.push({
        question: document.getElementById("question").innerHTML,
        choices:  document.getElementById("choices").innerHTML
    });

    document.getElementById("backButton").classList.add("visible");

    changerImagesJoyeuses();

    const question = document.getElementById("question");
    const choices  = document.getElementById("choices");

    if(category === "exterieur")
    {
        question.innerHTML = "Quel type de sortie extérieure ?";
        choices.innerHTML = `
            <button onclick="finalChoice('Randonnée en montagne')">⛰️ Randonnée en montagne</button>
            <button onclick="finalChoice('Promenade en ville')">🌆 Promenade en ville</button>
            <button onclick="finalChoice('Parc + glace')">🍦 Parc + glace</button>
        `;
    }

    if(category === "interieur")
    {
        question.innerHTML = "Quel type d'activité intérieure ?";
        choices.innerHTML = `
            <button onclick="finalChoice('Bowling')">🎳 Bowling</button>
            <button onclick="finalChoice('Billard')">🎱 Billard</button>
            <button onclick="finalChoice('Escape Game')">🔐 Escape Game</button>
            <button onclick="finalChoice('Musée')">🏛️ Musée</button>
        `;
    }

    if(category === "cafe")
    {
        question.innerHTML = "Quelle ambiance café ?";
        choices.innerHTML = `
            <button onclick="finalChoice('Café tranquille')">☕ Café tranquille</button>
            <button onclick="finalChoice('Salon de thé')">🫖 Salon de thé</button>
            <button onclick="finalChoice('Pâtisserie')">🍰 Pâtisserie</button>
        `;
    }

    if(category === "repas")
    {
        question.innerHTML = "Quel type de repas ?";
        choices.innerHTML = `
            <button onclick="finalChoice('Sushi')">🍣 Sushi</button>
            <button onclick="finalChoice('Italien')">🍝 Italien</button>
            <button onclick="finalChoice('Surprise du chef')">😈 Surprise du chef</button>
        `;
    }
}

async function finalChoice(choice)
{
    historyStack.push({
        question: document.getElementById("question").innerHTML,
        choices:  document.getElementById("choices").innerHTML
    });

    document.getElementById("backButton").classList.add("visible");

    changerImagesJoyeuses();

    await enregistrerChoix(choice);

    document.getElementById("question").innerHTML =
        "Ton choix a été enregistré 😎";

    document.getElementById("choices").innerHTML = `
        <p>Tu as choisi : <strong>${choice}</strong></p>
        <button onclick="modifierChoix()">✏️ Modifier mon choix</button>
    `;
}
