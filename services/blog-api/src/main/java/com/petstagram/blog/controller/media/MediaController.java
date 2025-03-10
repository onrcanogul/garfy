//package com.petstagram.blog.controller.media;
//
//import com.petstagram.blog.controller.base.BaseController;
//import com.petstagram.blog.service.grpc.GrpcClientService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/media")
//public class MediaController extends BaseController {
//
//    private final GrpcClientService grpcClientService;
//
//    public MediaController(GrpcClientService grpcClientService) {
//        this.grpcClientService = grpcClientService;
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<GetResponse> get(@PathVariable UUID id) {
//        return ResponseEntity.ok(grpcClientService.getFiles(id.toString(), FileType.POST_IMAGE));
//    }
//
//    @PostMapping
//    public ResponseEntity<UploadResponse> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") UUID id, @RequestParam("fileType") FileType fileType) throws IOException {
//        byte[] fileContent = file.getBytes();
//        UploadResponse response = grpcClientService.uploadFiles(id, file.getOriginalFilename(), file.getContentType(), fileType, "blog-images", fileContent);
//        return ResponseEntity.ok(response);
//    }
//}
