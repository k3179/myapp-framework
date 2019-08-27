var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onDevicePause.bind(this), false);
        document.addEventListener('resume', this.onDeviceResume.bind(this), false);
    },

    // device ready Event Handler
    onDeviceReady: function() {
        console.log('ready');
    },
    // device pause Event Handler
    onDevicePause: function() {
        console.log('pause');
    },
    // devide resume Event Handler
    onDeviceResume: function() {
        console.log('resume');
    }

};

app.initialize();