package com.example.demo.controllers;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.Dto.request.LoginRequest;
import com.example.demo.Dto.request.SignupRequest;
import com.example.demo.Dto.response.JwtResponse;
import com.example.demo.Dto.response.MessageResponse;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.services.Impl.UserDetailsImpl;
import com.example.demo.services.Impl.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class UserAuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new JwtResponse(userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles));
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        return userService.register(signUpRequest);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }
    @GetMapping("/get_cookie")
    public ResponseEntity<?> getCookie(HttpServletRequest request){

        Cookie[] cookies = request.getCookies();
        System.out.println(cookies.length);
            if (cookies == null || cookies.length == 0) {
                return ResponseEntity.badRequest().body(new MessageResponse("not found"));
            }
            return ResponseEntity.ok().body(new MessageResponse("yeeeees"));
//            String userId = null;
//            if (cookies != null) {
//                System.out.println("alooooooo");
//                for (Cookie cookie : cookies) {
//                    if (cookie.getName().equals("projectCookie")) {
//                        String jwtToken = cookie.getValue();
//                        Claims claims = Jwts.parser()
//                                .setSigningKey("projectSecretKey")
//                                .parseClaimsJws(jwtToken)
//                                .getBody();
//                        userId = claims.getSubject();
//                        break;
//                    }
//                }
//            }
//            return userId;
        //return null;
       }

}
