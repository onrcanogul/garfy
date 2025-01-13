package com.petstagram.blog.entity.question;

import com.petstagram.blog.entity.answer.Answer;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.entity.tag.Tag;
import com.petstagram.blog.entity.view.QuestionView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Question extends BaseEntity {
    private UUID userId;
    private String content;
    private String title;
    @OneToMany(mappedBy = "answer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();
    @OneToMany(mappedBy = "question_view", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuestionView> views = new ArrayList<>();
    @ManyToMany(mappedBy = "tag", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "question_tags",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags = new ArrayList<>();
}
