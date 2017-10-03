<?php

class Genres extends Model implements JsonSerializable {
    private $id_festival;
    private $id_genre;
    
    function setId_festival($id_festival) { $this->id_festival = $id_festival; }
    function getId_festival() { return $this->id_festival; }
    function setId_genre($id_genre) { $this->id_genre = $id_genre; }
    function getId_genre() { return $this->id_genre; }

    function jsonSerialize(){
        return [
            "id_festival" => $this->id_festival,
            "id_genre" => $this->id_genre
        ];
    }
}

?>