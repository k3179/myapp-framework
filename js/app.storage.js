/* global app */

// storage
/*
 * usage
 * app.storage.setJson();
 * 
*/


app.storage = {
    storage: window.localStorage,
    _set: function (name, value) {
        this.storage.setItem(name, value);
    },
    _get: function (name) {
        return this.storage.getItem(name);
    },
    set: function(name,data){
        var _data = {};
        _data.data = data;
        _data.version = app.version.code;
        _data.time = parseInt((new Date).getTime() / 1000);
        var value = JSON.stringify(_data);
        this._set(name,value);
    },
    get: function(name,option){
        var value = this._get(name);
        if(!value) return null;
        try{
            var _data = JSON.parse(value);
        }catch(error){
            app.handleError(error);
            return null;
        }
        
        if(option){
            if(option.expire){
                var seconds = this._getExpireTime(option.expire);
                var nowTime = this._getTime();
                if(_data.time < (nowTime - seconds)){
                    return null;
                }
            }
        }
        return _data.data;
    },
    remove: function (name) {
        this.storage.removeItem(name);
    },
    _getTime : function(){
        return parseInt((new Date).getTime() / 1000);
    },
    _getExpireTime: function (time_value) {
        var type,num,seconds;
        type = time_value.substr(-1).toLowerCase();
        num = parseInt(time_value.substr(0, (time_value.length - 1)));
        if (type === 's') {
            seconds = num;
        } else if (type === 'm') {
            seconds = num * 60;
        } else if (type === 'h') {
            seconds = num * 60 * 60;
        } else if (type === 'd') {
            seconds = num * 60 * 60 * 24;
        }
        return seconds;
    }

};