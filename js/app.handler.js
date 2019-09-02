app.handler = {


    init : function(){

    },
    loadModule : function(id,param){

        if(!app.modules[id]){
            var css_file_name =   './modules/' + id + '/' + id + '.css';
            $('<link>').attr({rel:'stylesheet',type:'text/css',href:css_file_name}).appendTo('head');
            var js_file_name =   './modules/' + id + '/' + id + '.js';
            $.ajax({
                async: false,
                url: js_file_name,
                dataType: "script"
            });
        }
        var module    =  new app.modules[id](param);
        conseol.log(module);

        return;
        this._loadModule(id,function(){
            var module    =  new app.modules[id](param);
            if(module.moduleType==='service'){
                this.services[id]   =   module;
            }else if(module.moduleType==='layer'){
                this.layers.push(module);
            }
            module._load(id,function(){
                module._init(param);
                module._show();
            });
            
        });
    },

    _loadModule : function(id,callback){



        this._loadModuleFiles(id,callback);
    },

    _loadModuleFiles : function(id,callback){
        var css_file_name =   './modules/' + id + '/' + id + '.css';
        $('<link>').attr({rel:'stylesheet',type:'text/css',href:css_file_name}).appendTo('head');
        var js_file_name =   './modules/' + id + '/' + id + '.js';
        $.getScript(js_file_name,callback);
    },

}