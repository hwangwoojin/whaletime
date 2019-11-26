function regExpUrl(url) {
    // for deleting 'https://', 'http://' and 'www.'
    var head_exp = /http(s*):\/\/((www.)*)/;
    // for deleting unimportant url address
    var main_exp = /[\w.]+/;
    // check if 'http(s)://(www.)[EFFECTIVE ADDRESS]'
    return main_exp.exec((url).replace(head_exp, ''));
}
// print date
function print(index, tim){
    // today and yesterday
    var string = ""
    if (index == 1){
        string += "Today"+"<br>";
    }
    else if (index == 2){
        string += "Yesterday"+"<br>";
    }
    else {
        string += (index-1)+" days ago"+"<br>";
    }
    // print time as GMT format
    // yyyy년 mm월 dd일
    var myDate = new Date(tim);
    string += /[\d.]+\D[\d.]+\D[\d.]+\D/.exec(myDate.toLocaleString());
    // day
    // sunday to saturday as index no
    var myDay = myDate.getDay();
    if (myDay == 0){
        string += "SUN";
    } else if(myDay == 1){
        string += "MON";
    } else if(myDay == 2){
        string += "TUE";
    } else if(myDay == 3){
        string += "WED";
    } else if(myDay == 4){
        string += "THU";
    } else if(myDay == 5){
        string += "FRI";
    } else {
        string += "SAT";
    }
    document.getElementById("id_date").innerHTML = string;
}
// get data
var keys = ["index", "startTime"];
chrome.storage.local.get(keys, function(items) {
    print(items.index, items.startTime);
});