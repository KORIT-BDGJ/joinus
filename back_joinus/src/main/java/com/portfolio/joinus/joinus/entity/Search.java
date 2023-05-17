package com.portfolio.joinus.joinus.entity;

import com.portfolio.joinus.joinus.dto.post.SearchRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Search {

	private int searchId;
	private String searchName;
	
	public SearchRespDto toDto() {
		return SearchRespDto.builder()
				.searchId(searchId)
				.searchName(searchName)
				.build();
	}
}
