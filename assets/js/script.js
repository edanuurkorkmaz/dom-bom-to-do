
const tasks = [];
// const completedTask = [];

if (localStorage.tasks) {
    const storageTasks = JSON.parse(localStorage.tasks);
    tasks = storageTasks;
}

taskSaveBtn.addEventListener("click",function(){
    console.log(taskInput.value);

    let newId = 1;
    if (tasks[tasks.length - 1]) {
        newId = tasks[tasks.length - 1].id + 1;
    }

    const newTask ={
        id: newId,
        title: taskInput.value,
        isCompleted: false,
    };
    
    tasks.push(newTask);

    localStorage.tasks = JSON.stringify(tasks);

    taskInput.value = "";

    render();
});

function render(type = "uncompleted"){
    taskList.innerHTML = "";
   
    if (type === "uncompleted") {
        showUnCompleted.style.background = "#638CB6";
        showCompleted.style.background = "transparent";
        const filteredTasks = tasks.filter(task => !task.isCompleted);
        if (filteredTasks.length === 0) {
            taskList.innerHTML = "Tamamlanmayan görev yok";
            return;
        }
    
        for (const task of filteredTasks) {
            taskList.innerHTML += `
            <li>
            ${task.title} 
            <button data-id = "${task.id}" class= "editTaskBtn">Düzenle</button>
            <button data-id = "${task.id}" class= "markCompleteBtn"> Tamamlandı olarak işaretle </button>
            </li>`;
        }
        
    }else{
        taskList.innerHTML = "";
        showCompleted.style.background = "#638CB6";
        showUnCompleted.style.background = "transparent";
        const filteredTasks = tasks.filter(task => task.isCompleted);
        if (filteredTasks.length === 0) {
            taskList.innerHTML = "Hiç tamamlanmış görev yok";
            return;
        }
    
        for (const task of filteredTasks) {
            taskList.innerHTML += `
            <li>
            ${task.title} 
            <button data-id = "${task.id}" class= "markCompleteBtn"> Tamamlanmadı olarak işaretle </button>
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
    const editTaskBtns = document.querySelectorAll(".editTaskBtn");
    // const markUnCompleteBtns = document.querySelectorAll(".markUnCompleteBtn");
    for (const markCompleteBtn of markCompleteBtns) {
        markCompleteBtn.addEventListener("click", function(e){
            
            const findedTask = tasks.find(task => task.id == e.target.dataset.id);
            // findedTask.isCompleted = true;
            if (findedTask.isCompleted) {
                findedTask.isCompleted = false;
                render("completed");
            }else {
                findedTask.isCompleted = true;
                render();
            }

        })
    }

    for (const editTaskBtn of editTaskBtns) {
        editTaskBtn.addEventListener("click", function(e){
           const newTaskName = prompt("Görevi ne ile güncellemek istiyorunuz? "); 
           const findedTask = tasks.find(task => task.id == e.target.dataset.id);
           findedTask.title = newTaskName;
           if (findedTask.isCompleted) {
                render("completed");
           }else{
            render();
           }
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