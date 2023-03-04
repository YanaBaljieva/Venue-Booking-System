package com.example.demo.services;

import com.example.demo.Dto.request.ReserveAt;
import com.example.demo.Dto.request.ReviewRequest;
import com.example.demo.models.BookAt;
import com.example.demo.models.Host;
import com.example.demo.models.Review;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface HostService {
    void save(Host host);
    Page<Host> getHosts(Pageable pageable);
    ResponseEntity<?> createRev(ReviewRequest reviewRequest, HttpServletRequest request) throws Exception;
    void reserve(ReserveAt reserveAt, HttpServletRequest request) throws Exception;
    List<Review> getReviewsOnId(String id) throws Exception;
    List<BookAt> findSchedule(String id) throws Exception;
    Page<Host> findAllSort (int pageNumber, int pageSize, String sortBy, String sortDir);
    Optional<Host> findViaId(String id);
    void deleteViaId(String id);

    //List<Host> sortByRating();
    Page<Host> searchResult(String search, int pageNumber, int pageSize, String sortBy, String sortDir);
    String getUsernameByCookie(HttpServletRequest request);
    List<Host> getHostsByUser(String username);

   // List<String> getAllEmails(String username);
}
