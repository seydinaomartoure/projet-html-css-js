/*******************************************************************************
 * ce fichier contient toutes les fonctions necessaires au fonctionnement du jeu.
 *
 ********************************************************************************/

/**
 * cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score:le score de l'utlisateur
 * @param {number} nombreMotProposes: le nombre de mots proposés à l'utlisateur
 */

function afficherResultat(score, nombreMotProposes) {
  //recupération de la zone dans laquelle on va écrire le score
  let spanScore = document.querySelector(".zoneScore span");
  //ecriture du texte
  let affichageScore = `${score}/${nombreMotProposes}`;
  // on place le texte à l'interieur du span
  spanScore.innerText = affichageScore;
}

/**
 * cette fonction affiche une proposition, que le joueur devra recopier,
 * dans la zone "zoneProposition"
 * @param {string} proposition: la proposition à afficher
 */

function afficherProposition(proposition) {
  let zoneProposition = document.querySelector(".zoneProposition");
  zoneProposition.innerText = proposition;
}
/**
 * Cette fonction construit et affiche l'email.
 * @param(string) email: l'email de la personne avec qui il veut partager son score
 * @param(string) score: le score
 */
function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis :${nom} et je viens de réaliser le score :${score} sur le site d'Azertype!`;
  location.href = mailto;
}
/*************************************************************************
 *             FONCTION DE VALIDATION DU NOM DE L'UTILISATEUR             *
 * @throws(Error) nom: le nom du joueur                                   *
 * @param(string)                                                         *
 *************************************************************************/
function validerNom(nom) {
  if (nom.length < 2) {
    throw new Error("Le nom doit contenir au moins  2 caractères.");
  }
}

/*******************************************************************
 *        FONCTION DE VALIDATION DE L'EMAIL DE L'UTILISATEUR       *
 * @throws {Error}                                                 *
 * @param {string} email                                           *
 *******************************************************************/

function verifierEmail(email) {
  let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegex.test(email)) {
    throw new Error("L'adresse e-mail est invalide.");
  }
}
/****************************************************************************************************************
 * fonction lance le jeu.                                                                                       *
 * elle demande à l'utlisateur de choisir entre 'mots' et 'phrases' et lance le boucle de jeu correspondante    *
 ****************************************************************************************************************/
/*************************************
 *  FONCTION AFFICHERMESSAGEERREUR   *
 *************************************/
function afficherMessageErreur(message) {
  let spanErreurMessage = document.getElementById("erreurMessage");

  if (!spanErreurMessage) {
    let popup = document.querySelector(".popup");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreurMessage";
    popup.append(spanErreurMessage);
  }
  spanErreurMessage.innerText = message;
}

/***************************************
 *      FONCTION GERER FORMULAIRE      *
 ***************************************/
function gererFormulaire(scoreEmail) {
  try {
    let baliseNom = document.getElementById("nom");
    let nom = baliseNom.value;
    validerNom(nom);

    let baliseEmail = document.getElementById("email");
    let email = baliseEmail.value;
    verifierEmail(email);
    afficherMessageErreur("");
    afficherEmail(nom, email, scoreEmail);
  } catch (erreur) {
    // gerer l'erreur
    afficherMessageErreur(erreur.message);
  }
}

function lancerJeu() {
  //Initialisations
  initAddEventListenerPopup();
  let score = 0;
  let i = 0;
  let listePropositions = listeMots;

  let bntValiderMot = document.getElementById("bntValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");

  afficherProposition(listePropositions[i]);

  //Gestion de l'événement click sur le bouton "valider"
  bntValiderMot.addEventListener("click", () => {
    if (inputEcriture.value === listeMots[i]) {
      score++;
    }
    i++;
    afficherResultat(score, i);
    inputEcriture.value = "";
    if (listePropositions[i] === undefined) {
      afficherProposition("Jeu terminé");
      bntValiderMot.disabled = true;
    } else {
      afficherProposition(listePropositions[i]);
    }
  });

  //Gestion de l'événement change sur les boutons radios.
  let listeBtnRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBtnRadio.length; index++) {
    listeBtnRadio[index].addEventListener("change", (event) => {
      //Si c'est le premier élément qui a été modifié, alors nous voulons
      //jouer avec la listeMots
      if (event.target.value === "mots") {
        listePropositions = listeMots;
      } else {
        //Sinon nous voulons jouer avec la liste des phrases
        listePropositions = listePhrases;
      }
      //et on modifie l'affichage en direct.
      afficherProposition(listePropositions[i]);
    });
  }
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let scoreEmail = `${score}/${i}`;
    gererFormulaire(scoreEmail);
    /*------------------------------------------*/
    //IF//
    /********************************************/
  });

  afficherResultat(score, i);
}