package com.petstagram.blog.dto.question;

import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.dto.tag.TagDto;
import com.petstagram.blog.dto.view.QuestionViewDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class QuestionDto extends BaseDto {
    private UUID userId;
    private String content;
    private String title;
    private List<AnswerDto> answers = new ArrayList<>();
    private List<QuestionViewDto> views = new ArrayList<>();
    private List<TagDto> tags = new ArrayList<>();
}
