package com.stockquest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockquest.config.JwtProvider;
import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.exception.ConflictException;
import com.stockquest.repo.RegisterRepo;
import com.stockquest.request.LoginRequest;
import com.stockquest.response.AuthResponse;
import com.stockquest.service.AssetService;
import com.stockquest.service.PortfolioService;
import com.stockquest.service.RegisterServiceImp;

@RestController
@RequestMapping("/auth")
public class RegisterController {
	@Autowired
	private RegisterRepo userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private RegisterServiceImp customUserDetails;
	@Autowired
	private AssetService assetService;

	@Autowired
	private PortfolioService portfolioService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody Register user) throws Exception {
		Register isUserExist = userRepository.findByEmail(user.getEmail());
		if (isUserExist != null) {
			throw new ConflictException("Email already exists with another account.");
		}
		Register createdUser = new Register();
		createdUser.setUsername(user.getUsername());
		createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
		createdUser.setEmail(user.getEmail());
		createdUser.setFirstname(user.getFirstname());
		createdUser.setLastname(user.getLastname());
		createdUser.setAddress(user.getAddress());
		createdUser.setPhonenumber(user.getPhonenumber());

		Register savedUser = userRepository.save(createdUser);
		Portfolio savedPortfolio = portfolioService.createPortfolio(savedUser.getId());

		assetService.createDefaultAssetsForUser(savedUser, savedPortfolio);

		Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = JwtProvider.generateToken(authentication);
		AuthResponse res = new AuthResponse();
		res.setMessage("Signup success");
		res.setJwt(jwt);

		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) {
		String username = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		Authentication authentication = authenticate(username, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = JwtProvider.generateToken(authentication);
		AuthResponse res = new AuthResponse();
		res.setMessage("Login success");
		res.setJwt(jwt);

		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	private Authentication authenticate(String username, String password) {

		UserDetails userDetails = customUserDetails.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

	}
}