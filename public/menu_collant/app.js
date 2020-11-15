(function(){

    // window.scrollY cross Browser
    let scrollY = function () {
        let supportPageOffset = window.pageXOffset !== undefined;
        let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    window.makeSticky = function (element) {
        // Les variables
        let rect,               // Rectangle de l'élément
            top,                // Position de l'élément par rapport au haut de la page
            constraintRect,     // Rectangle de la contrainte
            constraintBottom    // Position qui fait sortir le rectangle de la contrainte
        let offset = parseInt(element.getAttribute('data-offset') || 0, 10)
        let constraint = document.body
        if (element.getAttribute('data-constraint')){
            constraint = document.querySelector(element.getAttribute('data-constraint'))
        }
        let fake = document.createElement('div')

        // Fonctions
        // Permet de stocker la valeurs utiles pour le calcul des positions
        let setValues = function () {
            rect = element.getBoundingClientRect()
            constraintRect = constraint.getBoundingClientRect()
            constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
            top = rect.top + scrollY()
            fake.style.width = rect.width + "px"
            fake.style.height= rect.height + "px"
        }

        let onScroll = function () {
            if (scrollY() > constraintBottom && element.style.position != 'absolute') {
                element.style.position = 'absolute'
                element.style.bottom = '0'
                element.style.top = 'auto'
            } else if (scrollY() > top - offset && scrollY() < constraintBottom && element.style.position != 'fixed') {
                element.classList.add('fixed')
                element.style.position = 'fixed'
                element.style.top = offset + "px"
                element.style.bottom = 'auto'
                element.style.width = rect.width + "px"
                element.parentNode.insertBefore(fake, element)
            } else if (scrollY() < top - offset && element.style.position != 'static') {
                element.classList.remove('fixed')
                element.style.position = 'static'
                if (element.parentNode.contains(fake)) {
                    element.parentNode.removeChild(fake)
                }
            }
        }

        let onResize = function () {
            element.style.width = "auto"
            element.classList.remove('fixed')
            element.style.position = "static"
            fake.style.display = "none"
            setValues()
            fake.style.display = "block"
            onScroll()
        }

        // Listener
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)

        // Initialisation
        setValues()
    }

    let elements = document.querySelectorAll('[data-sticky]')
    for (var i = 0; i < elements.length; i++) {
        makeSticky(elements[i])
    }


})()