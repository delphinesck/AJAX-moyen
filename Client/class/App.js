class App {
    constructor(){
        this.$map = $("#map");
        this.$infos = $("#infos");

        this.map = null;
        this.main = null;

        this.$form_newfestival = $("#form_newfestival");
        this.$nom = $("#nom");
        this.$latitude = $("#latitude");
        this.$longitude = $("#longitude");
        this.$date_debut = $("#date_debut");
        this.$date_fin = $("#date_fin");
        this.$logo = $("#logo");
        this.genres = [];

        this.$pop = $("#pop");
        this.$rock = $("#rock");
        this.$metal = $("#metal");
        this.$rnb = $("#rnb");
        this.$rap = $("#rap");
        this.$electro = $("#electro");
        this.$jazz = $("#jazz");
        
        this.markers = [];
        this.festivals = [];

        this.initPickers();
    }

    initMap(){
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 7
        });
        this.readFestivals();
        this.main();
    }

    initPickers(){
        var options = {
            dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
            monthNames : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            monthNamesShort : ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
            firstDay : 1,
            beforeShowDay : $.proxy(this.closedDay, this),
            dateFormat: "dd/mm/yy",
            numberOfMonths : 1
        };

        this.$date_debut.datepicker(options);
        this.$date_fin.datepicker(options);
    };

    centerOnGeolocation(){
        var that = this;
        navigator
        .geolocation
        .getCurrentPosition(function(position){
            var pos = {
                lat : position.coords.latitude,
                lng : position.coords.longitude
            }
            that.map.setCenter(pos);
        });
    }

    addMarker(marker){
        this.markers.push(marker);
    }

    addInfos(content, marker){
        var infowindow = new google.maps.InfoWindow({
            content: content
        });

        var that = this;
        marker.addListener("click", function(){
            infowindow.open(that.map, marker);
        });
    }

    addFestival(festival){
        this.festivals.push(festival);
    }

    saveFestivals(festival){
        var $genres = $("#form_newfestival").find(":checkbox:checked");
        var that = this;
        $genres.each(function(){
            that.genres.push( $(this).val() );
        });

        var that = this;
        $.ajax({
            url : "http://localhost:8888/JAVASCRIPT_ORIENTE_OBJET/TP_moyen_ajax/API/savefestival",
            method : "POST",
            data : {
                nom : festival.nom,
                latitude : festival.latitude,
                longitude : festival.longitude,
                date_debut : festival.date_debut,
                date_fin : festival.date_fin,
                logo : festival.logo,
                genres : that.genres
            },
            dataType : "json",
            success : function(data){
                if(data.success == true){
                    festival.id = data.id;
                    that.addFestival(festival);
                    festival.display(that.map);
                }
                else{
                    alert("Une erreur est survenue lors de l'enregistrement.");
                }
            },
            error : function(error){
                console.log(error);
            }
        });
    }

    readFestivals(){
        var that = this;
        $.ajax({
            url : "http://localhost:8888/JAVASCRIPT_ORIENTE_OBJET/TP_moyen_ajax/API/readfestivals",
            method : "GET",
            dataType : "json",
            success : function(data){
                console.log(data);
                for(var data_festival of data){
                    var festival = new Festival(data_festival.nom, data_festival.latitude, data_festival.longitude, data_festival.date_debut, data_festival.date_fin, data_festival.logo, data_festival.genres);
                    festival.id = data_festival.id;
                    that.addFestival(festival);
                    festival.display(that.map);
                }
            },
            error : function(error){
                console.log(error);
            }
        });
    }

    displayFestivals(){
        var flag = false;
        for(var marker of this.markers){
            marker.setMap(null);
            
            for(var festival of this.festivals){
                if(this.$pop.is(":checked") && festival.nom == marker.title){

                    for(var i = 0; i < count(festival.genres); i++){
                        if(festival.genres[i].id == "1"){
                            marker.setMap(this.map);
                            flag = true;
                        }
                    }
                }
                
            }
        }

        if(flag == false){
            marker.setMap(this.map);
        }
    }
}