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
        console.log(request.response);
        console.log(request.response.content);
        console.log(request.response.content.replace(/\s/g, ''));
        onLoad(atob(request.response.content.replace(/\s/g, '')));
    }

    request.onerror = function()
    {
        alert('BufferLoader: XHR error');
    }

    request.send();
}
