// FinishList.java
package com.portfolio.joinus.joinus.entity;

import java.util.List;

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
    private List<String> userIdList; 
    
    public FinishListRespDto toDto() {
        return FinishListRespDto.builder()
                .postId(postId)
                .title(title)
                .userId(userId)
                .userIdList(userIdList)
                .build();
    }
}
