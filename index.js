const submitBtn = document.querySelector(".submit-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("section ul");
const main = document.querySelector("main");
const section = document.querySelector("section");
const dataTime = document.querySelector("#date-time");
const greyBtn = document.querySelector(".lightgrey");
const whiteBtn = document.querySelector(".white");
const blackBtn = document.querySelector(".black");

// Load todos
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

submitBtn.addEventListener("click", () => {
  let inputValue = inputEl.value.trim();
  if (!inputValue) return;

  todos.push({ text: inputValue, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
  inputEl.value = "";
});

// ✅ One event listener (handles both tick & trash)
ulEl.addEventListener("click", (e) => {

  // ✅ Delete todo
  if (e.target.closest(".trash")) {
    let index = e.target.closest(".trash").dataset.index;
    let li = e.target.closest("li"); // get the list item

    li.classList.add("fallanim"); // add fall animation

    li.addEventListener("animationend", () => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });
  }

  // ✅ Toggle complete
  if (e.target.closest(".tick")) {
    let index = e.target.closest(".tick").dataset.index;
    todos[index].completed = !todos[index].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
});

function renderTodos() {
  ulEl.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    ulEl.innerHTML += `
      <li class="${todos[i].completed ? "done" : ""}">
      ${todos[i].text}
      <button class="tick" data-index="${i}"><svg fill="#ffffff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512"
      xml:space="preserve">
      <polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 " />
      </svg></button>
      <button class="trash" data-index="${i}"><svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 100 100"
      enable-background="new 0 0 100 100" xml:space="preserve">
      <g><g><path d="M75.834,33.388h-51.67c-1.311,0-2.375,1.058-2.375,2.373v49.887c0,1.314,1.064,2.377,2.375,2.377h51.67
      c1.314,0,2.375-1.063,2.375-2.377V35.76C78.209,34.446,77.148,33.388,75.834,33.388z" />
      </g><g><path d="M79.004,17.352H59.402v-2.999c0-1.314-1.061-2.377-2.373-2.377H42.971c-1.312,0-2.375,1.063-2.375,2.377v2.999H20.996
      c-1.312,0-2.375,1.059-2.375,2.373v6.932c0,1.314,1.063,2.373,2.375,2.373h58.008c1.314,0,2.375-1.059,2.375-2.373v-6.932
      C81.379,18.41,80.318,17.352,79.004,17.352z" /></g></g>
      </svg></button>
      </li>
      `;
  }


}


function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();
  dataTime.innerText = `${date} -- ${time}`;
}

updateClock();

setInterval(updateClock, 1000);

whiteBtn.addEventListener("click", () => {
  main.classList.add("white-theme");
  section.style.color = "black";
  main.classList.remove("grey-theme");
  main.classList.remove("black-theme");
  inputEl.style.color = "black";
  submitBtn.classList.add("btn-white");
  ulEl.classList.add("white-color");
  
  localStorage.setItem("theme", "white");
})

greyBtn.addEventListener("click", () => {
  main.classList.add("grey-theme");
  section.style.color = "white";
  section.classList.add("grey-color");
  main.classList.remove("black-theme");
  main.classList.remove("white-theme");
  
  localStorage.setItem("theme", "grey");
})

blackBtn.addEventListener("click", () => {
  main.classList.add("black-theme");
  section.style.color = "white";
  main.classList.remove("grey-theme");
  main.classList.remove("white-theme");

  localStorage.setItem("theme", "black");
})



window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "white") {
    main.classList.add("white-theme");
    section.style.color = "black";
    inputEl.style.color = "black";
    submitBtn.classList.add("btn-white");
    ulEl.classList.add("white-color");
  }

  if (savedTheme === "grey") {
    main.classList.add("grey-theme");
    section.style.color = "white";
    section.classList.add("grey-color");
  }

  if (savedTheme === "black") {
    main.classList.add("black-theme");
    section.style.color = "white";
  }
});



// tickBtn.addEventListener("click", () => {
//     // Tick (Complete Task)
//     if (e.target.closest(".tick")) {
//       let index = e.target.closest(".tick").dataset.index;
//       todos[index].completed = !todos[index].completed; // toggle complete
//       localStorage.setItem("todos", JSON.stringify(todos));
//       renderTodos();
//     }

//   })