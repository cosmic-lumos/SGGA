package com.cosmic.sgga.interceptors;

import java.util.Map;

import org.springframework.http.server.*;
import org.springframework.web.socket.*;
import org.springframework.web.socket.server.*;

import jakarta.servlet.http.HttpSession;

/**
 * WebSocket Handshake 과정 중 Session ID 추가
 * https://hyeooona825.tistory.com/89
 */
public class HttpHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest){
            ServletServerHttpRequest serveletRequest = (ServletServerHttpRequest) request;
            HttpSession session = serveletRequest.getServletRequest().getSession();
            attributes.put("SESSION", session);
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception exception) {

    }
}