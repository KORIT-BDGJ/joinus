package com.portfolio.joinus.joinus.config;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Value("${file.path}")
	private String filePath;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		
		// `/**` : 모든 요청
		// .allowedMethods("*") : 모든 메서드에서 열어준다
		// .allowedOrigins("http://localHost:3000") : 해당 port에서 오는 요청을
		registry.addMapping("/**")
				.allowedMethods("*")
				.allowedOrigins("http://leesfact.s3-website.ap-northeast-2.amazonaws.com/auth/login");
//				.allowedOrigins("htp://localHost:3000");
	}
	
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		WebMvcConfigurer.super.addResourceHandlers(registry);
		registry.addResourceHandler("/image/**")
				.addResourceLocations("file:///" + filePath)
				.resourceChain(true)
//				addResolver : 한글을 decoding 해주는 영역
				.addResolver(new PathResourceResolver(){
					@Override
					protected Resource getResource(String resourcePath, Resource location) throws IOException {
						resourcePath = URLDecoder.decode(resourcePath,StandardCharsets.UTF_8);
						return super.getResource(resourcePath, location);
					}
				});
	}
}
