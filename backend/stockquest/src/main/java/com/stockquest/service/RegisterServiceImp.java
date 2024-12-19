package com.stockquest.service;

import com.stockquest.entity.Register;
import com.stockquest.repo.RegisterRepo;
import com.stockquest.config.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegisterServiceImp implements UserDetailsService {

    @Autowired
    private RegisterRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Register user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not found with email " + username);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public Register findUserProfileByJwt(String jwt) {
        String email = JwtProvider.getEmailFromToken(jwt);
        
        Register user = userRepository.findByEmail(email);
        
        if (user == null) {
            throw new RuntimeException("User does not exist with email: " + email);
        }
        
        return user;
    }

}
