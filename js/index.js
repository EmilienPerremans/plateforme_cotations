"use strict";
let PUPILS = [];


function fnExportToExcel(fileExtension){
    let name = document.getElementById('excelName').value;
    create_table(false);
    var el = document.getElementById("tblExport");
    var wb = XLSX.utils.table_to_book(el, { sheet: "sheet1" });
    create_table();
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

    
    new_pupil.mean = calculate_mean(new_pupil.grades);
    new_pupil.result = new_pupil.mean >= 50 ? 'Réussi' : 'Raté';
    new_pupil.comment = "Cliquer pour changer le commentaire";

    PUPILS.push(new_pupil);

    create_table();
    return false;
}

function calculate_mean(grades) {
    // calculate mean of grades for the pupil
    let denominator = 0;
    let numerator = 0;
    for(let grade of grades) {
        if(grade !== "-") {
            let splitted_grade = grade.split("/");
            numerator += Number(splitted_grade[0]);
            denominator += Number(splitted_grade[1]);
        }
    }
    return ((numerator/denominator) * 100).toFixed(2);
}

function create_table(for_html=true) {
    // create the thead
    let thead = "<thead id='thead'><th>Prénom</th><th>Nom</th>";
    for(let i in PUPILS[0].grades) {
        let num = Number(i)+1;
        thead += `<th>Note ${num}</th>`;
    }
    thead += `<th>Moyenne</th><th>Résultat</th><th>Commentaire du prof</th>
    ${for_html ? '<th>Supprimer la ligne</th>' : ''}</thead>`;

    // create the tbody
    let tbody = "<tbody id='tbody'>";
    for(let index in PUPILS) {
        let tr = `<tr id='pupil${index}'>
        <td id='firstname${index}' onclick="change_cell('${index}', 'firstname')" class='clickable' title='Cliquer pour changer le prénom'>${PUPILS[index].firstname}</td>
        <td id='name${index}' onclick="change_cell('${index}', 'name')" class='clickable' title='Cliquer pour changer le nom'>${PUPILS[index].name}</td>`;
        for(let index_grade in PUPILS[index].grades) {
            tr += `<td id='grade${index_grade}' onclick="change_grade(${index},${index_grade})"
            class='clickable' title='Cliquer pour changer la cote'>${PUPILS[index].grades[index_grade]}</td>`;
        }
        tr += `<td id='mean${index}'>${PUPILS[index].mean}/100</td><td id='result${index}'>${PUPILS[index].result}</td>
        <td id='comment${index}' onclick="change_cell('${index}', 'comment')" class='clickable' title='Cliquer pour changer le commentaire'>${PUPILS[index].comment}</td>
        ${for_html ? `<td onclick="delete_pupil('${index}')" class='clickable' title='Cliquer pour supprimer la ligne'>X</td>` : ''}</tr>`;
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

function change_grade(index_pupil, index_grade) {
    let new_value = prompt('Indiquez la nouvelle valeur : ');
    if( (new_value.split('/').length == 2 && !isNaN(new_value.split('/')[0]) && !isNaN(new_value.split('/')[0])) || new_value == '-' ) {
        let pupil = PUPILS[index_pupil]
        pupil.grades[index_grade] = new_value;
        pupil.mean = calculate_mean(pupil.grades);
        pupil.result = pupil.mean >= 50 ? 'Réussi' : 'Raté';
    
        document.getElementById(`grade${index_grade}`).innerHTML = pupil.grades[index_grade];
        document.getElementById(`mean${index_pupil}`).innerHTML = pupil.mean;
        document.getElementById(`result${index_pupil}`).innerHTML = pupil.result;
    } else {
        alert(`Syntaxe de la cote '${new_value}' est mauvaise, exemple de syntaxe: '13/20'`);
    }
}

// change value of a cell
function change_cell(index, cell) {
    let new_value = prompt('Indiquez la nouvelle valeur : ');
    document.getElementById(cell+index).innerText = new_value;
    PUPILS[index][cell] = new_value;
}