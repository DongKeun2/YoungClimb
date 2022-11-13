package com.youngclimb.common.jwt;

import com.youngclimb.common.security.UserPrincipal;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // 헤더에서 accessToken를 받아온다
        String accessToken = jwtTokenProvider.resolveToken(request);
        try {
            // 토큰 유효성 검사
            if (accessToken != null) {
                System.out.println("유효성 검사에서 걸린거야");
                if(jwtTokenProvider.checkClaim(accessToken)) {
                    String requestURI = request.getRequestURI();
                    // 토큰이 유효하면 토큰으로부터 유저 정보 받아오기
                    Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
                    // SecurityContext에 Authentication 객체를 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    // 로그용
                    UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
                    System.out.println("스프링 필터에서 걸린거야");
                    System.out.println(userDetails.getUsername());
                } else {
                    System.out.println("만료된 토큰에서 걸린거야");
                    
                    throw new ExpiredJwtException(null, null, "만료된 토큰입니다.");
                }
            }
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", "만료된 토큰");
            System.out.println("401에러가 걸린거야");
        } catch (JwtException e) {
            request.setAttribute("exception", "변조된 토큰");
            System.out.println("403에러가 걸린거야");
        }


        filterChain.doFilter(request, response);
    }

}

