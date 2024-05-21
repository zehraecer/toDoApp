import { saveTaskToLocalStorage } from "./local.js"
import { completedListLocal } from "./local.js"
import { bindEventsAll } from "./bind.js"
import { bindEvents } from "./bind.js"
import { qs } from "./qs.js"
import { qsAll } from "./qs.js"


export let todoList = JSON.parse(localStorage.getItem('todolar')) || [];
const todos = qs(".toDos")
const todoForm = qs(".todoForm")
const footer = qs(".footer")
const clrCompleted = qs(".clearCompleted")

export let completedList = JSON.parse(localStorage.getItem('todolar')) || []

// function todoAll() {
//     console.log(todoList);
//     listTodos()
// }

function footerActive() {
    if (todoList.length >= 1) {
        footer.style.display = "flex"
    }
    else {
        footer.style.display = "none"

    }
}



function createUniqueId() {
    let id = 1;
    for (const todoId of todoList) {
        if (todoId.id === id) {
            id += 1;
        }
    }
    return id++;
}



todoForm.addEventListener("submit", (e) => {
    e.preventDefault()


    const newContent = todoForm["newTodo"].value

    const contents = {

        id: createUniqueId(),
        content: newContent,
        isCompleted: false
    }

    todoList.push(contents)
    saveTaskToLocalStorage()
    listTodos()
    e.target.reset()
})


function listTodos() {
    todos.innerHTML = "";

    for (const todo of todoList) {
        todos.innerHTML += `
            <li  class="todo" data-todoid="${todo.id}">
    
                    <div class="todooContent">
                         <a href="" id="checkbox"><i class="fa-solid fa-thumbs-up"></i></a>
                                <span  class="${todo.isCompleted ? "active" : "noActive"}">
                                    ${todo.content}
                                </span>
                            
                    </div>
    
                    <div class="btns">
                        <a class="editBtn" href="#"><i class="fa-solid fa-pencil"></i></a> 
                        <a class="deleteBtn" href="#">X</a>
                    </div> 
    
            </li>
    
     
    
            `
    }
    bindEventsAll(".deleteBtn", "click", deleteButtons)
    bindEventsAll(".editBtn", "click", editBtns)
    bindEvents(".clearCompleted", "click", clearCompleted)
    // bindEvents(".todoCompleted", "click", todoCompleted)
    // bindEvents(".todoActive", "click", todoActive)
    // bindEvents(".all", "click", todoAll)
    bindEventsAll("#checkbox", "click", completedBtn)
    footerActive()

}


// function todoActive() {
//     let completedTodos = todoList.filter(user => user.isCompleted == false)
//     todoList = completedTodos
//     listTodos()
// }

// function todoCompleted() {
//     let completedTodos = todoList.filter(user => user.isCompleted == true)
//     todoList = completedTodos
//     listTodos()
// }

function clearCompleted(e) {
    e.preventDefault()
    console.log("skfnvgf");

    let activeTodos = todoList.filter(user => user.isCompleted == false)

    todoList = activeTodos


    listTodos()


}

function completedBtn(e) {
    e.preventDefault()

    let thisId = this.parentElement.parentElement.dataset.todoid
    const x = this.nextElementSibling;
    const completedz = todoList.find(user => user.id == thisId)


    if (completedz.isCompleted === false) {
        x.classList.add("active")
        completedz.isCompleted = true
    } else {
        completedz.isCompleted = false
        x.classList.remove("active")
    }

    completedList = todoList.filter(user => user.isCompleted == true)
    console.log(completedList);

    saveTaskToLocalStorage()
    completedListLocal()

}

function editBtns() {

    const capturedId = this.parentElement.parentElement.dataset.todoid
    let answer = prompt("ne ile değiştirmek istesrsiniz")
    console.log(capturedId);

    const newComment = todoList.map(user => {
        if (user.id == capturedId) {
            console.log(user.content);
            user.content = answer
        }
        return user
    })
    saveTaskToLocalStorage()
    listTodos()
}

function deleteButtons() {

    const index = todoList.findIndex((todo) => Number(todo.id) === Number(this.parentElement.parentElement.dataset.todoid))
    if (index !== -1) {
        todoList.splice(index, 1)
        completedList.splice(index, 1)
    }
    completedListLocal()
    saveTaskToLocalStorage()
    listTodos()


}

// dark&light mode kodları
const body = qs(".darkMode")
const header = qs(".header")
const sun = qs(".header img")
const moon = qs(".moon")

sun.addEventListener("click", lightMode)

function lightMode() {
    console.log("kjdfgkdfjgb");
    body.classList.add("sunmode")
    sun.style.display = "none"
    moon.style.display = "block"
}

moon.addEventListener("click", darkMode)

function darkMode() {
    body.classList.remove("sunmode")
    sun.style.display = "block"
    moon.style.display = "none"
}

listTodos()