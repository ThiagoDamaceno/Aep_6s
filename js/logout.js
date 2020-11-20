document.querySelector('#button-logout').onclick = () => {
    document.querySelector('#container-login').classList.remove('d-none')
    document.querySelector('#container-principal').classList.add('d-none')
}