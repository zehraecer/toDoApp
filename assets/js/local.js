
import { todoList } from "./script.js";

export function saveTaskToLocalStorage() {

    return localStorage.setItem('todolar', JSON.stringify(todoList));
}



