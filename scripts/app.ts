function GetSkills() {
    var docFragment = document.createDocumentFragment();

}
var Mustache:any;
var html = Mustache.to_html(document.getElementById('skills').innerHTML
, window['data']);

console.log(html);