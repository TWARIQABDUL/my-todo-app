const actionButtons = document.querySelectorAll("button")
const task_cotainer = document.querySelector(".task-cotainer")
const close = document.getElementById("close")
const modol = document.querySelector(".modol")
const form = document.querySelector("form")
const taskTitle = document.getElementById("task-title")
const startDate= document.getElementById("start-date")
const endDate = document.getElementById("end-date")
const startTime = document.getElementById("start-time")
const taskDetails = document.getElementById("task-details")
const endTime = document.getElementById("end-time")

form.addEventListener("submit",(e)=>{
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

actionButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    console.log(btn.dataset.mytask);
    displayControler(btn.dataset.mytask)
    
  })
})

const testing = [
  {
    title:"Building Todo app",
    description:"Some description are to go here",
    start_time: "11:20 PM",
    end_time: "11:20 PM",
    start_date: "22 May 2021",
    end_date: " 25 May 2021",
    statuses:"pending",

    
  },
  {
    title:"Building full stack app",
    description:"Some description are to go here",
    start_time: "11:20 PM",
    end_time: "11:20 PM",
    start_date: "22 May 2021",
    end_date: " 25 May 2021",
    statuses:"complete"
  }
]

const appendTask=(task)=>{
  let task_div = document.createElement("div")
  task_div.classList.add("tasks")
  task_div.innerHTML = `
  <h1>${task.title}</h1>
        <div class="duration">
          <p>today ${task.end_time}<span class="${task.statuses}"></span></p>
        </div>
  `
  task_cotainer.appendChild(task_div)
}

// this function will loop through all tasks and call the display function on each
const displayCompletedTasks = (tasks)=>{
  let sortedTasks = tasks.filter(a=>{
    // console.log(a.statuses);
    
    return a.statuses.includes("complete")
  })
  console.log(sortedTasks);
  
  sortedTasks.map((task)=>appendTask(task))
}
const displayTasks = (tasks)=>{
  tasks.map((task)=>appendTask(task))
}


const saveData =(data)=>{

  let newTask = {
     title:data.taskTitle,
    description:data.taskDetails,
    start_time: data.startTime,
    end_time: data.endTime,
    start_date: data.startDate,
    end_date: data.endDate,
    statuses:"pending"
  }
  testing.push(newTask)
  task_cotainer.innerHTML=""
  displayTasks(testing)
}
const displayControler =(data)=>{
  switch (data) {
    case "add":
      modol.style.display="flex"
      break;
    case "mytask":
      task_cotainer.innerHTML=""
      displayTasks(testing)
      break
    case "completed":
      task_cotainer.innerHTML=""
      displayCompletedTasks(testing)
      break
    case "submit":
      let data = getFormData()
      saveData(data)
      modol.style.display="none"
      console.log(data);
      
    default:
      break;
  }
  // modol.style.display= "flex"
}
// const appendTask = (task)=>{
//   task_cotainer.children.append("hhhh")
// }
close.addEventListener("click",()=>{
  modol.style.display= "none"
})