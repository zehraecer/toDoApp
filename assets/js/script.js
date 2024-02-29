const newToDo = document.querySelector(".newToDo")
const addBtn = document.querySelector(".addBtn")
const todos = document.querySelector(".toDos")
let id = 0;


addBtn.addEventListener("click",addTodo)

function inputValue(){
    let content = newToDo.value 
    return content
}

let todosList=[]

function addTodo(){
    let contents = inputValue()
    todosList.push({
        id:id,
        content:contents})  
    id++
    listTodos();
    console.log(todosList);
}

function listTodos(){
    todos.innerHTML="";
    for (const  todo of todosList) {
        todos.innerHTML+=`
        <li  class="todo" data-todoid="${todo.id}"> <span>${todo.content}</span><div class="btns"><a class="deleteBtn" href="#">Sil</a> <a class="editBtn" href="#">Düzenle</a> <a class="completedBtn" href="#">Tamamlandı</a></div> </li>
        `      
    }
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

}

function completedButtons(){
    this.parentElement.previousSibling.classList.add("cross-out")
}


function editButtons(){
    const newToDo = prompt("ne ile değiştirmek istersiniz?")
    this.parentElement.previousElementSibling.innerText = newToDo
    console.log(newToDo);

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


