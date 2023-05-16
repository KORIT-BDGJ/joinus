package com.portfolio.joinus.joinus.entity;

import java.util.Date;

import com.portfolio.joinus.joinus.dto.post.GetPostRespDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostRespDto;

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
	private Date deadLine;
	private int recruitsCount;
	private int genderId;
	private String text;
	
	private User user;
	private Sports sports;
	private Level level;
	private State state;
	private Region region;
	private Gender gender;
	
	public SearchPostRespDto toDto() {
		return SearchPostRespDto.builder()
				.postId(postId)
				.writerNickName(user.getUserInfo().getNickName())
				.title(title)
				.sportsName(sports.getSportsName())
				.regionName(region.getRegionName())
				.genderName(gender.getGenderName())
				.deadLine(deadLine)
				.recruitsCount(recruitsCount)
				.build();
	}
	
	public GetPostRespDto toGetPostDto() {
		return GetPostRespDto.builder()
				.postId(postId)
				.writerNickName(user.getUserInfo().getNickName())
				.title(title)
				.sportsName(sports.getSportsName())
				.levelName(level.getLevelName())
				.stateName(state.getStateName())
				.regionName(region.getRegionName())
				.deadLine(deadLine)
				.recruitsCount(recruitsCount)
				.genderName(gender.getGenderName())
				.text(text)
				.build();
	}

}
