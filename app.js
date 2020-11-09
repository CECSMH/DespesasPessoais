class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validate(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}


class Bd{

    constructor (){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getNextId(){
        let NextId = localStorage.getItem('id')
        return parseInt(NextId) + 1
    }
    save(d){
        let id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
}

let bd = new Bd()

function submit(){

    let year = document.getElementById('ano')
    let month = document.getElementById('mes')
    let day = document.getElementById('dia')
    let type = document.getElementById('tipo')
    let description = document.getElementById('descricao')
    let value = document.getElementById('valor')

    let despesa = new Despesa(
        year.value,
        month.value,
        day.value,
        type.value,
        description.value,
        value.value,
    )

    if(despesa.validate()){
        bd.save(despesa)
         
        document.getElementById('cor').className = 'modal-header text-success'
        document.getElementById('title').innerHTML = 'Registro inserido com sucesso.'
        document.getElementById('description').innerHTML = 'Despesa cadastrada com sucesso.'
        document.getElementById('corbtn').innerHTML = 'Voltar'
        document.getElementById('corbtn').className = 'btn btn-primary btn-success'
        $('#saveDialog').modal('show')
    }else{

        document.getElementById('cor').className = 'modal-header text-danger'
        document.getElementById('title').innerHTML = 'Erro ao inserir registro'
        document.getElementById('description').innerHTML = 'Campos obrigatorios não foram preenchidos.'
        document.getElementById('corbtn').innerHTML = 'Voltar e corrigir'
        document.getElementById('corbtn').className = 'btn btn-primary btn-danger'
        $('#saveDialog').modal('show')
    }
    
}

