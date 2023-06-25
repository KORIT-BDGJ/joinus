package com.portfolio.joinus.joinus.entity;



import java.time.LocalDateTime;

import com.portfolio.joinus.joinus.dto.post.AttendListRespDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AttendList {
    private int postId;
    private int writerId;
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
    
   // 2023-06-06 이강용 추가
    private LocalDateTime deadline;

    public AttendListRespDto toDto() {
        return AttendListRespDto.builder()
                .postId(postId)
                .writerId(writerId)
                .userId(userId)
                .image(image)
                .nickName(nickName)
                .stateName(stateName)
                .levelName(levelName)
                .title(title)
                .deadline(deadline)
                .build();
    }
}
