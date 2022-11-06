setInterval(function()
{
var address = "http://comic.studio";

var t1 = Date.now();
var t2;

var max = 90000; // 100 (Cloudflare's timeout time) - 10 (if not responding, i'm just too lazy :/ ) = 90
var failed = false;
var blank = "";
var timetaken = "";

var httpReq = (window.XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
if(httpReq == null) {
    console.log("Error: XMLHttpRequest failed to initiate.");
}
httpReq.onreadystatechange = function() {

    var failTimer = setTimeout(function() {
                               failed = true;
                               httpReq.abort();
                               }, max);

    if (httpReq.readyState == 4) {  //Completed loading
        if (!failed && (httpReq.status == 200 || httpReq.status == 0)) {

            clearTimeout(failTimer);

            t2 = Date.now();

            var timeTotal = (t2 - t1);
            if(timeTotal > max) {
                onFail();
            } else {
                onSuccess(timeTotal);
            }

        }
        else {  //Otherwise, there was a problem while loading
            console.log("Error " + httpReq.status + " has occurred.");
            onFail();
        }
    }
}
try {
    httpReq.open("GET", address, true);
    httpReq.send(null);

} catch(e) {
    console.log("Error retrieving data httpReq. Some browsers only accept cross-domain request with HTTP.");
    onFail();
}


function onSuccess(timeTotal) 
{
    document.getElementById("isdown").innerHTML = "No";
    timetaken  = blank.concat("Time taken: ", timeTotal);
    document.getElementById("time").innerHTML = timetaken;
}
function onFail() {
    document.getElementById("isdown").innerHTML = "Yes";
    timetaken  = blank.concat("Time taken: ", max);
    document.getElementById("time").innerHTML = timetaken;
}

timeTotal = 0;
timetaken = "";

}, 5000);

setInterval(function()
{
    function isSiteOnline(url,callback) {
    // try to load favicon
    var timer = setTimeout(function(){
        // timeout after 5 seconds
        callback(false);
    },5000)

    var img = document.createElement("img");
    img.onload = function() {
        clearTimeout(timer);
        callback(true);
    }

    img.onerror = function() {
        clearTimeout(timer);
        callback(false);
    }

    img.src = url+"/images/cookierun/icons/1e2ef5c3c84e065c7a6bdcb8a6f91bca.png";
    }
    isSiteOnline("http://cdn.comic.studio",function(found){
    if(found) {
        document.getElementById("isdown2").innerHTML = "No";
    }
    else {
        document.getElementById("isdown2").innerHTML = "Yes";
    }
    })


}, 5000);


setInterval(function()
{
    function checkServerStatus( url )
    {
    var script = document.body.appendChild(document.createElement("script"));
    script.onload = function()
    {
        document.getElementById("isdown3").innerHTML = "No";
    }
    script.onerror = function()
    {
        document.getElementById("isdown3").innerHTML = "Yes";
    };
    script.src = url;
    }

checkServerStatus( "https://comic.studio" );

}, 5000);