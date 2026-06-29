const input=document.getElementById("taskInput");

const addBtn=document.getElementById("addBtn");

const list=document.getElementById("taskList");

const search=document.getElementById("search");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

document.getElementById("date").innerHTML=new Date().toDateString();

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function stats(){

document.getElementById("total").innerHTML=tasks.length;

document.getElementById("completed").innerHTML=tasks.filter(t=>t.done).length;

document.getElementById("pending").innerHTML=tasks.filter(t=>!t.done).length;

}

function display(){

list.innerHTML="";

let keyword=search.value.toLowerCase();

tasks.forEach((task,index)=>{

if(task.name.toLowerCase().includes(keyword)){

let li=document.createElement("li");

li.className="task";

li.innerHTML=`

<div class="left">

<input type="checkbox" ${task.done?"checked":""}

onclick="toggle(${index})">

<span class="${task.done?"completed":""}">${task.name}</span>

</div>

<div class="icons">

<i class="fa-solid fa-trash delete"

onclick="removeTask(${index})"></i>

</div>

`;

list.appendChild(li);

}

});

stats();

save();

}

addBtn.onclick=()=>{

if(input.value.trim()=="") return;

tasks.push({

name:input.value,

done:false

});

input.value="";

display();

};

input.addEventListener("keypress",function(e){

if(e.key==="Enter") addBtn.click();

});

function toggle(index){

tasks[index].done=!tasks[index].done;

display();

}

function removeTask(index){

tasks.splice(index,1);

display();

}

search.onkeyup=display;

display();