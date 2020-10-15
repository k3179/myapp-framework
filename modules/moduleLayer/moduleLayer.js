app.modules.moduleLayer = function(){}
app.modules.moduleLayer.prototype = $.extend({},app.module.layer,{
    moduleType : 'layer',
    bindCustom : function(){
        this.bindSubmit();
    },
    bindSubmit : function(){
        var self = this;
        $('form',this.$module).submit(function(){
            console.log(self);
            
            return false;
        });
    }
});