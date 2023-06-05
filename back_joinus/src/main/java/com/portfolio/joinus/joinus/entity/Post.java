package com.portfolio.joinus.joinus.entity;

import java.time.LocalDateTime;
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
	private LocalDateTime registeDate;
	
	private User user;
	private Sports sports;
	private Level level;
	private State state;
	private Region region;
	private Gender gender;
	private Point point;
	
	public SearchPostRespDto toDto() {
		
		
		return SearchPostRespDto.builder()
				.postId(postId)
				.writerNickName(user.getUserInfo().getNickName())
				.writerImage(user.getUserInfo().getImage())
				.title(title)
				.sportsId(sports.getSportsId())
				.sportsName(sports.getSportsName())
				.regionName(region.getRegionName())
				.genderName(gender.getGenderName())
				.deadLine(deadLine)
				.recruitsCount(recruitsCount)
				.registeDate(registeDate)
				.build();
	}
	
	public GetPostRespDto toGetPostDto() {
		return GetPostRespDto.builder()
				.postId(postId)
				.writerId(writerId)
				.userId(user.getUserId())
				.writerNickName(user.getUserInfo().getNickName())
				.image(user.getUserInfo().getImage())
				.point(user.getPoint().getPoint())
				.title(title)
				.sportsId(sports.getSportsId())
				.sportsName(sports.getSportsName())
				.levelId(level.getLevelId())
				.levelName(level.getLevelName())
				.stateId(state.getStateId())
				.stateName(state.getStateName())
				.regionId(region.getRegionId())
				.regionName(region.getRegionName())
				.deadLine(deadLine)
				.recruitsCount(recruitsCount)
				.genderId(gender.getGenderId())
				.genderName(gender.getGenderName())
				.text(text)
				.build();
	}
}
