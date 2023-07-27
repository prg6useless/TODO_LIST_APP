let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");
let todo_text = document.getElementsByClassName("todo_text");
let done_icon = document.getElementsByClassName("done_icon");
let not_done_icon = document.getElementsByClassName("not-done_icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//validate the form

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Please enter a todo";
  } else {
    msg.innerHTML = "";
    addTodo();
  }
};

// accept input from user
let data = [];

let addTodo = () => {
  const todo = {
    text: input.value,
    id: data.length + 1,
  };
  data.text = input.value;
  data.id = data.length + 1;
  data.push(todo);
  postTodo();
};

//post todo

let postTodo = () => {
  posts.innerHTML += `  <div class="tasks">
  <p class="todo_text">${data.text}</p>
  <span class="options">
    <i onClick="completeTodo(this.id)" class="far fa-check-square done_icon" id="${data.id}"></i>
    <i onClick="completeTodo(this.id)" class="far fa-square not-done_icon" id="${data.id}"></i>
    <i onClick="editTodo(this)" class="fas fa-edit edit_icon"></i>
    <i onClick="deleteTodo(this)" class="fas fa-trash-alt delete_icon"></i>
  </span>
</div>`;
  input.value = "";
};

//delete todo

let deleteTodo = (e) => {
  e.parentNode.parentNode.remove();
};

//edit todo

let editTodo = (e) => {
  let val = e.parentNode.parentNode.firstChild.nextSibling.innerHTML;
  input.value = val;
  e.parentNode.parentNode.remove();
};

//complete todo

let completeTodo = (e) => {
  if (todo_text[e - 1].classList.contains("completed")) {
    todo_text[e - 1].classList.remove("completed");
    not_done_icon[e - 1].style.display = "block";
    done_icon[e - 1].style.display = "none";
  } else {
    todo_text[e - 1].classList.add("completed");
    done_icon[e - 1].style.display = "block";
    not_done_icon[e - 1].style.display = "none";
  }
};
