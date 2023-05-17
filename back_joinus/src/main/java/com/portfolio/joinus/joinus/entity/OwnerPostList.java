package com.portfolio.joinus.joinus.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OwnerPostList {
    private int ownerPostListId;
    private int userInfoId;
    private int postListId;
}
