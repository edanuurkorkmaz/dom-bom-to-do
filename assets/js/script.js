
let tasks = [];
// const completedTask = [];

if (localStorage.tasks) {
    tasks = JSON.parse(localStorage.tasks);
}

function render(type = "uncompleted"){
    taskList.innerHTML = "";
   
    if (type === "uncompleted") {
        showUnCompleted.style.background = "#6741D9";
        showCompleted.style.background = "#fff";
        const filteredTasks = tasks.filter(task => !task.isCompleted);
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `<p class = "task-text">Tamamlanmayan görev yok</p>`;
            return;
        }
    
        for (const task of filteredTasks) {
            taskList.innerHTML += `
            <li class = "taskItem">
            <button  data-id = "${task.id}" class = "btn markCompleteBtn"></button>
            <span data-id = "${task.id}" contenteditable = "true" class="taskTitle">${task.title} </span>
            <!-- <i data-id = "${task.id}" class = "fas fa-pencil editTaskBtn"></i> -->
            <i data-id = "${task.id}" class = "fas fa-trash deleteTaskBtn"></i>
            </li>`;
        }
        
    }else{
        taskList.innerHTML = "";
        showCompleted.style.background = "#6741D9";
        showUnCompleted.style.background = "#fff";
        const filteredTasks = tasks.filter(task => task.isCompleted);
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `<p class = "task-text">Hiç tamamlanmış görev yok</p>`;
            return;
        }
    
        for (const task of filteredTasks) {
            taskList.innerHTML += `
            <li class = "taskItem">
             <span data-id = "${task.id}" contenteditable = "true" class="taskTitle">${task.title} </span>
           <i  data-id = "${task.id}" id= "unMarkCompleteBtn" class = "fas fa-circle-xmark markCompleteBtn "></i>
            </li>`;
        }
        
    }

   
    // completedTaskList.innerHTML = "";
    // for (const task of tasks.filter(task => task.isCompleted)) {
    //     completedTaskList.innerHTML += `
    //     <li> 
    //         <del>${task.title}</del>
    //         <button data-id = "${task.id}" class = "markCompleteBtn">Tamamlanmadı olarak işaretle</button>
    //     </li>`;
    // }

    bindElements();
}

function bindElements(){
    const markCompleteBtns = document.querySelectorAll(".markCompleteBtn");
    // const editTaskBtns = document.querySelectorAll(".editTaskBtn");
    const deleteTaskBtns = document.querySelectorAll(".deleteTaskBtn");
    // const markUnCompleteBtns = document.querySelectorAll(".markUnCompleteBtn");
    const taskTitles = document.querySelectorAll(".taskTitle");
    for (const taskTitle of taskTitles) {
        taskTitle.addEventListener("focusout", function (e){
            findedTask = tasks.find(task => task.id == e.target.dataset.id);
            findedTask.title = e.target.textContent;
            localStorage.tasks = JSON.stringify(tasks);
            
        })
        
    }
    for (const markCompleteBtn of markCompleteBtns) {
        markCompleteBtn.addEventListener("click", function(e){
            
            const findedTask = tasks.find(task => task.id == e.target.dataset.id);
            // findedTask.isCompleted = true;
            if (findedTask.isCompleted) {
                findedTask.isCompleted = false;
                localStorage.tasks = JSON.stringify(tasks);
                render("completed");
            }else {
                findedTask.isCompleted = true;
                localStorage.tasks = JSON.stringify(tasks);
                render();
            }

        })
    }

    // for (const editTaskBtn of editTaskBtns) {
    //     editTaskBtn.addEventListener("click", function(e){
    //        const newTaskName = prompt("Görevi ne ile güncellemek istiyorunuz? "); 
    //        const findedTask = tasks.find(task => task.id == e.target.dataset.id);
    //        findedTask.title = newTaskName;
    //        localStorage.tasks = JSON.stringify(tasks);
    //        if (findedTask.isCompleted) {
    //             render("completed");
    //        }else{
    //         render();
    //        }
    //     })
    // }
    for (const deleteTaskBtn of deleteTaskBtns) {
        deleteTaskBtn.addEventListener("click", function(e){
            deleteTask(e.target.dataset.id);
        })
    }
}
//     for (const markUnCompleteBtn of markUnCompleteBtns) {
//         markUnCompleteBtn.addEventListener("click", function(e){
            
//             const findedTask = tasks.find(task => task.id == e.target.dataset.id);
//             findedTask.isCompleted = false;

//             render();
//         })
//     }
// }

showCompleted.addEventListener("click", function() {
   render("completed")
});

showUnCompleted.addEventListener("click", function(){
   render();
});


render();

function deleteTask(id){

    if (confirm("Silmek istediğinize emin misiniz?")) {
        const findedTask = tasks.find(task => task.id == id);
        const taskIndex = tasks.findIndex(task => task.id == id);
        tasks.splice(taskIndex,1);
        localStorage.tasks = JSON.stringify(tasks);
        findedTask.isCompleted ? render("completed") : render();
    }
    
}
newTaskBtn.addEventListener("click",function(e){
    newTaskBtn.style.display = "none";
    newTaskForm.style.display = "block";
    newTaskInput.focus();

});
 newTaskForm.addEventListener("submit", function(e){
        e.preventDefault();
        console.log(e.target);
        // const formData = new FormData(e.target);
        // const formObj = Object.fromEntries(formData);
        
        const formObj = Object.fromEntries(new FormData(e.target));
        console.log(formObj);
        
        let newId = 1;
        if (tasks[tasks.length - 1]) {
            newId = tasks[tasks.length - 1].id + 1;
        }

        const newTask ={
            id: newId,
            title: formObj.task,
            isCompleted: false,
        };
        
        tasks.push(newTask);

    localStorage.tasks = JSON.stringify(tasks);
        
        e.target.reset();
        newTaskBtn.style.display = "block";
        newTaskForm.style.display = "none";

        render();
    });