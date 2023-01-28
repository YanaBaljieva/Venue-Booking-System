package com.example.demo.controllers;

import com.example.demo.models.Host;
import com.example.demo.services.Impl.HostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class HostController {

    @Autowired
    private HostServiceImpl hostRepoService;

    @PostMapping("/add_host")
    public void saveHost(@RequestBody Host host){
        hostRepoService.save(host);
    }

    @GetMapping("/all_places")
    public List<Host> getAllPlaces() {

        return hostRepoService.getHosts();
    }

    @GetMapping("/hosts/{id}")
    public ResponseEntity<Host> getPlaceById(@PathVariable String id) throws Exception {

        Host host = hostRepoService.findViaId(id)
                .orElseThrow(() -> new Exception("User not exist with id :" + id));
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


    @GetMapping("/search/{name}")
    public List<Host> searchPlace(@PathVariable String name){
        return hostRepoService.searchResult(name);
    }

    @GetMapping("/sort_city/{city}")
    public List<Host> sortCity(@PathVariable String city){
        return hostRepoService.sortByCity(city);
    }

    @GetMapping("/sort_date")
    public List<Host> sortDate(){
        return hostRepoService.sortByDate();
    }

    //get schedule
    //reserve the place
    //post review
    //get(display) reviews
}

