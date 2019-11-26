// list for index of 6 most visited site
var mainlist = new Array();
var site = new Array();
var count = new Array();
// etc site
var etc = 0;
var total = 0;
//  get history data
var keys = ["startTime", "endTime"];
chrome.storage.local.get(keys, function(items) {
    // get history during one day
    chrome.history.search({text: '', startTime: items.startTime, endTime: (items.endTime - 1), maxResults: 9999}, function(browser_history) {
        // visited site
        site = new Array();
        // visited count
        count = new Array();
        // total visit
        total = 0;
        // totalvisited
        var detail = '';
        browser_history.forEach(function(page) {
            var url = String(regExpUrl(page.url));
            // lets find
            var index = site.indexOf(url);
            // if cannot find, add new one
            if (index == -1){
                site.push(url);
                count.push(1);
            }
            // else find, append
            else {
                count[index] += 1;
            }
            // add 1 to total
            total++;
            // add detailvisited
            // detete < for tag-independent
            detail += '<a href="' + page.url + '" target="_blank"> ' + (page.title).replace(/</gi, '?') + '<br>';
        });
        // find index of the most visited site
        var max = 60 * 60 * 24;
        var index = 0;
        var subtotal = 0;
        for (var i = 0; (i < 10) && (i < site.length); i++){
            // find most visited site less than visits
            var result = 0;
            // find most visited site under max
            for (var j = 0; j < total; j++){
                if ((count[j] > result) && (count[j] < max)){
                    index = j;
                    result = count[j];
                }
            }
            // if result be 1, don't save it
            if (result == 1){
                break;
            }
            // add at mainlist
            mainlist[i] = index;
            // set flags
            max = result;
            subtotal += result;
        }
        // calculate etc value
        etc = total - subtotal;
        // allvisited and detail visited
        // if no history
        if (total == 0){
            document.getElementById("allvisited").innerHTML = 'No result' + '<br>';
            document.getElementById("detailvisited").innerHTML = 'No result' + '<br>';
        }
        else {
            var result = ''
            for (var j = 0; j < site.length; j++) {
                result += '<a href="http://' + site[j] + '" target="_blank"> ' + site[j] + ' (' + count[j] + ')<br>';
            }
            document.getElementById("allvisited").innerHTML = result;
            document.getElementById("detailvisited").innerHTML = detail;
        }
});
// regular expression for url conversion
// input : https://www.github.com/afrfrafw/awfwfawbrbrbr
// output : github.com
function regExpUrl(url) {
    // for deleting 'https://', 'http://', 'www.', 'm.', 'mobile.'(for mobile)
    var head_exp = /http(s*):\/\/((www.)*)(m.)*(mobile.)*/;
    // for deleting unimportant url address
    var main_exp = /[\w-.]+/;
    // check if 'http(s)://(www.)[EFFECTIVE ADDRESS]'
    return main_exp.exec((url).replace(head_exp, ''));
}});
// load data
google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var graphlist = [['site', 'count']];
        // if empty history, print 'the nothing'
        if (total == 0){
            graphlist.push(['No result', 1]);
            // most visted site
            document.getElementById("mostvisited").innerHTML = 'No result' + '<br>';
        }
        // else set table
        else {
            for (var i = 0; i < mainlist.length; i++){
                var index = mainlist[i];
                graphlist.push([site[index], count[index]]);
            }
            // add etc site
            graphlist.push(['others', etc]);
            // set most visited
            mvs = site[mainlist[0]];
            mvscount = count[mainlist[0]];
            document.getElementById("mostvisited").innerHTML = '<a href="http://' + mvs + '" target="_blank"> ' + mvs + ' (' + mvscount + ')<br>';
        }
        // total
        document.getElementById("countvisited").innerHTML = total + '<br>';
        // draw
        var data = google.visualization.arrayToDataTable(graphlist);
// options
var options = {
    width: 400,
    height: 400,
    pieHole: 0.3,
    legend: 'none'
};
// draw chart
var chart = new google.visualization.PieChart(document.getElementById('id_donut'));
    chart.draw(data, options);
}