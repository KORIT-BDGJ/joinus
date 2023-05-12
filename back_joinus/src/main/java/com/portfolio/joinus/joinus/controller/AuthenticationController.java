package com.portfolio.joinus.joinus.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.aop.annotation.ValidAspect;
import com.portfolio.joinus.joinus.dto.auth.RegisterReqDto;
import com.portfolio.joinus.joinus.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationService authenticationService;
	
	
	
	@PostMapping("/login")
	public ResponseEntity<?> login() {
		return ResponseEntity.ok(null);
	}
	
	@CrossOrigin
	@ValidAspect
	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterReqDto registerReqDto, BindingResult bindingResult) {
		System.out.println(registerReqDto);
		authenticationService.checkDuplicatedEmail(registerReqDto.getEmail());
		authenticationService.register(registerReqDto);
		return ResponseEntity.ok(null);
	}
}
