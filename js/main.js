const actionButtons = document.querySelectorAll("button")
const task_cotainer = document.querySelector(".task-cotainer")
const close = document.getElementById("close")
const info_container = document.querySelector(".info-containe")
const modol = document.querySelector(".modol")
const form = document.querySelector("form")
const taskTitle = document.getElementById("task-title")
const startDate = document.getElementById("start-date")
const endDate = document.getElementById("end-date")
const startTime = document.getElementById("start-time")
const taskDetails = document.getElementById("task-details")
const endTime = document.getElementById("end-time")

form.addEventListener("submit", (e) => {
  e.preventDefault
})
function getFormData() {
  const taskTitle = document.getElementById("task-title").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const taskDetails = document.getElementById("task-details").value;

  return {
    taskTitle,
    startDate,
    endDate,
    startTime,
    endTime,
    taskDetails,
  };
}

// Example usage
// const data = getFormData();
// console.log(data);


function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

const fetchData = (path) => {
  let url = `https://dummyjson.com/${path}`

  fetch(url)
    .then(res => res.json())
    .then(resp => resp.todos);

}
actionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // console.log(btn.dataset.mytask);
    displayControler(btn.dataset.mytask)

  })
})

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify(
    [

    ]
  ));
}


let testing = JSON.parse(localStorage.getItem("tasks"))


// adds task to the display
const appendTask = (task) => {
  let items = localStorage.getItem("tasks")
  // console.log(JSON.parse(items));

  let task_div = document.createElement("div")
  task_div.classList.add("tasks")
  task_div.dataset.id = task.id
  task_div.innerHTML = `
  <h1>${task.title}</h1>
        <div class="duration">
          <p>today ${task.end_time}<span class="${task.statuses}"></span></p>
        </div>
  `
  task_div.addEventListener("click", () => {
    // console.log(task_div.dataset);
    displyTaskInfo(task_div.dataset.id)

  })
  task_cotainer.appendChild(task_div)
}

// this function will loop through all tasks and call the display function on each
const displayCompletedTasks = (tasks) => {
  let sortedTasks = tasks.filter(a => {
    // console.log(a.statuses);

    return a.statuses.includes("complete")
  })
  // console.log(sortedTasks);

  sortedTasks.map((task) => appendTask(task))
}
const displayTasks = (tasks) => {
  // console.log(tasks);

  tasks.map((task) => appendTask(task))
}
const displyTaskInfo = (id) => {
  let selected = testing.filter(a => {
    return a.id == id

  })

  info_container.style.display = "block"

  info_container.innerHTML = `
  <div class="info">
    <h3>${selected[0].title}</h3>
    <p>${selected[0].description}.</p>
      <div class="btn">
        <button id="complete" data-mark_id="${id}">Mark Us Complete</button>
      <button id="delete-task" data-delete_id="${id}">Delete</button>
      </div>
      <button id="close-1">
      <img src="images/icon-close.svg" alt="">
    </button>
  </div>
  `
  let close_info = document.getElementById("close-1")
  let complete = document.getElementById("complete")
  let delete_task = document.getElementById("delete-task")

  complete.addEventListener("click", () => {
    updateTaskStustu(complete.dataset.mark_id)
    // info_container.style.display = "none"
  })
  delete_task.addEventListener("click", () => {

    deleTask(delete_task.dataset.delete_id)
    info_container.style.display = "none"
    // info_container.style.display = "none"
  })
  close_info.addEventListener("click", () => {

    info_container.style.display = "none"
  })
}

const saveData = (data) => {

  
  let prev = JSON.parse(localStorage.getItem("tasks"))
  let lastId = prev.length
  // console.log(lastId);
  let newTask = {
    id: lastId == 0 ? 1 : prev[lastId-1].id+1,
    title: data.taskTitle,
    description: data.taskDetails,
    start_time: data.startTime,
    end_time: data.endTime,
    start_date: data.startDate,
    end_date: data.endDate,
    statuses: "pending"
  }

  prev.push(newTask)

  localStorage.setItem("tasks", JSON.stringify(prev))
  testing.push(newTask)
  task_cotainer.innerHTML = ""
  displayTasks(testing)
}
// mark completed task
const updateTaskStustu = (id) => {
  let prev = JSON.parse(localStorage.getItem("tasks"))
  // prev.push(newTask)

  let element = prev.findIndex(elem => {
    return elem.id == id
  })
  prev[element].statuses = "complete"
  localStorage.setItem("tasks", JSON.stringify(prev))

  // console.log("updating");
  // console.log(element);
  testing[element].statuses = "complete"
  task_cotainer.innerHTML = ""
  displayTasks(prev)
}
// delete task 
const deleTask = (id) => {
  let prev = JSON.parse(localStorage.getItem("tasks"))

  let element = prev.findIndex(elem => {
    return elem.id == id
  })
  // console.log(element);
  prev.splice(element, 1)
  localStorage.setItem("tasks", JSON.stringify(prev))
  testing = prev
  task_cotainer.innerHTML = ""
  // console.log("hellop",prev);
  
  displayTasks(prev)
  // console.log(element);

}

// controls which tap to show
const displayControler = (data) => {
  switch (data) {
    case "add":
      modol.style.display = "flex"
      break;
    case "mytask":
      task_cotainer.innerHTML = ""
      // let list = fetchData("todos")
      displayTasks(testing)
      break
    case "completed":
      task_cotainer.innerHTML = ""
      displayCompletedTasks(testing)
      break
    case "submit":
      let data = getFormData()
      saveData(data)
      modol.style.display = "none"
      // console.log(data);

    default:
      task_cotainer.innerHTML = ""
      displayTasks(testing)
      break
  }

}
displayControler()
close.addEventListener("click", () => {
  modol.style.display = "none"
})
