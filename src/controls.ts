const bioButton = document.getElementById('about-me')
const aboutButton = document.getElementById('what-is-this')
const bioPanel = document.getElementById('bio')
const aboutPanel = document.getElementById('about')
const moreButton = document.getElementById('more')
const navPanel = document.getElementById('nav')
const closeBioButton = document.getElementById('close-bio')
const closeAboutButton = document.getElementById('close-about')

const toggleAboutPanel = (_event: MouseEvent) => {
    aboutPanel?.classList.toggle('hidden')
    if (
        !aboutPanel?.classList.contains('hidden') &&
        !bioPanel?.classList.contains('hidden')
    ) {
        bioPanel?.classList.toggle('hidden')
    }
}

const toggleBioPanel = (_event: MouseEvent) => {
    bioPanel?.classList.toggle('hidden')
    if (
        !bioPanel?.classList.contains('hidden') &&
        !aboutPanel?.classList.contains('hidden')
    ) {
        aboutPanel?.classList.toggle('hidden')
    }
}

aboutButton?.addEventListener('click', toggleAboutPanel)

closeAboutButton?.addEventListener('click', toggleAboutPanel)

bioButton?.addEventListener('click', toggleBioPanel)

closeBioButton?.addEventListener('click', toggleBioPanel)

moreButton?.addEventListener('click', (e: MouseEvent) => {
    const button = e.currentTarget as HTMLElement
    button.classList.toggle('open')
    navPanel?.classList.toggle('shown')
})
