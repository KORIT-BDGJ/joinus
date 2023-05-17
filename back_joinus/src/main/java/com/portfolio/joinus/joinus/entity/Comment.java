package com.portfolio.joinus.joinus.entity;

import com.portfolio.joinus.joinus.dto.post.CommentRespDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Comment {
	private int commentId;
	private int postId;
	private int userId;
	private String nickName;
	private String image;
	private String comment;
	
	private Post post;
	private User user;
	
	public CommentRespDto toDto() {
		return CommentRespDto.builder()
				.commentId(commentId)
				.postId(postId)
				.userId(userId)
				.image(image)
				.nickName(nickName)
				.comment(comment)
				.build();
	}

}
