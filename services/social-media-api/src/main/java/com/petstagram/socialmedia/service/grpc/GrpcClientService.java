package com.petstagram.socialmedia.service.grpc;

import com.google.protobuf.ByteString;
import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.stereotype.Service;
import com.petstagram.socialmedia.*;

import java.io.IOException;
import java.util.UUID;

@Service
public class GrpcClientService {
    @GrpcClient("media-service")
    MediaProtoServiceGrpc.MediaProtoServiceBlockingStub blockingStub;

    public ServiceResponse<GetResponse> getFiles(String id, FileType fileType) {
        GetRequest request = GetRequest.newBuilder()
                .setId(id)
                .setFileType(fileType)
                .build();

        GetResponse response = blockingStub.getFiles(request);
        return ServiceResponse.success(response, 200);
    }
    public ServiceResponse<UploadResponse> uploadFiles(UUID id, String fileName, String contentType , FileType fileType, String pathOrContainer, byte[] content) throws IOException {
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
        return ServiceResponse.success(response, 200);
    }

}
