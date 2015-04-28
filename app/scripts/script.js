var url = window.location.href;
var arr = url.split("/");
path = arr[0] + "//" + arr[2];

var callAPI = function() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    $.ajax({
        type: "get",
        data: {firstName: firstName, lastName: lastName},
        cache: false,
        url: path+'/quote',
        dataType: "text",
        error: function(xhr)
        {
            handleFailure(xhr);
        },
        success: function (response)
        {
            handleAction(response);
        }});
};

var handleAction = function(response){
    response = JSON.parse(response);
    console.log(response.data);
    $(document.createElement('div')).addClass('quote-wrapper').text(response.data).appendTo('.quote-block');
};

var handleFailure = function(xhr) {
    var failureMessage = JSON.parse(xhr.responseText);
    $(document.createElement('div')).addClass('quote-wrapper').text(failureMessage);
    console.log(failureMessage)
};