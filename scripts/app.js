var data = null;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState != 4)
        return;
    data = JSON.parse(xhr.responseText);
    console.log(data);
};
xhr.send();
