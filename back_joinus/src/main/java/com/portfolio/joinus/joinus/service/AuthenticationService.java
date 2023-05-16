package com.portfolio.joinus.joinus.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.dto.auth.JwtRespDto;
import com.portfolio.joinus.joinus.dto.auth.LoginReqDto;
import com.portfolio.joinus.joinus.dto.auth.PrincipalRespDto;
import com.portfolio.joinus.joinus.dto.auth.RegisterReqDto;
import com.portfolio.joinus.joinus.entity.Authority;
import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.exception.CustomException;
import com.portfolio.joinus.joinus.exception.ErrorMap;
import com.portfolio.joinus.joinus.repository.UserRepository;
import com.portfolio.joinus.joinus.security.JwtTokenProvider;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {
	
	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;
	
	public void checkDuplicatedEmail(String email) {

		User userEntity = userRepository.findUserByEmail(email);
		if(userEntity != null) {
			
			throw new CustomException("Duplicated Email",
					ErrorMap.builder().put("email", "사용중인 이메일입니다.").build());
			
		}
	}
	public void register(RegisterReqDto registerReqDto) {
			
			User userEntity = registerReqDto.toEntity();
			userRepository.registerUser(userEntity);
			userRepository.registerAuthority(Authority.builder()
					.userId(userEntity.getUserId())
					.roleId(1)
					.build());
			
	}
	
	public JwtRespDto authenticate(LoginReqDto loginReqDto) {
			
			//AuthenticationManagerBuilder가 알아보게 하기 위함 (입력한 email , password와 DB에 저장된 email, password를 비교)
			UsernamePasswordAuthenticationToken authenticationToken =
					new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword()); //암호화 안된 비밀번호
			// 이까지만 해도 로그인 성공 
			Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
			
		    System.out.println(jwtTokenProvider.generateToken(authentication));
			return jwtTokenProvider.generateToken(authentication);
			
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User userEntity = userRepository.findUserByEmail(username);
		
		if(userEntity == null) {
			throw new CustomException("로그인 실패",ErrorMap.builder().put("email", "사용자 정보를 확인하세요").build());
		}
		
		return userEntity.toPrincipal();
	}
	
	
	public boolean isAuthenticated(String accessToken) {
		return jwtTokenProvider.validateToken(jwtTokenProvider.getToken(accessToken));
	}
	
	public PrincipalRespDto getPrincipal(String accessToken) {
		Claims claims = jwtTokenProvider.getClaims(jwtTokenProvider.getToken(accessToken));
		User userEntity = userRepository.findUserByEmail(claims.getSubject()); //email
		
		return PrincipalRespDto.builder()
	            .userId(userEntity.getUserId())
	            .email(userEntity.getEmail())
	            .name(userEntity.getName())
	            .address(userEntity.getAddress()) // 추가된 부분
	            .gender(userEntity.getGender()) // 추가된 부분
	            .authorities((String)claims.get("auth"))
	            .provider(userEntity.getProvider()) // 추가된 부분
	            .build();
	}
}
