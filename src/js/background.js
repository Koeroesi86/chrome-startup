/**
 * Created by Chris on 29/01/2017.
 */

//defaults
var homeUrl = 'about:newtab';
var windowCreate = true;
var replaceAllTabs = false;

//load settings
chrome.storage.sync.get(['url', 'windowCreate', 'replaceAllTabs'], function(storage) {
    if(storage) {
        if(storage.hasOwnProperty('url')) {
            homeUrl = storage.url;
        }

        if(storage.hasOwnProperty('windowCreate')) {
            windowCreate = storage.windowCreate;
        }

        if(storage.hasOwnProperty('replaceAllTabs')) {
            replaceAllTabs = storage.replaceAllTabs;
        }
    }
});

//subscribe for option changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if(changes.hasOwnProperty('url')) {
        homeUrl = changes.url;
    }

    if(changes.hasOwnProperty('windowCreate')) {
        windowCreate = changes.windowCreate;
    }

    if(storage.hasOwnProperty('replaceAllTabs')) {
        replaceAllTabs = storage.replaceAllTabs;
    }
});

//startup
chrome.runtime.onStartup.addListener(function () {
    init();
});

setTimeout(function () { //add timeout to run as a fallback of not firing onStartup
    init();
}, 10);

//window creation
chrome.windows.onCreated.addListener(function (w) {
    if(w.type != "normal") {
        return;
    }

    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        if(!windowCreate && !replaceAllTabs) {
            return;
        }

        if(tabs.length == 1) {
            var tab = tabs[0];
            if(tab.url != 'chrome://newtab/' && tab.url != 'about:newtab') {
                // prevent other pages than new tab from redirect
                return;
            }

            navigate(homeUrl, tab.id);
        } else if (tabs.length < 1) {
            newTab(homeUrl);
        }
    });
});

//tab opening
chrome.tabs.onCreated.addListener(function (tab) {
    if(['chrome://newtab/', 'about:newtab', 'about:blank', '', homeUrl].indexOf(tab.url) == -1) {
        // prevent other pages than new tab from redirect
        return;
    }
    navigate(homeUrl, tab.id);
});

//extension icon click
//TODO: middle click
chrome.browserAction.onClicked.addListener(function(tab) {
    navigate(homeUrl, tab.id);
});

//context menu
chrome.contextMenus.create({
    "type":"normal",
    "title": chrome.i18n.getMessage("contextMenuNewTab"),
    "contexts":[
        "browser_action"
    ],
    "onclick":function(info, tab) {
        newTab(homeUrl);
    }
});

//message subscription for later use
chrome.runtime.onMessage.addListener(function(request, sender) {
    navigate(homeUrl);
});

function init() {
    chrome.tabs.query({}, function(foundTabs) {
        var tabsCount = foundTabs.length;
        if(tabsCount <= 1) {
            for(var i in foundTabs) {
                if(foundTabs.hasOwnProperty(i)) {
                    if(foundTabs[i].url != 'chrome://newtab/' && foundTabs[i].url != 'about:newtab') {
                        // prevent other pages than new tab from redirect
                        return;
                    }
                }
            }

            if (tabsCount == 1) {
                navigate(homeUrl, foundTabs[0].id);
            } else if (tabsCount == 0) {
                navigate(homeUrl);
            }
        }
    });
}

function newTab(toUrl) {
    chrome.tabs.create({ url: toUrl });
}

function navigate(toUrl, id) {
    if(id) {
        chrome.tabs.update(id, {url: toUrl});
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if(tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, {url: toUrl});
            } else {
                newTab(toUrl);
            }
        });
    }
}