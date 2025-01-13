package com.petstagram.blog.controller.answer;

import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.controller.base.BaseController;
import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.service.answer.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/answer")
public class AnswerController extends BaseController {

    @Autowired
    private AnswerService service;

    @GetMapping("/{questionId}")
    public ResponseEntity<ServiceResponse<List<AnswerDto>>> get(@PathVariable UUID questionId) {
        return controllerResponse(service.get(0,0, answer -> answer.getQuestion().getId() == questionId));
    }

    @PostMapping
    public ResponseEntity<ServiceResponse<AnswerDto>> create(@RequestBody AnswerDto model) {
        return controllerResponse(service.create(model));
    }

    @PutMapping
    public ResponseEntity<ServiceResponse<AnswerDto>> update(@RequestBody AnswerDto model) {
        return controllerResponse(service.update(model, model.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<Void>> delete(@PathVariable UUID id) {
        return controllerResponse(service.delete(id));
    }
}
