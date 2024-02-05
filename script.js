let container = document.querySelector(".showcurd");
let deleteResponseBtn=document.querySelector(".deleteresponse");
console.log(deleteResponseBtn);
let data = [];

function displaykeyValue() {
  const keyInput = document.getElementById("insertKey");
  const valueInput = document.getElementById("insertValue");

  const key = keyInput.value;
  const value = valueInput.value;

  if (key === "" || value === "") {
    alert("MUST ENTER VALUE");
    return;
  }

  localStorage.setItem(key, value);
  data.push({ key, value });

  displayCurd();

  document.querySelector(".head").style.display = "none";
  document.querySelector(".record").style.display = "flex";

}



function reset() {
  document.getElementById("insertKey").value = "";
  document.getElementById("insertValue").value = "";
  document.querySelector("#getKey").value = "";
  document.querySelector("#deleteKey").value = "";
}

function displayCurd() {
  const container = document.querySelector(".showcurd");
  container.innerHTML = "";

  data.forEach(({ key, value }) => {
    const keyContainer = document.createElement("div");
    keyContainer.classList.add("display-container");

    const keyElement = document.createElement("h4");
    keyElement.textContent = "Key: " + key;

    const valueElement = document.createElement("h4");
    valueElement.textContent = "Value: " + value;

    keyContainer.appendChild(keyElement);
    keyContainer.appendChild(valueElement);

    const hr = document.createElement("hr");

    container.appendChild(keyContainer);
    container.appendChild(hr);
  });
}

function deleteKey(){
  const delkey=document.querySelector("#deleteKey");
  const delkeyBtn=document.querySelector("#deletebtn");
  delkeyBtn.addEventListener("click",()=>{
    let prtKey=delkey.value.trim();
    console.log(prtKey);
    if(prtKey !==''){
      localStorage.removeItem(prtKey);
      data.filter((a)=>a.key !==prtKey);
      delkey.value='';
      location.reload();
    }
  })
}


const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  displaykeyValue();
  reset();
  deletebtn();
  deleteKey();
  displayCurd();
  readData();
});

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    data.push({ key, value });
  }
  displayCurd();
  deletebtn(); 
  deleteKey();
  readData();
});

function deletebtn(){
  if(data.length>0){
    deleteResponseBtn.style.display="block";

    deleteResponseBtn.addEventListener("click",()=>{
        localStorage.clear();
        data.length=0;
        displayCurd();
        deleteResponseBtn.style.display = "none";

        if(localStorage.length==0){
          document.querySelector(".head").style.display = "flex";
          document.querySelector(".record").style.display = "none";
        }
      }
    )
  }
}

function readData(){
  const readbtn=document.querySelector("#readbtn");
  const readkey=document.querySelector("#getKey");
  readbtn.addEventListener("click",()=>{
    const readVal=readkey.value;
    const h4=document.createElement("h4");
    const dataVal=localStorage.getItem(readVal);

    h4.innerHTML="Data Value of requested KEY is :"+ " " +dataVal;
    const cont=document.querySelector(".displayRead");
    cont.innerHTML='';
    cont.appendChild(h4);
  })

  readkey.value=''
}
