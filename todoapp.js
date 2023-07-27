let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//form validation

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Please enter a task";
    msg.style.color = "red";
  } else {
    msg.innerHTML = "";
    addTask();

    //so that the modal closes after adding a task
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

//add task, store in local storage

let data = new Array();


let addTask = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    textarea: textarea.value,
    completed: false,
  });

  localStorage.setItem("data", JSON.stringify(data));
  displayTasks();
};

//display tasks

let displayTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
          <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.textarea}</p>
    
            <span class="options">
            <i onClick="completeTask(this)" class="far fa-check-square done_icon" id="${y}" style="display: none;"></i>
            <i onClick="completeTask(this)" class="far fa-square not-done_icon" id="${y}"></i>
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit edit_icon"></i>
              <i onClick ="deleteTask(this)" class="fas fa-trash-alt delete_icon"></i>
            </span>
          </div>`);
  });
  resetForm();
};

//clear form after adding a task

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

//delete task

let deleteTask = (e) => {
  let todoTask = e.parentNode.parentNode;
  todoTask.remove();
  let id = e.parentNode.parentNode.id;
  data.splice(id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

//edit task

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

//complete task

let completeTask = (e) => {
  let id = e.id;
  let selectedTask = e.parentElement.parentElement;
  let task = data[id];
  let doneIcon = selectedTask.children[3].children[0];
  let notDoneIcon = selectedTask.children[3].children[1];

  if (task.completed === false) {
    selectedTask.children[0].style.textDecoration = "line-through";
    selectedTask.style.opacity = "0.5";
    task.completed = true;
    doneIcon.style.display = "block";
    notDoneIcon.style.display = "none";
  } else {
    selectedTask.children[0].style.textDecoration = "none";
    selectedTask.style.opacity = "1";
    task.completed = false;
    doneIcon.style.display = "none";
    notDoneIcon.style.display = "block";
  }
  localStorage.setItem("data", JSON.stringify(data));
};

//display tasks from local storage, when page is refreshed

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  displayTasks();
})();
