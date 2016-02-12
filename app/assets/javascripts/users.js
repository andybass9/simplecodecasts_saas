 $(document).ready(function() {
    // we identify ourselves with Stripe...
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    
    // Watch for a form submission:
    $("#form-submit-btn").click(function(event) {
        // don't automatically send form to server...
        event.preventDefault();
        // we've seen a click so ignore bounced clicks...
        $('input[type=submit]').prop('disabled',true);
        
        // create 'error' flag if doesn't exist yet...
        var error = false;
        
        // now grab the inputs from the form...
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
        
        if (!error) {
            // Get the stripe token:
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler); // see below
        }
        return false;
    }); // form submission watcher end
    
    // handler for the Stripe response...
    function stripeResponseHandler(status, response) {
        // get a reference to the form:
        var f = $("#new_user");
        
        // get the token from the response:
        var token = response.id;
        
        // add the token to the form:
        f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        
        // submit the form:
        f.get(0).submit();
    }; // end of stripeResponseHandler
    
 
});