function fnExportToExcel(fileExtension,fileName){
    var el = document.getElementById("tblExport");
    var wb = XLSX.utils.table_to_book(el, { sheet: "sheet1" });
    return XLSX.writeFile(wb, fileName+"."+fileExtension || ('MySheetName.' + (fileExtension || 'xlsx')));
}