package com.portfolio.joinus.joinus.dto.auth;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ForgetPasswordReqDto {
	private String email;
}
