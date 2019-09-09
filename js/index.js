app.ready = function(){

    // init version
    app.version.init();

    // start module here
    this.loadModule('moduleMain',null);

    // remove cover
    setTimeout(function(){
        $('#cover').addClass('cover-hide');
        setTimeout(function(){
            $('#cover').remove();
        },500);
    },100);
}
app.init();