var containers = document.getElementsByClassName('col-50');
var Handlebars: any;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.send();
var _data = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    _data = JSON.parse(xhr.responseText);
    GenerateHTML();
}


var skills = Handlebars.compile(document.getElementById('skills').innerHTML);
Handlebars.registerHelper('isActive', function (value, index) {
    return index <= value ? 'active' : '';
});

function GenerateHTML() {
    //SKILLS
    containers[0].insertAdjacentHTML('afterBegin', skills(_data));
}