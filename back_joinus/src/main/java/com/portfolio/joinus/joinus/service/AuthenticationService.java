package com.portfolio.joinus.joinus.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.portfolio.joinus.joinus.dto.auth.AddressChangeReqDto;
import com.portfolio.joinus.joinus.dto.auth.LoginReqDto;
import com.portfolio.joinus.joinus.dto.auth.NicknameChangeReqDto;
import com.portfolio.joinus.joinus.dto.auth.OAuth2ProviderMergeReqDto;
import com.portfolio.joinus.joinus.dto.auth.OAuth2RegisterReqDto;
import com.portfolio.joinus.joinus.dto.auth.PrincipalRespDto;
import com.portfolio.joinus.joinus.dto.auth.PwChangeReqDto;
import com.portfolio.joinus.joinus.dto.auth.RegisterReqDto;
import com.portfolio.joinus.joinus.entity.Authority;
import com.portfolio.joinus.joinus.entity.Point;
import com.portfolio.joinus.joinus.entity.SportsLikes;
import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.entity.UserInfo;
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
    private final JavaMailSender javaMailSender; 
	
	
	public void checkDuplicatedEmail(String email) {

		User userEntity = userRepository.findUserByEmail(email);
		if(userEntity != null) {
			
			throw new CustomException("Duplicated Email",
					ErrorMap.builder().put("email", "사용중인 이메일입니다.").build());
			
		}
	}
	
	@Transactional
	public void register(RegisterReqDto registerReqDto) {
		
			
			User userEntity = registerReqDto.toEntity();
			userRepository.registerUser(userEntity);
			String nickname = userEntity.getEmail().split("@")[0];
		
			userRepository.registerAuthority(Authority.builder()
					.userId(userEntity.getUserId())
					.roleId(1)
					.build());
			userRepository.registerPoint(Point.builder()
					.userId(userEntity.getUserId())
					.point(0)
					.build());  
			userRepository.registerUserInfo(UserInfo.builder()
					.userId(userEntity.getUserId())
					.image(null)
					.nickName(nickname)
					.build()); 
			userRepository.registerSportsLikes(SportsLikes.builder()
					.userId(userEntity.getUserId())
					.SportsId(0)
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
		System.out.println(userEntity);
		StringBuilder authorities = new StringBuilder();
		
		principalUser.getAuthorities().forEach(authority -> {
			authorities.append(authority.getAuthority() + ",");
		});
		
		if (authorities.length() > 0) {
	        authorities.delete(authorities.length() - 1, authorities.length());
	    }
		
		return PrincipalRespDto.builder()
	            .userId(userEntity.getUserId())
	            .email(userEntity.getEmail())
	            .name(userEntity.getName())
	            .address(userEntity.getAddress()) // 추가된 부분
	            .gender(userEntity.getGender()) // 추가된 부분
	            .authorities(authorities.toString())
	            .provider(userEntity.getProvider()) // 추가된 부분
	            .image(userEntity.getUserInfo().getImage())
	            .nickName(userEntity.getUserInfo().getNickName())
	            .point(userEntity.getPoint().getPoint())
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
	 
	 
	 	@Transactional
	    public void oAuth2Register(OAuth2RegisterReqDto oAuth2RegisterReqDto) {
	        User userEntity = oAuth2RegisterReqDto.toEntity();
	        userRepository.registerUser(userEntity);
	        String nickname = userEntity.getEmail().split("@")[0];
			
			userRepository.registerAuthority(Authority.builder()
					.userId(userEntity.getUserId())
					.roleId(1)
					.build());
			userRepository.registerPoint(Point.builder()
					.userId(userEntity.getUserId())
					.point(0)
					.build());  
			userRepository.registerUserInfo(UserInfo.builder()
					.userId(userEntity.getUserId())
					.image(null)
					.nickName(nickname)
					.build()); 
			userRepository.registerSportsLikes(SportsLikes.builder()
					.userId(userEntity.getUserId())
					.SportsId(0)
					.build());
	    }
	    
	    public boolean checkEmail(String email) {
	    	User userEntity = userRepository.findUserByEmail(email);
	    	
	    	return userEntity != null;
	    }
	    
	    
	    public boolean validAndSendEmail(String email) {
	    	User userEntity = userRepository.findUserByEmail(email);
	    	
	    	if(userEntity == null) {
	    		throw new CustomException("User not found for the provided email");
	    	}
	    	
	    	MimeMessage message = javaMailSender.createMimeMessage();
	    	
	    	try {
				MimeMessageHelper helper = new MimeMessageHelper(message,false,"utf-8");
				helper.setSubject("Joinus 비밀번호 찾기 메일입니다.");
				helper.setFrom("lky110408@gmail.com");
				helper.setTo(email);
				String token = UUID.randomUUID().toString().replaceAll("-", "");
				message.setContent(
				        "<div style=\"display: flex; flex-direction: column; align-items: center;\">"
				        + "<h1>비밀 번호 찾기</h1>"
				        + "<p>비밀번호를 변경하려면 아래의 버튼을 클릭하세요.</p>"
				        + "<a href=\"http://localhost:3000/auth/forget/password/" + token + "\" style=\"display: inline-block; padding: 10px 20px; color: #FFF; background-color: #007BFF; text-decoration: none;\">비밀번호 변경하기</a>"
				        + "</div>", "text/html; charset=\"utf-8\"");
				javaMailSender.send(message); 
			} catch (MessagingException e) {
				e.printStackTrace();
				throw new CustomException("Failed to send the email", ErrorMap.builder().put("message", e.getMessage()).build());
			} catch (Exception e) {
				throw new CustomException("An unknown error occurred", ErrorMap.builder().put("message", e.getMessage()).build());
			}
	    	return true;
	    }
	    
	    
	    
	    
	    public boolean checkPassword(String email, String password) {
	    	User userEntity = userRepository.findUserByEmail(email);
	    	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	    	
	    	return passwordEncoder.matches(password, userEntity.getPassword());
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
	    
	    public boolean changeAddress(AddressChangeReqDto addressChangeReqDto) {
    	 	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	    String email = authentication.getName();

    	    User userEntity = userRepository.findUserByEmail(email);
    	    
    	    if (userEntity == null) {
    	        throw new BadCredentialsException("Invalid user.");
    	    }
    	    
    	    userEntity.setAddress(addressChangeReqDto.getNewAddress());
    	    userRepository.updateAddress(userEntity);
    	    
    	    return true;  // Return true to indicate success
	    }
	    
	    public boolean changeNickname(NicknameChangeReqDto nicknameChangeReqDto) {
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	        String email = authentication.getName();

	        User userEntity = userRepository.findUserByEmail(email);

	        if (userEntity == null) {
	            throw new BadCredentialsException("유효하지 않은 사용자입니다.");
	        }

	        UserInfo userInfo = userEntity.getUserInfo();
	        if (userInfo == null) {
	            throw new RuntimeException("사용자의 정보(UserInfo)를 찾을 수 없습니다: " + email);
	        }
	        
	        
	        // 중복 닉네임 체크
	        UserInfo existingNickname = userRepository.findByNickname(nicknameChangeReqDto.getNewNickname());
	        if (existingNickname != null && existingNickname.getUserInfoId() != userInfo.getUserInfoId()) {
	        	Map<String, String> errorMap = new HashMap<>();
	        	errorMap.put("newNickname", "이미 사용 중인 닉네임입니다.");
	            throw new CustomException("Validation Failed", errorMap);
	        }

	        userInfo.setNickName(nicknameChangeReqDto.getNewNickname()); 
	        userRepository.updateNickname(userInfo); 

	        return true;
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
