function GetSkills() {
    var docFragment = document.createDocumentFragment();

}
var Handlebars: any;
var skills = Handlebars.compile(document.getElementById('skills').innerHTML);
Handlebars.registerHelper('isActive', function (value, index) {
    return index <= value ? 'active' : '';
});

var containers = document.getElementsByClassName('col-50');

//SKILLS
containers[0].insertAdjacentHTML('afterBegin', skills(window['data']));

function dataLoaded() {
    debugger;
}