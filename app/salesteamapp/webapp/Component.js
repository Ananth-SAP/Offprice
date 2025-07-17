/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "salesteamapp/model/models",
        "sap/ui/model/odata/v2/ODataModel" 
    ],
    function (UIComponent, Device, models,ODataModel) {
        "use strict";

        return UIComponent.extend("salesteamapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
    //            var oModel = new ODataModel("/odata/v4/offprice-srv",true);
      //          this.setModel(oModel,"OffSrv");


            }
        });
    }
);