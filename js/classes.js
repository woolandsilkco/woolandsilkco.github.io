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
                    class1 = [doTClassesObject(data.classes[i], j), timeDiff];
                }
                else if (!class2)
                {
                    class2 = [doTClassesObject(data.classes[i], j), timeDiff];
                }
                else if (timeDiff < class1[1])
                {
                    class2 = class1;
                    class1 = [doTClassesObject(data.classes[i], j), timeDiff];
                }
                else if (timeDiff == class1[1] || timeDiff < class2[1])
                {
                    class2 = [doTClassesObject(data.classes[i], j), timeDiff];
                }
            }
        }
    }
    
    var child = document.createElement('span');
    child.innerHTML = doTClasses( { "array" : [ class1[0], class2[0] ] } );
    child = child.firstChild;
    document.getElementById('classes').appendChild(child); 
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

/* doT.js template code generated by the following template:
 *      {{~it.array :value:index}}
 *      <h3>{{=value.date}} - {{=value.title}}!</h3>
 *      <p>{{=value.description}}</p>{{~}}
 */
function doTClasses(it) { var out='';var arr1=it.array;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+='\n<h3>'+(value.date)+' - '+(value.title)+'!</h3>\n<p>'+(value.description)+'</p>';} } return out; }

function doTClassesObject(data, index)
{
    return { "title":data.title, "date":data.dates[index], "description":data.description };
}
