app.ready = function(){
    // start module here
    this.loadModule('moduleMain',null);

    setTimeout(function(){
        $('#cover').addClass('cover-hide');
        setTimeout(function(){
            $('#cover').remove();
        },500);
    },100);
}
app.init();