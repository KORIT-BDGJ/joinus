package com.portfolio.joinus.joinus.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.aop.annotation.ValidAspect;
import com.portfolio.joinus.joinus.dto.auth.LoginReqDto;
import com.portfolio.joinus.joinus.dto.auth.RegisterReqDto;
import com.portfolio.joinus.joinus.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationService authenticationService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult ) {
		return ResponseEntity.ok().body(authenticationService.authenticate(loginReqDto));
	}
	
	@CrossOrigin
	@ValidAspect
	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterReqDto registerReqDto, BindingResult bindingResult) {
		authenticationService.checkDuplicatedEmail(registerReqDto.getEmail());
		authenticationService.register(registerReqDto);
		return ResponseEntity.ok().body(true);
	}
	
	@GetMapping("/authenticated")
	public ResponseEntity<?> authenticated(String accessToken){
		System.out.println(accessToken);
		return ResponseEntity.ok().body(authenticationService.isAuthenticated(accessToken)); //true, false
	}
	
	@GetMapping("/principal")
	public ResponseEntity<?> principal(String accessToken) {
		return ResponseEntity.ok().body(authenticationService.getPrincipal(accessToken));
	}
}
