let inputValue = document.getElementById('todoInput')
let piortyTask = document.getElementById('piorty')
let todoList = [];

let see
let addItem = () => {
    let todoValue = {
        text: inputValue.value,
        isDone: false,
        piorty: parseInt(piortyTask.value)
    }
    todoList.push(todoValue)
    render(see)
    inputValue.value = ''
    console.log(todoList)
}

const removeItem = (index) => {
    todoList.splice(index, 1)
    render(see)
}

let piortyTodo = (num) => {
    let piorList = []
    for (let i = 0; i < num; i++) {
        piorList.push('<i class="fa fa-star"></i>')
    }
    return piorList.join('')
}

const render = (status) => {

    see = status
        // let filter = !status ? todoList : (status === 'done'? todoList.filter((itemDone) => itemDone.isDone) : )
    let filter;
    if (!see) {
        filter = todoList
        document.getElementById('value-all').innerHTML = filter.length
    } else if (see === 'done') {
        filter = todoList.filter((taskDone) => taskDone.isDone)
        document.getElementById('value-done').innerHTML = filter.length
    } else if (see === 'undone') {
        filter = todoList.filter((taskDone) => !taskDone.isDone)
        document.getElementById('value-undone').innerHTML = filter.length
    }
    filter.sort((a, b) => a.piorty < b.piorty ? 1 : -1)
    console.log("filter", filter)
    let htmlTodoArray = filter.map((item, index) => {
        return `<li><span  style="text-decoration: ${item.isDone ? 'line-through': ''}" onclick="toggleDone(${index})">${item.text}
        <a>${item.isDone ? 'Mark Undone': 'Mark Done'}</a>
        </span>${piortyTodo(item.piorty)}
        <button onclick="removeItem(${index})">X</button></li>`
    }).join('')
    document.getElementById('resultArea').innerHTML = htmlTodoArray
    saveTodos()

}

const toggleDone = (index) => {
    todoList[index].isDone = !todoList[index].isDone
    render(see)
}

const saveTodos = () => {
    let todo = JSON.stringify(todoList)
    localStorage.setItem('todoTask', todo)
}

const getTodo = () => {
    let listTasks = localStorage.getItem('todoTask')
    todoList = JSON.parse(listTasks)
    if (!todoList) {
        todoList = []
    }
}
getTodo()
render()