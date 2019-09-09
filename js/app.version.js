/* global ma, cordova, debug */

app.version =  {
    appId : 'moyiza',
    code : '',  // 2017102902
    number : '',    // 1.2.2
    Number : '',    // 1002002
    checkUrl : 'http://apps.myapp.com/check',
    downloadUrl : 'http://apps.myapp.com/download',
    init : function(){
        if(window.cordova && window.cordova.getAppVersion){
            cordova.getAppVersion.getVersionCode(function(code){
                app.version.code =  code;
            });
            cordova.getAppVersion.getVersionNumber(function(number){
                app.version.number =  number;
                var number_array    =  number.split('.');
                app.version.Number =  parseInt(number_array[0]) * 1000000 + parseInt(number_array[1]) * 1000 + parseInt(number_array[2]);
            });
        }else{
            // debug
            app.version.code =  '2019090601';
            app.version.number =  '1.1.1';
            app.version.Number =  '1001001';
        }
    },
    checkVersion : function(alert_error,show_loading){
        if(show_loading){
            app.system.loading();
        }
        app.net.post(app.version.checkUrl,{app_id:app.version.appId},function(data){
            app.system.loading(1);
            // found new version
            if(parseInt(data.version) > app.version.Number){
                app.notification.stat.new_version   =  1;
                app.system.confirm({
                    title:'새로운 버전이 있습니다.',
                    content:('최신버전: '+data.version_number+"\n지금 다운로드 하시겠습니까?")
                },function(){
                    cordova.InAppBrowser.open((app.version.downloadUrl), '_system', 'location=no');
                });
            }else{
                if(alert_error){
                    app.system.notify('이미 최신버전입니다.');
                }
            }
        },'json');

    }
};