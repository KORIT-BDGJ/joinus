package com.portfolio.joinus.joinus.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.aop.annotation.ValidAspect;
import com.portfolio.joinus.joinus.dto.auth.AddressChangeReqDto;
import com.portfolio.joinus.joinus.dto.auth.CheckPasswordReqDto;
import com.portfolio.joinus.joinus.dto.auth.NicknameChangeReqDto;
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
	@ValidAspect
	@PutMapping("/change/password")
	public ResponseEntity<?> changePassword(@Valid @RequestBody PwChangeReqDto pwChangeReqDto , BindingResult bindingResult){
		if(authenticationService.changePassword(pwChangeReqDto)) {
			return ResponseEntity.ok().body(true);
		}
		return ResponseEntity.badRequest().body("Password change failed.");
	}
	
	@PutMapping("/change/address")
	public ResponseEntity<?> changeAddress( @RequestBody AddressChangeReqDto addressChangeReqDto, BindingResult bindingResult){
	    if(authenticationService.changeAddress(addressChangeReqDto)) {
	        return ResponseEntity.ok().body(true);
	    }
	    return ResponseEntity.badRequest().body("Address change failed.");
	}
	
	@ValidAspect
	@PutMapping("/change/nickname")
	public ResponseEntity<?> changeNickname(@Valid @RequestBody NicknameChangeReqDto nicknameChangeReqDto , BindingResult bindingResult) {
        return ResponseEntity.ok().body(authenticationService.changeNickname(nicknameChangeReqDto));
	}
	
	@GetMapping("/principal")
	public ResponseEntity<?> principal() {
		return ResponseEntity.ok().body(authenticationService.getPrincipal());
	}
}
