//package com.petstagram.socialmedia.controller.media;
//
//import com.petstagram.socialmedia.FileType;
//import com.petstagram.socialmedia.GetResponse;
//import com.petstagram.socialmedia.UploadResponse;
//import com.petstagram.socialmedia.configuration.response.ServiceResponse;
//import com.petstagram.socialmedia.controller.base.BaseController;
//import com.petstagram.socialmedia.service.grpc.GrpcClientService;
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
//    public ResponseEntity<ServiceResponse<GetResponse>> get(@PathVariable UUID id) {
//        return controllerResponse(grpcClientService.getFiles(id.toString(), FileType.POST_IMAGE));
//    }
//
//    @PostMapping
//    public ResponseEntity<ServiceResponse<UploadResponse>> upload(@RequestParam("file") MultipartFile file, @RequestParam("id") UUID id, @RequestParam("fileType") FileType fileType) throws IOException {
//            byte[] fileContent = file.getBytes();
//            ServiceResponse<UploadResponse> response = grpcClientService.uploadFiles(id, file.getOriginalFilename(), file.getContentType(), fileType, "post-images", fileContent);
//            return controllerResponse(response);
//    }
//}
