package com.petstagram.blog.configuration.mapper;


import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.dto.question.QuestionDto;
import com.petstagram.blog.dto.tag.TagDto;
import com.petstagram.blog.dto.view.QuestionViewDto;
import com.petstagram.blog.entity.answer.Answer;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.entity.question.Question;
import com.petstagram.blog.entity.tag.Tag;
import com.petstagram.blog.entity.view.QuestionView;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfiguration {

    @Bean
    public Mapper<BaseEntity, BaseDto> baseMapper() {
        return new Mapper<>(BaseEntity.class, BaseDto.class);
    }
    @Bean
    public Mapper<Question, QuestionDto> commentMapper() {
       return new Mapper<>(Question.class, QuestionDto.class);
    }
    @Bean
    public Mapper<Answer, AnswerDto> answerMapper() {
        return new Mapper<>(Answer.class, AnswerDto.class);
    }
    @Bean
    public Mapper<Tag, TagDto> tagMapper() {
        return new Mapper<>(Tag.class, TagDto.class);
    }
    @Bean
    public Mapper<QuestionView, QuestionViewDto> questionViewMapper() {
        return new Mapper<>(QuestionView.class, QuestionViewDto.class);
    }
}
