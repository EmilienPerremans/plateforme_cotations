"use strict";

function fnExportToExcel(fileExtension,fileName){
    var el = document.getElementById("tblExport");
    var wb = XLSX.utils.table_to_book(el, { sheet: "sheet1" });
    return XLSX.writeFile(wb, fileName+"."+fileExtension || ('MySheetName.' + (fileExtension || 'xlsx')));
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
    let tr = `<tr><td class='firstname'>${firstname}</td><td class='name'>${name}</td>`;
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
    tr += `<td>${mean.toFixed(2)}/100</td><td>${mean>50 ? 'Réussi' : 'Raté'}</td><td>Travaille mieux !</td></tr>`;

    document.getElementById("tbody").innerHTML += tr;
    return 0;
}