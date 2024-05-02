
import { todoList } from "./script.js";
import { completedList } from "./script.js";

export function saveTaskToLocalStorage() {

    return localStorage.setItem('todolar', JSON.stringify(todoList));
}

export function completedContentList() {

    return localStorage.setItem('completedList', JSON.stringify(completedList));
}




