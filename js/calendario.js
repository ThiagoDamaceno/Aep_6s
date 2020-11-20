
let dataAtual
//Calendario
const calendario = jsCalendar.new(document.querySelector('#calendario'))
calendario.setLanguage('pt')

calendario.onDateClick((event, date) => {
    document.querySelector('#btn-modal-simples').click()
    dataAtual = date
})

