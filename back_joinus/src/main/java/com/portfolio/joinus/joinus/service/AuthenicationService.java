package com.portfolio.joinus.joinus.service;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.exception.CustomException;
import com.portfolio.joinus.joinus.exception.ErrorMap;
<<<<<<< HEAD
=======
import com.portfolio.joinus.joinus.repository.UserRepository;
>>>>>>> main

import lombok.RequiredArgsConstructor;

@Service
//@RequiredArgsConstructor
public class AuthenicationService {
	
<<<<<<< HEAD
//	private final UserDetailsRepository userRepository;
=======
	private final UserRepository userRepository;
>>>>>>> main
	
	public void checkDuplicatedEmail(String email) {
			
//			User userEntity = userRepository.findUserByEmail(email);
//			if(userEntity != null) {
				
				throw new CustomException("Duplicated Email",
						ErrorMap.builder().put("email", "사용중인 이메일입니다.").build());
				
//			}
		}
}
