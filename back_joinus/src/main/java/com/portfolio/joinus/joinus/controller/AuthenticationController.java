package com.portfolio.joinus.joinus.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.aop.annotation.ValidAspect;
import com.portfolio.joinus.joinus.dto.auth.ForgetPasswordReqDto;
import com.portfolio.joinus.joinus.dto.auth.LoginReqDto;
import com.portfolio.joinus.joinus.dto.auth.OAuth2ProviderMergeReqDto;
import com.portfolio.joinus.joinus.dto.auth.OAuth2RegisterReqDto;
import com.portfolio.joinus.joinus.dto.auth.RegisterReqDto;
import com.portfolio.joinus.joinus.exception.CustomException;
import com.portfolio.joinus.joinus.exception.ErrorMap;
import com.portfolio.joinus.joinus.security.JwtTokenProvider;
import com.portfolio.joinus.joinus.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationService authenticationService;
	
	@ValidAspect
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult ) {
		
		//System.out.println(authenticationService.authenticate(loginReqDto));
		return ResponseEntity.ok().body(authenticationService.authenticate(loginReqDto));
	}
	
	

	//@CrossOrigin
	@ValidAspect
	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterReqDto registerReqDto, BindingResult bindingResult) {
		authenticationService.checkDuplicatedEmail(registerReqDto.getEmail());
		authenticationService.register(registerReqDto);
		return ResponseEntity.ok().body(true);
	}
	
	//@CrossOrigin
	@ValidAspect
	@PostMapping("/oauth2/register")
	public ResponseEntity<?> oauth2Register(
			@RequestHeader(value="registerToken") String registerToken,
			@Valid @RequestBody OAuth2RegisterReqDto oAuth2RegisterReqDto,
			BindingResult bindingResult) {
		
		boolean validated = jwtTokenProvider.validateToken(jwtTokenProvider.getToken(registerToken));
		
		if(!validated) {
			//토큰이 유효하지 않음
			return ResponseEntity.badRequest().body("회원가입 요청 시간이 초과하였습니다.");
		}
		authenticationService.checkDuplicatedEmail(oAuth2RegisterReqDto.getEmail());
		
		return ResponseEntity.ok(authenticationService.oAuth2Register(oAuth2RegisterReqDto));
	}
	
	@PutMapping("/oauth2/merge")
	public ResponseEntity<?> providerMerge(@RequestBody OAuth2ProviderMergeReqDto oAuth2ProviderMergeReqDto){
		
		// 기존의 암호와 비교를 해야함 
		// DB에 암호가 들어있음
		if(!authenticationService.checkPassword(oAuth2ProviderMergeReqDto.getEmail(), oAuth2ProviderMergeReqDto.getPassword())) {
			return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
		}
		
		
		return ResponseEntity.ok(authenticationService.oAuth2ProviderMerge(oAuth2ProviderMergeReqDto));
	}
	
	@PutMapping("/forget/password")
	public ResponseEntity<?> findPassword(@RequestBody ForgetPasswordReqDto forgetPasswordReqDto ) {
		
		String email = forgetPasswordReqDto.getEmail();
		
		boolean emailExists = authenticationService.checkEmail(email);
		
		if(!emailExists) {
			
			return ResponseEntity.badRequest().body("일치하는 이메일 정보가 없습니다.");
		}
		System.out.println(emailExists);
	    return ResponseEntity.ok(emailExists);
	}
	
	@GetMapping("/authenticated")
	public ResponseEntity<?> authenticated(@RequestHeader(value = "Authorization") String accessToken) {
		return ResponseEntity.ok(jwtTokenProvider.validateToken(jwtTokenProvider.getToken(accessToken)));
	}
	
	@GetMapping("/principal")
	public ResponseEntity<?> principal(@RequestHeader(value = "Authorization") String accessToken) {
		return ResponseEntity.ok().body(authenticationService.getPrincipal(accessToken));
	}
}
