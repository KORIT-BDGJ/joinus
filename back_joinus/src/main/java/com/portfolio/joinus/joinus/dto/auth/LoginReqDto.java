package com.portfolio.joinus.joinus.dto.auth;

import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class LoginReqDto {
	
	
	@Pattern(regexp = "^[\\w!#$%&'*+/=?^`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$", 
			message = "올바른 이메일 주소 형식이 아닙니다")
    private String email;
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$",
			message = "영문자, 숫자, 특수문자를 포함 8~16글자")
	private String password;
	
}
