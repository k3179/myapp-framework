/* global app */
/* abstract class */
app.module    =  {
    // load html and setup module
    cache_param : true,         // cache param , no init when cache value equal
    _append : function(id,callback){
        this.$module =   $(this.html);
        $('body').append(this.$module);
    },
    _bind : function(){
        this.bind();
    },
    _init : function(param){
        var cache_value   =   JSON.stringify(param);
        var now_time    =   app.tools.time();// not init in 6 min
        if(
            this.cache_param && 
            this.cache_value && 
            this.cache_value ===cache_value &&
            this.init_time && 
            ((now_time - this.init_time)<300)
        ) return;
        this.init_time  =   app.tools.time();
        this.init(param);
        this.cache_value  =   cache_value;
    },
    // set z-index and show
    _show : function(){
        this.visible    =   true;
        if(this.moduleType==='layer'){
            this.$module.css('z-index',app.z++);
        }
        this.show();
    },
    _remove : function(){
        this.$module.off();
        this.$module.remove();
    },
    // implements function
    init : function(){},    // call after add module , and show module (from hidden modules)
    bind : function(){},    // call after add module
    check : function(){},   // call from ma.control.check , only current module    
    show : function(){},    // call after add module and show module (from hidden modules)    
    hide : function(){},     // call from ma.control.hide
    afterShow : function(){},
    afterHide : function(){}
};