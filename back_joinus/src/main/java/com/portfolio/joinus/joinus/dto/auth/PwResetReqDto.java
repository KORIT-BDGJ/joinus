package com.portfolio.joinus.joinus.dto.auth;

import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PwResetReqDto {
	
	private String email;
	private String temporaryToken;
	private static final String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$";
    
    @Pattern(regexp = PASSWORD_REGEX, message = "비밀번호는 영문자, 숫자, 특수문자를 포함하여 8 ~ 16 글자로 작성하세요.")
    private String newPassword;

}
