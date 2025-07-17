sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    'sap/ui/model/Filter',
      'sap/ui/model/FilterOperator'
  ],
    function (Controller, JSONModel, MessageBox, Filter, FilterOperator) {
      "use strict";

    return Controller.extend("masterdatamaintain.controller.View1", {
        onInit: function () {
            this._loadV4ToJson()
              .catch(function (err) {
                MessageBox.error("Failed to load data: " + err.message);
              });
    
          },
          _loadV4ToJson: async function () {
            /* 1. Grab the V4 model (default or named) */
            /** @type {sap.ui.model.odata.v4.ODataModel} */
            const oV4Model = this.getOwnerComponent().getModel();     // "" model
            // If you use a named V4 model:
            // const oV4Model = this.getOwnerComponent().getModel("v4");
    
            /* 2. Bind the list (no control needed) */
            const oListBinding = oV4Model.bindList("/GenericMaterial");
    
            /* 3. Fetch all contexts currently provided by the server.
                  This resolves paging automatically.                              */
            const aContexts = await oListBinding.requestContexts();    // ⇢ Promise
    
            /* 4. Turn each Context into a plain JavaScript object */
            const aPlainData = aContexts.map(function (oCtx) {
              return oCtx.getObject();   // { ProductID, Name, Price, … }
            });
    
            /* 5. Create a JSONModel and expose it to the view */
            const oJSON = new JSONModel(aPlainData);
            this.getView().setModel(oJSON, "A");                   // named model
    
            // (Optional) fire a custom event or resolve a Promise if callers
            //   need to know when the data is ready.
          },
          offerQtyChanged: function (oEvent) {
            const oJSON = this.getView().getModel("A");
            const aData = oJSON.getData();               // direct reference to array
            const oCtx = oEvent.getSource().getBindingContext("A");
            const iIndex = Number(oCtx.getPath().split("/")[1]) + 1;
            // Guard: if index is out of range put at end
    
            // 2. Deep‑clone the source row so edits don’t affect the original
    
            const oFinal = JSON.parse(JSON.stringify(aData[iIndex - 1]));
            const iPos = Math.min(Math.max(iIndex, 0), aData.length);
    
            oFinal.BALANCE_QTY = oFinal.BALANCE_QTY - oFinal.OFFER_QTY;
            oFinal.OFFER_QTY = 0;
    
            aData.splice(iPos, 0, oFinal);
    
            oJSON.setData(aData);                        // notify UI
          },
    
          onSearch: async function () {
            var oFilterBar = this.getView().byId("filterbar");
            var aTableFilters = oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
              var oControl = oFilterGroupItem.getControl(),
                aSelectedKeys = oControl.getSelectedKeys(),
                aFilters = aSelectedKeys.map(function (sSelectedKey) {
                  return new Filter({
                    path: oFilterGroupItem.getName(),
                    operator: FilterOperator.Contains,
                    value1: sSelectedKey
                  });
                });
      
              if (aSelectedKeys.length > 0) {
                  aResult.push(new Filter({
                  filters: aFilters,
                  and: false
                }));
              }
      
              return aResult;
            }, []);
            var oODataModel = this.getView().getModel();
            var oListBinding = oODataModel.bindList("/GenericMaterial", undefined, undefined, aTableFilters);
            var ProductsTable = this.getView().byId("ProductsTable");
            const aContexts = await oListBinding.requestContexts();    // ⇢ Promise
    
            /* 4. Turn each Context into a plain JavaScript object */
            const aPlainData = aContexts.map(function (oCtx) {
              return oCtx.getObject();   // { ProductID, Name, Price, … }
            });
    
            var ojson = this.getView().getModel("A");
            ojson.setProperty("/", []);
       //     const oJSON = new JSONModel(aPlainData);
            ojson.setProperty("/", aPlainData);
          
          }
    
        });
      });
    