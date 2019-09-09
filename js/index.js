app.ready = function(){

    // init version
    app.version.init();

    setTimeout(function(){
        //app.storage.set('test','hello');
        console.log(app.storage.get('test'));
    },500);


    // start module here
    this.loadModule('moduleMain',null);

    // inappbrowser
    //cordova.InAppBrowser.open('http://122.115.36.42:8029/', '_blank', 'location=no');

    // remove cover
    setTimeout(function(){
        $('#cover').addClass('cover-hide');
        setTimeout(function(){
            $('#cover').remove();
        },500);
    },100);
}
app.init();