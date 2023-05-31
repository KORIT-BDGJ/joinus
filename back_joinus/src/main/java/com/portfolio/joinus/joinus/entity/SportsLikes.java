package com.portfolio.joinus.joinus.entity;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SportsLikes {
	private int userId;
	private int sportsId;
	//private String SportsName;
}
