const host = 'http://127.0.0.1:8080'

let reservas
let reservasMatutino = []
let reservasVespertino = []
let reservasNoturno = []

let headerAjaxGet
let token
let blocos
let labs
let horarios

let blocoAtivo
let labAtivo
let blocosELabs = []

let cursos
let horarioAtivo = 'MANHA'
let reservasOcupadas

document.querySelector('#btn-login').onclick = () => {
    logar()
    getDados()
}

async function logar() {
    const inputs = document.querySelectorAll('#inputs input')
    
    const inputNome = inputs[0].value
    const inputSenha = inputs[1].value

    if (inputNome !== '' && inputSenha !== '') {
        token = btoa(inputNome + ':' + inputSenha)
        headerAjaxGet = {
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + token
            }
        }

        try {
            const response = await fetch(host + '/usuarios/tipo', headerAjaxGet)
    
            tipo = await response.text()
            user = inputNome
            atualizarNomeFuncionario()

            document.querySelector('#container-login').classList.add('d-none')
            document.querySelector('#container-principal').classList.remove('d-none')

        } catch (err) {
            inputs[0].value = ''
            inputs[1].value = ''
        }
    }
    else {
        alert('Preencha todos os campos.')
    }

    getDados()
}

async function getDados() {
    let dados

    try {
        const response = await fetch(host + '/reservas', headerAjaxGet)
        dados = await response.json()
    } catch(err) {
    } finally {
        
        try {
            const response = await fetch(host + '/blocos', headerAjaxGet)
            blocos = await response.json()
            blocoAtivo = blocos[0]
            
        } catch(err) {
        }

        try {
            const response = await fetch(host + '/laboratorios', headerAjaxGet)
            labs = await response.json()          
        } catch(err) {
        }

        try {
            const response = await fetch(host + '/cursos', headerAjaxGet)
            cursos = await response.json()       
            loadCursosModal(cursos[0].id)   
        } catch(err) {
        }

        try {
            const response = await fetch(host + '/turmas', headerAjaxGet)
            turmas = await response.json()          
        } catch(err) {
        }

        try {
            const response = await fetch(host + '/horarios', headerAjaxGet)
            horarios = await response.json()          
        } catch(err) {
        }
        
        reservas = dados.map(i => {
            let lab = i.horarioDto.laboratorioDto.nome
            let horario = i.horarioReserva
            let turno = i.horarioDto.turno
            let turma = i.turmaDto.nome
            let tipo = i.tipoReserva
            let quantidadeAlunos = i.turmaDto.quantidadeAlunos
            let blocoId = i.horarioDto.laboratorioDto.blocoId
            let labId = i.horarioDto.laboratorioDto.id
            let professor = i.professorDto.nome
            
            if (horario == 'PRIMEIRO')
                horario = 'Primeiro'
            else
                horario = 'Segundo'

            return {
                lab,
                turno,
                turma,
                tipo,
                quantidadeAlunos,
                horario,
                blocoId,
                labId,
                professor
            }
        })
        reservasMatutino = []
        reservasVespertino = []
        reservasNoturno = []
        reservas.forEach(element => {
            switch (element.turno) {
                case 'MANHA':
                    reservasMatutino.push(element)
                    break;
                case 'TARDE':
                    reservasVespertino.push(element)
                    break
                case 'NOITE':
                    reservasNoturno.push(element)
            }
        });
    
        
        atualizarReservas(blocos[0].id)
        atualizarLabs(labs[0].id)
    }

}

function atualizarNomeFuncionario() {
    document.querySelector('#tipo-user').innerText = tipo
    document.querySelector('#user').innerText = user
}

function atualizarReservas(id) {
    //Atualizar blocos
    if (id !== undefined)
        blocoAtivo = id
    else 
        id = blocoAtivo
    
    document.querySelectorAll('.blocos').forEach(bloco => {
        bloco.innerHTML = '<p>Blocos</p>'
    
        blocos.forEach((element) => {
            if (id === element.id)
                bloco.innerHTML += 
                `
                    <p data-id="${element.id}" class="item-bloco-ativo" onclick="atualizarReservas(${element.id})">${element.nome}</p>
                `
            else
                bloco.innerHTML += 
                `
                    <p data-id="${element.id}" onclick="atualizarReservas(${element.id})">${element.nome}</p>
                `
        })
    })


    //Exibe cards

    const divHorarios = document.querySelector('#container-horarios')
    divHorarios.innerHTML = ''

    console.log(reservasNoturno)
    reservasOcupadas = []

    switch (horarioAtivo) {
        case 'MANHA':   
            reservasMatutino.forEach(r => {
                if (r.blocoId == blocoAtivo) {
                    divHorarios.innerHTML += 
                    `
                    <div class="text-center flex-column p-2 border-gray w-50 col-5 m-2">
                        <p class="mb-2 font-weight-bold">${r.lab} - ${r.horario} horário</p>
                        <div class="d-flex flex-column align-items-center">
                            <p class="mx-2">${r.tipo}</p>
                            <p>${r.professor}</p>
                            <p>${r.turma}</p>
                            <p>Quantidade de alunos: ${r.quantidadeAlunos}</p>
                        </div>
                    </div>
                    `
                    reservasOcupadas.push(r)
                }
            })
            break
        
        case 'TARDE':
            reservasVespertino.forEach(r => {
                if (r.blocoId == blocoAtivo) {
                    divHorarios.innerHTML += 
                    `
                    <div class="text-center flex-column p-2 border-gray w-50 col-5 m-2">
                        <p class="mb-2 font-weight-bold">${r.lab} - ${r.horario} horário</p>
                        <div class="d-flex flex-column align-items-center">
                            <p class="mx-2">${r.tipo}</p>
                            <p>${r.professor}</p>
                            <p>${r.turma}</p>
                            <p>Quantidade de alunos: ${r.quantidadeAlunos}</p>
                        </div>
                    </div>
                    `
                    reservasOcupadas.push(r)
                }
                })
            break
        case 'NOITE':
            reservasNoturno.forEach(r => {
                if (r.blocoId == blocoAtivo) {
                    divHorarios.innerHTML += 
                    `
                    <div class="text-center flex-column p-2 border-gray w-50 col-5 m-2">
                        <p class="mb-2 font-weight-bold">${r.lab} - ${r.horario} horário</p>
                        <div class="d-flex flex-column align-items-center">
                            <p class="mx-2">${r.tipo}</p>
                            <p>${r.professor}</p>
                            <p>${r.turma}</p>
                            <p>Quantidade de alunos: ${r.quantidadeAlunos}</p>
                        </div>
                    </div>
                    `
                    reservasOcupadas.push(r)
                }
            })
    }

    labs.forEach(r => {
        labEstaNaLista(r.id)
    })

    labs.forEach(r => {
        if (r.blocoId == blocoAtivo) {
            if (!labEstaNaLista(r.nome, 'Primeiro') && r.blocoId == blocoAtivo) {
                divHorarios.innerHTML += 
                `
                <div class="text-center flex-column p-2 border-gray w-50 col-5 m-2">
                    <p class="mb-2 font-weight-bold">${r.nome} - Primeiro horário</p>
                    <div class="d-flex flex-column align-items-center">
                        <p class="mx-2">Livre</p>
                    </div>
                </div>
                `
            }
            if (!labEstaNaLista(r.nome, 'Segundo') && r.blocoId == blocoAtivo) {
                divHorarios.innerHTML += 
                `
                <div class="text-center flex-column p-2 border-gray w-50 col-5 m-2">
                    <p class="mb-2 font-weight-bold">${r.nome} - Segundo horário</p>
                    <div class="d-flex flex-column align-items-center">
                        <p class="mx-2">Livre</p>
                    </div>
                </div>
                `
            }
        }
    })

    
    atualizarLabs()
}

function atualizarLabs(id) {
    if (id !== undefined)
        labAtivo = id
    else 
        id = labAtivo

    
    document.querySelectorAll('.labs').forEach(lab => {
        lab.innerHTML = '<p>Laboratórios</p>'
    
        labs.map((element, i) => {
            if (element.blocoId == blocoAtivo) {
                if (element.id == labAtivo)
                    lab.innerHTML += `<p class="item-bloco-ativo" onclick="atualizarLabs(${element.id})">${element.nome}</p>`
                else
                    lab.innerHTML += `<p onclick="atualizarLabs(${element.id})">${element.nome}</p>`
            }
        })
    })
}

function labEstaNaLista(nome, horario) {
    for (let i = 0; i < reservasOcupadas.length; i++) {
        if (reservasOcupadas[i].lab == nome && reservasOcupadas[i].horario == horario) {
            return true
        }
    }

    return false
}