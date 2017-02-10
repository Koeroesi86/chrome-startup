function saveOptions() {
    var url = document.getElementById('url').value;
    var windowCreate = document.getElementById('windowCreate').checked;
    var replaceAllTabs = document.getElementById('replaceAllTabs').checked;
    chrome.storage.sync.set({
        url: url,
        windowCreate: windowCreate,
        replaceAllTabs: replaceAllTabs
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('statusText');
        status.textContent = chrome.i18n.getMessage("statusText", url);
        // setTimeout(function() {
        //     status.textContent = '';
        // }, 750);
    });
}

// Restores values stored in chrome.storage.
function restoreOptions() {
    // Use default value
    chrome.storage.sync.get({
        url: 'about:newtab',
        windowCreate: true,
        replaceAllTabs: false
    }, function(items) {
        document.getElementById('url').value = items.url;
        document.getElementById('windowCreate').checked = items.windowCreate;
        document.getElementById('replaceAllTabs').checked = items.replaceAllTabs;
        if (items.replaceAllTabs) {
            document.getElementById('windowCreate').setAttribute('disabled', 'disabled');
        }
    });
}

function toggleNewTab(e) {
    var windowCreate = document.getElementById('windowCreate');
    if(e.target.checked) {
        windowCreate.checked = 'checked';
        windowCreate.setAttribute('disabled', 'disabled');
    } else {
        windowCreate.removeAttribute('disabled');
    }
}

function initialize() {
    restoreOptions();

    document.getElementById('saveButton').addEventListener('click', saveOptions);
    document.getElementById('replaceAllTabs').addEventListener('change', toggleNewTab);
    loadLocale();
}

function loadLocale() {
    document.title = chrome.i18n.getMessage("extensionName");
    document.getElementById('label_url').textContent = chrome.i18n.getMessage("label_url");
    document.getElementById('label_windowCreate').textContent = chrome.i18n.getMessage("label_windowCreate");
    document.getElementById('label_replaceAllTabs').textContent = chrome.i18n.getMessage("label_replaceAllTabs");
    document.getElementById('saveButton').textContent = chrome.i18n.getMessage("saveButton");
}

document.addEventListener('DOMContentLoaded', initialize);
