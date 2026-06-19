let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();

function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;

    if(name==="" || roll==="" || course==="" || marks===""){
        alert("Please fill all fields");
        return;
    }

    let grade = calculateGrade(marks);

    let student = {
        name,
        roll,
        course,
        marks,
        grade
    };

    students.push(student);

    saveData();

    clearFields();

    displayStudents();
}

function calculateGrade(marks){

    marks = Number(marks);

    if(marks>=90)
        return "A+";

    else if(marks>=80)
        return "A";

    else if(marks>=70)
        return "B";

    else if(marks>=60)
        return "C";

    else if(marks>=50)
        return "D";

    else
        return "F";
}

function displayStudents(){

    let table = document.getElementById("studentTable");

    table.innerHTML="";

    students.forEach((student,index)=>{

        let row = `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>

            <td>
                <button class="edit-btn"
                onclick="editStudent(${index})">
                Edit
                </button>

                <button class="delete-btn"
                onclick="deleteStudent(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;

        table.innerHTML += row;
    });

    document.getElementById("count").innerText =
    students.length;
}

function deleteStudent(index){

    let confirmDelete =
    confirm("Delete this student?");

    if(confirmDelete){

        students.splice(index,1);

        saveData();

        displayStudents();
    }
}

function editStudent(index){

    let student = students[index];

    document.getElementById("name").value =
    student.name;

    document.getElementById("roll").value =
    student.roll;

    document.getElementById("course").value =
    student.course;

    document.getElementById("marks").value =
    student.marks;

    students.splice(index,1);

    saveData();

    displayStudents();
}

function searchStudent(){

    let input =
    document.getElementById("search")
    .value.toLowerCase();

    let rows =
    document.querySelectorAll("#studentTable tr");

    rows.forEach(row=>{

        let text =
        row.innerText.toLowerCase();

        if(text.includes(input)){
            row.style.display="";
        }
        else{
            row.style.display="none";
        }
    });
}

function clearFields(){

    document.getElementById("name").value="";
    document.getElementById("roll").value="";
    document.getElementById("course").value="";
    document.getElementById("marks").value="";
}

function saveData(){

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

window.onload = function(){
    displayStudents();
}