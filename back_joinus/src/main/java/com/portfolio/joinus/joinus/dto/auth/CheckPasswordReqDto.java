package com.portfolio.joinus.joinus.dto.auth;

import lombok.Data;

@Data
public class CheckPasswordReqDto {
	private String email;
	private String oldPassword;
}
