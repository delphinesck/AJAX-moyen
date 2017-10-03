<?php

class Festival extends Model implements JsonSerializable {
    private $nom;
    private $latitude;
    private $longitude;
    private $date_debut;
    private $date_fin;
    private $logo;
    private $genres;
    
    function setNom($nom) { $this->nom = $nom; }
    function getNom() { return $this->nom; }
    function setLatitude($latitude) { $this->latitude = $latitude; }
    function getLatitude() { return $this->latitude; }
    function setLongitude($longitude) { $this->longitude = $longitude; }
    function getLongitude() { return $this->longitude; }
    function setDate_debut($date_debut) { $this->date_debut = $date_debut; }
    function getDate_debut() { return $this->date_debut; }
    function setDate_fin($date_fin) { $this->date_fin = $date_fin; }
    function getDate_fin() { return $this->date_fin; }
    function setLogo($logo) { $this->logo = $logo; }
    function getLogo() { return $this->logo; }
    function setGenres($genres) { $this->genres = $genres; }
    function getGenres() { return $this->genres; }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "nom" => $this->nom,
            "latitude" => $this->latitude,
            "longitude" => $this->longitude,
            "date_debut" => $this->date_debut,
            "date_fin" => $this->date_fin,
            "logo" => $this->logo,
            "genres" => $this->genres
        ];
    }
}

?>