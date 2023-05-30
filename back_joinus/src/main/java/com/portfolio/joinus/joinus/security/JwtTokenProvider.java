package com.portfolio.joinus.joinus.security;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.exception.CustomException;
import com.portfolio.joinus.joinus.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;



@Component
public class JwtTokenProvider {
	@Autowired
	private UserRepository userRepository;
	private final Key key;
	
	
	public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
		
		key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
	    //System.out.println(key);
		//log.info("Secret Key: {}", key);
	}
    
	public String generateToken(Authentication authentication) {
		
		
		String email = null;
		
		
		if(authentication.getPrincipal().getClass() == PrincipalUser.class) {
			//PrincipalUser
			PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal(); //downcasting
			email = principalUser.getEmail();
		}else {
			//OAuth2User
			
			OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
			email = oAuth2User.getAttribute("email");
		}
		
		// 권한 설정
		
		if(authentication.getAuthorities() == null) {
			throw new RuntimeException("등록된 권한이 없습니다.");
		}
		
		StringBuilder roles = new StringBuilder();
		authentication.getAuthorities().forEach(authority -> {
			roles.append(authority.getAuthority() + ",");
		});
		
		roles.delete(roles.length() - 1, roles.length()); //권한 마지막 쉼표 제거
		
		
		Date tokenExpiresDate = new Date(new Date().getTime() + (1000 * 60 * 60 *24));
		
		
		return Jwts.builder()
				.setSubject("AccessToken")
				.claim("email", email)
				.claim("auth", roles)
				.setExpiration(tokenExpiresDate)
				.signWith(key,SignatureAlgorithm.HS256)
				.compact();
	}
	
	
		// jwt Token 생성 (회원가입 전용 토큰)
	
	public String generateOAuth2RegisterToken (Authentication authentication) {
				
		// 만료기간
		Date tokenExpiresDate = new Date(new Date().getTime() + (1000*60*10));
		
		OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
		
		String email = oAuth2User.getAttribute("email");
		 
		
		return  Jwts.builder()
				.setSubject("OAuth2Register")
				.claim("email", email)
				.setExpiration(tokenExpiresDate)
				.signWith(key,SignatureAlgorithm.HS256)
				.compact();
	}
	
//	public String generatePasswordResetToken(String email) {
//		Date tokenExpiresDate = new Date(new Date().getTime() + (1000*60*10));
//		return  Jwts.builder()
//		        .setSubject("TemporaryToken")
//		        .claim("email", email)
//		        .setExpiration(tokenExpiresDate)
//		        .signWith(key,SignatureAlgorithm.HS256)
//		        .compact();
//	}
	
	
	
	
	
	public Boolean validateToken(String token) {
//		System.out.println("token: "+token);
		try {
			Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token);
//			System.out.println("Token is valid: " + token);
			return true;
		}catch (Exception e) {
			
		}
		return false;
	}
	
	public String getToken(String jwtToken) {
		String type = "Bearer ";
		if(StringUtils.hasText(jwtToken) && jwtToken.startsWith(type)) {
			return jwtToken.substring(type.length());
		}
		return null;
	}
	
	public Claims getClaims(String token) {
			
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
		
		
		
		
	public Authentication getAuthentication(String accessToken) {
		
		Authentication authentication = null;
		Claims claims = getClaims(accessToken);
		
		User userEntity = userRepository.findUserByEmail(claims.get("email").toString());
		
		PrincipalUser principalUser = userEntity.toPrincipal();
		
		authentication = new UsernamePasswordAuthenticationToken(principalUser, null, principalUser.getAuthorities());
		
		return authentication;
	}
}
