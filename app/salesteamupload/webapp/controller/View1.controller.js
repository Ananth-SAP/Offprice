sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("salesteamupload.controller.View1", {
        onInit: function () {
            if (typeof XLSX === "undefined") {
                $.getScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.20.2/xlsx.full.min.js");
              }
        },
        onFileChange: function (oEvent) {
            const file = oEvent.getParameter("files")[0];
            if (!file) { return; }
      
            const reader = new FileReader();
            reader.onload = (e) => this._loadWorkbook(e.target.result, file.name);
            reader.readAsBinaryString(file);
          },
        handleUploadPress : function(e) {
	
            var fU = this.getView().byId("fileUploader");
            var domRef = fU.getFocusDomRef();
            var file = domRef.files[0];
            
            
            // Create a File Reader object
            var reader = new FileReader();
            var t = this;
            
            reader.onload = function(e) {
                var strCSV = e.target.result;
                var arrCSV = strCSV.match(/[\w .]+(?=,?)/g);
                var noOfCols = 5;
        
                // To ignore the first row which is header
                var hdrRow = arrCSV.splice(0, noOfCols);
        
                var data = [];
                while (arrCSV.length > 0) {
                var obj = {};
                // extract remaining rows one by one
                var row = arrCSV.splice(0, noOfCols)
                for (var i = 0; i < row.length; i++) {
                    obj[hdrRow[i]] = row[i].trim()
                }
                // push row to an array
                data.push(obj)
                }
                
                // Bind the data to the Table
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);
                var oTable = t.byId("idProductsTable");
                oTable.setModel(oModel,"A");
            };
            reader.readAsBinaryString(file);
            },
            _loadWorkbook(binary, fileName) {
                /* 1. Parse workbook ------------------------------------------------ */
                const wb  = XLSX.read(binary, { type: "binary" });
                const ws  = wb.Sheets[wb.SheetNames[0]];    // first sheet only
                const arr = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
          
                if (arr.length === 0) { return MessageToast.show("Sheet is empty"); }
          
                /* 2. Split header / rows ------------------------------------------ */
                const aHeaders = arr[0];
              
          
                /* 3. Build / rebuild columns -------------------------------------- */
                const oTable = this.byId("idProductsTable");
               
                var hdrRow = arr.splice(0, 5);
                var data = [];
                oTable.setModel(new JSONModel(hdrRow,"A"));
                           // clear previous upload
          
              
            }

    });
});
