package com.portfolio.joinus.joinus.entity;

import com.portfolio.joinus.joinus.dto.post.AttendListRespDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AttendList {
    private int postId;
    private int userId;
    private String image;
    private String nickName;
    private String stateName;
    private String levelName;
    private String title; // 2023-05-30 김두영 추가

    private User user;
    private Post post;
    private State state;
    private Level level;

    public AttendListRespDto toDto() {
        return AttendListRespDto.builder()
                .postId(postId)
                .userId(userId)
                .image(image)
                .nickName(nickName)
                .stateName(stateName)
                .levelName(levelName)
                .title(title)
                .build();
    }
}
