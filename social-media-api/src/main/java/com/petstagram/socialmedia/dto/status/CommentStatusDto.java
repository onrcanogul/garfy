package com.petstagram.socialmedia.dto.status;

import com.petstagram.socialmedia.dto.comment.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CommentStatusDto extends StatusDto {
    private CommentDto comment;
}
