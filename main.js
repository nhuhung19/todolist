let inputValue = document.getElementById('todoInput')
    // let btnCheckTask = document.getElementById('show-undone')
let todoList = [];

let see
let addItem = () => {
    let todoValue = {
        text: inputValue.value,
        isDone: false
    }
    todoList.push(todoValue)
    render(see)
    inputValue.value = ''
}

const removeItem = (index) => {
    todoList.splice(index, 1)
    render(see)
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


    console.log("filter", filter)
    let htmlTodoArray = filter.map((item, index) => {
        return `<li><span  style="text-decoration: ${item.isDone ? 'line-through': ''}" onclick="toggleDone(${index})">${item.text}
        <a>${item.isDone ? 'Mark Undone': 'Mark Done'}</a>
        </span>
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