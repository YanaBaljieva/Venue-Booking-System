package com.example.demo.services;

import com.example.demo.models.Host;

import java.util.List;
import java.util.Optional;

public interface HostService {
    void save(Host host);
    Iterable<Host> getHosts();
    Optional<Host> findViaId(String id);
    void deleteViaId(String id);
    List<Host> sortByDate();
    List<Host> sortByCity(String name);
    //List<Host> sortByRating();
    List<Host> searchResult(String search);
    //get schedule
}
