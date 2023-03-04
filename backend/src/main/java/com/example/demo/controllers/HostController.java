package com.example.demo.controllers;

import com.example.demo.Dto.request.AddHostRequest;
import com.example.demo.Dto.request.ReserveAt;
import com.example.demo.Dto.request.ReviewRequest;
import com.example.demo.Dto.response.MessageResponse;
import com.example.demo.models.BookAt;
import com.example.demo.models.Host;
import com.example.demo.models.Review;

import com.example.demo.services.Impl.HostServiceImpl;

import com.example.demo.services.Impl.UserServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class HostController{

    @Autowired
    private HostServiceImpl hostRepoService;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/add_host")
    public ResponseEntity<?> saveHost(@RequestBody AddHostRequest host, HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0) {
            return ResponseEntity.badRequest().body(new MessageResponse("not allowed!"));
        }
        Host h = new Host(host.getName(), host.getCity(), host.getCountry(),
                host.getAddress(), host.getPrice(), host.getDescription(),
                hostRepoService.getUsernameByCookie(request));

        hostRepoService.save(h);
        return ResponseEntity.ok().body(new MessageResponse("Host created!"));
    }

    @GetMapping("/all_places")
    public Page<Host> getAllPlaces(Pageable pageable) {
        return hostRepoService.getHosts(pageable);
    }


    @GetMapping("/hosts/{id}")
    public Object getPlaceById(@PathVariable String id) throws Exception {

        Optional<Host> host = hostRepoService.findViaId(id);
        if(host.isEmpty()){
            return ResponseEntity.badRequest().body(new MessageResponse("Host not found with this id!"));
        }
        return ResponseEntity.ok(host);
    }

    @DeleteMapping("/delete_host/{id}")
    public ResponseEntity<String> deletePlace(@PathVariable String id) throws Exception {

        hostRepoService.deleteViaId(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @RequestMapping(value = {"/search", "/search/{keyword}"}, method={RequestMethod.GET})
    public Page<Host> searchPlace(@PathVariable(value = "keyword", required = false) String keyword,
                                  @RequestParam(required = false, defaultValue = "0") int pageNumber,
                                  @RequestParam(required = false, defaultValue = "5") int pageSize,
                                  @RequestParam(required = false, defaultValue = "date") String sortBy,
                                  @RequestParam(required = false, defaultValue = "desc") String sortDir) {
        if(keyword == null){
            return hostRepoService.findAllSort(pageNumber, pageSize, sortBy, sortDir);
        }
        return hostRepoService.searchResult(keyword, pageNumber, pageSize, sortBy, sortDir);
    }


    @PostMapping("/reserve")
    public ResponseEntity<?> reservePlace(@RequestBody ReserveAt reserveAt, HttpServletRequest request) throws Exception {
        hostRepoService.reserve(reserveAt, request);
        return ResponseEntity.ok().body(new MessageResponse("Reservation created!"));
    }

    @GetMapping("/schedule/{id}")
    public List<BookAt> getSchedule(@PathVariable(value = "id") String hostId) throws Exception {
        return hostRepoService.findSchedule(hostId);
    }

    @PostMapping("/create_rev")
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest reviewRequest, HttpServletRequest request) throws Exception {
        return hostRepoService.createRev(reviewRequest, request);
    }

    @GetMapping("/get_rev/{id}")
    public List<Review> getAllReviews(@PathVariable(value = "id") String hostId) throws Exception {
        return hostRepoService.getReviewsOnId(hostId);
    }

    @GetMapping("/profile_host/{username}")
    public List<Host> getHostByUsername(@PathVariable(value = "username") String username){
        return hostRepoService.getHostsByUser(username);
    }
//    @GetMapping("/get_emails/{username}")
//    public List<String> getEmails(@PathVariable(value = "username") String username){
//        return hostRepoService.getAllEmails(username);
//    }

}

