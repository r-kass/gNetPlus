// Handle requests for passwords
chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'get_info') {
        chrome.tabs.create({
            url: chrome.extension.getURL('dialog.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
        });
    }
});
function setSchool(school) {
    // Do something, eg..:
    console.log(school);
};
function setCity(city) {
    // Do something, eg..:
    console.log(city);
};
function setMajor(major) {
    // Do something, eg..:
    console.log(major);
};
function setEmail(email) {
    // Do something, eg..:
    console.log(email);
};
