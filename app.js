class Expense {
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
    loadAllRegisters(){

        let items = Array()
        let id = localStorage.getItem('id')
       
        for(let i = 1; i <= id; i++){
           
            let item = JSON.parse(localStorage.getItem(i))
            if(item === null){
                continue 
            }
            item.id = i
            items.push(item)
        }
        return items
    }
    search(data){
        let searchF = Array() 
        searchF = this.loadAllRegisters()
        
        if(data.ano != ''){
            searchF = searchF.filter(k => k.ano == data.ano)
        }
        if(data.mes != ''){
            searchF = searchF.filter(k => k.mes == data.mes)
        }
        if(data.dia != ''){
            searchF = searchF.filter(k => k.dia == data.dia)
        }
        if(data.tipo != ''){
            searchF = searchF.filter(k => k.tipo == data.tipo)
        }
        if(data.descricao != ''){
            searchF = searchF.filter(k => k.descricao == data.descricao)
        }
        if(data.valor != ''){
            searchF = searchF.filter(k => k.valor == data.valor)
        }

        return searchF
    }
    remove(id){
        localStorage.removeItem(id)
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

    let expense = new Expense(
        year.value,
        month.value,
        day.value,
        type.value,
        description.value,
        value.value,
    )

    if(expense.validate()){
        bd.save(expense)
         
        document.getElementById('cor').className = 'modal-header text-success'
        document.getElementById('title').innerHTML = 'Registro inserido com sucesso.'
        document.getElementById('description').innerHTML = 'Despesa cadastrada com sucesso.'
        document.getElementById('corbtn').innerHTML = 'Voltar'
        document.getElementById('corbtn').className = 'btn btn-primary btn-success'
        $('#saveDialog').modal('show')

        year.value = ''
        month.value = ''
        day.value = ''
        type.value = ''
        description.value = ''
        value.value = ''
    }else{

        document.getElementById('cor').className = 'modal-header text-danger'
        document.getElementById('title').innerHTML = 'Erro ao inserir registro'
        document.getElementById('description').innerHTML = 'Campos obrigatorios não foram preenchidos.'
        document.getElementById('corbtn').innerHTML = 'Voltar e corrigir'
        document.getElementById('corbtn').className = 'btn btn-primary btn-danger'
        $('#saveDialog').modal('show')
    }
    
}

function loadList(items = Array()){

    if(items.length == 0){
        items = bd.loadAllRegisters()
    }
    
    let list = document.getElementById('list')
    list.innerHTML = ''
    items.forEach(function(j){
       
        switch(parseInt(j.tipo)){
            case 1:
                j.tipo = 'Alimentação'
                break;
            case 2:
                j.tipo = 'Educação'
                break;
            case 3:
                j.tipo = 'Lazer'
                break;
            case 4:
                j.tipo = 'Saúde'
                break;
            case 5:
                j.tipo = 'Transporte'
                break;
            case 6:
                j.tipo = 'Outros'
                break;
        }
       let line = list.insertRow()
       line.insertCell(0).innerHTML = `${j.dia}/${j.mes}/${j.ano}`
       line.insertCell(1).innerHTML = j.tipo
       line.insertCell(2).innerHTML = j.descricao
       line.insertCell(3).innerHTML = j.valor

       let button = document.createElement('button')
       button.className = "btn btn-danger"
       button.innerHTML = '<i class="fas fa-minus-circle" Alt="Apagar"></i>'
       button.id = `button_id_${j.id}`
       button.onclick = function() {
           let id = this.id.replace('button_id_', '')
           bd.remove(id)
           window.location.reload()
       }
       line.insertCell(4).append(button)
    })
}

function searchRegister(){
    let year = document.getElementById('ano').value
    let month = document.getElementById('mes').value
    let day = document.getElementById('dia').value
    let type = document.getElementById('tipo').value
    let description = document.getElementById('descricao').value
    let value = document.getElementById('valor').value

    let research = new Expense(year, month, day, type, description, value)

    let filteredSearch = bd.search(research)
   
    loadList(filteredSearch);
        
   
}
