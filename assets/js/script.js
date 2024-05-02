import { saveTaskToLocalStorage } from "./local.js"
import { bindEventsAll } from "./bind.js"
import { bindEvents } from "./bind.js"
import { qs } from "./qs.js"


export let todoList = JSON.parse(localStorage.getItem('todolar')) || [];
const todos = qs(".toDos")
const todoForm = qs(".todoForm")

const fiveItems = qs(".fiveItems")


fiveItems.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("mdfkbfgb");
});

// function saveTaskToLocalStorage() {
//     return localStorage.setItem('todolar', JSON.stringify(todoList));
// }



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
        content: newContent
    }

    todoList.push(contents)
    saveTaskToLocalStorage()
    listTodos()
})


function listTodos() {
    todos.innerHTML = "";


    for (const todo of todoList) {
        todos.innerHTML += `
            <li  class="todo" data-todoid="${todo.id}">
    
                    <div class="todooContent">
                            <input type="checkbox" id="checkbox"/>
                                <span>
                                    ${todo.content}
                                </span>
                            
                    </div>
    
                    <div class="btns">
                        <a class="deleteBtn" href="#">X</a>
                    </div> 
    
            </li>
    
     
    
            `
    }


    bindEventsAll(".deleteBtn", "click", deleteButtons)
    bindEvents("#checkbox", "click", completedBtn)


}



function completedBtn() {
    console.log("dfgbfgh");
}


function deleteButtons() {

    const index = todoList.findIndex((todo) => Number(todo.id) === Number(this.parentElement.parentElement.dataset.todoid))
    if (index !== -1) {
        todoList.splice(index, 1)
    }

    saveTaskToLocalStorage()
    listTodos()

    // this.parentElement.parentElement.remove()

}





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

