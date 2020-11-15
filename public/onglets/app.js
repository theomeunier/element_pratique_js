(function () {

    /**
     * LORQUE l'on clique sur on oncle
     *      ON retire la classe active de l'oncle actif
     *      J'ajoute la class active à l'onglet actuel
     *
     *      ON retire la class active sur le contenu actif
     *      J'ajoute la class active sur le contenu correspondant a mon click
     */

    let afficherOnglet = function (a, animations) {
        if (animations === undefined){
            animations = true
        }
        let li = a.parentNode
        //on remonte a la div
        let div = a.parentNode.parentNode.parentNode
        //ON retire la class active sur le contenu actif
        let activeTable = div.querySelector('.tab-content.active')
        //J'ajoute la class active sur le contenu correspondant a mon click
        let aAfficher = div.querySelector(a.getAttribute('href'))

        //si le il ne continu active dans ça class
        if (li.classList.contains('active')) {
            // alors on return false
            return false
        }

        //ON retire la classe active de l'oncle actif
        div.querySelector('.tabs .active').classList.remove('active')
        // J'ajoute la class active à l'onglet actuel
        li.classList.add('active')

        //ON retire la class active sur le contenu actif
        //div.querySelector('.tab-content.active').classList.remove('active')
        //J'ajoute la class active sur le contenu correspondant a mon click
        //div.querySelector(a.getAttribute('href')).classList.add('active')

        //si on veux des annimation
        if (animations){
            //on lui donne la class fade
            activeTable.classList.add('fade')
            //on lui supprimer la class in
            activeTable.classList.remove('in')
            //on attend la fin de l'animation

            //on crée un variable qui contien l'animation
            let transitionent = function () {
                //on retire la class fade et active de mon element
                this.classList.remove('fade')
                this.classList.remove('active')
                //on ajoute les class
                aAfficher.classList.add('active')
                aAfficher.classList.add('fade')
                //on lui demande de forcer la taille de l'element
                aAfficher.offsetWidth
                aAfficher.classList.add('in')
                activeTable.removeEventListener('transitionend', transitionent)
            }

            activeTable.addEventListener('transitionend', transitionent)
            activeTable.addEventListener('webkitTransitionEnd', transitionent)
            activeTable.addEventListener('oTransitionEnd', transitionent)
        }else{
            aAfficher.classList.add('active')
            activeTable.classList.remove('active')
        }
        //on joute la class fade sur l'element active
        //a la fin de l'amination
        //      on retire la classe fade et active
        //      on ajoute la class active et dace à l'element à afficher
        //      on demande la class in



    }

    //on seclection toute les div qui est dans classe tabs
    let tabs = document.querySelectorAll('.tabs a')
    //on fais une boucle pour les parcourir
    for (let i = 0; i < tabs.length; i++) {
        //on detecte le click
        tabs[i].addEventListener('click', function (e) {
            afficherOnglet(this)
        })
    }


    /**
     * JE RECUPERE hash
     * AJOUTER LA CLASS active sur le lien href="hash"
     * RETIRER LA CLASS actrive sur les autres onglets
     * AFFICHER / Masquer les contenus
     */

    let hashChange = function(e){
        let hash = window.location.hash
        let a = document.querySelector('a[href="' + hash + '"]')

        // si a est differents de null
        if (a !== null && !a.parentNode.classList.contains('active')) {
            afficherOnglet(a, e !== undefined)
        }
    }

    window.addEventListener('hashchange', hashChange)
    //on appel cette fonction au demarage de la page
    hashChange()
})()