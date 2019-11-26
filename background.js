// milliseconds for a day
const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
// offset milliseconds
var t = (new Date).getTime();
var temp = new Date(t);
var offset = temp.getTimezoneOffset() * 60 * 1000;
// get defualt data if NULL
// else don't
var keys = ["index"];
chrome.storage.local.get(keys, function(items) {
    var i = items.index;
    // if there is data, do nothing
    if (i > 0){
        console.log("still data");
    }
    // else, set default data
    else {
        // today
        var now = (new Date).getTime();
        var i = 1;
        var inter = (now - offset) % DAY_MILLISECONDS;
        var start_day = now - inter;
        var end_day = start_day + DAY_MILLISECONDS;
        var items = {index: i, interval: inter, startTime: start_day, endTime: end_day};
        chrome.storage.local.set(items, function() {});
    }
});
// wait for leftbutton,write button
function waitForLoad(id, callback){
    var timer = setInterval(function(){
        if(document.getElementById(id)){
            clearInterval(timer);
            callback();
        }
    }, 100);
}
// title button control
waitForLoad("title", function(){
    document.getElementById('title').onclick = function () {
        var keys = ["index", "interval", "startTime", "endTime"];
        chrome.storage.local.get(keys, function(items) {
            // today
            var now = (new Date).getTime();
            // get start and end of the day
            var i = 1;
            var inter = (now - offset) % DAY_MILLISECONDS;
            var start_day = now - inter;
            var end_day = start_day + DAY_MILLISECONDS;
            var items = {index: i, interval: inter, startTime: start_day, endTime: end_day};
            chrome.storage.local.set(items, function() {});
            location.reload(true);
        });
    };
});
// left button control
waitForLoad("leftbutton", function(){
    document.getElementById('leftbutton').onclick = function () {
        var keys = ["index", "startTime", "endTime"];
        chrome.storage.local.get(keys, function(items) {
            var i = items.index + 1;
            var start_day = items.startTime - DAY_MILLISECONDS;
            var end_day = items.endTime - DAY_MILLISECONDS;
            var items = {index: i, startTime: start_day, endTime: end_day};
            chrome.storage.local.set(items, function() {});
            location.reload(true);
        });
    };
});
// write button control
waitForLoad("rightbutton", function(){
    document.getElementById('rightbutton').onclick = function () {
        var keys = ["index", "startTime", "endTime"];
        chrome.storage.local.get(keys, function(items) {
            var i = items.index;
            if (i == 1){
                console.log("tomorrow naver comes");
                location.reload(true);
            }
            else {
                var i = items.index - 1;
                var start_day = items.startTime + DAY_MILLISECONDS;
                var end_day = items.endTime + DAY_MILLISECONDS;
                var items = {index: i, startTime: start_day, endTime: end_day};
                chrome.storage.local.set(items, function() {});
                location.reload(true);
            }
        });
    };
});
// erasethis
waitForLoad("erasethis", function(){
    document.getElementById('erasethis').onclick = function () {
        var keys = ["startTime", "endTime"];
        chrome.storage.local.get(keys, function(items) {
            chrome.history.deleteRange({ startTime: items.startTime, endTime: items.endTime - 1}, function(){
                console.log("deletethis");
            });
            location.reload(true);
        });
    };
});
// eraseall
waitForLoad("eraseall", function(){
    document.getElementById('eraseall').onclick = function () {
        var keys = ["startTime", "endTime"];
        chrome.storage.local.get(keys, function(items) {
            chrome.history.deleteAll(function(){
                console.log("deletethis");
            });
            location.reload(true);
        });
    };
});