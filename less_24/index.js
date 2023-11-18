let searchItems = [
    "item 1",
    "item 2",
    "line 3",
    "line 4",
    "row 1",
    "row 2"
]
let ul;
let searchString;

function initUL(){
    ul = document.getElementById("searchResult");
    fillUl();
}

function onChangeFilter(){
    fillUl()
}

function fillUl(){
    let lis = "";
    searchString = document.getElementById("searchString").value;
    searchItems.forEach(function (el){
        if (el.indexOf(searchString) >= 0 || searchString == ""){
            lis = lis + "<li>"+el+"</li>";
        }
    })
    ul.innerHTML = lis;
}

document.addEventListener('DOMContentLoaded', function(){
    initUL();
});
