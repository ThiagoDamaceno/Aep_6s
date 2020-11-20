let turnoAtivo = 1
let cursoAtual
let turmaAtual

const containerMain = document.querySelector('#container-main')

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

        //atualizarReservas()
    }
})


//Clicks horarios-lab
document.querySelectorAll('#turnos-lab button').forEach(element => {
    element.onclick = () => {
        document.querySelectorAll('#turnos-lab button').forEach(element => {
            
            element.classList.remove('button-horario-ativo')
        })

        document.querySelectorAll('#turnos-lab-simples button').forEach(element => {
            element.classList.remove('button-horario-ativo')
        })

        element.classList.add('button-horario-ativo')

        if (element.id != idBtnTurnoAtivo)
            idBtnTurnoAtivo = element.id
        //atualizarReservas()
    }  
})

//Clicks horarios-lab-simples
document.querySelectorAll('.turnos button').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.turnos button').forEach(btn => {
            btn.classList.remove('button-horario-ativo')
        })

        if (btn.classList.contains('btn-matutino-lab')) {
            document.querySelectorAll('.btn-matutino-lab').forEach(btn => {
                btn.classList.add('button-horario-ativo')
            })
            horarioAtivo = 'MANHA'
        }
        else if (btn.classList.contains('btn-vespertino-lab')) {
            document.querySelectorAll('.btn-vespertino-lab').forEach(btn => {
                btn.classList.add('button-horario-ativo')
            })
            horarioAtivo = 'TARDE'
        }

        else if (btn.classList.contains('btn-noturno-lab')) {
            document.querySelectorAll('.btn-noturno-lab').forEach(btn => {
                btn.classList.add('button-horario-ativo')
            })
            horarioAtivo = 'NOITE'
        }

        atualizarReservas(blocoAtivo)
    }
})

//Clicks Horarios-modal-recorrete
document.querySelectorAll('#horarios-modal-recorrente button').forEach(element => {
    element.onclick = () => {
        document.querySelectorAll('#horarios-modal-recorrente button').forEach(element => {
            element.classList.remove('button-horario-ativo')
        })

        element.classList.add('button-horario-ativo')

        if (element.classList.contains('btn-primeiro-horario')) {
            turnoAtivo = 1
        } else {
            turnoAtivo = 2
        }
    }  
});

//Clicks Horarios-modal-simples
document.querySelectorAll('#horarios-modal-simples button').forEach(element => {
    element.onclick = () => {
        document.querySelectorAll('#horarios-modal-simples button').forEach(element => {
            element.classList.remove('button-horario-ativo')
        })

        element.classList.add('button-horario-ativo')

        if (element.classList.contains('btn-primeiro-horario')) {
            turnoAtivo = 1
        } else {
            turnoAtivo = 2
        }

    }  
});

function loadCursosModal(cursoId) {
    if (cursoId != undefined) {
        cursoAtual = cursoId
    }

    document.querySelectorAll('.cursos').forEach(divCurso => {
        divCurso.innerHTML = `<p>Cursos</p>`
        cursos.forEach((curso) => {
            if (curso.id === cursoAtual) {
                divCurso.innerHTML += 
                `
                    <p class="item-bloco-ativo" onclick="loadCursosModal(${curso.id})">${curso.nome}</p>
                `
            }
            else {
                divCurso.innerHTML += 
                `
                    <p onclick="loadCursosModal(${curso.id})">${curso.nome}</p>
                `
            }
        })
    });
    loadTurmasModal(turmaAtual)
}

function loadTurmasModal(turmaId) {

    if (turmaId != undefined) {
        turmaAtual = turmaId
    }

    document.querySelectorAll('.turmas').forEach(divTurmas => {
        divTurmas.innerHTML = `<p>Turmas</p>`
    
        turmas.forEach((turma) => {
            if (turma.cursoId == cursoAtual) {
                if (turma.id === turmaId)
                    divTurmas.innerHTML += 
                    `
                        <p class="item-bloco-ativo" onclick="loadTurmasModal(${turma.id})">${turma.nome}</p>
                    `
                else {
                    divTurmas.innerHTML += 
                    `
                        <p onclick="loadTurmasModal(${turma.id})">${turma.nome}</p>
                    `
                }
            }
        })

    })
}


async function salvarReservaSimples() {

    const turnoReserva = turnoAtivo == 1 ? 'PRIMEIRO' : 'SEGUNDO'
    const horarioId = getHorarioIdByTurnoLabIdBlocoId(horarioAtivo, labAtivo, blocoAtivo)
    const turma = turmaAtual
    const professor = 1

    //console.log(horarioId)
    console.log('turnoReserva: ' + turnoReserva)
    console.log('horarioId: ' + horarioId)
    console.log('turma: ' + turma)
    console.log('professor: ' + professor)
    console.log('token: ' + token)

    const _token = 'Basic ' + token

    const response = await fetch(host + '/reservas', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token
        },
        body: JSON.stringify({
            "horarioReserva": turnoReserva,
            "tipoReserva": "AULA",
            "turmaId": turma,
            "professorId": professor,
            "horarioId": horarioId,
        }
    )})

    /*
    $.ajax({
        url: host + '/reservas',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token
        },
        data: JSON.stringify({
            "horarioReserva": turnoReserva,
            "tipoReserva": "AULA",
            "turmaId": turma,
            "professorId": professor,
            "horarioId": horarioId,
        }),  
    }).done((response) => {console.log(response)})*/

    getDados()
}

function getHorarioIdByTurnoLabIdBlocoId(turno, labId, blocoId) {
    for (let i = 0; i < horarios.length; i++) {
        console.log(horarios[i].turno + ' ' + turno)
        if (horarios[i].turno == turno && horarios[i].laboratorioId == labId && horarios[i].laboratorioDto.blocoId == blocoId) {
            return horarios[i].id
        }
    }

    return 'erro'
}
