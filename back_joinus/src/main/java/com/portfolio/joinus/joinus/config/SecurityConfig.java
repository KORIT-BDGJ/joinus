package com.portfolio.joinus.joinus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.portfolio.joinus.joinus.security.JwtAuthenticationEntryPoint;
import com.portfolio.joinus.joinus.security.JwtAuthenticationFilter;
import com.portfolio.joinus.joinus.security.JwtTokenProvider;
import com.portfolio.joinus.joinus.service.AuthenticationService;
import com.portfolio.joinus.joinus.service.OAuth2SuccessHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	
	private final JwtTokenProvider jwtTokenProvider; //@component 여기서는 DI 가능
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; //@component 여기서는 DI 가능
	private final AuthenticationService authenticationService;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	//security filter
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		 http.cors();
	     http.csrf().disable();
		 http.httpBasic().disable();
		 http.formLogin().disable();
		 
		 http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		 
		 http.authorizeRequests()
		 	 .antMatchers("/auth/**", "/image/**")
		 	 .permitAll()
		 	 .antMatchers("/admin/**")
		 	 .hasRole("ADMIN")
		 	 .anyRequest()
		 	 .authenticated()
		 	 .and()
		 	 .oauth2Login()
		 	 .loginPage("https://web-joinus-front-dihik2mlitgq33u.sel4.cloudtype.app/auth/login")
		 	 .successHandler(oAuth2SuccessHandler)
		 	 .userInfoEndpoint()
			 .userService(authenticationService);
		 
	 	 http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
		 	 .exceptionHandling()
		 	 .authenticationEntryPoint(jwtAuthenticationEntryPoint);
		 		
	}
}
