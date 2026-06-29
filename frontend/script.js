const API_URL = "http://127.0.0.1:8000/tasks";

window.onload = () => {
    loadTasks();
};

async function loadTasks() {

    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        let priorityClass = "";

        if(task.priority === "High"){
            priorityClass = "high";
        }
        else if(task.priority === "Medium"){
            priorityClass = "medium";
        }
        else{
            priorityClass = "low";
        }

        taskList.innerHTML += `
        <div class="task">

            <h3>${task.title}</h3>

            <p>${task.description ?? ""}</p>

            <p>
                <strong>Due:</strong>
                ${task.due_date ?? "No Due Date"}
            </p>

            <span class="priority ${priorityClass}">
                ${task.priority}
            </span>

            <span class="status">
                ${task.status}
            </span>

            <div class="actions">

                <button
                    class="edit"
                    onclick="editTask(${task.id})">
                     Edit
                </button>

                <button
                    class="delete"
                    onclick="deleteTask(${task.id})">
                     Delete
                </button>

            </div>

        </div>
        `;
    });

}

async function addTask(){

    const task = {

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        priority: document.getElementById("priority").value,

        status: document.getElementById("status").value,

        due_date: document.getElementById("due_date").value || null

    };

    if(task.title === ""){

        alert("Please enter a title");

        return;
    }

    await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(task)

    });

    clearForm();

    loadTasks();

}


async function deleteTask(id){

    if(confirm("Delete this task?")){

        await fetch(`${API_URL}/${id}`,{

            method:"DELETE"

        });

        loadTasks();

    }

}


async function editTask(id){

    const response = await fetch(`${API_URL}/${id}`);

    const task = await response.json();

    document.getElementById("title").value = task.title;

    document.getElementById("description").value = task.description;

    document.getElementById("priority").value = task.priority;

    document.getElementById("status").value = task.status;

    document.getElementById("due_date").value = task.due_date;

    const btn = document.querySelector("button");

    btn.innerText = "Update Task";

    btn.onclick = async function(){

        const updatedTask = {

            title: document.getElementById("title").value,

            description: document.getElementById("description").value,

            priority: document.getElementById("priority").value,

            status: document.getElementById("status").value,

            due_date: document.getElementById("due_date").value || null

        };

        await fetch(`${API_URL}/${id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(updatedTask)

        });

        btn.innerText = "💖 Add Task";

        btn.onclick = addTask;

        clearForm();

        loadTasks();

    }

}


function clearForm(){

    document.getElementById("title").value="";

    document.getElementById("description").value="";

    document.getElementById("priority").value="Medium";

    document.getElementById("status").value="Todo";

    document.getElementById("due_date").value="";

}