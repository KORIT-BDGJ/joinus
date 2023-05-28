package com.portfolio.joinus.joinus.security;

import java.io.IOException;
import java.io.PrintWriter;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.joinus.joinus.dto.common.ErrorResponseDto;

@Component 
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		
		
		//System.out.println("Token authentication failed: " + authException.getMessage());

		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE); 
		response.setStatus(HttpStatus.UNAUTHORIZED.value()); // 401 error
		ErrorResponseDto<?> errorResponseDto = 
				new ErrorResponseDto<AuthenticationException>("인증 실패", authException);
		ObjectMapper objectMapper = new ObjectMapper(); 
		
		String responseJson = objectMapper.writeValueAsString(errorResponseDto); //객체를 넣으면 알아서 Json으로 변환
		
		PrintWriter out = response.getWriter();
		out.println(responseJson);
		
	}

}
