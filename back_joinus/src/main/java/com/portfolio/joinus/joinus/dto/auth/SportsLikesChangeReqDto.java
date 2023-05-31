package com.portfolio.joinus.joinus.dto.auth;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class SportsLikesChangeReqDto {
	private int userId;
	private int sportsId;
}
