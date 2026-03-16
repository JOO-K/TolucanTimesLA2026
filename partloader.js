// Only fetch a component if its placeholder exists on this page
function loadPart(file, id) {
    if (!document.getElementById(id)) return;
    $.get(file, function(data) {
        $("#" + id).replaceWith(data);
    });
}

loadPart("./html/navComp.html",           "nav-ph");
loadPart("./html/footerComp.html",        "footer-ph");
loadPart("./html/slideComp.html",         "slide-ph");
loadPart("./html/publicationComp.html",   "publication-ph");
loadPart("./html/homepageboxnavComp.html","homepageboxnav-ph");
