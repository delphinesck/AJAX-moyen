<?php

class FestivalRepository extends Repository {

    function save(Festival $festival){
        if(empty($festival->getId())){
            return $this->insert($festival);
        }
        else{
            return $this->update($festival);
        }
    }

    private function insert(Festival $festival){
        $query = "INSERT INTO festivals SET nom=:nom, latitude=:latitude, longitude=:longitude, date_debut=:date_debut, date_fin=:date_fin, logo=:logo";
        $prep = $this->connection->prepare($query);
        $prep->execute([
            "nom" => $festival->getNom(),
            "latitude" => $festival->getLatitude(),
            "longitude" => $festival->getLongitude(),
            "date_debut" => $festival->getDate_debut(),
            "date_fin" => $festival->getDate_fin(),
            "logo" => $festival->getLogo()
        ]);
        return $this->connection->lastInsertId();
    }

    private function update(Festival $festival){
        $query = "UPDATE festivals SET nom=:nom, latitude=:latitude, longitude=:longitude, date_debut=:date_debut, date_fin=:date_fin, logo=:logo";
        $prep = $this->connection->prepare($query);
        $prep->execute([
            "nom" => $festival->getNom(),
            "latitude" => $festival->getLatitude(),
            "longitude" => $festival->getLongitude(),
            "date_debut" => $festival->getDate_debut(),
            "date_fin" => $festival->getDate_fin(),
            "logo" => $festival->getLogo()
        ]);
        return $prep->rowCount();
    }

    function getAll(){
        $query = "SELECT * FROM festivals";
        $result = $this->connection->query($query);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        $festivals = [];
        foreach($result as $data){
            $festivals[] = new Festival($data);
        }
        return $festivals;
    }

    function getGenres(Festival $festival){
        $query = 
            "SELECT genres.* FROM genres 
            JOIN festival_genre
            ON festival_genre.id_genre = genres.id
            WHERE festival_genre.id_festival=:id_festival";
        $result = $this->connection->prepare($query);
        $result->execute([
            "id_festival" => $festival->getId()
        ]);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    function linkGenres(Festival $festival){
        $genres = $festival->getGenres();
        foreach($genres as $genre_id){
            $query = "INSERT INTO festival_genre SET id_festival=:id_festival, id_genre=:id_genre";
            $prep = $this->connection->prepare($query);
            $prep->execute([
                "id_festival" => $festival->getId(),
                "id_genre" => $genre_id
            ]);
        }
    }
}

?>