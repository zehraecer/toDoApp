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
const fiveItems = qs(".clearCompleted")

export let completedList = JSON.parse(localStorage.getItem('todolar')) || []



// function saveTaskToLocalStorage() {
//     return localStorage.setItem('todolar', JSON.stringify(todoList));
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
                         <a href="" id="checkbox"> <i class="fa-regular fa-thumbs-up"></i></a>
                                <span  >
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
    bindEventsAll("#checkbox", "click", completedBtn)
    bindEvents(".clearCompleted", "click", showFiveItems)
    footerActive()


}




function showFiveItems() {

    listTodos()

}




function completedBtn(e) {
    e.preventDefault()

    let thisId = this.parentElement.parentElement.dataset.todoid
    console.log(thisId);

    const completed = todoList.findIndex(user => user.id == thisId)
    const completedx = todoList.find(user => user.id == thisId)
    const x = completedList.find(user => user.id == thisId)

    const y = completedList.filter(user => user.id == thisId)
    console.log(y);


    if (!x) {
        completedList.push(completedx)
        todoList.splice(completed, 1);

    }
    else if (!completedx) { }

    else {
        completedList.splice(completed, 1);
    }

    saveTaskToLocalStorage()
    completedListLocal()


    console.log(completedList);
    console.log(todoList);

    const checkbox = this.nextElementSibling;
    checkbox.classList.toggle("active")


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

    console.log(newComment);


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

listTodos()