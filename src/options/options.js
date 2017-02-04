function saveOptions() {
    var url = document.getElementById('url').value;
    var windowCreate = document.getElementById('windowCreate').checked;
    chrome.storage.sync.set({
        url: url,
        windowCreate: windowCreate
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
        windowCreate: true
    }, function(items) {
        document.getElementById('url').value = items.url;
        document.getElementById('windowCreate').checked = items.windowCreate;
    });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
