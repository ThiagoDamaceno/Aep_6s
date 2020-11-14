const containerMain = document.querySelector('#container-main')

document.querySelector('#btn-login').onclick = () => {
    document.querySelector('#container-login').classList.add('d-none')
    document.querySelector('#container-principal').classList.remove('d-none')
}

//btn logout
document.querySelector('#button-logout').onclick = () => {
    document.querySelector('#container-login').classList.remove('d-none')
    document.querySelector('#container-principal').classList.add('d-none')
}

//iniciar com clique no item lab
window.addEventListener("load", function(event) {
    document.querySelector('#item-laboratorios').click()
});


//Clicks side bar
document.querySelectorAll('#side-bar nav div').forEach(element => {
    element.onclick = () => {
        //Remove todos ativos da lista
        document.querySelectorAll('#side-bar nav div').forEach(i => {
            i.classList.remove('item-lista-ativo')
        })

        //Adiciona o ativo da vez
        element.classList.add('item-lista-ativo')

        const id = element.id
        
        const labs = document.querySelector('#container-laboratorios')
        const simples = document.querySelector('#container-reserva-simples')
        const recorrentes = document.querySelector('#container-reserva-recorrente')

        if (id === 'item-laboratorios') {
            labs.classList.remove('d-none')
            simples.classList.add('d-none')
            recorrentes.classList.add('d-none')
        }
        else if (id === 'item-reserva-simples') {
            labs.classList.add('d-none')
            simples.classList.remove('d-none')
            recorrentes.classList.add('d-none')
        }
        else if (id === 'item-reserva-recorrente') {
            labs.classList.add('d-none')
            simples.classList.add('d-none')
            recorrentes.classList.remove('d-none')
        }
        else if (id === 'item-suporte') {
            
        }
    }
})

//Click blocos-lab
document.querySelectorAll('#lab-blocos p:nth-child(n+2)').forEach(element => {
    element.onclick = () => {
        document.querySelectorAll('#lab-blocos p').forEach(i => {
            i.classList.remove('item-bloco-ativo')
        })

        element.classList.add('item-bloco-ativo')
    }
})

//Clicks horarios-lab
document.querySelectorAll('#turnos-lab button').forEach(element => {
    element.onclick = () => {
        document.querySelectorAll('#turnos-lab button').forEach(element => {
            element.classList.remove('button-horario-ativo')
        })

        element.classList.add('button-horario-ativo')
    }  
});

//Click blocos-recorrente
document.querySelectorAll('#recorrentes-blocos p:nth-child(n+2)').forEach(element => {
    element.onclick = () => {
        document.querySelectorAll('#recorrentes-blocos p').forEach(i => {
            i.classList.remove('item-bloco-ativo')
        })

        element.classList.add('item-bloco-ativo')
    }
})


//Click labs-recorrente
document.querySelectorAll('#recorrentes-labs p:nth-child(n+2)').forEach(element => {
    element.onclick = () => {
        document.querySelectorAll('#recorrentes-labs p').forEach(i => {
            i.classList.remove('item-bloco-ativo')
        })

        element.classList.add('item-bloco-ativo')
    }
})

