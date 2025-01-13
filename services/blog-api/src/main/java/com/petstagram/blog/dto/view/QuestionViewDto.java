package com.petstagram.blog.dto.view;

import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.dto.question.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionViewDto extends BaseDto {
    private UUID userId;
    private QuestionDto question;
}
