package com.portfolio.joinus.joinus.entity;

import com.portfolio.joinus.joinus.dto.post.FinishListRespDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FinishList {
	private int postId;
    private String title;
    private int userId;

    public FinishListRespDto toDto() {
        return FinishListRespDto.builder()
                .postId(postId)
                .title(title)
                .userId(userId)
                .build();
    }
}
