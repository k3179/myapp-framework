app.modules.moduleMain = function(){}
app.modules.moduleMain.prototype = $.extend({},app.module,{
    moduleType : 'service',
    bind : function(){
        $('#module-layer',this.$module).click(function(){
            app.loadModule('moduleLayer',null);
        });
    }
});