var path = 'localhost'; //'the-chuckalizer.herokuapp.com';

var callAPI = function() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    console.log(firstName);
    $.ajax({
        type: "get",
        data: {firstName: firstName, lastName: lastName},
        cache: false,
        url: path,
        dataType: "text",
        error: function(xhr)
        {
            handleFailure(xhr);
        },
        success: function (response)
        {
            handleAction(event, response);
        }});
};

var handleAction = function(response){
    $(document.createElement('div')).addClass('quote-wrapper').text(JSON.stringify(response));
};

var handleFailure = function(xhr) {
    console.log(xhr)
};
