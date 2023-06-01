package com.portfolio.joinus.joinus.dto.auth;

import java.util.List;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class SportsLikesChangeReqDto {
	private int userId;
	private List<Integer> sportsIds;
}
