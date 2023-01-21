package com.example.demo.repository;
import com.example.demo.models.Host;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostRepository extends MongoRepository<Host, String> {
    List<Host> findByNameContainingIgnoreCase(String name);
    List<Host> findByCity(String name);
    List<Host> findAllByOrderByDateAsc();
}
