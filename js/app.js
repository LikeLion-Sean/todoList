// CODE Explained Channel

// Select the Elements
const clear = document.querySelector(".clear");
const yearElement = document.getElementById("year");
const dayElement = document.getElementById("day");
const monthElement = document.getElementById("month");
const numericElement = document.getElementById("numeric");
const list = document.getElementById("list");

// Class Names
const CHECK = "fa-check-circle-o";
const UNCHECK = "fa-circle-o";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST = []; 
let id = 0;

// get Item from localStorage
let data = localStorage.getItem("TODO");
 //check if data is not empty
 if(data){
   LIST = JSON.parse(data);
   id = LIST.length; // set the id  to the last one in the list
   loadList(LIST); // load the list to the user interface
 } else {
   // if data isn't empty
   LIST = [];
   id = 0;
 }

// load items to the user's interface
function loadList(array){
  array.forEach(function(item){
    addTodo(item.name, item.id, item.done, item.trash)
  });
};

// clear the local storage. Whole clear
clear.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
  console.log(location);
})

// Show todays date
const year = { year: "numeric" };
const day = { weekday: "long" };
const month = { month: "short" };
const numeric = { day: "numeric" };
const today = new Date();

yearElement.innerHTML = today.toLocaleDateString('en-US', year);
dayElement.innerHTML = today.toLocaleDateString('en-US', day);
monthElement.innerHTML = today.toLocaleDateString('en-US', month);
numericElement.innerHTML = today.toLocaleDateString('en-US', numeric);

// add to function
function addTodo(todo, id, done, trash){ // done && trash는 boolean
  if(trash){ return ;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
  
    const item = `
            <div class=item>
              <i class="fa ${DONE}" job="complete" id=${id}></i>
              <span class="text ${LINE}">${todo}</span>
              <i class="fa fa-trash-o" job="delete" id=${id}></i>
            </div> `;

    const position = "afterbegin";
    list.insertAdjacentHTML(position, item)
  };

document.addEventListener('keyup', function(){
  if(event.keyCode === 13){ // keyCode 13 means "Enter"
    const todo = input.value; 

    // if the input isn't empty
    if(todo) {
      addTodo(todo, id, false, false);

      LIST.push({
        name: todo,
        id:id,
        done:false,
        trash: false  
      }) ;
      // add Item to localStorage(this code must be added where the LIST array is updated)
      localStorage.setItem('TODO', JSON.stringify(LIST));
      id ++;  
    }
    input.value = "";
  }
});

// console.log(LIST);

// complete to do
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
};

// remove to do
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true
}

// target the items created dynamically

list.addEventListener('click', function(event){
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value;

  if(elementJob == "complete") {
    completeTodo(element);
  } else {
    removeTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST))
});





