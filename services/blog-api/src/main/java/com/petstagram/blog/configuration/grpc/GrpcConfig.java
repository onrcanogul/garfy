package com.petstagram.blog.configuration.grpc;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import media.MediaProtoServiceGrpc;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcConfig {

    @Bean
    public ManagedChannel managedChannel() {
        return ManagedChannelBuilder.forAddress("media-api", 8080)
                .usePlaintext()
                .build();
    }

    @Bean
    public MediaProtoServiceGrpc.MediaProtoServiceBlockingStub blockingStub(ManagedChannel channel) {
        return MediaProtoServiceGrpc.newBlockingStub(channel);
    }

    @Bean
    public MediaProtoServiceGrpc.MediaProtoServiceStub asyncStub(ManagedChannel channel) {
        return MediaProtoServiceGrpc.newStub(channel);
    }
}
