package com.example.demo.services.Impl;

import com.example.demo.Dto.request.ReserveAt;
import com.example.demo.Dto.request.ReviewRequest;
import com.example.demo.Dto.response.MessageResponse;
import com.example.demo.models.BookAt;
import com.example.demo.models.Host;
import com.example.demo.models.Review;
import com.example.demo.repository.HostRepository;
import com.example.demo.services.HostService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
    public ResponseEntity<?> createRev(ReviewRequest reviewRequest, HttpServletRequest request) throws Exception {
        if(reviewRequest.getStars() == 0){
           return ResponseEntity.badRequest().body(new MessageResponse("you must put rating"));
        }
        Host h = hostRepository.findById(reviewRequest.getHost_id())
                .orElseThrow(() -> new Exception("Host not exist with id :" + reviewRequest.getHost_id()));
        List<Review> reviews = h.getReviews();
        Review r = new Review(reviewRequest.getStars(), reviewRequest.getComment(), reviewRequest.getHost_id(), getUsernameByCookie(request));
        reviews.add(r);
        h.setReviews(reviews);
        hostRepository.save(h);
        return ResponseEntity.ok(new MessageResponse("Review created"));
    }

    @Override
    public void reserve(ReserveAt reserveAt, HttpServletRequest request) throws Exception {
        Host h = hostRepository.findById(reserveAt.getHost_id())
                .orElseThrow(() -> new Exception("Host not exist with id :" + reserveAt.getHost_id()));
        List<BookAt> dates = h.getBooked_at();

        if(!h.getBooked_at().contains(reserveAt.getDate_at())){
            BookAt b = new BookAt(getUsernameByCookie(request), reserveAt.getDate_at());
            dates.add(b);
            h.setBooked_at(dates);
            hostRepository.save(h);
        } else {
            throw new Exception("This date is booked!");
        }
    }

    @Override
    public List<Review> getReviewsOnId(String id) throws Exception {
        Host h = hostRepository.findById(id)
                .orElseThrow(() -> new Exception("Host not exist with id :" + id));
        return h.getReviews();
    }

    @Override
    public List<BookAt> findSchedule(String id) throws Exception {
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
    public Page<Host> searchResult(String search, int pageNumber, int pageSize, String sortBy, String sortDir) {
        if(search.isEmpty()){
            return findAllSort(pageNumber, pageSize, sortBy, sortDir);
        }
        return hostRepository.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ?
                                Sort.by(sortBy).ascending() :
                                Sort.by(sortBy).descending()
                ), search);
    }


    @Override
    public String getUsernameByCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0) {
            return null;
        }
        String userId = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("projectCookie")) {
                    String jwtToken = cookie.getValue();
                    Claims claims = Jwts.parser()
                            .setSigningKey("projectSecretKey")
                            .parseClaimsJws(jwtToken)
                            .getBody();
                    userId = claims.getSubject();
                    break;
                }
            }
        }
        return userId;
    }

}
