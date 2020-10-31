const elementsMenu = [
    // NOM DE DOSSIER - NOM DE FICHIER HTML - NOM À AFFICHER
    // Dossier _ / Fichier html -

    ["page_exemple", "exemple.html", "Exemple de page"],
    ["page_exemple_erreur", "exemple-erreur.html", "Exemple d'erreur"],

    ["ne pas modifier cette ligne", "ne pas modifier cette ligne", "ne pas modifier cette ligne"]
];

let elementsMenuMisEnForme = "";
let prefixeCheminDacces = "";
let pageActuelleAffichee = window.location.pathname.split("/").pop();
let pageAccueil = "";

/**
 * Injecte le menu de navigation à partir de deux variables
 */
function insereMenu() {
    // var path = window.location.pathname;
    // var page = path.split("/").pop();
    // console.log(page);

    let menu = 
        `


            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="nav navbar-nav">
                    
                    ${pageAccueil}

                    ${elementsMenuMisEnForme}

                </ul>
            </div>
        `;
    document.querySelector("nav").innerHTML = menu;
};

/**
 * Le chemin vers la page d'accueil est légèrement différent selon qu'on se trouve sur index.html versus une autre page du site (profondeur des dossiers)
 */
function determinePageActuelle() {
    if (pageActuelleAffichee === "index.html") {
        pageAccueil =
        `
            <li class="nav-item">
                <a class="nav-link" href="index.html">Accueil</a>
            </li>
        `;
        prefixeCheminDacces = "";
    } else {
        pageAccueil =
        `
            <li class="nav-item">
                <a class="nav-link" href="../index.html">Accueil</a>
            </li>
        `;
        prefixeCheminDacces = "../";
    }
}

/**
 * Met en forme les liens du menu (sauf celui de la page d'accueil)
 */
function alimenteMenu() {
    for (let i = 0; i < elementsMenu.length - 1; i++) {
        elementsMenuMisEnForme +=
            `
                <li class="nav-item">
                    <a class="nav-link" href="${prefixeCheminDacces}${elementsMenu[i][0]}/${elementsMenu[i][1]}">${elementsMenu[i][2]}</a>
                </li>
            `;
    }
}
determinePageActuelle();
alimenteMenu();