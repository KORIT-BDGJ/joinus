package com.portfolio.joinus.joinus.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserInfo {
	private int userInfoId;
	private int userId;
	private String image;
	private String nickName;
}
