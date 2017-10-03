<?php

class BddManager {
    private $festivalRepository;
    private $genresRepository;
    private $connection;

    function __CONSTRUCT(){
        $this->connection = Connection::getConnection();
        $this->festivalRepository = new FestivalRepository(Connection::getConnection());
        $this->genresRepository = new GenresRepository(Connection::getConnection());
    }

    function getFestivalRepository(){
        return $this->festivalRepository;
    }

    function getGenresRepository(){
        return $this->genresRepository;
    }
}

?>