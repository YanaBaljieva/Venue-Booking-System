package com.example.demo.controllers;

import com.example.demo.Dto.request.AddHostRequest;
import com.example.demo.Dto.request.ReserveAt;
import com.example.demo.Dto.response.MessageResponse;
import com.example.demo.models.Host;
import com.example.demo.models.User;
import com.example.demo.services.Impl.HostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.rmi.server.RemoteServer;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class HostController{

    @Autowired
    private HostServiceImpl hostRepoService;

    @PostMapping("/add_host")
    public ResponseEntity<?> saveHost(@RequestBody AddHostRequest host){
        Host h = new Host(host.getName(), host.getCity(), host.getCountry(), host.getAddress(), host.getPrice(), host.getDescription(), host.getUser_id());
        hostRepoService.save(h);
        return ResponseEntity.ok().body(new MessageResponse("Host created!"));
    }

    @GetMapping("/all_places")
    public Page<Host> getAllPlaces(Pageable pageable) {
        return hostRepoService.getHosts(pageable);
    }


    @GetMapping("/hosts/{id}")
    public ResponseEntity<Host> getPlaceById(@PathVariable String id) throws Exception {

        Host host = hostRepoService.findViaId(id)
                .orElseThrow(() -> new Exception("Host not exist with id :" + id));
        return ResponseEntity.ok(host);
    }

    @PutMapping("/host/{id}")
    public Host update(@PathVariable String id, @RequestBody Host host) {
        Optional<Host> optcontact = hostRepoService.findViaId(id);
        Host h = optcontact.get();
        if (host.getCity() != null)
            h.setCity(host.getCity());
        if (host.getCountry() != null) {
            h.setCountry(host.getCountry());
        }
        if (host.getAddress() != null) {
            h.setAddress(host.getAddress());
        }
        if (host.getPrice() != null) {
            h.setPrice(host.getPrice());
        }
        // add photos
        hostRepoService.save(h);
        return h;
    }

    @DeleteMapping("/delete_host/{id}")
    public ResponseEntity<String> deletePlace(@PathVariable String id) throws Exception {

        hostRepoService.deleteViaId(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @GetMapping("/search/{keyword}")
    public Page<Host> searchPlace(Pageable pageable, @PathVariable("keyword") String keyword) {
        return hostRepoService.findAllHosts(pageable, keyword);
    }


    @GetMapping("/sort_city/{city}")
    public List<Host> sortCity(@PathVariable String city){
        return hostRepoService.sortByCity(city);
    }

//    @GetMapping("/sort_date")
//    public List<Host> sortDate(){
//        return hostRepoService.sortByDate();
//    }

    @GetMapping("/sort")
    public Page<Host> sortDate(int pageNumber, int pageSize, String sortBy, String sortDir){
        return hostRepoService.findAllSort(pageNumber, pageSize, sortBy, sortDir);
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reservePlace(@RequestBody ReserveAt reserveAt) throws Exception {
        hostRepoService.reserve(reserveAt);

        return ResponseEntity.ok(reserveAt);
    }

    @GetMapping("/schedule/{id}")
    public List<LocalDate> getSchedule(@PathVariable(value = "id") String hostId) throws Exception {
        return hostRepoService.findSchedule(hostId);
    }


    //post review
    //get(display) reviews
}

