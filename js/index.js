"use strict";
let id = 0;


function fnExportToExcel(fileExtension){
    let name = document.getElementById('excelName').value;
    var el = document.getElementById("tblExport");
    var wb = XLSX.utils.table_to_book(el, { sheet: "sheet1" });
    return XLSX.writeFile(wb, name+"."+fileExtension || ('MySheetName.' + (fileExtension || 'xlsx')));
}

function add_pupil() {
    let name = document.getElementById("name").value;
    let firstname = document.getElementById("firstname").value;

    // verify if a pupil is already added in the table
    let names = document.getElementsByClassName('name');
    let firstnames = document.getElementsByClassName("firstname");
    for(let index in names) {
        if(names[index].textContent == name && firstnames[index].textContent == firstname) {
            alert(`L'élève '${firstname} ${name}' a déjà été rajouté.`);
            return -1;
        }
    }


    // seperate all different grades
    let grade_form = document.getElementById("grade").value;
    let grades = grade_form.split(";")

    // create the new line to put in the table
    let tr = `<tr id='pupil${id}'><td class='firstname'>${firstname}</td><td class='name'>${name}</td>`;
    let denominator = 0;
    let numerator = 0;
    for(let grade of grades) {
        tr += `<td>${grade}</td>`;
        let splitted_grade = grade.split("/");
        numerator += Number(splitted_grade[0]);
        denominator += Number(splitted_grade[1]);
    }
    // calculate mean of grades for the pupil
    let mean = (numerator/denominator) * 100;
    tr += `<td>${mean.toFixed(2)}/100</td><td>${mean>50 ? 'Réussi' : 'Raté'}</td>
    <td id='comment${id}' onclick="change_comment('comment${id}')">Cliquer pour changer le commentaire</td></tr>`;

    document.getElementById("tbody").innerHTML += tr;
    id++;
    return 0;
}

// change comment for a pupil
function change_comment(id) {
    let new_comment = prompt('Indiquez le nouveau commentaire : ');
    document.getElementById(id).innerText = new_comment;
}