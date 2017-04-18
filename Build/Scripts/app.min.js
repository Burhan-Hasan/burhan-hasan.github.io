var containers = document.getElementsByClassName('col-50');
var Handlebars;
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
    window.history.pushState(null, "Title", "#" + current.textContent.trim().toLowerCase());
});
var skills = Handlebars.compile(document.getElementById('skills').innerHTML);
var langs = Handlebars.compile(document.getElementById('langs').innerHTML);
var studyAndWork = Handlebars.compile(document.getElementById('study-and-work').innerHTML);
Handlebars.registerHelper('isActive', function (value, index) {
    return index <= value ? 'active' : '';
});
Handlebars.registerHelper('getTrackbarPercentStyle', function (value) {
    return 'width:' + value + '%';
});
function GenerateHTML() {
    containers[0].insertAdjacentHTML('afterBegin', langs(_data["langs"]["ru"]));
    containers[0].insertAdjacentHTML('afterBegin', skills(_data));
    containers[1].insertAdjacentHTML('afterBegin', studyAndWork(_data["work"]["ru"]));
    containers[1].insertAdjacentHTML('afterBegin', studyAndWork(_data["study"]["ru"]));
}
