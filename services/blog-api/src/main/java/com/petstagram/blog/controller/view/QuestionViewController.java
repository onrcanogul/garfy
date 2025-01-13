package com.petstagram.blog.controller.view;

import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.controller.base.BaseController;
import com.petstagram.blog.dto.view.QuestionViewDto;
import com.petstagram.blog.service.view.QuestionViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/question-view")
public class QuestionViewController extends BaseController {
    @Autowired
    private QuestionViewService service;

    @PostMapping
    public ResponseEntity<ServiceResponse<QuestionViewDto>> add(QuestionViewDto model) {
        return controllerResponse(service.create(model));
    }
}
