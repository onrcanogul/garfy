package com.petstagram.socialmedia.dto.story;

import com.petstagram.socialmedia.dto.base.BaseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class StoryDto extends BaseDto {
    private UUID userId;
}
