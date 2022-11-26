
$(document).ready(function(){
    const image = document.querySelector('#image');  //get the image information
    const task_title = document.querySelector('#task_title'); //get the title information
    const task_type = document.querySelector('#task_type'); //get the type information
    const task_desc = document.querySelector('#task_desc'); //get the description information
    const todoItemsList = document.querySelector('.todo-items');  //get the ul in the main.html file
  
    // array which stores every todos
    let todos = [];
    function clear_form(){  //function to clear the form inputs
      task_desc.value = '';
      image.value = '';
      task_title.value = '';
      task_type.value = '';
    }
    document.getElementById("close").onclick = function () {  //if the button close is clicked
      clear_form();
    };
  
    document.getElementById("submit").onclick = function () {  //if the button submit is clicked
      checkImage(image.value);  //check if the image url-input is valid or not
      event.preventDefault();  // prevent the page from reloading when submitting the form
  
    };
    function checkImage(url) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.send();
      request.onload = function() {
      status = request.status;
      if (request.status == 200) //if(statusText == OK) - if the image exists
      {
      addTask();  // call addTask function with input box current value
      }
      else {
        alert("image doesn't exist");
        clear_form();
      }
    }
  }
  
    function addTask(){   //function to create tasks
      if (image.value!="" && task_title.value!="" && task_type.value!="" && task_desc.value!="") {  //if every blank is filled
        const todo = {
          id: Date.now(),
          title: task_title.value,
          img: image.value,
          type: task_type.value,
          desc: task_desc.value
        }
        if (todos.length!=3) {  //can have only 3 tasks at one time
          todos.push(todo);
          addToLocalStorage(todos);
        }
        else {
          alert("You can only have 3 tasks at one time!");
        }
  
      }
      else {
        alert("Please fill every blanks.");
      }
      clear_form();
    };
  
      function renderTodos(todos){  //function to render the tasks
        todoItemsList.innerHTML = '';
  
        // run through each item inside todos
        todos.forEach(function(item){
          var div = document.createElement('div');  //create the div for each task inside todos array
          div.setAttribute('class', 'item');
          div.setAttribute('data-key', item.id);
               div.style.backgroundColor = "white";    //change the style of the div
               div.style.height = "380px";
               div.style.width = "300px";
               div.style.textAlign="center";
               div.style.paddingTop= "10px";
  
               // modify the inside of the div and put the information and style
               div.innerHTML = `
      <button style="float:right;background-color:white;border:2px solid red;font-size:18px" onmouseover="this.style='float:right;font-size:18px;background-color:red;border:2px solid red'" onmouseout="this.style='float:right;font-size:18px;background-color:white;border:2px solid red'" class="delete-button"><i class="fa fa-trash" aria-hidden="true" style="color:red;font-size:25px" onmouseover="this.style='color:white;font-size:25px'"onmouseout="this.style='color:red;font-size:25px'" ></i></button>
               <br>
               <img style="padding-top:5px;width:300px;height:220px" src="${item.img}" alt="">
               <h4> ${item.title} </h4>
               <p>${item.desc}</p>
               <div class="" style="background-color:#0098EC; width:80px;color:white;border-radius:10px;margin:auto">
                 ${item.type}
               </div>
               <br style="padding-top:10px">
               `;
               document.getElementsByClassName('todo-items')[0].appendChild(div);
        });
      }
      function addToLocalStorage(todos) {
        // convert the array to string then store it.
        localStorage.setItem('todos', JSON.stringify(todos));
        // render them to screen
        renderTodos(todos);
      }
      function getFromLocalStorage() {
        const reference = localStorage.getItem('todos');
        // if reference exists
        if (reference) {
          // converts back to array and store it in todos array
          todos = JSON.parse(reference);
          renderTodos(todos);
        }
      }
      function deleteTodo(id) {
        // filters out the <li> with the id and updates the todos array
        todos = todos.filter(function(item) {
          return item.id != id;
        });
  
        // update the localStorage
        addToLocalStorage(todos);
      }
      getFromLocalStorage();  // get all from the local storage
  
      todoItemsList.addEventListener('click', function(event) {
  
        // check if its a delete-button
        if (event.target.classList.contains('delete-button')) {
          // get id from data-key attribute's value of parent <li> where the delete-button is present
          deleteTodo(event.target.parentElement.getAttribute('data-key'));
        }
      });
  
  
  });
  