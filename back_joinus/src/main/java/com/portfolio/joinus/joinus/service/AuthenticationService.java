package com.portfolio.joinus.joinus.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
import com.portfolio.joinus.joinus.dto.auth.RegisterReqDto;
import com.portfolio.joinus.joinus.entity.Authority;
import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.exception.CustomException;
import com.portfolio.joinus.joinus.exception.ErrorMap;
import com.portfolio.joinus.joinus.repository.UserRepository;
import com.portfolio.joinus.joinus.security.JwtTokenProvider;
import com.portfolio.joinus.joinus.security.OAuth2Attribute;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService, OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	
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
