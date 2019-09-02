app.notification = {
    alert: function(title,message,callback){
        navigator.notification.alert(
            message,  // message
            callback,         // callback
            title,            // title
            '确认'                  // buttonName
        );
    },
    confirm: function(title,message,callback){
        navigator.notification.confirm(
            message,  // message
            function(buttonIndex){
                if(buttonIndex==1){
                    callback();
                }
            },         // callback
            title,            // title
            ['确定','取消']                  // buttonName
        );
    }

}