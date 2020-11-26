//c quel modal ouvert
var modal = null
//on crée un slecteru
const focusableSelector = "button, a, input, textarea"
var focusables = []

//on crée la fonction
const openModal = function (e){
    e.preventDefault()
    //on recupre l'atribue href
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    //on affiche la boite modal
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)

    //je lui demande de trouver l'element qui correspond
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

//fonction close modal
const closeModal = function (e){
    //si on essaye de ferme un modal inexistante
    if (modal === null) return

    e.preventDefault()
    //on affiche la boite modal
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e){
    e.stopPropagation()
}

const focusModal = function (e){
    e.preventDefault()
    //tu focus sur le 1er element de la modal
    var index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    //on monte d'un crant
    index++
    if (index >= focusables.length){
        index = 0
    }
    focusables[index].focus()
}

//on selection tout les liens modal et j'ecoute le clique
document.querySelectorAll(' .js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

//quand "echap" est preces aloes on sort de la modal
window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
    //on ecoute le table
    if (e.key === 'Tab' && modal !== null){
        focusModal(e)
    }
})