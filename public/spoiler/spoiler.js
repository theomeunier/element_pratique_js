/**
 losque JE clique sur le bouton dans .spoiler
 ALORS
 j'ajouter la  class .visible à l'element suivant
 **/

/*
//on detecte quand on clique sur le boutons
let button = document.querySelector('.spoiler button')
button.addEventListener('click', function() {
    //on affiche le text
    this.nextElementSibling.classList.add('visible')
    //on supprime le boutons
    this.parentNode.removeChild(this)
})
*/

//on slecte tout les elements
let elements = document.querySelectorAll('.spoiler')

//on se crée une fonction pour crée le bouton
let createSpoilerButton = function (element) {

    //on crée notre span qui va contenir notre spoiler
    let span = document.createElement('span')
    span.className = 'spoiler-content'
    span.innerHTML = element.innerHTML

    //on crée notre bouton
    let button = document.createElement('button')
    button.textContent = "Afficher le spoiler"

    //on rajouter le bouton au DOM
    //on nettoye l'element
    element.innerHTML = ''
    element.appendChild(button)
    element.appendChild(span)

    // on met l'écouter au click
    button.addEventListener('click', function () {
        button.parentNode.removeChild(button)
        //on rend notre span visible
        span.classList.add('visible')
    })
}

//on fait une petit boucle
for (let i = 0; i < elements.length; i ++){
    // tu utilise la fonction pour crée le bouton de l'element
    createSpoilerButton(elements[i])
}