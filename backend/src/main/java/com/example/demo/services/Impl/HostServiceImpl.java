package com.example.demo.services.Impl;

import com.example.demo.Dto.request.ReserveAt;
import com.example.demo.models.Host;
import com.example.demo.repository.HostRepository;
import com.example.demo.services.HostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HostServiceImpl implements HostService {

    @Autowired
    private HostRepository hostRepository;

    @Override
    public void save(Host host) {
        hostRepository.save(host);
    }

    @Override
    public Page<Host> getHosts(Pageable pageable) {
        return hostRepository.findAll(pageable);
    }

    @Override
    public void reserve(ReserveAt reserveAt) throws Exception {
        Host h = hostRepository.findById(reserveAt.getHost_id())
                .orElseThrow(() -> new Exception("Host not exist with id :" + reserveAt.getHost_id()));
        List<LocalDate> dates = h.getBooked_at();
        if(!h.getBooked_at().contains(reserveAt.getDate_at())){
            dates.add(reserveAt.getDate_at());
            h.setBooked_at(dates);
            hostRepository.save(h);
        } else {
            throw new Exception("This date is booked!");
        }
    }

    @Override
    public List<LocalDate> findSchedule(String id) throws Exception {
        Host h = hostRepository.findById(id)
                .orElseThrow(() -> new Exception("Host not exist with id :" + id));
        return h.getBooked_at();
    }
    @Override
    public Page<Host> findAllSort(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return hostRepository.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ?
                                Sort.by(sortBy).ascending() :
                                Sort.by(sortBy).descending()
                ));
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
    public Page<Host> findAllHosts(Pageable pageable, String keyword) {
        return hostRepository.findAll(pageable, keyword);
    }

    @Override
    public List<Host> searchResult(String search) {
       /* Pageable pageable = (Pageable) PageRequest.of(0, 5,
                Sort.by("name").ascending());*/

        return hostRepository.findByNameContainingIgnoreCase(search);
    }

}
