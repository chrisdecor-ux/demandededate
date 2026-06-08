// ==============================
// Configuration Supabase
// ==============================

const SUPABASE_URL = "https://cgdkwaefhmsnzvojbpzj.supabase.co";
const SUPABASE_KEY = "sb_publishable_5fnDp4vdz-zHUVZUZjl8JQ_xr8IPq3s";

// Récupère l'identifiant de l'appareil,
// ou en génère un nouveau si c'est la première visite
function getAppareilId()
{
    let id = localStorage.getItem("appareil_id");

    if(!id)
    {
        id = "appareil_" + Math.random().toString(36).substring(2, 10);
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
// Logique des choix
// ==============================

let historyStack = [];

function goBack()
{
    if(historyStack.length === 0)
    {
        return;
    }

    const previous = historyStack.pop();

    document.getElementById("question").innerHTML =
        previous.question;

    document.getElementById("choices").innerHTML =
        previous.choices;

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

    const question = document.getElementById("question");
    const choices  = document.getElementById("choices");

    if(category === "exterieur")
    {
        question.innerHTML = "Quel type de sortie extérieure ?";

        choices.innerHTML = `
            <button onclick="finalChoice('Randonnée en montagne')">
                ⛰️ Randonnée en montagne
            </button>
            <button onclick="finalChoice('Promenade en ville')">
                🌆 Promenade en ville
            </button>
            <button onclick="finalChoice('Parc + glace')">
                🍦 Parc + glace
            </button>
        `;
    }

    if(category === "interieur")
    {
        question.innerHTML = "Quel type d'activité intérieure ?";

        choices.innerHTML = `
            <button onclick="finalChoice('Bowling')">
                🎳 Bowling
            </button>
            <button onclick="finalChoice('Billard')">
                🎱 Billard
            </button>
            <button onclick="finalChoice('Escape Game')">
                🔐 Escape Game
            </button>
            <button onclick="finalChoice('Musée')">
                🏛️ Musée
            </button>
        `;
    }

    if(category === "cafe")
    {
        question.innerHTML = "Quelle ambiance café ?";

        choices.innerHTML = `
            <button onclick="finalChoice('Café tranquille')">
                ☕ Café tranquille
            </button>
            <button onclick="finalChoice('Salon de thé')">
                🫖 Salon de thé
            </button>
            <button onclick="finalChoice('Pâtisserie')">
                🍰 Pâtisserie
            </button>
        `;
    }

    if(category === "repas")
    {
        question.innerHTML = "Quel type de repas ?";

        choices.innerHTML = `
            <button onclick="finalChoice('Sushi')">
                🍣 Sushi
            </button>
            <button onclick="finalChoice('Italien')">
                🍝 Italien
            </button>
            <button onclick="finalChoice('Surprise du chef')">
                😈 Surprise du chef
            </button>
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

    const question = document.getElementById("question");
    const choices  = document.getElementById("choices");

    await enregistrerChoix(choice);

    question.innerHTML = "Ton choix a été enregistré 😎";

    choices.innerHTML = `
        <p>
            Tu as choisi :
            <strong>${choice}</strong>
        </p>
        <button onclick="location.reload()">
            🔄 Recommencer
        </button>
    `;
}
