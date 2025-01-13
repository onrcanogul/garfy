package com.petstagram.blog.dto.tag;

import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.entity.question.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagDto extends BaseDto {
    private String name;
    private List<Question> questions = new ArrayList<>();
}
