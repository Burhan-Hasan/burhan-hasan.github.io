
var Handlebars: any;
var curLang = "ru";

var Containers;
(function (Containers) {
    var containers = document.getElementsByClassName('col-50');

    Containers.MainInfo = document.getElementById('main-info')
    Containers.RightSide = containers[0];
    Containers.LeftSide = containers[1];

})(Containers || (Containers = {}));

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.send();
var _data = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState != 4) return;
    _data = JSON.parse(xhr.responseText);
    GenerateHTML();
}

var lngs = document.getElementById('lngs');
lngs.addEventListener('click', function (e: any) {
    var current = e.target.closest('li');
    var sibling = current.nextElementSibling || current.previousElementSibling;
    sibling.className = '';
    e.stopPropagation();
    current.className = 'active';
    curLang = current.textContent.trim().toLowerCase();
    window.history.pushState(null, "Title", "#" + curLang);
});

var mainInfo = Handlebars.compile(document.getElementById('main-info-template').innerHTML);
var skills = Handlebars.compile(document.getElementById('skills').innerHTML);
var langs = Handlebars.compile(document.getElementById('langs').innerHTML);
var studyAndWork = Handlebars.compile(document.getElementById('study-and-work').innerHTML);

Handlebars.registerHelper('isActive', function (value, index) {
    return index <= value ? 'active' : '';
});
Handlebars.registerHelper('getTrackbarPercentStyle', function (value) {
    return 'width:' + value + '%';
});

Handlebars.registerHelper('getBlockCaption', function (input) {
    return input[curLang];
});

function GenerateHTML() {
    Containers.MainInfo.innerHTML = mainInfo(_data["mainInfo"][curLang]);

    Containers.RightSide.insertAdjacentHTML('afterBegin', langs(_data["langs"]["ru"]));
    Containers.RightSide.insertAdjacentHTML('afterBegin', skills(_data["skills"]));
    Containers.RightSide.insertAdjacentHTML('beforeEnd', skills(_data["add-skills"]));

    Containers.LeftSide.insertAdjacentHTML('afterBegin', studyAndWork(_data["work"]["ru"]));
    Containers.LeftSide.insertAdjacentHTML('afterBegin', studyAndWork(_data["study"]["ru"]));
}
