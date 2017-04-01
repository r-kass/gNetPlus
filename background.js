// Handle requests for passwords
chrome.browserAction.setIcon({path:"logo.JPG"});
chrome.runtime.onMessage.addListener(function(request) {
//    if (request.type === 'get_info') {
        chrome.tabs.create({
            url: chrome.extension.getURL('home.html'),
            active: false
        },
        function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                height: 400,
                width: 250,
                // incognito, top, left, ...
            });
        });
  //  }
});

function setSchool(school) {
    console.log(school);
};
function setCity(city) {
    console.log(city);
};
function setMajor(major) {
    console.log(major);
};
function setEmail(email) {
    console.log(email);
};
function setSearch(search) {
    console.log(search);
};
