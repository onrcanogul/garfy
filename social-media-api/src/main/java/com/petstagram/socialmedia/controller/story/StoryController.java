package com.petstagram.socialmedia.controller.story;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.controller.base.BaseController;
import com.petstagram.socialmedia.dto.story.StoryDto;
import com.petstagram.socialmedia.service.story.StoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/story")
public class StoryController extends BaseController {

    private final StoryService service;

    public StoryController(StoryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ServiceResponse<StoryDto>> create(@RequestBody StoryDto model) {
        return controllerResponse(service.create(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<Void>> delete(@PathVariable UUID id) {
        return controllerResponse(service.delete(id));
    }
}
