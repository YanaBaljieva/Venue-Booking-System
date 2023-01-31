package com.example.demo.repository;
import com.example.demo.models.Host;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HostRepository extends MongoRepository<Host, String> {
    List<Host> findByNameContainingIgnoreCase(String name);
    List<Host> findByCity(String name);
    List<Host> findAllByOrderByDateAsc();

//    @Query("{ $or: [ { 'name': ?0 }, { 'city': ?0 }, { 'country': ?0 }] }")
    @Query("{ $or: [ { 'name': {$regex: ?0, $options: 'i'} }, { 'city': {$regex: ?0, $options: 'i'} }, { 'country': {$regex: ?0, $options: 'i'}] }")
    Page<Host> findAll(Pageable pageable, String keyword);

}
