package com.example.demo.services;

import com.example.demo.model.Host;
import com.example.demo.repository.HostRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HostServiceImpl implements HostService{

    @Autowired
    private HostRepository hostRepository;

    @Override
    public void save(Host host) {
        hostRepository.save(host);
    }

    @Override
    public List<Host> getHosts() {
        return hostRepository.findAll();
    }

    @Override
    public Optional<Host> findViaId(String id) {
        return hostRepository.findById(id);
    }

    @Override
    public void deleteViaId(String id) {
        hostRepository.deleteById(id);
    }

    @Override
    public List<Host> sortByDate() {
        return hostRepository.findAllByOrderByDateAsc();
    }

    @Override
    public List<Host> sortByCity(String city) {
        return hostRepository.findByCity(city);
    }

    @Override
    public List<Host> searchResult(String search) {
       /* Pageable pageable = (Pageable) PageRequest.of(0, 5,
                Sort.by("name").ascending());*/

        return hostRepository.findByNameContainingIgnoreCase(search);
    }

}
