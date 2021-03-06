// Ajax request
$.ajax({
    url: 'http://ryangeorge.nl/api.json',
    type: 'GET',
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    success: function(data) {

        // Easy access to json
        order = data.data.tracking;


        // Vars
        var trackingNumber = order.tracking_number;
        var updateTime = new Date(order.updated_at).toLocaleString();
        var status = order.tag;
        var checkpoints = order.checkpoints;
        var infoLog = ' ';

        // Sets trackingnumber
        $('.ordernummer').html(trackingNumber);
        // Latest update time
        $('.updatetime').html(updateTime);
        // Order status
        $('.status').html(status);


        // Product information

        $("#product-info").append("<p>Productnummer: "
        +order.tracking_number+
        "</p><p>Bezorgdiesnt: "
        + order.slug +
        "</p><p>Bezorgsoort: "
        + order.shipment_type +
        "</p><p>Afmeting: 20cm x 10cm x 5cm</p><p>Gewicht: "
        + order.shipment_weight +
        "</p><p>Afkomstland: "
        + order.origin_country_iso3 +
        "</p><p>Aankomstland: "
        + order.destination_country_iso3 +
        "</p><p>Status: "
        + order.tag +
        "</p><p>Afleverplaats: "
        + order.signed_by +
        "</p>");




        // Check status
        if (status == 'Delivered') {
            $('.status').css('color', '#2ecc71');
        } else {
            $('.status').css('color', 'orange');
        }

        // Loop for checkpoints
        for (var i = 0; i < checkpoints.length; i++) {
            var tag = checkpoints[i].tag;
            if (tag == 'Delivered') {
                // Adds border color green if checkpoint is valid
                $('.delivered').css('border-color', '#2ecc71');
                // Add gradient background of valid checkpoint
                $('#bar').addClass('progress-100');
            } else if (tag == 'InTransit') {
                // Adds border color green if checkpoint is valid
                $('.onderweg').css('border-color', '#2ecc71');
                // Add gradient background of valid checkpoint
                $('#bar').addClass('progress-50');
            } else if (tag == 'InfoReceived') {
                // Adds border color green if checkpoint is valid
                $('.informatie').css('border-color', '#2ecc71');
            }
            // List out all checkpoints
            $('#log').append("<li><div class='log-info'><h4>Status: " +
                checkpoints[i].message.toLowerCase() +
                "</h4><p>Datum: " +
                new Date(checkpoints[i].checkpoint_time).toLocaleString() +
                "</p><p class='logLocatie'>Locatie: " +
                checkpoints[i].city +
                ", " +
                checkpoints[i].country_name +
                "</p></div></li>");

        }




    }
});
