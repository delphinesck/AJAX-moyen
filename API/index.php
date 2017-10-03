<?php

header("Access-Control-Allow-Origin : *");

require "flight/Flight.php";
require "autoload.php";

Flight::set("BddManager", new BddManager());

Flight::route("GET /readfestivals", function(){
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getFestivalRepository();
    $festivals = $repo->getAll();
    foreach($festivals as $festival){
        $genre = $repo->getGenres($festival);
        $festival->setGenres($genre);
    }
    echo json_encode($festivals);
});

Flight::route("POST /savefestival", function(){
    $nom = Flight::request()->data["nom"];
    $latitude = Flight::request()->data["latitude"];
    $longitude = Flight::request()->data["longitude"];
    $date_debut = Flight::request()->data["date_debut"];
    $date_fin = Flight::request()->data["date_fin"];
    $logo = Flight::request()->data["logo"];
    $genres = Flight::request()->data["genres"];

    $status = [
        "success" => false,
        "id" => 0
    ];
    if(strlen($nom) > 0 && strlen($latitude) > 0 && strlen($longitude) > 0 && strlen($date_debut) > 0 && strlen($date_fin) > 0 && strlen($logo) > 0){
        $festival = new Festival();
        $festival->setNom($nom);
        $festival->setLatitude($latitude);
        $festival->setLongitude($longitude);
        $festival->setDate_debut($date_debut);
        $festival->setDate_fin($date_fin);
        $festival->setLogo($logo);
        $festival->setGenres($genres);
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getFestivalRepository();
        $id = $repo->save($festival);
        if($id != 0){
            $festival->setId($id);
            $repo->linkGenres($festival);
            $status["success"] = true;
            $status["id"] = $id;
        }
    }
    echo json_encode($status);
});

Flight::start();
?>