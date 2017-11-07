"use strict";

var hacker = "Hello i am a hacker because i write with green text on a black background and i just hacked your system and deleted all your files.";
var helloWorld = "Hello i am going to teach you how to write your first hello World Program in JavaScript.\n console.log('Hello World'); \n and that Is how you Write a Hello World program in JavaScript...Have Fun!";


const main = document.querySelector(".main");

const noteList = document.querySelector(".note-list");
const saveBtn = document.querySelector("#save");
const addBtn = document.querySelector(".addBtn");
const editView = document.querySelector(".editView");

var modal;
var closeBtn;

var modalHeader;
var modalBody;
var modalFooter;

var pos = 0;
var speed = 150;
var savedNotes = [];


addBtn.addEventListener("click", () => {
    addBtn.style.opacity = "0";
    editView.style.display = "block";
});



init();


function init() {
    noteList.innerHTML = "";
    if (localStorage.getItem("notes") !== null) {
        savedNotes = JSON.parse(localStorage.getItem("notes"));

        for (var i = 0; i < savedNotes.length; i++) {
            var savedNoteId = savedNotes[i].noteId;
            var savedTitle = savedNotes[i].noteTitle;

            var savedText = savedNotes[i].noteTxt;
            var savedFontSize = savedNotes[i].fSize;
            var savedFontFamily = savedNotes[i].fFamily;
            var savedBgColor = savedNotes[i].backColor;
            var savedTxtColor = savedNotes[i].textColor;
            var savedHeaderBg = savedNotes[i].headerBg;

            var noteFace = `<li class = 'card col l4 m4 s12 blue-grey'><a class='white-text' onclick = openNote("${savedNoteId}")> ${savedTitle}</a><span onclick = deleteNote("${savedNoteId}")> &times;</span></li>`;

            // var noteFace = "<li class ='card col l4 m4 s12 blue-grey white-text' onclick = openNote("+"'"+savedNoteId+"'"+")>"+savedTitle+"<span onclick = deleteNote("+"'"+savedNoteId+"'"+")> &times;</span></li>";

            noteList.innerHTML += noteFace;

            buildNote(savedTitle, savedText, savedFontSize, savedFontFamily, savedBgColor, savedTxtColor, savedHeaderBg);



        }
    }
}





function buildNote(noteTitle, savedText, savedFontSize, savedFontFamily, savedBgColor, savedTxtColor, savedHeaderBg) {

    let aModal = `<div id = "myModal" class="modula">
    <div class="modal-content">
    <header class = "modal-header blue-grey">
    ${noteTitle} <span class="closeBtn">&times;</span>
    </header>
    <section class = "modal-body black-text">
    
    </section>
       <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue">CTRL</a>
        <ul>
          <li><a class="btn-floating btn-large orange" onclick="">pause</a></li>
          <li><a class="btn-floating btn-large grey" onclick="slow()">slow</a></li>
          <li><a class="btn-floating btn-large lime" onclick="fast()">fast</a></li>
          <li><a class="btn-floating btn-large blue-grey"onclick="editNote()">edit</a></li>
        </ul>
      </div>
    </div>
    </div>`;
    main.insertAdjacentHTML("beforeEnd", aModal);


    modal = document.getElementById("myModal");
    const closeBtn = document.querySelector(".closeBtn");

    modalHeader = modal.querySelector(".modal-header");
    modalBody = modal.querySelector(".modal-body");
    modalFooter = modal.querySelector(".modal-footer");

    modal.style.fontSize = savedFontSize + "px !important";
    modal.style.fontFamily = savedFontFamily + " !important";
    modal.style.backgroundColor = savedBgColor + " !important";
    modal.style.color = savedTxtColor + " !important";
    modalHeader.style.backgroundColor = savedHeaderBg + " !important";

    closeBtn.addEventListener("click", closeNote);
}



function addNote() {
    console.log("Add a Note");
    var theTitle = document.querySelector("#title").value;
    var theTxt = document.querySelector("#note").value;
    var theFontSize = document.querySelector("#font-size").value;
    var theBgColor = document.querySelector("#bg-color").value;
    var theTxtColor = document.querySelector("#txt-color").value;
    var theFontFamily = document.querySelector("#font-family").value;
    var theHeaderBg = document.querySelector("#hbg-color").value;

    
    if (theTitle == "") {
        theTitle = "Untitled";
    }
    var uniqueId;
    
    if (savedNotes != "") {
        let id;
        let charUnique;
        do {
            charUnique = Math.ceil(Math.random() * Math.PI);
            id = generateId(theTitle + charUnique);
            console.log(id);
        }
        while (checkUnique(id) != true);
        uniqueId = id;

    } else {
        uniqueId = generateId(theTitle);
    }

    if (theTxt != "") {
        clearInputs();
        let note = {
            noteId: uniqueId,
            noteTitle: theTitle,
            noteTxt: theTxt,
            backColor: theBgColor,
            textColor: theTxtColor,
            fSize: theFontSize,
            fFamily: theFontFamily,
            headerBg: theHeaderBg
        };

        addBtn.style.opacity = "1";
        editView.style.display = "none";
        
        save(note);
        init();
    } else {
        alert("You cant save a blank Note");
    }

}



function openNote(theId) {
    pos = 0;
    const myNote = savedNotes.find(note => (note.noteId === theId));
    try {
        playNote(myNote.noteTxt);
        modal.style.display = "block";
    } catch (e) {
        console.log(e)
    }

}




function closeNote() {
    modal.style.display = "none";
    modalBody.innerHTML = "";
    speed = 150;
    clearInterval(writeNote);
}



function write(text) {
    if (pos < text.length) {
        modalBody.innerHTML += (text.charAt(pos));
        pos++;
    }
}



var writeNote;

function playNote(words) {
    writeNote = setInterval(() => {
        write(words);
    }, speed);
}

function pauseNote() {
    clearInterval(writeNote);
}

function slow() {
    speed -= 50;
}

function fast() {
    speed += 50;
}

function deleteNote(theId) {

    var index = savedNotes.findIndex(id => (id.noteId == theId));
    const newNotes = [
        ...savedNotes.slice(0, index),
        ...savedNotes.slice(index + 1)
    ]
    localStorage.setItem("notes", JSON.stringify(newNotes));
    modal.style.display = "none";
    init();
}

function editNote() {

}

function save(item) {
    let allNotes = [];
    if (localStorage.getItem("notes") === null) {
        allNotes.push(item);
        localStorage.setItem("notes", JSON.stringify(allNotes));
    } else {
        let notes = JSON.parse(localStorage.getItem("notes"));
        notes.push(item);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}

function clearInputs() {
    document.querySelector("#title").value = "";
    document.querySelector("#note").value = "";
    document.querySelector("#font-size").value = 50;
    document.querySelector("#bg-color").value = "#000000";
    document.querySelector("#txt-color").value = "#000000";
    document.querySelector("#font-family").value = "0";
    document.querySelector("#hbg-color").value = "#000000";
}

/*Fisher-yates Algorithm*/
function generateId(textId) {
    let textArr = textId.trim().replace(" ", "").split("");
    for (let i = 0; i < textArr.length; i++) {
        let rand = Math.ceil(Math.random() * textId.length - 1);
        let holder = textArr[i];
        textArr[i] = textArr[rand];
        textArr[rand] = holder;

    }

    if (textArr.length >= 6) {
        return textArr.splice(0, 5).join("").toLowerCase().replace(" ", "");
    }
    return textArr.join("").toLowerCase().replace(" ", "");
}

function checkUnique(password) {
    let isUnique = savedNotes.some(Id => (Id.noteId == password));
    return !isUnique;
}
