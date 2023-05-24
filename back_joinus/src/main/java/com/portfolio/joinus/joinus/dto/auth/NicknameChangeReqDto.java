package com.portfolio.joinus.joinus.dto.auth;

import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NicknameChangeReqDto {
	@Pattern(regexp = "^[가-힣a-zA-Z0-9]{2,10}$", message = "닉네임은 공백을 포함하지 않는 2~10자의 문자, 숫자, 한글로 작성하세요.")
	String newNickname;
}
