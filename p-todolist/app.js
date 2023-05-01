//selectors

const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoContainer = document.querySelector(".todo-container");
const filterOptions = document.querySelector(".todo-filter");

// event listener

addBtn.addEventListener("click", addTodo);
todoContainer.addEventListener("click", checkRemove);
filterOptions.addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getLocalTodo);

//functions

function addTodo(event) {
    //vaghti ro submit mizanim page refresh nemishe
    event.preventDefault();

    //1. get input value
    //2.create new todo
    //3.add to dom
    //4.reset input value

    const showTodoDiv = document.createElement("div");
    showTodoDiv.classList.add("todo");

    const newTodo = `<li class="todo-name"> ${todoInput.value} </li>
                <span><i class="far fa-check-square check-icon"></i></span>
                <span><i class="far fa-trash-alt delete-icon"></i></span>`;
    showTodoDiv.innerHTML = newTodo;

    //append to list

    todoContainer.appendChild(showTodoDiv);
    saveLocalTodo(todoInput.value);
    todoInput.value = "";
};

function checkRemove(event) {
    const itemParent = event.target;
    if (event.target.classList.contains("delete-icon")) {
        const deleteTodo = itemParent.parentElement.parentElement;
        removeTodo(deleteTodo);
        deleteTodo.remove();
    } else if (event.target.classList.contains("check-icon")) {
        const checkTodo = itemParent.parentElement.parentElement;
        checkTodo.classList.toggle("completed");
    } else {

    }
};

function filterTodos(event) {
    const todos = [...todoContainer.childNodes];
    todos.forEach(element => {
        if (event.target.value === "all") {
            element.style.display = "flex";
        } else if (event.target.value === "complete") {
            if (element.classList.contains("completed")) element.style.display = "flex";
            else element.style.display = "none";
        } else if (!element.classList.contains("completed")) {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    })

    // switch (event.target.value) {
    //     case "all":
    //         element.style.display = "flex";
    //         break;
    //     case "complete":
    //         if (element.classList.contains("completed")) {
    //             element.style.display = "flex";
    //         } else {
    //             element.style.display = "none";
    //         }
    //         break;
    //     case "uncompleted":
    //         if (!element.classList.contains("completed")) {
    //             element.style.display = "flex";
    //         } else {
    //             element.style.display = "none";
    //         }
    //         break;
    // }
}

function saveLocalTodo(todo) {
    // localStorage.getItem("todos");
    // localStorage.setItem("todos", JSON.stringify(todos));

    let savedTodo = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];

    savedTodo.push(todo);
    //todos = key name in local storage
    localStorage.setItem("todos", JSON.stringify(savedTodo));
};

function getLocalTodo() {
    // localStorage.getItem("todos");
    // localStorage.setItem("todos", JSON.stringify(todos));

    let savedTodo = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];

    savedTodo.forEach(element => {
        const showTodoDiv = document.createElement("div");
        showTodoDiv.classList.add("todo");

        const newTodo = `<li class="todo-name"> ${element} </li>
                <span><i class="far fa-check-square check-icon"></i></span>
                <span><i class="far fa-trash-alt delete-icon"></i></span>`;
        showTodoDiv.innerHTML = newTodo;
        todoContainer.appendChild(showTodoDiv);
    });
}

function removeTodo(todo) {
    // tags in <div class="todo"></div>
    // console.log(todo.children);

    //todo name from children[0] => <li>innerText => todo 1</li>
    // console.log(todo.children[0].innerText);

    let savedTodo = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];

    const filteredTodo = savedTodo.filter(name => name !== todo.children[0].innerText);
    localStorage.setItem("todos", JSON.stringify(filteredTodo));
}