function doStuffWithClasses(data)
{
    var today = new Date();
    var class1 = null;
    var class2 = null;

    for (var i = 0; i < data.length; i++)
    {
        console.log(data[i]);

        for (var j = 0; j < data[i].dates.length; j++)
        {
            data[i].dates[j];

            var date2 = new Date(data[i].dates[j]);
            
            var timeDiff = Math.abs(date2.getTime() - today.getTime());

            if (!class1)
            {
                class1 = [data[i], timeDiff];
            }
            else if (!class2)
            {
                class2 = [data[i], timeDiff];
            }
            else if (timeDiff < class1[1])
            {
                class2 = class1;
                class1 = [data[i], timeDiff];
            }
            else if (timeDiff < class2[1])
            {
                class2 = [data[i], timeDiff];
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
