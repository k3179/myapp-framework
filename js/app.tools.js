app.tools = {
    nl2br : function(string){
        return string.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
    },
    br2nl : function(string){
        return string.replace(/<br>/g, "\r");
    },
    html2text : function(string){
        var _string =   string.replace(/<div/g, "[div-return]<div");
        _string =   _string.replace(/<br>/g, "[br-return]");
        // strip tags
        _string =   _string.replace(/<[^>]+>/g,"");
        // &nbsp; to space
        _string =   _string.replace(/\&nbsp\;/g," ");
        // replace div+br to \r
        _string =   _string.replace(/\[div\-return\]\[br-return\]/g,"\r");
        _string =   _string.replace(/\[div\-return\]/g,"\r");
        _string =   _string.replace(/\[br\-return\]/g,"\r");
        // check empty string
        if(/^\r+$/.test(_string)){
            _string =   '';
        }
        return _string;
    },
    time : function(){
        var date =  new Date();
        return parseInt((date.getTime()) / 1000);
    },
    microtime : function(){
        return (new Date()).getTime();
    },
    random : function(){
        var _r = parseInt(Math.random() * 1000000000);
        if(arguments.length===1){
            _r =   _r%(parseInt(arguments[0]));
        }else if(arguments.length>1){
            _r =   _r%(parseInt(arguments[1])-parseInt(arguments[0])) + arguments[0];
        }
        return _r;
    },
    shuffle:function(arr){
        for(var j,x,i=arr.length;i;j=parseInt(Math.random()*i),x=arr[--i],arr[i]=arr[j],arr[j]=x);
        return arr;
    },
    inArray : function(val,arr){
        var r = false;
        var i,l = arr.length;
        for(i=0;i<l;i++){
            if(val===arr[i]){
                r = true;
                break;
            }
        }
        return r;
    },
    inString : function(str,match){
        if(!str) return false;
        return (str.indexOf(match) !== (-1));
    },
    uniq : function(){
        return (new Date()).getTime();
    }
};