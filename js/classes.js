function doStuffWithClasses(data)
{
    console.log(data);
}

function loadClasses(onLoad)
{
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.github.com/repos/woolandsilkco/woolandsilkco.github.io/contents/classes.json", true);

    request.onload = function()
    {
        var stuff = request.response;
        var content = stuff.content;
        var atobd = atob(content);
        onLoad(atobd);
    }

    request.onerror = function()
    {
        alert('BufferLoader: XHR error');
    }

    request.send();
}
