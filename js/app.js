'use strict';
var app = {

    // set debug mode
    debug : true,
    ready : null, // abstract onload function
    modules : {},
    html : {},
    services : {},
    layers : [],
    z : 1,

    // Application Constructor
    init: function(){
        this.bind();
    },
    bind : function(){
        document.addEventListener('deviceready', this.onReady.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
        document.addEventListener('backbutton', this.onBack.bind(this), false);
    },

    exit: function(){
        navigator.app.exitApp();
    },

    // device ready Event Handler
    // ******* app start *******
    onReady: function() {
        if(this.ready && typeof(this.ready)==='function'){
            this.ready();
        }
    },

    // device pause Event Handler
    onPause: function() {
        console.log('pause');
    },

    // devide resume Event Handler
    onResume: function() {
        console.log('resume');
    },

    // device back Event Handler
    onBack: function(){
        app.notification.confirm('确定要退出吗？','',function(){
            app.exit();
        });
    },

    loadModule : function(id,param){
        if(app.modules[id]){
            this.addModule(id,param);
        }else{
            var css_file_name =   './modules/' + id + '/' + id + '.css';
            $('<link>').attr({rel:'stylesheet',type:'text/css',href:css_file_name}).appendTo('head');
            var js_file_name =   './modules/' + id + '/' + id + '.js';
            var html_file_name  =  './modules/' + id + '/' + id + '.html';
            $.when($.getScript(js_file_name),$.get(html_file_name)).done(function(js_result,html_result){
                app.modules[id].prototype.html = html_result[0];
                this.addModule(id,param);
            }.bind(this));
        }
    },

    addModule : function(id,param){
        var module    =   new app.modules[id](param);
        if(module.moduleType==='service'){
            this.services[id]   =   module;
        }else if(module.moduleType==='layer'){
            this.layers.push(module);
        }
        module._append();
        module._bind();
        module._init(param);
        module._show();

        /*
        module._load(id,function(){
            module._init(param);
            module._show();
        });
        */
    }

};
