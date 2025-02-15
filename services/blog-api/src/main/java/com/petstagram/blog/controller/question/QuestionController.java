package com.petstagram.blog.controller.question;

import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.petstagram.blog.configuration.response.NoContent;
import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.controller.base.BaseController;
import com.petstagram.blog.dto.question.QuestionDto;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.service.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/question")
public class QuestionController extends BaseController {
    @Autowired
    private QuestionService service;
    @Autowired
    private ObjectMapper mapper;

    @GetMapping("/{page}/{size}")
    public ResponseEntity<ServiceResponse<List<QuestionDto>>> get(@PathVariable int page, @PathVariable int size) {
        return controllerResponse(service.get(page, size));
    }

    @GetMapping("/tag/{page}/{size}/{tagId}")
    public ResponseEntity<ServiceResponse<List<QuestionDto>>> getByTag(@PathVariable int page, @PathVariable int size, @PathVariable UUID tagId) {
        return controllerResponse(service.getByTag(page, size, tagId));
    }

    @GetMapping("/user/{page}/{size}/{userId}")
    public ResponseEntity<ServiceResponse<List<QuestionDto>>> getByUser(@PathVariable int page, @PathVariable int size, @PathVariable UUID userId) {
        return controllerResponse(service.getByUser(page, size, userId));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceResponse<QuestionDto>> create(
            @RequestPart("model") String modelJson,
            @RequestPart("files") List<MultipartFile> files) throws Exception {
        return controllerResponse(service.add(mapper.readValue(modelJson, QuestionDto.class), files));
    }

    @PostMapping("like")
    public ResponseEntity<ServiceResponse<NoContent>> create(@RequestBody UUID questionId, @RequestBody UUID userId) {
        return controllerResponse(service.like(questionId, userId));
    }

    @PostMapping("view")
    public ResponseEntity<ServiceResponse<NoContent>> addSeen(@RequestBody UUID questionId, @RequestBody UUID userId) {
        return controllerResponse(service.addSeen(questionId, userId));
    }

    @PutMapping
    public ResponseEntity<ServiceResponse<QuestionDto>> update(@RequestBody QuestionDto model) {
        return controllerResponse(service.update(model, model.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<NoContent>> delete(@PathVariable UUID id) {
        return controllerResponse(service.delete(id));
    }
}
