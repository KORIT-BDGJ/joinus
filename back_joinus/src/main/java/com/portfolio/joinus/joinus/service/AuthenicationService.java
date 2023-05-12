package com.portfolio.joinus.joinus.service;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.exception.CustomException;
import com.portfolio.joinus.joinus.exception.ErrorMap;
import com.portfolio.joinus.joinus.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenicationService {
	
	private final UserRepository userRepository;
	
	public void checkDuplicatedEmail(String email) {
			
			User userEntity = userRepository.findUserByEmail(email);
			if(userEntity != null) {
				
				throw new CustomException("Duplicated Email",
						ErrorMap.builder().put("email", "사용중인 이메일입니다.").build());
				
			}
		}
}
