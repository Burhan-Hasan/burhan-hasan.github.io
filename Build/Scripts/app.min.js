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
    window.history.pushState(null, "Title", "#" + current.textContent.trim());
});
var skills = Handlebars.compile(document.getElementById('skills').innerHTML);
Handlebars.registerHelper('isActive', function (value, index) {
    return index <= value ? 'active' : '';
});
function GenerateHTML() {
    //SKILLS
    containers[0].insertAdjacentHTML('afterBegin', skills(_data));
}
