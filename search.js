document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var search = document.getElementById('search').value;
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.setSearch(search);
        window.close();     // Close dialog
    });
};
