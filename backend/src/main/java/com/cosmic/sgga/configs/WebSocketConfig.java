package com.cosmic.sgga.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.cosmic.sgga.interceptors.HttpHandshakeInterceptor;

/**
 * 웹 소켓 사용을 위한 설정
 * @author rkwoal216@gamil.com
 * @version 1.0.0
 * @since 1.0.0
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 메시지 브로커 등록
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/room");
        config.setApplicationDestinationPrefixes("/app");
    }

    /**
     * endpoint 등록
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/sgga-websocket")
            .setAllowedOriginPatterns("*")
            .addInterceptors(new HttpHandshakeInterceptor());
    }
    
}
