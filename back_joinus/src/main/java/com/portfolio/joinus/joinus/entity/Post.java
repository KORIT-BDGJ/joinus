package com.portfolio.joinus.joinus.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Post {
	
	private int postId;
	private int writerId;
	private String title;
	private int sportsId;
	private int levelId;
	private int stateId;
	private int regionId;
	private LocalDate deadLine;
	private int recruitsCount;
	private int genderId;
	private String text;
	
	private User user;
	private Sports sports;
	private Level level;
	private State state;
	private Region region;
	private Gender gender;
}
