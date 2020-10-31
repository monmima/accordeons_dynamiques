var monTableauDeFichiers = [];
var monTableauDeCartes = [];
var monTableauDeCartesUniques = [];


function main() {
    creeMonTableauDeFichiers();
    insereTitrePage();
}

function insereTitrePage() {
    document.querySelector("#section").innerHTML = nomSection;
}

/**
* Fonction effaçant la barre oblique et tout ce qui la précède
* Par exemple:
* recrutement/advertisement/Postes_Focus_Amplifier_FR.pdf
* =
* Postes_Focus_Amplifier_FR.pdf
*/
function ecourtePourAffichage(quelleChaineAecourter) {
    var nouvelleChaine = quelleChaineAecourter.replace(/.*\//i,"");
    return nouvelleChaine;
}

/**
 * Change les traits soulignés pour des espaces
 * Modifie la présentation de l'extension du fichier
 */
 function formateNomDeFichier(quelleChaineAmodifier) {
    var nouvelleChaine = quelleChaineAmodifier.replace(/_/g," ");
    nouvelleChaine = nouvelleChaine.replace(/(\....)$/g," <span class='badge badge-secondary'>$&</span>"); // expressions de trois caractères
    nouvelleChaine = nouvelleChaine.replace(/(\.....)$/g," <span class='badge badge-secondary'>$&</span>"); // expressions de quatre caractères
    return nouvelleChaine;
}

/**
 * Change les traits d'union pour des espaces
 * Ajoute majuscules
 */
 function ajouteMajusculesEtEspacesAuDossier(quelleChaineAmodifier) {
    var nouvelleChaine = quelleChaineAmodifier.replace(/-/g," ");
    nouvelleChaine = nouvelleChaine.toUpperCase();
    return nouvelleChaine;
}

/**
 * Enlève tout le chemin d'accès
 * Ne conserve que le nom du dossier
 */
function conserveNomDuDossierSeulement(quelleChaineAecourter) {
    var nouvelleChaine = quelleChaineAecourter.replace(/(\/.*?$)/i,"");
    // console.log(`quelleChaineAecourter: ${quelleChaineAecourter}\nnouvelle chaîne: ${nouvelleChaine}`);
    return nouvelleChaine;
}

/**
 * https://stackoverflow.com/questions/11896599/javascript-code-to-check-special-characters
 * Retourne un booléen si un caractère spécial est détecté
*/
function folderContainsSpecialCharacters(str){
    var regex = /[ &+=\[\]{};':"\\|,.<>\/?�âàäëéèêîïôüûùü@«»ç]/gi;

    const resteDuMessage =
    `
    <div>
        <div class="alert alert-light">
            <h3>Solution pour l'administrateur</h3>
                <h5>Si «&nbsp;${str}&nbsp;» est bien un nom de <strong>dossier</strong>.</h5>
                <ol class="pl-5">
                    <li>Changez le nom du dossier et n'employez pas de caractères spéciaux.</li>
                    <li>Regénérez l'index.</li>
                    <li>Placez le nouveau fichier «&nbsp;liste.js&nbsp;» dans le dossier «&nbsp;js&nbsp;».</li>
                    <li>Rechargez la page HTML.</li>
                </ol>
                <h5>Si «&nbsp;${str}&nbsp;» est un nom de <strong>fichier</strong>.</h5>
                <ol class="pl-5">
                    <li>Allez dans le dossier «&nbsp;depot&nbsp;».</li>
                    <li>Créez un nouveau dossier.</li>
                    <li>Placez-y le fichier «&nbsp;${str}&nbsp;».</li>
                    <li>Regénérez l'index.</li>
                    <li>Rechargez la page HTML.</li>
                </ol>

                <p><strong>Bref, ne placez jamais directement un fichier dans le dossier «&nbsp;depot&nbsp;».</strong></p>
            </div>
        </div>

        <div class="alert alert-warning">
            Si vous continuez de recevoir ce message après avoir suivi ces étapes, c'est sans doute que vous n'avez pas déposé le fichier «&nbsp;liste.js&nbsp;» au bon endroit après l'avoir généré. C'est dans le dossier «&nbsp;<span class="badge badge-success">js</span>&nbsp;» qu'il doit être déposé.
        </div>
    </div>
    `

    if (regex.test(str)) {
        
        document.querySelector("body").innerHTML = 

        `
            <div class="alert alert-danger mt-5" role="alert">
                <p>Erreur causée par «&nbsp;${str}&nbsp;».</p>
            </div>
            ${resteDuMessage}
        `

    } else if (/^[0-9]/.test(str)) {
        document.querySelector("body").innerHTML = 
        
        `
            <div class="alert alert-danger mt-5" role="alert">
                <p>Erreur! Le nom de dossier «&nbsp;${str}&nbsp;» commence par un chiffre.</p>
            </div>
            ${resteDuMessage}
        `
    }
}

/**
 * https://stackoverflow.com/questions/11896599/javascript-code-to-check-special-characters
 * Retourne un booléen si un caractère spécial est détecté
*/
function fileContainsSpecialCharacters(str){
    var regex = /[&+=\[\]{};':"\\|,<>\/?�âàäëéèêîïôüûùü@«»ç]/gi;

    const resteDuMessage =
    `
    <div>
        <div class="alert alert-light">
            <h3>Solution pour l'administrateur</h3>
                <ol class="pl-5">
                    <li>Changez le nom du fichier.</li>
                    <li>Regénérez l'index.</li>
                    <li>Placez le nouveau fichier «&nbsp;liste.js&nbsp;» dans le dossier «&nbsp;js&nbsp;».</li>
                </ol>
            </div>
        </div>

        <div class="alert alert-warning">
            Si vous continuez de recevoir ce message après avoir suivi ces étapes, c'est sans doute que vous n'avez pas déposé le fichier «&nbsp;liste.js&nbsp;» au bon endroit après l'avoir généré. C'est dans le dossier «&nbsp;<span class="badge badge-success">js</span>&nbsp;» qu'il doit être déposé.
        </div>
    </div>
    `

    if (regex.test(str)) {
        
        document.querySelector("body").innerHTML = 

        `
            <div class="alert alert-danger mt-5" role="alert">
                <p>Erreur! Le nom de fichier «&nbsp;${str}&nbsp;» contient un caractère spécial.</p>
            </div>
            ${resteDuMessage}
        `

    // } else if (/^[0-9]/.test(str)) {
    //     document.querySelector("body").innerHTML = 
        
    //     `
    //         <div class="alert alert-danger mt-5" role="alert">
    //             <p>Erreur! Le nom de fichier «&nbsp;${str}&nbsp;» commence par un chiffre.</p>
    //         </div>
    //         ${resteDuMessage}
    //     `
    }
}

/**
 * Boucle générant la liste des fichiers à afficher
 */

function creeMonTableauDeFichiers() {
    for (var i = 0; i < listeDeFichiers.length; i++) {
        monTableauDeFichiers.push(listeDeFichiers[i]);
    }
}

/**
 * Boucle générant la liste de cartes à afficher
 */
function genereLaListeDeCartes() {
    for (var i = 0; i < listeDeFichiers.length; i++) {
        monTableauDeCartes.push(conserveNomDuDossierSeulement(listeDeFichiers[i]));
    }
    console.log(monTableauDeCartes);

    monTableauDeCartesUniques = [...new Set(monTableauDeCartes)]; // icigo
}
genereLaListeDeCartes(); // icigo


/**
 * Boucle affichant les cartes
 */
function afficheLesCartes() {
    for (var i = 0; i < monTableauDeCartesUniques.length; i++) {
        /**
        * Validation du nom de chaque dossier
        * .match() retourne un tableau de caractères trouvés
        * .length indique si la longueur de ce tableau est plus grande que un
        * si c'est le cas, forcément, il y a un caractère interdit
        */

        // console.log(monTableauDeCartesUniques[i]);

        if (folderContainsSpecialCharacters(monTableauDeCartesUniques[i])) {
            console.log(`Attention! Caractère spécial trouvé dans: ${monTableauDeCartesUniques[i]}\nCela pourrait être à l'origine de bogues (lien erroné, etc.).`);
        } // icigo

        var elementDeLaccordeon =
        `<div class="card">
            <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapse${monTableauDeCartesUniques[i]}" aria-expanded="true" aria-controls="collapse${monTableauDeCartesUniques[i]}" role="button">
                <div class="mb-0">

                    <i class="fas fa-plus"></i> ${ajouteMajusculesEtEspacesAuDossier(monTableauDeCartesUniques[i])}

                </div>
            </div>
            
            <div id="collapse${monTableauDeCartesUniques[i]}" class="collapse" aria-labelledby="heading${monTableauDeCartesUniques[i]}" data-parent="#accordionExample">
                <div class="card-body">
                    <ul id="${monTableauDeCartesUniques[i]}"></ul>
                </div>
            </div>
        </div>`

        document.querySelector("#accordionExample").innerHTML += elementDeLaccordeon;
    }
}
afficheLesCartes(); // icigo

/**
 * Boucle insérant les fichiers dans les cartes Bootstrap
 */
function insereLesFichiers() {
    for (var i = 0; i < listeDeFichiers.length; i++) {

        var elementDeLaListe = `<li><a href="depot/${listeDeFichiers[i]}" target="_blank" title="${fileContainsSpecialCharacters(ecourtePourAffichage(listeDeFichiers[i]))}">${formateNomDeFichier(ecourtePourAffichage(listeDeFichiers[i]))}</a></li>`;

        for (var j = 0; j < monTableauDeCartesUniques.length; j++) {
            if (listeDeFichiers[i].startsWith(`${monTableauDeCartesUniques[j]}`)) {
                document.querySelector(`#${monTableauDeCartesUniques[j]}`).innerHTML += elementDeLaListe;
            }
        }

        // console.log(ecourtePourAffichage(listeDeFichiers[i]));
    }
}
insereLesFichiers(); // icigo

/**
 * Fonction récupérée sur Internet
 * Change le + et le - au besoin
 */
$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function(){
        $(this).prev(".card-header").find(".fas").addClass("fa-minus").removeClass("fa-plus");
    });
    
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        $(this).prev(".card-header").find(".fas").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function(){
        $(this).prev(".card-header").find(".fas").removeClass("fa-minus").addClass("fa-plus");
    });
});



main();
insereMenu();