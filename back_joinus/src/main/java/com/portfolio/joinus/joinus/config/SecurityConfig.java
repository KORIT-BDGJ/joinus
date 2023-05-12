package com.portfolio.joinus.joinus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	
//	private final JwtTokenProvider jwtTokenProvider; //@component 여기서는 DI 가능
//	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; //@component 여기서는 DI 가능
	
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http.cors();
	     http.csrf().disable();
		 http.httpBasic().disable();
		 http.formLogin().disable();
		 
		 http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		 
		 http.authorizeRequests()
//		 	 .antMatchers("/auth/**")
		 	 .anyRequest()
		 	 .permitAll();
//		 	 .antMatchers("/admin/**")
//		 	 .hasRole("ADMIN")
//		 	 .authenticated();
//		 	 .and()
//		 	 .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
//		 	 .exceptionHandling()
//		 	 .authenticationEntryPoint(jwtAuthenticationEntryPoint);
//		 		
	}
}
