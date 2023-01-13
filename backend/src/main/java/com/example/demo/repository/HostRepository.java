package com.example.demo.repository;
import com.example.demo.model.Host;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface HostRepository extends MongoRepository<Host, String> {
    //@Query("{'name': ?0}")
    //public List<Host> search(String name);
   // @Query("{'name': ?0}")
   // List<Host> findByName(String name);
    List<Host> findByNameContainingIgnoreCase(String name);
    List<Host> findByCity(String name);
    List<Host> findAllByOrderByDateAsc();
}
