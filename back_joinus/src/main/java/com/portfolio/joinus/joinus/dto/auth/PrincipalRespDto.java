package com.portfolio.joinus.joinus.dto.auth;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PrincipalRespDto {
    private int userId;
    private String email;
    private String name;
    private String address; // 추가된 부분
    private String gender; // 추가된 부분
    private String authorities;
    private String provider; // 추가된 부분
    //맞는지 모르겠음
    private String image;
	private String nickName;
	private int point;
}