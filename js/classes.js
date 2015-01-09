function doStuffWithClasses(data)
{
    var today = new Date();
    var class1 = null;
    var class2 = null;

    for (var i = 0; i < data.classes.length; i++)
    {
        for (var j = 0; j < data.classes[i].dates.length; j++)
        {
            var date2 = new Date(data.classes[i].dates[j]);
            
            var timeDiff = Math.abs(date2.getTime() - today.getTime());

            if (timeDiff >= 0)
            {
                if (!class1)
                {
                    class1 = [data.classes[i], timeDiff];
                }
                else if (!class2)
                {
                    class2 = [data.classes[i], timeDiff];
                }
                else if (timeDiff < class1[1])
                {
                    class2 = class1;
                    class1 = [data.classes[i], timeDiff];
                }
                else if (timeDiff == class1[1] || timeDiff < class2[1])
                {
                    class2 = [data.classes[i], timeDiff];
                }
            }
        }
    }

    console.log(class1);
    console.log(class2);
}

function loadClasses(onLoad)
{
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.github.com/repos/woolandsilkco/woolandsilkco.github.io/contents/classes.json", true);

    request.onload = function()
    {
        onLoad(JSON.parse(atob(JSON.parse(request.response).content.replace(/\s/g, ''))));
    }

    request.onerror = function()
    {
        alert('BufferLoader: XHR error');
    }

    request.send();
}
