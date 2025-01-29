package com.petstagram.blog.service.grpc;

import com.google.protobuf.ByteString;
import com.petstagram.blog.*;
import com.petstagram.blog.FileData;
import com.petstagram.blog.FileType;
import com.petstagram.blog.GetRequest;
import com.petstagram.blog.GetResponse;
import com.petstagram.blog.MediaProtoServiceGrpc;
import com.petstagram.blog.UploadRequest;
import com.petstagram.blog.UploadResponse;
import com.petstagram.blog.configuration.response.ServiceResponse;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

@Service
public class GrpcClientService {
    @GrpcClient("media-service")
    MediaProtoServiceGrpc.MediaProtoServiceBlockingStub blockingStub;

    public GetResponse getFiles(String id, FileType fileType) {
        GetRequest request = GetRequest.newBuilder()
                .setId(id)
                .setFileType(fileType)
                .build();

        GetResponse response = blockingStub.getFiles(request);
        return response;
    }
    public com.petstagram.blog.UploadResponse uploadFiles(UUID id, String fileName, String contentType , FileType fileType, String pathOrContainer, byte[] content) throws IOException {
        FileData fileData = FileData.newBuilder()
                .setFileName(fileName)
                .setContentType(contentType)
                .setFileContent(ByteString.copyFrom(content))
                .setId(id.toString())
                .setPathOrContainer(pathOrContainer)
                .setFileType(fileType)
                .build();

        UploadRequest request = UploadRequest.newBuilder()
                .addFiles(fileData)
                .build();

        UploadResponse response = blockingStub.uploadFiles(request);
        return response;
    }

}
