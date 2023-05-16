package com.portfolio.joinus.joinus.dto.auth;

import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.portfolio.joinus.joinus.entity.User;

import lombok.Data;

@Data
public class RegisterReqDto {
    private static final String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$";
    private static final String NAME_REGEX = "^[가-힣]{2,7}$";

    @Pattern(regexp = "^[\\w!#$%&'*+/=?^`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$", message = "올바른 이메일 주소 형식이 아닙니다.")
    private String email;

    @Pattern(regexp = PASSWORD_REGEX, message = "비밀번호는 영문자, 숫자, 특수문자를 포함하여 8 ~ 16 글자로 작성하세요.")
    private String password;

    @Pattern(regexp = PASSWORD_REGEX, message = "비밀번호 확인은 영문자, 숫자, 특수문자를 포함하여 8 ~ 16 글자로 작성하세요.")
    private String passwordConfirm;

    @Pattern(regexp = NAME_REGEX, message = "한글이름만 작성 가능합니다.")
    private String name;

    private String address;
    private String gender;

    public User toEntity() {
        if (!password.equals(passwordConfirm)) {
            throw new IllegalArgumentException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }

        return User.builder()
                .email(email)
                .password(new BCryptPasswordEncoder().encode(password))
                .name(name)
                .address(address)
                .gender(gender)
                .build();
    }
}