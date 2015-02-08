function displayClassesPreview(data)
{
    var today = new Date();
    var class1 = null;
    var class2 = null;

    for (var i = 0; i < data.classes.length; i++)
    {
        for (var j = 0; j < data.classes[i].dates.length; j++)
        {
            for (var k = 0; k < data.classes[i].dates[j].length; k++)
            {
                var date2 = new Date(data.classes[i].dates[j][k]);
                        
                if (date2 >= today)
                {            
                    var timeDiff = Math.abs(date2.getTime() - today.getTime());

                    if (!class1)
                    {
                        class1 = [doTClassesObject(data.classes[i], date2), timeDiff];
                    }
                    else if (!class2)
                    {
                        class2 = [doTClassesObject(data.classes[i], date2), timeDiff];
                    }
                    else if (timeDiff < class1[1])
                    {
                        class2 = class1;
                        class1 = [doTClassesObject(data.classes[i], date2), timeDiff];
                    }
                    else if (timeDiff == class1[1] || timeDiff < class2[1])
                    {
                        class2 = [doTClassesObject(data.classes[i], date2), timeDiff];
                    }
                }
            }
        }
    }
    
    var child = document.createElement('div');
    child.innerHTML = doTClasses( { "array" : [ class1[0], class2[0] ] } );
    child = child.firstChild;
    document.getElementById('insertClasses').appendChild(child); 
}

function displayClassesPage(data)
{
    var today = new Date();

    for (var i = 0; i < data.classes.length; i++)
    {
        var valid = false;

        for (var j = 0; j < data.classes[i].dates.length; j++)
        {
            for (var k = 0; k < data.classes[i].dates[j].length; k++)
            {
                var date2 = new Date(data.classes[i].dates[j][k]);
                        
                if (date2 >= today)
                {
                    valid = true;
                }
            }
        }
       
        if (valid)
        {
            var child = document.createElement('div');
            child.innerHTML = doTSummary(data.classes[i]);
            child = child.firstChild;
            document.getElementById('insertClasses').appendChild(child); 
        }
    }
    
}


function loadClasses(onLoad)
{
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.github.com/repos/woolandsilkco/woolandsilkco.github.io/contents/classes/classesmin.json", true);

    request.onload = function()
    {
        $("#loading").hide();
        console.log(JSON.parse(atob(JSON.parse(request.response).content.replace(/\s/g, ''))));
        onLoad(JSON.parse(atob(JSON.parse(request.response).content.replace(/\s/g, ''))));
    }

    request.onerror = function()
    {
        $("#loading").hide();
        $("#error").show();
    }

    request.send();
}

/* doT.js template code generated by the following template:
 *      <span>{{~it.array :value:index}}<h3>{{=value.date}} - {{=value.title}}!</h3><p>{{=value.description}}</p>{{~}}</span>
 */
function doTClasses(it) { var out='<span>';var arr1=it.array;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+='<h3>'+(value.date)+' - '+(value.title)+'!</h3><p>'+(value.description)+'</p>';} } out+='</span>';return out; }

function doTClassesObject(data, date)
{
    return { "title":data.title, "date":date.toDateString(), "description":data.description };
}

/* doT.js template code generated by the following template:
    <article class="narrow">
        <h1>{{=value.tvaluele}}{{? value.parts > 1}} - {{=value.parts}} Parts{{?}} <span>{{=value.cost}}</span></h1>
        <div class="classbox content clearfix">
            {{? value.note}}<h3>Note: {{=value.note}}</h3>{{?}}
            <h4>Dates</h4>
            <p>{{~value.dates :value2:index2}}{{? index2 > 0}}  OR  {{?}}{{~value2 :value3:index3}}{{? index3 > 0}} & {{?}}{{=value3}}{{~}}{{~}}</p>
            <h4>Times</h4>
            <p>{{~value.times :value2:index2}}{{? index2 > 0}} OR {{?}}{{=value2}}{{~}}</p>
            <h4>Description</h4>
            <p>{{=value.description}}</p>
            <h4>Prerequisvaluees</h4>
            <p>{{=value.prerequisvaluees}}</p>
            <h4>Supplies</h4>
            <p>{{=value.supplies}}</p>
            <h4>Elements to Learn</h4>  
            <ul>
                {{~value.elements :value2:index2}}
                    <li>{{=value2}}</li>
                {{~}}
            </ul>
        </div>
    </article>
*/
function doTSummary(it /**/) { var out='<article class="narrow"> <h1>'+(it.title);if(it.parts > 1){out+=' - '+(it.parts)+' Parts';}out+=' <span>'+(it.cost)+'</span></h1> <div class="classbox content clearfix"> ';if(it.note){out+='<h3>Note: '+(it.note)+'</h3>';}out+=' <h4>Dates</h4> <p>';var arr1=it.dates;if(arr1){var it2,index2=-1,l1=arr1.length-1;while(index2<l1){it2=arr1[index2+=1];if(index2 > 0){out+=' OR ';}var arr2=it2;if(arr2){var it3,index3=-1,l2=arr2.length-1;while(index3<l2){it3=arr2[index3+=1];if(index3 > 0){out+=' & ';}out+=''+(it3);} } } } out+='</p> <h4>Times</h4> <p>';var arr3=it.times;if(arr3){var it2,index2=-1,l3=arr3.length-1;while(index2<l3){it2=arr3[index2+=1];if(index2 > 0){out+=' OR ';}out+=''+(it2);} } out+='</p> <h4>Description</h4> <p>'+(it.description)+'</p> <h4>Prerequisites</h4> <p>'+(it.prerequisites)+'</p> <h4>Supplies</h4> <p>'+(it.supplies)+'</p> <h4>Elements to Learn</h4> <ul> ';var arr4=it.elements;if(arr4){var it2,index2=-1,l4=arr4.length-1;while(index2<l4){it2=arr4[index2+=1];out+=' <li>'+(it2)+'</li> ';} } out+=' </ul> </div></article>';return out; }
