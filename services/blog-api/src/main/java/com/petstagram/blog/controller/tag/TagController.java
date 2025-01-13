package com.petstagram.blog.controller.tag;

import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.controller.base.BaseController;
import com.petstagram.blog.dto.question.QuestionDto;
import com.petstagram.blog.dto.tag.TagDto;
import com.petstagram.blog.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tag")
public class TagController extends BaseController {
    @Autowired
    private TagService service;

    @PostMapping
    public ResponseEntity<ServiceResponse<TagDto>> create(@RequestBody TagDto model) {
        return controllerResponse(service.create(model));
    }

    @PutMapping
    public ResponseEntity<ServiceResponse<TagDto>> update(@RequestBody TagDto model) {
        return controllerResponse(service.update(model, model.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<Void>> delete(@PathVariable UUID id) {
        return controllerResponse(service.delete(id));
    }
}
