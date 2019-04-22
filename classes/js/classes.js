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
                var currentClass = data.classes[i];
                for (var k = 0; k < currentClass.dates[j].length; k++) { var x = currentClass.dates[j][k]; currentClass.dates[j][k] = x.substring(0, x.length - 5); }
                classes.push({ "title" : currentClass.title, "link": currentClass.link, "date" : currentClass.dates[j], "time" : currentClass.times[j], "epoch" : date2.getTime(), "image" : currentClass.image});
            }
        }
    }
    classes.sort( function(a, b) { return a.epoch - b.epoch; } );
    
    var child = document.createElement('div');
    if (classes.length == 0)
    {
        $("#noclasses").show();
    }
    else
    {
        var obj = { "array" : classes };
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
        request.open("GET", "https://api.github.com/repos/woolandsilkco/woolandsilkco.github.io/contents/classes/classespreviewmin.json", true);

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
 *  <span>{{~it.array :value:index}}<p>{{? value.link}}<a href="{{=value.link}}">{{?}}{{? value.image}}<img src={{=value.image}} alt="">{{?}}<span class="title">{{=value.title}}</span>{{? value.link}}</a>{{?}} - {{~value.date :value2:index2}}{{? index2 > 0}} & {{?}}{{=value2}}{{~}}<span class="time">({{=value.time}})</span></p>{{~}}</span>
 */
function doTClasses(it) { var out='<span>';var arr1=it.array;if(arr1){var value,index=-1,l1=arr1.length-1;while(index<l1){value=arr1[index+=1];out+='<p>';if(value.link){out+='<a href="'+(value.link)+'">';}if(value.image){out+='<img src='+(value.image)+' alt="">';}out+='<span class="title">'+(value.title)+'</span>';if(value.link){out+='</a>';}out+=' - ';var arr2=value.date;if(arr2){var value2,index2=-1,l2=arr2.length-1;while(index2<l2){value2=arr2[index2+=1];if(index2 > 0){out+=' & ';}out+=''+(value2);} } out+='<span class="time">('+(value.time)+')</span></p>';} } out+='</span>';return out; }

/* doT.js template code generated by the following template:
    <article class="narrow">
        {{? it.link}}<a href="{{=it.link}}">{{?}}
          <h1>{{=it.title}}{{? it.parts > 1}} -{{=it.parts}} Parts{{?}}<span>, {{=it.cost}}</span></h1>
        {{? it.link}}</a>{{?}}
        <div class="classbox content clearfix">
            {{? it.link}}<a href="{{=it.link}}">{{?}}{{? it.image}}<img src={{=it.image}} alt="">{{?}}{{? it.link}}</a>{{?}}
            {{? it.note}}<h3>Note: {{=it.note}}</h3>{{?}}
            <h4>Dates</h4>
            <p>{{~it.dates :value:index2}}{{? index2 > 0}}  <strong>OR</strong>  {{?}}{{~value :value:index3}}{{? index3 > 0}} & {{?}}{{=value}}{{~}}{{~}}</p>
            <h4>Times</h4>
            <p>{{~it.times :value:index2}}{{? index2 > 0}} <strong>OR</strong> {{?}}{{=value}}{{~}}</p>
            {{? it.description}}
              <h4>Description</h4>
              <p>{{=it.description}}</p>
            {{?}}
            {{? it.prerequisites}}
              <h4>Prerequisites</h4>
              <p>{{=it.prerequisites}}</p>
            {{?}}
            {{? it.supplies}}
              <h4>Supplies</h4>
              <p>{{=it.supplies}}</p>
            {{?}}
        </div>
    </article>
*/
function doTSummary(it) { var out='<article class="narrow"> ';if(it.link){out+='<a href="'+(it.link)+'">';}out+=' <h1>'+(it.title);if(it.parts > 1){out+=' -'+(it.parts)+' Parts';}out+='<span>, '+(it.cost)+'</span></h1> ';if(it.link){out+='</a>';}out+=' <div class="classbox content clearfix"> ';if(it.link){out+='<a href="'+(it.link)+'">';}if(it.image){out+='<img src='+(it.image)+' alt="">';}if(it.link){out+='</a>';}out+=' ';if(it.description){out+=' <h4>Description</h4> <p>'+(it.description)+'</p> ';}out+=' ';if(it.note){out+='<h3>Note: '+(it.note)+'</h3>';}out+=' <h4>Dates</h4> <p>';var arr1=it.dates;if(arr1){var value,index2=-1,l1=arr1.length-1;while(index2<l1){value=arr1[index2+=1];if(index2 > 0){out+=' <strong><u>OR</u></strong> ';}var arr2=value;if(arr2){var value,index3=-1,l2=arr2.length-1;while(index3<l2){value=arr2[index3+=1];if(index3 > 0){out+=' & ';}out+=''+(value);} } } } out+='</p> <h4>Times</h4> <p>';var arr3=it.times;if(arr3){var value,index2=-1,l3=arr3.length-1;while(index2<l3){value=arr3[index2+=1];if(index2 > 0){out+=' <strong><u>OR</u></strong> ';}out+=''+(value);} } out+='</p> ';if(it.prerequisites){out+=' <h4>Prerequisites</h4> <p>'+(it.prerequisites)+'</p> ';}out+=' ';if(it.supplies){out+=' <h4>Supplies</h4> <p>'+(it.supplies)+'</p> ';}out+=' </div></article>';return out; }

