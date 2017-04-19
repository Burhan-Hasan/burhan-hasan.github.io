var Handlebars;
var curLang = "ru";
var Containers;
(function (Containers) {
    var containers = document.getElementsByClassName('col-50');
    Containers.MainInfo = document.getElementById('main-info');
    Containers.RightSide = containers[0];
    Containers.LeftSide = containers[1];
})(Containers || (Containers = {}));
var Templates;
(function (Templates) {
    Templates.MainInfo = Handlebars.compile(document.getElementById('main-info-template').innerHTML);
    Templates.Skills = Handlebars.compile(document.getElementById('skills').innerHTML);
    Templates.Langs = Handlebars.compile(document.getElementById('langs').innerHTML);
    Templates.StudyAndWork = Handlebars.compile(document.getElementById('study-and-work').innerHTML);
})(Templates || (Templates = {}));
var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.send();
var _data = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState != 4)
        return;
    _data = JSON.parse(xhr.responseText);
    GenerateHTML();
};
var lngs = document.getElementById('lngs');
lngs.addEventListener('click', function (e) {
    var current = e.target.closest('li');
    var sibling = current.nextElementSibling || current.previousElementSibling;
    sibling.className = '';
    e.stopPropagation();
    current.className = 'active';
    curLang = current.textContent.trim().toLowerCase();
    window.history.pushState(null, "Title", "#" + curLang);
});
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
    Containers.MainInfo.innerHTML = Templates.MainInfo(_data["mainInfo"][curLang]);
    Containers.RightSide.insertAdjacentHTML('afterBegin', Templates.Langs(_data["langs"]["ru"]));
    Containers.RightSide.insertAdjacentHTML('afterBegin', Templates.Skills(_data["skills"]));
    Containers.RightSide.insertAdjacentHTML('beforeEnd', Templates.Skills(_data["add-skills"]));
    Containers.LeftSide.insertAdjacentHTML('afterBegin', Templates.StudyAndWork(_data["work"]["ru"]));
    Containers.LeftSide.insertAdjacentHTML('afterBegin', Templates.StudyAndWork(_data["study"]["ru"]));
}
