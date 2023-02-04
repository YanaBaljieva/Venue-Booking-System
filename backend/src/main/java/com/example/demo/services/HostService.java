package com.example.demo.services;

import com.example.demo.Dto.request.ReserveAt;
import com.example.demo.models.Host;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HostService {
    void save(Host host);
    Page<Host> getHosts(Pageable pageable);
    void reserve(ReserveAt reserveAt) throws Exception;
    List<LocalDate> findSchedule(String id) throws Exception;
    Page<Host> findAllSort (int pageNumber, int pageSize, String sortBy, String sortDir);
    Optional<Host> findViaId(String id);
    void deleteViaId(String id);
    List<Host> sortByDate();
    List<Host> sortByCity(String name);
    //List<Host> sortByRating();
    List<Host> searchResult(String search);

    Page<Host> findAllHosts(Pageable pageable, String keyword);
    //get schedule
}
