package com.portfolio.joinus.joinus.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.portfolio.joinus.joinus.dto.auth.LoginReqDto;
import com.portfolio.joinus.joinus.dto.auth.OAuth2ProviderMergeReqDto;
import com.portfolio.joinus.joinus.dto.auth.OAuth2RegisterReqDto;
import com.portfolio.joinus.joinus.dto.auth.PrincipalRespDto;
import com.portfolio.joinus.joinus.dto.auth.PwChangeReqDto;
import com.portfolio.joinus.joinus.dto.auth.RegisterReqDto;
import com.portfolio.joinus.joinus.entity.Authority;
import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.exception.CustomException;
import com.portfolio.joinus.joinus.exception.ErrorMap;
import com.portfolio.joinus.joinus.repository.UserRepository;
import com.portfolio.joinus.joinus.security.JwtTokenProvider;
import com.portfolio.joinus.joinus.security.OAuth2Attribute;
import com.portfolio.joinus.joinus.security.PrincipalUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService, OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	
	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;
	  
	
	
	public void register(RegisterReqDto registerReqDto) {
			
			User userEntity = registerReqDto.toEntity();
			userRepository.registerUser(userEntity);
			userRepository.registerAuthority(Authority.builder()
					.userId(userEntity.getUserId())
					.roleId(1)
					.build());
			
	}
	
	public String authenticate(LoginReqDto loginReqDto) {
			
			//AuthenticationManagerBuilder가 알아보게 하기 위함 (입력한 email , password와 DB에 저장된 email, password를 비교)
			UsernamePasswordAuthenticationToken authenticationToken =
					new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword()); //암호화 안된 비밀번호
			// 이까지만 해도 로그인 성공 
			Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
			
			return jwtTokenProvider.generateToken(authentication);
			
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User userEntity = userRepository.findUserByEmail(username);
		
		if(userEntity == null) {
			return null;
		}
		
		return userEntity.toPrincipal();
	}
	
	
	public boolean isAuthenticated(String accessToken) {
		return jwtTokenProvider.validateToken(jwtTokenProvider.getToken(accessToken));
	}
	
	public PrincipalRespDto getPrincipal() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
		
		User userEntity = userRepository.findUserByEmail(principalUser.getEmail()); //email
		
		StringBuilder authorities = new StringBuilder();
		
		principalUser.getAuthorities().forEach(authority -> {
			authorities.append(authority.getAuthority() + ",");
		});
		
		authorities.delete(authorities.length() - 1, authorities.length());
		
		return PrincipalRespDto.builder()
	            .userId(userEntity.getUserId())
	            .email(userEntity.getEmail())
	            .name(userEntity.getName())
	            .address(userEntity.getAddress()) // 추가된 부분
	            .gender(userEntity.getGender()) // 추가된 부분
	            .authorities(authorities.toString())
	            .provider(userEntity.getProvider()) // 추가된 부분
	            .build();
	}
	 @Override
	    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
	        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
	        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
	        String registrationId = userRequest.getClientRegistration().getRegistrationId();
	        OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, oAuth2User.getAttributes());
	        Map<String, Object> Attributes = oAuth2Attribute.convertToMap();

	        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), Attributes, "email");
	    }

	    public int oAuth2Register(OAuth2RegisterReqDto oAuth2RegisterReqDto) {
	        User userEntity = oAuth2RegisterReqDto.toEntity();
	        userRepository.registerUser(userEntity);
	        return userRepository.registerAuthority(
	                Authority.builder()
	                        .userId(userEntity.getUserId())
	                        .roleId(1)
	                        .build()
	        );
	    }
	    
	    
	    public boolean checkEmail(String email) {
	    	User userEntity = userRepository.findUserByEmail(email);
	    	
	    	return userEntity != null;
	    }
	    
	    public boolean changePassword(PwChangeReqDto pwChangeReqDto) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String email = authentication.getName();

	        User userEntity = userRepository.findUserByEmail(email);
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	        if (userEntity == null) {
	    		throw new BadCredentialsException("Invalid user.");
	    	}
	        
	        
	        userEntity.setPassword(passwordEncoder.encode(pwChangeReqDto.getNewPassword()));
	        userRepository.updatePassword(userEntity);
	        
	        return true;  // Return true to indicate success
	    }


	    public boolean checkPassword(String email, String password) {
			User userEntity = userRepository.findUserByEmail(email);
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

			return passwordEncoder.matches(password, userEntity.getPassword());
		}
		
		public int oAuth2ProviderMerge(OAuth2ProviderMergeReqDto oAuth2ProviderMergeReqDto) {
			User userEntity = userRepository.findUserByEmail(oAuth2ProviderMergeReqDto.getEmail());
			
			String provider = oAuth2ProviderMergeReqDto.getProvider();
			
			if(StringUtils.hasText(userEntity.getProvider())) {
				// 문자가 있는경우
				userEntity.setProvider(userEntity.getProvider() + "," + provider); //기존의 로그인 provider, + @
			}else {
				// 문자가 없는경우
				userEntity.setProvider(provider); // provider
			}
			
			return userRepository.updateProvider(userEntity);
			
		
		}
	
}
