let formData = (JSON.parse(localStorage.getItem("Data"))) || [];
let recordData = [];
render();

function onFormSubmit() {
    formData.push(readFormData());
    localStorage.setItem("Data", JSON.stringify(formData));
    render();
}

function render() {
    previewImage();
    document.getElementById('studentList').getElementsByTagName('tbody')[0].innerHTML = null;
    const record = localStorage.getItem("Data");
    recordData = JSON.parse(record) || [];
    for (let i = 0; i < recordData.length; i++) {
        insertNewRecord(recordData[i]);
    }


}



function readFormData() {
    let formData = {};
    formData["ID"] = document.getElementById("id").value;
    formData["Name"] = document.getElementById("name").value;
    formData["Class"] = document.getElementById("class").value;
    formData["Gender"] = document.getElementById("gender").value;
    formData["Avatar"] = document.querySelector(".image").src;
    return formData;
}

function previewImage() {
    let inpFile = document.getElementById("inpFile");
    let previewContainer = document.getElementById("imagePreview");
    let previewImage = previewContainer.querySelector(".image");

    inpFile.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            previewImage.style.display = "block";
            reader.addEventListener("load", function() {
                previewImage.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file);
        }
    })
}

function insertNewRecord(data) {
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = "<input type='text'  disabled = 'true' value = '" + data["ID"] + "' >";
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = "<input type='text' disabled = 'true' value = '" + data["Name"] + "' >";
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = "<input type='text' disabled = 'true' value = '" + data["Class"] + "' >";
    let gender = data["Gender"];
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = genderCheck(gender);

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = "<img src = '" + data["Avatar"] + "'style = 'width:100px;height:100px' id = 'avatar'></img>";
    cell6 = newRow.insertCell(5);
    let modifyBtn = "<button class = 'edit-btn' onclick='Edit(this);'>Edit</button><button class = 'delete-btn' onclick='Delete(this);'>Delete</button>";
    cell6.innerHTML = modifyBtn;
}

function deleteLocalStorage() {
    localStorage.clear();
}

function Edit(el) {

    row = upTo(el, 'tr');

    let idEdit = row.getElementsByTagName("input")[0].value;
    let data = JSON.parse(localStorage.getItem("Data"));

    let numInputText = row.getElementsByTagName("input").length;
    if (row.getElementsByTagName("button")[0].innerHTML === "Edit") {
        for (let i = 0; i < numInputText; i++) {
            row.getElementsByTagName("input")[i].disabled = false;
        }
        row.getElementsByTagName("select")[0].disabled = false;
        row.getElementsByTagName("button")[0].innerHTML = "Save";
        let input = document.createElement("input");
        input.type = "file";
        input.accept = ".png, .jpg, .jpeg";
        input.style = "width:100px";
        row.childNodes[4].appendChild(input);
        let previewImage = row.getElementsByTagName("img")[0];
        input.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.addEventListener("load", function() {
                    previewImage.setAttribute("src", this.result);
                });

                reader.readAsDataURL(file);
            }
        })
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i]["ID"] == idEdit) {

                data[i]["ID"] = row.getElementsByTagName("input")[0].value;
                data[i]["Name"] = row.getElementsByTagName("input")[1].value;
                data[i]["Class"] = row.getElementsByTagName("input")[2].value;
                let editGender = "";
                let editGenderIndex = row.getElementsByTagName("select")[0].options.selectedIndex;
                switch (editGenderIndex) {
                    case 0:
                        editGender = "Male";
                        break;
                    case 1:
                        editGender = "Female";
                        break;
                    case 2:
                        editGender = "Other";
                        break;
                }
                data[i]["Gender"] = editGender;
                data[i]["Avatar"] = row.getElementsByTagName("img")[0].src;

            }
        }
        localStorage.setItem("Data", JSON.stringify(data));
        for (let i = 0; i < numInputText; i++) {
            row.getElementsByTagName("input")[i].disabled = true;
        }
        row.getElementsByTagName("select")[0].disabled = true;
        row.getElementsByTagName("button")[0].innerHTML = "Edit";
        render();
    }

}

function Delete(el) {

    let row = upTo(el, 'tr');
    let idDel = row.getElementsByTagName("input")[0].value;
    row.parentNode.removeChild(row);
    let data = JSON.parse(localStorage.getItem("Data"));
    for (let i = 0; i < data.length; i++) {
        if (data[i]["ID"] === idDel) {
            data.splice(i, 1);
        }
    }
    localStorage.setItem("Data", JSON.stringify(data));
    render();
}

function upTo(el, tagName) {
    tagName = tagName.toLowerCase();

    while (el && el.parentNode) {
        el = el.parentNode;
        if (el.tagName && el.tagName.toLowerCase() == tagName) {
            return el;
        }
    }
    return null;
}

function genderCheck(gender) {
    let genderChecked = "";
    switch (gender) {
        case "Male":
            genderChecked = "<select id='select' disabled='true'><option value = 'Male' selected='true'>Male</option><option value = 'Female'>Female</option><option value = 'Other'>Other</option></select>";
            break;
        case "Female":
            genderChecked = "<select id='select' disabled='true'><option value = 'Male'>Male</option><option value = 'Female' selected='true'>Female</option><option value = 'Other'>Other</option></select>";
            break;
        case "Other":
            genderChecked = "<select id='select' disabled='true'><option value = 'Male'>Male</option><option value = 'Female'>Female</option><option value = 'Other' selected='true'>Other</option></select>";
            break;
    }
    return genderChecked;
}

function Validate() {
    let data = readFormData();
    if (validateID(data["ID"]) && validateName(data["Name"]) && validateClass(data["Class"])) onFormSubmit();
}

function validateName(data) {
    let result = false;
    let nameRegex = /^[a-zA-Z].*[\s\.]*$/g;

    if (data == "") {
        document.getElementById("nameError").innerHTML = "Please Input";
        /*alert("Please input something");*/
    } else if (data.length < 10) {
        document.getElementById("nameError").innerHTML = "Name must contain at least 10 character!";
    } else if (!nameRegex.test(data)) {
        document.getElementById("nameError").innerHTML = "Invalid Name";
    } else {
        document.getElementById("nameError").innerHTML = "";
        result = true;
    }
    return result;
}

function validateID(data) {
    let dataFromLocal = JSON.parse(localStorage.getItem("Data")) || [];
    if (data == "") {
        document.getElementById("idError").innerHTML = "Please Input";
        return false;
    } else {
        for (let i = 0; i < dataFromLocal.length; i++) {
            if (dataFromLocal[i]["ID"] == data) {
                document.getElementById("idError").innerHTML = "Input another ID, this ID has been used !";
                return false;
            }
        }
        document.getElementById("idError").innerHTML = "";
        return true;
    }
}

function validateClass(data) {
    if (data == "") {
        document.getElementById("classError").innerHTML = "Please Input";
        return false;
    } else {
        return true;
    }
}