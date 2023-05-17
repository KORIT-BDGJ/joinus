package com.portfolio.joinus.joinus.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentRespDto {
	private int commentId;
	private int postId;
	private int userId;
	private String nickName;
	private String image;
	private String comment;
}
