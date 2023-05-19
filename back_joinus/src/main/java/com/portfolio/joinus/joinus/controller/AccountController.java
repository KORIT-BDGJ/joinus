package com.portfolio.joinus.joinus.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.dto.auth.CheckPasswordReqDto;
import com.portfolio.joinus.joinus.dto.auth.PwChangeReqDto;
import com.portfolio.joinus.joinus.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {
	
	private final AuthenticationService authenticationService;
	
	@PostMapping("/check/password")
	public ResponseEntity<?> checkPassword(@RequestBody CheckPasswordReqDto checkPasswordReqDto) {
		
		//System.out.println("입력한 비밀번호: " + checkPasswordReqDto.getOldPassword());
	    
	    if(authenticationService.checkPassword(checkPasswordReqDto.getEmail(), checkPasswordReqDto.getOldPassword())) {
	    	return ResponseEntity.ok().body(true);
	    }
	    
	    // 200 상태 코드와 함께 false 값을 반환하도록 변경합니다.
	    return ResponseEntity.ok().body(false);
	}
	
	@PutMapping("/change/password")
	public ResponseEntity<?> changePassword(@RequestBody PwChangeReqDto pwChangeReqDto){
		if(authenticationService.changePassword(pwChangeReqDto)) {
			return ResponseEntity.ok().body(true);
		}
		return ResponseEntity.badRequest().body("Password change failed.");
	}
	
}
