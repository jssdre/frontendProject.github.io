$(document).ready(function () {
 
    $('#table tbody').on('click', 'tr', function () {

        $('#table tbody tr').removeClass('selected');

        $(this).toggleClass('selected');
        updateTotals();
    });
});
function addRow() {
    const table = document.getElementById("tb");

    const add = table.insertRow();

    $(add).addClass('new-row');

    const cel1 = add.insertCell(0);
    cel1.innerHTML =
        '<select><option value="교양">교양</option><option value="전공">전공</option></select>';

    const cel2 = add.insertCell(1);
    cel2.innerHTML =
        '<select><option value="필수">필수</option><option value="선택">선택</option></select>';

    for (let i = 2; i <= 10; i++) {
        const cell = add.insertCell(i);
        if(i<8) cell.innerHTML = '<input type="text" style="width:70px;">';
        else cell.innerHTML = '';
    }

    $(add).on('change', 'input, select', function () {
        updateTotals(add);
    });
}

function updateTotals() {
    const table = document.getElementById("table");
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');

    let totalCredit = 0,
        totalAttendance = 0,
        totalTask = 0,
        totalMidterm = 0,
        totalFinal = 0,
        totalScore = 0;
        totalAverage=0;
        totalGrade='';

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');

        totalCredit += parseInt(cells[3].innerText) || 0; // 학점
        totalAttendance += parseInt(cells[4].innerText) || 0; // 출석점수
        totalTask += parseInt(cells[5].innerText) || 0; // 과제점수
        totalMidterm += parseInt(cells[6].innerText) || 0; // 중간고사
        totalFinal += parseInt(cells[7].innerText) || 0; // 기말고사
        totalScore += parseInt(cells[8].innerText) || 0; // 총점
        if(i==rows.length-1)
            totalAverage=totalScore/i;
            if(totalAverage>=95) totalGrade='A+';
            else if(totalAverage>=90) totalGrade='A0';
            else if(totalAverage>=85) totalGrade='B+';
            else if(totalAverage>=80) totalGrade='B0';
            else if(totalAverage>=75) totalGrade='C+';
            else if(totalAverage>=70) totalGrade='C0';
            else if(totalAverage>=65) totalGrade='D+';
            else if(totalAverage>=60) totalGrade='D0';
            else if(totalAverage>=55) totalGrade='E+';
            else if(totalAverage>=50) totalGrade='E0';
            else totalGrade='F';
        
        const attendance = parseInt(cells[4].innerText) || 0;
        const task = parseInt(cells[5].innerText) || 0;
        const midterm = parseInt(cells[6].innerText) || 0;
        const final = parseInt(cells[7].innerText) || 0;
        const rowTotal = attendance + task + midterm + final;
        cells[8].innerText = rowTotal; // 총점 열 업데이트
        cells[10].innerText=getGrade(rowTotal, cells[3].innerText);
    }

    const tfoot = table.getElementsByTagName('tfoot')[0];
    const tfootCells = tfoot.getElementsByTagName('td');

    tfootCells[1].innerText = totalCredit; // 학점
    tfootCells[2].innerText = totalAttendance; // 출석점수
    tfootCells[3].innerText = totalTask; // 과제점수
    tfootCells[4].innerText = totalMidterm; // 중간고사
    tfootCells[5].innerText = totalFinal; // 기말고사
    tfootCells[6].innerText = totalScore; // 총점
    tfootCells[7].innerText = totalAverage; // 평균
    tfootCells[8].innerText = totalGrade; // 성적
}

function getGrade(total, credit){
    let grade='';
    if(total>=95) grade='A+';
    else if(total>=90) grade='A0';
    else if(total>=85) grade='B+';
    else if(total>=80) grade='B0';
    else if(total>=75) grade='C+';
    else if(total>=70) grade='C0';
    else if(total>=65) grade='D+';
    else if(total>=60) grade='D0';
    else if(total>=55) grade='E+';
    else if(total>=50) grade='E0';
    else if(total<50){
        if(credit==1) grade='P';
        else grade='F';
    }
    return grade;
}

function saveData() {
    const table = document.getElementById("table");
    const tbody = table.getElementsByTagName('tbody')[0];
    const newRows = $('#table tbody tr.new-row');

    newRows.each(function (index) {
        const newRow = tbody.insertRow();
        const cells = $(this).find('td');

        cells.each(function () {
            const newCell = newRow.insertCell();
            console.log("Cell HTML:", $(this).html());
            newCell.innerHTML = $(this).html();
        });
    });

    newRows.remove();

    updateTotals();
}
function saveRow() {
    const newRow = document.querySelector('#table tbody tr.new-row');

    if (!newRow) {
        alert("추가된 행이 없습니다.");
        return;
    }

    const studyValue = newRow.querySelector('select')[0].value;
    const requiredValue = newRow.querySelector('select')[1].value;
    //console.log(studyValue, requiredValue)
    
    const subjectValue = newRow.querySelector('input')[0].value;
    const gradeValue = newRow.querySelector('input')[1].value;
    const attendValue = newRow.querySelector('input')[2].value;
    const taskValue = newRow.querySelector('input')[3].value;
    const middleValue = newRow.querySelector('input')[4].value;
    const finalValue = newRow.querySelector('input')[5].value;
    //console.log(subjectValue)

    const newRowHTML = `
        <tr>
            <td>${studyValue}</td><td>${requiredValue}</td>
            <td>${subjectValue}</td><td>${gradeValue}</td>
            <td>${attendValue}</td><td>${taskValue}</td>
            <td>${middleValue}</td><td>${finalValue}</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    `;

    document.querySelector('#table tbody').insertAdjacentHTML('beforeend', newRowHTML);
    newRow.classList.remove('new-row');
    newRow.remove();

    updateTotals();
}

function delRow(){
    const table = document.getElementById("tb");
    $('.selected').remove();
}
