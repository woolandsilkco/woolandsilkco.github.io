function doStuffWithClasses(data)
{
    console.log(data.content);
}

function loadClasses(onLoad)
{
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.github.com/repos/woolandsilkco/woolandsilkco.github.io/contents/classes.json", true);
    request.responseType = "arraybuffer";

    request.onload = function()
    {
        onLoad(request.response);
    }

    request.onerror = function()
    {
        alert('BufferLoader: XHR error');
    }

    request.send();
}
