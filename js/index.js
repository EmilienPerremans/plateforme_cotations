"use strict";
let PUPILS = [];


function fnExportToExcel(fileExtension){
    let name = document.getElementById('excelName').value;
    var el = document.getElementById("tblExport");
    var wb = XLSX.utils.table_to_book(el, { sheet: "sheet1" });
    return XLSX.writeFile(wb, name+"."+fileExtension || ('MySheetName.' + (fileExtension || 'xlsx')));
}

function add_pupil() {
    let new_pupil = {};
    new_pupil.name = document.getElementById("name").value;
    new_pupil.firstname = document.getElementById("firstname").value;

    // verify if a pupil is already added in the table
    for(let pupil of PUPILS) {
        if(pupil.name == new_pupil.name && pupil.firstname == new_pupil.firstname) {
            alert(`L'élève '${pupil.firstname} ${pupil.name}' a déjà été rajouté.`);
            return -1;
        }
    }

    // seperate all different grades
    let grade_form = document.getElementById("grade").value;
    new_pupil.grades = grade_form.split(";");

    // calculate mean of grades for the pupil
    let denominator = 0;
    let numerator = 0;
    for(let grade of new_pupil.grades) {
        if(grade !== "-") {
            let splitted_grade = grade.split("/");
            numerator += Number(splitted_grade[0]);
            denominator += Number(splitted_grade[1]);
        }
    }
    new_pupil.mean = (numerator/denominator) * 100;
    new_pupil.comment = "Cliquer pour changer le commentaire";

    PUPILS.push(new_pupil);

    create_table();
    return 0;
}

function create_table() {
    // create the thead
    let thead = "<thead id='thead'><th>Nom</th><th>Prénom</th>";
    for(let i in PUPILS[0].grades) {
        let num = Number(i)+1;
        thead += `<th>Note ${num}</th>`;
    }
    thead += "<th>Moyenne</th><th>Résultat</th><th>Commentaire du prof</th><th>Supprimer la cote</th></thead>";

    // create the tbody
    let tbody = "<tbody id='tbody'>";
    for(let index in PUPILS) {
        let tr = `<tr id='pupil${index}'>
        <td id='firstname${index}' onclick="change_cell('${index}', 'firstname')">${PUPILS[index].firstname}</td>
        <td id='name${index}' onclick="change_cell('${index}', 'name')">${PUPILS[index].name}</td>`;
        for(grade of PUPILS[index].grades) {
            tr += `<td>${grade}</td>`;
        }
        tr += `<td>${PUPILS[index].mean.toFixed(2)}/100</td><td>${PUPILS[index].mean>50 ? 'Réussi' : 'Raté'}</td>
        <td id='comment${index}' onclick="change_cell('${index}', 'comment')">${PUPILS[index].comment}</td>
        <td onclick="delete_pupil('${index}')">X</td></tr>`;
        tbody += tr;
    }
    tbody += "</tbody>";

    document.getElementById("tblExport").innerHTML = thead + tbody;
}

function delete_table() {
    if(confirm('Êtes-vous sûr de vouloir supprimer le tableau ?')) {
        PUPILS = [];
        document.getElementById("tblExport").innerHTML = '';
    }
}

function delete_pupil(index) {
    if(confirm(`Êtes-vous sûr de vouloir enlever l'élève "${PUPILS[index].firstname} ${PUPILS[index].name}" du tableau ?`)) {
        PUPILS.splice(index,1);
        if(PUPILS.length>0) {
            create_table();
        } else {
            document.getElementById("tbody").innerHTML = '';
        }
    }
}

// change value of a cell
function change_cell(index, cell) {
    let new_value = prompt('Indiquez le nouvelle valeur : ');
    document.getElementById(cell+index).innerText = new_value;
    PUPILS[index][cell] = new_value;
}