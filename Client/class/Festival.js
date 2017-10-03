class Festival {
    constructor(nom, latitude, longitude, date_debut, date_fin, logo, genres){
        this.id = 0;
        this.nom = nom;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date_debut = new Date(date_debut);
        this.date_fin = new Date(date_fin);
        this.logo = logo;
        this.genres = genres;
        this.$dom = null;
    }

    display(map){
        var day = this.date_debut.getDate();
        var monthIndex = this.date_debut.getMonth() +1;
        var year = this.date_debut.getFullYear();
        var dd = day + "/" + monthIndex + "/" + year;

        var day = this.date_fin.getDate();
        var monthIndex = this.date_fin.getMonth() +1;
        var year = this.date_fin.getFullYear();
        var df = day + "/" + monthIndex + "/" + year;

        var description = "<h2>" + this.nom + "</h2>";
        description += "<p>Genres musicaux : ";
        for(var genre of this.genres){
            description += genre.name_genre;
            description += " "
        }
        description += "</p>";
        description += "<p>Date début : " + dd + "</p>";
        description += "<p>Date fin : " + df + "</p>";
        
        var marker_name = this.nom;
        var marker_position = {
            lat: parseFloat(this.latitude),
            lng: parseFloat(this.longitude)
        }
    
        var marker_logo = {
            url: this.logo,
            scaledSize: new google.maps.Size(120,120),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(60,140)
        }
    
        var marker_complet = new google.maps.Marker({
            map: map,
            title: marker_name,
            position: marker_position,
            icon: marker_logo
        });
    
        app.addMarker(marker_complet);
        app.addInfos(description, marker_complet);
        app.map.panTo(marker_position);
    }
}