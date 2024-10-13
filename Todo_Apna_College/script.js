let addBtn = document.getElementById("addBtn");
let pList = document.getElementById("parentList");

// Basic Todo List

// Check whether element present or note before removing it
// Message if not todo
// Remove Message if there is todo
// Edit functionallity
// Edit Saving Functionallity

// Make it save in localStorage


const addChapter = (e) => {

    if(pList.children[0].className === "emptyMsg") {
        pList.children[0].remove();
    }

    let currentBtn = e.currentTarget;
    let currentInput = currentBtn.previousElementSibling;

    let newLi = document.createElement('li');
    // newLi.classList.add('list-group-item');
    newLi.className = "list-group-item d-flex justify-content-center";
    newLi.innerHTML = `<h4 class="flex-grow-1">${currentInput.value} </h4>
                        <button class="btn btn-warning mx-2"> Edit</button> 
                        <button class="btn btn-danger" onclick="removeChapter(this)"> Remove</button> `;

    pList.appendChild(newLi);

}

addBtn.addEventListener('click', addChapter);

function removeChapter(currentElement) {
    currentElement.parentElement.remove(); 

    if(pList.children.length <= 0) {
       let newEmptyMsg = document.createElement("h3");

       newEmptyMsg.classList.add("emptyMsg");
       newEmptyMsg.textContent = "Nothing is here. Please ";
       pList.appendChild(newEmptyMsg);
    }
}

function editChapter(currentElement) {

    if(currentElement.textContent == "Done") {
        currentElement.textContent = "Edit";
        let currChapterName = currentElement.previousElementSibling.value;
        let currHeading = document.createElement('h3');
        currHeading.className = 'flex-grow-1';
        currHeading.textContent = currChapterName;
        currentElement.parentElement.replaceChild(currHeading, currentElement.previousElementSibling);

    }
    else {
        currentElement.textContent = "Done";
        let currentChapter = currentElement.previousElementSibling.textContent;
        let currInput = document.createElement('input');
        currInput.type = "text";
        currInput.placeHolder = "Chapter Name";
        currInput.className = 'form-control';
        currInput.value = currentChapter;

        currentElement.parentElement.replaceChild(currInput, currentElement.previousElementSibling);
    }
}

