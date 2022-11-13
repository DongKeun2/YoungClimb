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
        if(exception == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰 만료된 경우
        if(exception.equals("만료된 토큰")) {
            System.out.println("만료된 토큰이 걸렸어");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 변조된 토큰인 경우
        if(exception.equals("변조된 토큰")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }



    }

    /**
     * 한글 출력을 위해 getWriter() 사용
     */
    private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.getWriter().println("{ \"message\" : \"" + errorCode.getMessage()
//                + "\", \"code\" : \"" +  errorCode.getCode()
//                + "\", \"status\" : " + errorCode.getStatus()
//                + ", \"errors\" : [ ] }");
    }
}
