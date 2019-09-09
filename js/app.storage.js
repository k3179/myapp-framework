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
        _data.time = (new Date).getTime();
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
        
        if(!option){
            return _data.data;
        }
        if(option){

        }else{
            
        }
    },
    remove: function (name) {
        this.storage.removeItem(name);
    },
    setJson: function (name, obj) {
        var data = {};
        data._data = obj;
        data._m_time = (new Date).getTime();
        var value = JSON.stringify(data);
        this.set(name,value);
    },
    getJson : function(){
        var value,  data;
        value = this.storage.getItem(name);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    },
    getJsonByTime: function (name, time_value) {
        var value, tmp, data, _m_time, type, num, mseconds;
        value = this.storage.getItem(name);
        if (!value) {
            return null;
        }
        tmp = JSON.parse(value);
        if (!tmp._data || !tmp._m_time) {
            return null;
        }
        data = tmp._data;
        _m_time = tmp._m_time;
        if (time_value) {
            type = time_value.substr(-1).toLowerCase();
            num = parseInt(time_value.substr(0, (time_value.length - 1)));
            if (type === 's') {
                mseconds = num * 1000;
            } else if (type === 'm') {
                mseconds = num * 1000 * 60;
            } else if (type === 'h') {
                mseconds = num * 1000 * 60 * 60;
            } else if (type === 'd') {
                mseconds = num * 1000 * 60 * 60 * 24;
            }
            if (!mseconds) {
                return data;
            } else {
                if ((_m_time + mseconds) > ((new Date).getTime())) {
                    return data;
                } else {
                    return null;
                }
            }
        } else {
            return data;
        }
    }

};