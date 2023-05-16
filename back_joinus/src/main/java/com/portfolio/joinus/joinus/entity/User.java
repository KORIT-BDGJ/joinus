package com.portfolio.joinus.joinus.entity;

import java.util.ArrayList;
import java.util.List;

import com.portfolio.joinus.joinus.security.PrincipalUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
	private int userId;
	private String email;
	private String password;
	private String passwordConfirm;
	private String name;
	private String address; // 추가된 부분
	private String gender; // 추가된 부분
	private String provider;
	
	private UserInfo userInfo;
	private Point point;
	
	private List<Authority> authorities;
	
	public PrincipalUser toPrincipal() {
		
		List<String> roles = new ArrayList<>();
		
		authorities.forEach(authority ->{
			roles.add(authority.getRole().getRoleName());
		});
		return PrincipalUser.builder()
				.userId(userId)
				.email(email)
				.password(password)
				.passwordConfirm(passwordConfirm)
				.name(name)
				.address(address)
				.gender(gender)
				.authorities(authorities)
				.provider(provider)
				.build();
	}
}
