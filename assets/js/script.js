const newToDo = document.querySelector(".newToDo")
const addBtn = document.querySelector(".addBtn")
const todos = document.querySelector(".toDos")
let id = 0;
// let todosList=[]
let todosList =JSON.parse(localStorage.getItem('todolar')) || [];

function saveTaskToLocalStorage(){
    return localStorage.setItem('todolar', JSON.stringify(todosList));
}



addBtn.addEventListener("click",addTodo)
function inputValue(){
    let content = newToDo.value
    saveTaskToLocalStorage()
    return content
}





function addTodo(){
    let contents = inputValue()
    todosList.push({
        id:id,
        content:contents})  
    id++
    saveTaskToLocalStorage()
    listTodos();
    console.log(todosList);

}

function listTodos(){
    todos.innerHTML="";
    for (const  todo of todosList) {
        todos.innerHTML+=`
        <li  class="todo" data-todoid="${todo.id}">
                <span>
                    ${todo.content}
                </span>
                <div class="btns">
                    <a class="deleteBtn" href="#">Sil</a>
                    <a class="editBtn" href="#">Düzenle</a> 
                    <a class="completedBtn" href="#">Tamamlandı</a>
                </div> 
          </li>
        `      
    }
    // saveTaskToLocalStorage()
    bindEvents()
}



function bindEvents(){
    const deleteBtns = document.querySelectorAll(".deleteBtn")
    const editBtns = document.querySelectorAll(".editBtn")
    const completedBtns = document.querySelectorAll(".completedBtn")

    for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener("click",deleteButtons)

    }
    for (const editBtn of editBtns) {
        editBtn.addEventListener("click",editButtons)

    }
    for (const completedBtn of completedBtns) {
        completedBtn.addEventListener("click",completedButtons)

    }
    saveTaskToLocalStorage()

}

function completedButtons(){
    console.log( this.parentElement.previousElementSibling);
    this.parentElement.previousElementSibling.classList.add("cross-out")
}


function editButtons(){
    console.log("djfkgndfkjgn");
    const newToDo = prompt("ne ile değiştirmek istersiniz?")
    this.parentElement.previousElementSibling.innerText = newToDo
    console.log(newToDo)

}


function deleteButtons(){
    //  console.log(todo.remove(Number(this.parentElement.parentElement.id),1))
    //  let contents = inputValue()
    // console.log(this.parentElement.parentElement.dataset.todoid);
    // for (const todo of todosList) {
    //     if(this.parentElement.parentElement.dataset.todoid == todo.id ){
    //     //   console.log(todo);
    //       todosList.splice(Number(todo.id),1)
    //      
    //     }
    // }


    const index = todosList.findIndex((todo)=>Number(todo.id)===Number(this.parentElement.parentElement.dataset.todoid))
    if(index !== -1){
       todosList.splice(index,1)
    }
    listTodos()
    // this.parentElement.parentElement.remove()

}


const body = document.querySelector(".darkMode")
const header = document.querySelector(".header")
const sun = document.querySelector(".header img")
const moon = document.querySelector(".moon")

sun.addEventListener("click", lightMode)

function lightMode(){
    console.log("kjdfgkdfjgb");
    body.classList.add("sunmode")
    sun.style.display="none"
    moon.style.display="block"
}

moon.addEventListener("click", darkMode)

function darkMode(){
    body.classList.remove("sunmode")
    sun.style.display="block"
    moon.style.display="none"
}

