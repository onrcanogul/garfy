package com.petstagram.socialmedia.dto.status;

import com.petstagram.socialmedia.dto.post.PostDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostStatusDto extends StatusDto {
    private PostDto post;
}
