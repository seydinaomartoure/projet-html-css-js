/****************************************************************************
 * 
 * ce fichier contient toutes les fonctions necessaires à l'affichage et
 * à la fermeture de la popup de partage
 * 
 * **************************************************************************/

/**
 * Cette fonction affiche la popup pour partager son score.
 */
function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    //la popup est masquée par défaut (display:none), ajouter la classe 'active'
    //va changer son display et la rendre visible
    popupBackground.classList.add("active")
}
/**
  * Cette fonction cache la popup pour partager son score.
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
        //la popup est masquée par défaut (display:none), supprimer la classe 'active'
        // va rétablir cet affichage par défaut.
        popupBackground.classList.remove("active")
}
/**
 * Cette fonction initalise les écouteurs d'événements qui concernent
 * l'affichage de la popup
 */
function initAddEventListenerPopup() {
    // on écoute le click sur le bouton 'partager
    btnPartage = document.querySelector(".zonePartage button")
    let popupBackground = document.querySelector(".popupBackground")
    btnPartage.addEventListener("click",()=>{
        //Quand on a cliqué sur le bouton partagé on affiche le popup
        afficherPopup()
    })
    //on écoute le click sur la div 'popupBackground'
    popupBackground.addEventListener("click", (event) => {
        //Si on a cliqué précisement sur la popupBackground
        //(et pas un autre élément qui se trouve dedant)
        if (event.target === popupBackground) {
            // alors on cache la popup
            cacherPopup()
        }
    })
}