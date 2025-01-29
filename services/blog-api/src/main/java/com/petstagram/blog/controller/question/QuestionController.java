package com.petstagram.blog.controller.question;

import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.controller.base.BaseController;
import com.petstagram.blog.dto.question.QuestionDto;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.service.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/question")
public class QuestionController extends BaseController {
    @Autowired
    private QuestionService service;

    @GetMapping("/{page}/{size}")
    public ResponseEntity<ServiceResponse<List<QuestionDto>>> get(@PathVariable int page, @PathVariable int size) {
        return controllerResponse(service.get(page, size, null));
    }

    @GetMapping("/tag/{page}/{size}/{tagId}")
    public ResponseEntity<ServiceResponse<List<QuestionDto>>> getByTag(@PathVariable int page, @PathVariable int size, @PathVariable UUID tagId) {
        return controllerResponse(service.getByTag(page, size, tagId));
    }

    @GetMapping("/user/{page}/{size}/{userId}")
    public ResponseEntity<ServiceResponse<List<QuestionDto>>> getByUser(@PathVariable int page, @PathVariable int size, @PathVariable UUID userId) {
        return controllerResponse(service.getByUser(page, size, userId));
    }

    @PostMapping
    public ResponseEntity<ServiceResponse<QuestionDto>> create(@RequestBody QuestionDto model) {
        return controllerResponse(service.add(model));
    }

    @PostMapping("like")
    public ResponseEntity<ServiceResponse<Void>> create(@RequestBody UUID questionId, @RequestBody UUID userId) {
        return controllerResponse(service.like(questionId, userId));
    }

    @PostMapping("view")
    public ResponseEntity<ServiceResponse<Void>> addSeen(@RequestBody UUID questionId, @RequestBody UUID userId) {
        return controllerResponse(service.addSeen(questionId, userId));
    }

    @PutMapping
    public ResponseEntity<ServiceResponse<QuestionDto>> update(@RequestBody QuestionDto model) {
        return controllerResponse(service.update(model, model.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<Void>> delete(@PathVariable UUID id) {
        return controllerResponse(service.delete(id));
    }
}
