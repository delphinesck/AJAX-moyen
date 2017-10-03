var app = new App();

app.main = function(){

    app.centerOnGeolocation();

    google.maps.event.addListener(app.map, 'click', function(event){
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();

        $("#latitude").val(latitude);
        $("#longitude").val(longitude);
    });

    app.$form_newfestival.submit(function(event){
        event.preventDefault();
        var nom = app.$nom.val();
        var latitude = parseFloat(app.$latitude.val());
        var longitude = parseFloat(app.$longitude.val());
        var date_debut = app.$date_debut.datepicker("getDate");
        var date_fin = app.$date_fin.datepicker("getDate");
        var logo = app.$logo.val();
        var genres = [];
    
        $("input[type='checkbox']:checked").each(function(){
            genres.push($(this).attr('value'));
        });
    
        var festival = new Festival(nom, latitude, longitude, date_debut, date_fin, logo, genres);
        app.saveFestivals(festival);
    });

    $(document).on("click", ".select_genres", function(){
        app.displayFestivals();
    });
}