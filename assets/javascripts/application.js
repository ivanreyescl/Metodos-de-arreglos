const addTaskBtn = document.getElementById('addTaskBtn')
const newTaskInput = document.getElementById('newTask')
const taskList = document.getElementById('taskList')
const tasksCreated = document.querySelector('.tasks_created')
const tasksDone = document.querySelector('.tasks_done')
let taskCounter = 0
let completedTasks = 0
let tasksArray = [
    { id: 1, name: 'Armar carta Gantt', completed: false },
    { id: 2, name: 'Terminar Desafio', completed: true },
    { id: 3, name: 'Actualizar Calendario semanal', completed: false }
]

taskCounter = tasksArray.length
completedTasks = tasksArray.filter(task => task.completed).length

function renderTask(task) {
    const taskRow = document.createElement('tr')
    const taskId = document.createElement('td')
    const taskName = document.createElement('td')
    const taskActions = document.createElement('td')
    const completeBtn = document.createElement('button')

    taskRow.setAttribute('data-id', task.id)
    taskId.textContent = task.id
    taskName.textContent = task.name

    if (task.completed) {
        taskName.classList.add('text-decoration-line-through')
        taskId.classList.add('text-decoration-line-through')
    }

    completeBtn.classList.add('btn', task.completed ? 'btn-warning' : 'btn-success', 'btn-sm')
    completeBtn.innerHTML = task.completed ? '<i class="fas fa-rotate-left"></i>' : '<i class="fas fa-check"></i>'

    completeBtn.addEventListener('click', () => {
        const taskIndex = tasksArray.findIndex(t => t.id === task.id)
        if (taskIndex !== -1) {
            tasksArray[taskIndex].completed = !tasksArray[taskIndex].completed

            taskName.classList.toggle('text-decoration-line-through')
            taskId.classList.toggle('text-decoration-line-through')

            if (tasksArray[taskIndex].completed) {
                completeBtn.classList.replace('btn-success', 'btn-warning')
                completeBtn.innerHTML = '<i class="fas fa-rotate-left"></i>'
                completedTasks++
            } else {
                completeBtn.classList.replace('btn-warning', 'btn-success')
                completeBtn.innerHTML = '<i class="fas fa-check"></i>'
                completedTasks--
            }
            tasksDone.textContent = completedTasks
        }
    })

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm')
    deleteBtn.innerHTML = '<i class="fas fa-x danger"></i>'

    deleteBtn.addEventListener('click', () => {
        const taskIndex = tasksArray.findIndex(t => t.id === task.id)
        if (taskIndex !== -1) {
            tasksArray.splice(taskIndex, 1)
            taskRow.remove()
            if (task.completed) completedTasks--
            taskCounter--

            tasksDone.textContent = completedTasks
            tasksCreated.textContent = taskCounter
        }
    })

    taskActions.appendChild(completeBtn)
    taskActions.appendChild(deleteBtn)

    taskRow.appendChild(taskId)
    taskRow.appendChild(taskName)
    taskRow.appendChild(taskActions)
    taskList.appendChild(taskRow)
}

tasksArray.forEach(task => renderTask(task))
tasksCreated.textContent = taskCounter
tasksDone.textContent = completedTasks

addTaskBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim()
    if (taskText === '') {
        alert('Debe ingresar un nombre a la tarea')
    } else {
        taskCounter++

        const task = {
            id: taskCounter,
            name: taskText,
            completed: false
        }
        tasksArray.push(task)
        renderTask(task)

        tasksCreated.textContent = taskCounter
        newTaskInput.value = ''
    }
})
