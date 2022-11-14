package com.youngclimb.common.jwt;

import com.youngclimb.common.security.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {


    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String exception = (String) request.getAttribute("exception");
        ErrorCode errorCode;

        // 토큰이 없는 경우
        if (exception == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 존재하지 않습니다.");
            return;
        }

        // access 토큰 만료된 경우
        if (exception.equals("accessToken")) {
            System.out.println("만료된 accesstoken이 걸렸어");
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "expired accesstoken");
            return;
        }

        // refresh 토큰 만료된 경우
        if (exception.equals("refreshToken")) {
            System.out.println("만료된 refreshtoken이 걸렸어");
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "expired refreshtoken");
            return;
        }


        // 변조된 토큰인 경우
        if (exception.equals("변조된 토큰")) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "변조된 토큰입니다.");
            return;
        }

    }

}
