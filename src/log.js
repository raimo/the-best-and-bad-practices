var MAX_LINES = 1;

function log() {
    var msg = '';
    for (var s in arguments) {
        var arg = arguments[s];
        if (typeof(arg) === 'object') {
            msg += JSON.stringify(arg);
        } else {
            msg += arg;
        }
    }
    if (typeof(window) !== 'undefined') {
        var $ = require('jquery-browserify');
        var $container = $("#log");
        msg = msg.replace(/#([a-z]+)\[/g, '<span style="color:$1;">')
                 .replace(/\]/g, '</span>');
        if ($container.find('.message:last').html() !== msg) {
            $container.append('<li class="message">'+msg+'</li>');
        }
        $container.html($container.find('.message').slice(-MAX_LINES));
    } else {
        require('colorize').console.log(msg);
    }
}
log.add = function(addition) {
    if (typeof(window) !== 'undefined') {
        var $ = require('jquery-browserify');
        var $container = $("#log");
        var existingContent = $container.find('.message:last').html();
        $container.find('.message:last').remove();
        log(existingContent, addition);
    } else {
        log('\eu008' + addition);
    }
}
module.exports = log;
