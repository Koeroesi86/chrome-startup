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
        var status = document.getElementById('status');
        status.textContent = 'Start Page saved: ' + url;
        setTimeout(function() {
            // status.textContent = '';
        }, 750);
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

    document.getElementById('save').addEventListener('click', saveOptions);
    document.getElementById('replaceAllTabs').addEventListener('change', toggleNewTab);
}

document.addEventListener('DOMContentLoaded', initialize);
