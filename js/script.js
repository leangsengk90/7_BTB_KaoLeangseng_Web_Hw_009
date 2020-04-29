let myList = new Array();
let id = 1;
let count, oldId;
let btnAdd = document.getElementById('btn-add');
let btnUpdate = document.getElementById('btn-update');

// CLASS: PERSON;
class Person {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
    }
    showPerson() {
        console.log(this.id + "/" + this.name + "/" + this.phone);
    }
}

//FUNCTION: INSERT PERSON TO TABLE;
function addPerson() {
    let myTable = document.getElementsByTagName('table')[0];
    let newRow = myTable.insertRow(myTable.rows.length);

    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let smsName = document.getElementById('sms-name');
    let smsPhone = document.getElementById('sms-phone');
    //REGEX;
    let namePattern = /[^a-zA-Z\s]/gi;
    let phonePattern = /[^0-9]/gi;

    if (name.value == "") {
        smsName.innerHTML = "Please input name!";
    } else if (name.value.match(namePattern)) {
        smsName.innerHTML = "Please input only letter!!";
    } else {
        smsName.innerHTML = "";
        // smsName.value = "";
    }
    if (phone.value == "") {
        smsPhone.innerHTML = "Please input phone number!";
    } else if (phone.value.match(phonePattern)) {
        smsPhone.innerHTML = "Please input only number!";
    } else if (phone.value.match(/^[0-9]{1,10}$/)) {
        smsPhone.innerHTML = "";
        // smsPhone.value = "";
    } else {
        smsPhone.innerHTML = "Please input number from 1 digit to 10 digits!";
    }

    if (smsName.innerHTML == "" && smsPhone.innerHTML == "" && phone.value != "" && name.value != "") {
        let person = new Person(id, name.value, phone.value);
        myList.push(person);
        console.log(myList);
        //ADD TO TABLE CELLS;
        let cellId = newRow.insertCell(0);
        cellId.className = "id";
        let cellName = newRow.insertCell(1);
        let cellPhone = newRow.insertCell(2);
        let cellAction = newRow.insertCell(3);
        cellAction.id = "center-content";
        cellId.innerHTML = person.id; ++id;
        cellName.innerHTML = person.name;
        cellPhone.innerHTML = person.phone;
        cellAction.innerHTML = '<button type="button" class="btn btn-primary btn-action" onclick="viewPerson(this)">View</button>&nbsp<button type="button" class="btn btn-danger btn-action btn-delete" onclick="deletePerson(this)">Delete</button>&nbsp<button type="button" class="btn btn-warning btn-action" onclick="editPerson(this)">Edit</button>';

        rowSelected();
        document.getElementById('name').value = "";
        document.getElementById('phone').value = "";
    }
}

//FUNCTION: SHOW PERSON BY INDIVIDUAL ROW;
function viewPerson(obj) {
    let children = obj.parentNode.parentNode.childNodes;
    // console.log(children);
    let id = children[0].childNodes[0].nodeValue;
    let name = children[1].childNodes[0].nodeValue;
    let phone = children[2].childNodes[0].nodeValue;
    // console.log(id + "/" + name + "/" + phone);

    alert(`Personal Information\n• Id: ${id}\n• Name: ${name}\n• Phone: ${phone}`);
}

//FUNCTION: REMOVE PERSON FROM TABLE ROW AND ARRAY OF OBJECT;
function deletePerson(obj) {
    let children = obj.parentNode.parentNode.childNodes;
    let id = children[0].childNodes[0].nodeValue;
    let index = obj.parentNode.parentNode.rowIndex;
    console.log("index: " + index);
    let myTable = document.getElementsByTagName('table')[0];
    //DELETE FROM TABLE ROW;
    myTable.deleteRow(index);
   
    //DELETE FORM ARRAY OF OBJECT;
    for (let i = 0; i < myList.length; i++) {
        if (myList[i].id == id) {
            myList.splice(i, 1);
            break;
        }
    }
    rowSelected();
    console.log(myList);
}

//FUNCTION: MODIFY PERSON BY BUTTON "EDIT";
function editPerson(obj) {
    count = obj.parentNode.parentNode.rowIndex;
    btnAdd.style.display = "none";
    btnUpdate.style.display = "inline-block";
    let children = obj.parentNode.parentNode.childNodes;
    oldId = parseInt(children[0].childNodes[0].nodeValue);
    let name = children[1].childNodes[0].nodeValue;
    let phone = children[2].childNodes[0].nodeValue;

    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;
    //DISABLED ALL BUTTON "DELETE" WHEN MODIFYING;
    document.querySelectorAll('button.btn-delete').forEach(item => {
        item.disabled = true;
    });
}

//FUNCTION: CHANGE PERSON BY BUTTON "UPDATE";
function updatePerson() {
    let myTable = document.getElementsByTagName('table')[0];

    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let smsName = document.getElementById('sms-name');
    let smsPhone = document.getElementById('sms-phone');
    //REGEX;
    let namePattern = /[^a-zA-Z\s]/gi;
    let phonePattern = /[^0-9]/gi;

    if (name.value == "") {
        smsName.innerHTML = "Please input name!";
    } else if (name.value.match(namePattern)) {
        smsName.innerHTML = "Please input only letter!!";
    } else {
        smsName.innerHTML = "";
        // smsName.value = "";
    }
    if (phone.value == "") {
        smsPhone.innerHTML = "Please input phone number!";
    } else if (phone.value.match(phonePattern)) {
        smsPhone.innerHTML = "Please input only number!";
    } else if (phone.value.match(/^[0-9]{1,10}$/)) {
        smsPhone.innerHTML = "";
        // smsPhone.value = "";
    } else {
        smsPhone.innerHTML = "Please input number from 1 digit to 10 digits!";
    }

    if (smsName.innerHTML == "" && smsPhone.innerHTML == "" && phone.value != "" && name.value != "") {
        let person = new Person(oldId, name.value, phone.value);
        console.log("index: " + count);
        //REMOVE OLD ONE AND ADD NEW ONE IN THE SAME POSITION;
        for (let i = 0; i < myList.length; i++) {
            if (myList[i].id == oldId) {
                myList.splice(i, 1, person);
                break;
            }
        }
        console.log(myList);
        //UPDATING TABLE ROW;
        let cellId = myTable.rows[count].cells[0];
        cellId.className = "id";
        let cellName = myTable.rows[count].cells[1];
        let cellPhone = myTable.rows[count].cells[2];
        let cellAction = myTable.rows[count].cells[3];
        cellAction.id = "center-content";

        cellId.innerHTML = person.id;
        cellName.innerHTML = person.name;
        cellPhone.innerHTML = person.phone;
        cellAction.innerHTML = '<button type="button" class="btn btn-primary btn-action" onclick="viewPerson(this)">View</button>&nbsp<button type="button" class="btn btn-danger btn-action btn-delete" onclick="deletePerson(this)">Delete</button>&nbsp<button type="button" class="btn btn-warning btn-action" onclick="editPerson(this)">Edit</button>';

        document.getElementById('name').value = "";
        document.getElementById('phone').value = "";
        btnUpdate.style.display = "none";
        btnAdd.style.display = "inline-block";
        //ENABLED ALL BUTTON "DELETE" ONCE ALREADY CHANGED;
        document.querySelectorAll('button.btn-delete').forEach(item => {
            item.disabled = false;
        });
    }
}

//FUNCTION: CLICK ON ROW CELLS[0 TO 2] EXCEPT CELLS[3] (FOR BUTTON ACTIONS);
function rowSelected() {
    let myTable = document.getElementsByTagName('table')[0];
    // let myRow = myTable.getElementsByTagName('tr');
    for (let i = 2; i < myTable.rows.length; i++) {
        for (let j = 0; j < myTable.rows[i].cells.length; j++) {
            if (j != 3) { //EXCEPT CELLS[3] NOT ALLOWED TO CLICK;
                //ALL EVENT TO CELLS[0 TO 2] BY FUNCTION;
                myTable.rows[i].cells[j].onclick = function () {
                    document.getElementById('name').value = myTable.rows[i].cells[1].innerHTML;
                    document.getElementById('phone').value = myTable.rows[i].cells[2].innerHTML;
                    oldId = myTable.rows[i].cells[0].innerHTML;
                    count = i;
                    btnAdd.style.display = "none";
                    btnUpdate.style.display = "inline-block";
                    //DISABLED ALL BUTTON "DELETE" AFTER SELECTED;
                    document.querySelectorAll('button.btn-delete').forEach(item => {
                        item.disabled = true;
                    });
                }
            }
        }
    }
}

//EVENT: PRESS "ENTER KEY" TO FOCUS ON NEXT KEY;
let enterName = document.getElementById('name');
enterName.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('phone').focus();
    }
});

//EVENT: PRESS "ENTER KEY" TO ACTION;
let enterPhone = document.getElementById('phone');
enterPhone.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if (btnAdd.style.display != 'none') {
            btnAdd.click();
        } else {
            btnUpdate.click();
        }
        document.getElementById('name').focus();
    }
});