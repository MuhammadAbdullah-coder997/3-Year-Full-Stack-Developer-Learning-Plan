const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = [];

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  
  if (text === "") return;

  const todo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(todo);
  input.value = "";
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = ""; // Clear current list

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.style.background = "transparent";
    delBtn.style.border = "none";
    delBtn.style.color = "red";
    delBtn.style.cursor = "pointer";

    delBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      renderTodos();
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}
