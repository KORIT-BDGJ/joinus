package com.portfolio.joinus.joinus.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OwnerPostListRespDto {
	private int ownerPostListId;
	private int userId;
	private int postId;
	private String title;
}
