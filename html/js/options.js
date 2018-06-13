function save_options() {
    debugger;
    var accountId = $('#accountId').val();

    chrome.storage.sync.set({
        accountId: accountId,
    }, function () {
        var status = $('#status');

        status.css('display','block');
        status.text('Options saved.');
        status.removeClass('fadeOut');
        status.addClass('fadeIn');
        
        
        setTimeout(function () {
            status.removeClass('fadeIn');
            status.addClass('fadeOut');
            status.css('display','none');
        }, 2000);

    });
}

function restore_options() {
    debugger;
    chrome.storage.sync.get("accountId", function (items) {
        $('#accountId').val(items.accountId);
    });
}

$(document).ready(function() {
    restore_options();
});
$('#save').on('click',function(event) {
    save_options();
    return false;
});