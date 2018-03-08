/**
 * __VERGE3D_PLAYER__ - delete this comment if you want to edit the player's code
 */
'use strict';

window.addEventListener('load', function() {


function V3DPlayer(containerId, ctxSettings, preloader) {
    v3d.AppPuzzles.call(this, containerId, ctxSettings, preloader);
}

V3DPlayer.prototype = Object.assign(Object.create(v3d.AppPuzzles.prototype), {

    constructor: V3DPlayer,

    onLoadFinished: function(sceneLoaded, logicLoaded, editorLoaded) {
        if (sceneLoaded) {
            this.run();
            initFullScreen();
            runCode();
        }
    },

});

var app = (function() {

    var URL = '__URL__The Ranch.gltf';
    var LOGIC = '__LOGIC__visual_logic.js';
    var PUZZLES_DIR = '../../puzzles/';

    var params = v3d.AppUtils.getPageParams();
    var url = URL.replace('__URL__', '') || params.load;
    if (!url) {
        console.log('No URL specified');
        return;
    }
    var logicURL = params.logic || '';
    if (!logicURL || !v3d.AppUtils.isXML(logicURL)) {
        logicURL = LOGIC.replace('__LOGIC__', '') || logicURL;
    }


    var app = new V3DPlayer('container', null, 
           new v3d.SimplePreloader({ container: 'container' }));

    prepareExternalInterface(app);

    if (v3d.AppUtils.isXML(logicURL)) {
        var logicJS = logicURL.match(/(.*)\.xml$/)[1] + '.js';
        app.loadSceneWithEditor(url, logicJS, PUZZLES_DIR);    
    } else if (v3d.AppUtils.isJS(logicURL)) {
        app.loadSceneWithLogic(url, logicURL);
    } else {
        app.loadScene(url);
    }

    return app;

})();

function initFullScreen() {

    if (document.fullscreenEnabled || 
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled)
        fullscreen_button.style.display = 'inline';

    fullscreen_button.addEventListener('click', function(event) {
        event.stopPropagation();
        if (document.fullscreenElement || 
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement) {
            exitFullscreen();
        } else
            requestFullscreen(document.body);
    });

    function changeFullscreen() {
        if (document.fullscreenElement || 
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement)
            fullscreen_button.className = 'fullscreen-close';
        else
            fullscreen_button.className = 'fullscreen-open';
    }

    document.addEventListener('webkitfullscreenchange', changeFullscreen);
    document.addEventListener('mozfullscreenchange', changeFullscreen);
    document.addEventListener('msfullscreenchange', changeFullscreen);
    document.addEventListener('fullscreenchange', changeFullscreen);

    function requestFullscreen(elem) {
        if (elem.requestFullscreen)
            elem.requestFullscreen();
        else if (elem.mozRequestFullScreen)
            elem.mozRequestFullScreen();
        else if (elem.webkitRequestFullscreen) 
            elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen)
            elem.msRequestFullscreen();
    }
    
    function exitFullscreen() {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.msExitFullscreen)
            document.msExitFullscreen();
    }
}

function prepareExternalInterface(app) {
    // register functions in the app.ExternalInterface to call them from Puzzles, e.g:
    // app.ExternalInterface.myJSFunction = function() {
    //     console.log('Hello, World!');
    // }

}

function runCode() {
    // add your code here, e.g. console.log('Hello, World!');

}

});
