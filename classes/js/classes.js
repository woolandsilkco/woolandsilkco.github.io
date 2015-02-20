function displayClassesPreview(data)
{
    var today = new Date();
    var classes = [];

    for (var i = 0; i < data.classes.length; i++)
    {
        for (var j = 0; j < data.classes[i].dates.length; j++)
        {
            var date2 = new Date(data.classes[i].dates[j][0]);
                    
            if (date2 >= today)
            {
                classes.push([data.classes[i], j]);
            }
        }
    }
    
    var child = document.createElement('div');
    if (classes.length == 0)
    {
        $("#noclasses").show();
    }
    else
    {
        var obj = { "array" : classes };
        console.log(dotClasses(obj));
        child.innerHTML = doTClasses( obj );
        child = child.firstChild;
        document.getElementById('insertClasses').appendChild(child); 
    }
}

function displayClassesPage(data)
{
    var today = new Date();
    $("#noclasses").show();

    for (var i = 0; i < data.classes.length; i++)
    {
        var valid = false;

        for (var j = 0; j < data.classes[i].dates.length; j++)
        {
            var date2 = new Date(data.classes[i].dates[j][0]);
                    
            if (date2 >= today)
            {
                valid = true;
            }
        }
       
        if (valid)
        {
            $("#noclasses").hide();
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
    if (onLoad == displayClassesPage)
        request.open("GET", "https://api.github.com/repos/woolandsilkco/woolandsilkco.github.io/contents/classes/classesmin.json", true);
    else
        request.open("GET", "https://api.github.com/repos/woolandsilkco/woolandsilkco.github.io/contents/classespreview.json", true);

    request.onload = function()
    {
        $("#loading").hide();
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
 *  {{~it.array :value:index}}<p><span class="title">{{=value[0].title}}</span> - {{~value[0].dates[value[1]] :value2:index2}}{{? index2 > 1}} & {{?}}{{=value2}}{{~}} ({{=value[0].times[value[1]]}})</p>{{~}}
 */
function doTClasses(it /**/) { var out='';var arr1=it.array;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+='<p><span class="title">'+(value[0].title)+'</span> - ';var arr2=value[0].dates[value[1]];if(arr2){var value2,index2=-1,l2=arr2.length-1;while(index2<l2){value2=arr2[index2+=1];if(index2 > 1){out+=' & ';}out+=''+(value2);} } out+=' ('+(value[0].times[value[1]])+')</p>';} } return out; }


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
