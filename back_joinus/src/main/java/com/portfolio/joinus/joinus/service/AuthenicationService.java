package com.portfolio.joinus.joinus.service;

import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenicationService {
	
	private final UserDetailsRepository userRepository;
	
	public void checkDuplicatedEmail(String email) {
			
			User userEntity = userRepository.findUserByEmail(email);
			if(userEntity != null) {
				
				throw new CustomException("Duplicated Email",
						ErrorMap.builder().put("email", "사용중인 이메일입니다.").build());
				
			}
		}
}
