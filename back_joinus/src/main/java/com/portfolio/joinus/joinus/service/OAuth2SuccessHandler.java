package com.portfolio.joinus.joinus.service;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.repository.UserRepository;
import com.portfolio.joinus.joinus.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String provider = oAuth2User.getAttribute("provider");
        User userEntity = userRepository.findUserByEmail(email);

        if (userEntity == null) {
            // 회원가입 실패
            String registerToken = jwtTokenProvider.generateOAuth2RegisterToken(authentication);
            String name = oAuth2User.getAttribute("name");
            String address = ""; // 주소 초기화
            String gender = ""; // 성별 초기화

        // 카카오인 경우 이름, 주소, 성별 초기화
        if("kakao".equals(provider)) {
        	name = "";
        	address = "";
            gender = "";
        }
            
        response.sendRedirect(
                "http://localhost:3000/auth/oauth2/register"
                        + "?registerToken=" + registerToken
                        + "&email=" + email
                        + "&name=" + URLEncoder.encode(name, "UTF-8")
                        + "&provider=" + provider
                        + "&address=" + URLEncoder.encode(address, "UTF-8")
                        + "&gender=" + URLEncoder.encode(gender, "UTF-8")
        );
        } else {
            // 회원가입 성공
            if (StringUtils.hasText(userEntity.getProvider())) {
                if (!userEntity.getProvider().contains(provider)) {
                    // 하지만 로그인된 OAuth2 계정의 provider가 등록되지 않은 경우
                    response.sendRedirect("http://localhost:3000/auth/oauth2/merge"
                            + "?provider=" + provider
                            + "&email=" + email);
                    return;
                }
                // 회원가입이 되었고, provider가 등록된 경우
                response.sendRedirect("http://localhost:3000/auth/oauth2/login"
                        + "?accessToken=" + jwtTokenProvider.generateToken(authentication));
            } else {
                // 회원가입은 정상적으로 되었지만, provider가 null인 경우
                response.sendRedirect("http://localhost:3000/auth/oauth2/merge"
                        + "?provider=" + provider
                        + "&email=" + email);
            }
        }
    }
}
