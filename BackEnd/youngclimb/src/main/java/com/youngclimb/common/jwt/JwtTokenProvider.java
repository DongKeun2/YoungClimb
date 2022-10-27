package com.youngclimb.common.jwt;

import com.youngclimb.common.exception.BadRequestException;
import com.youngclimb.common.redis.RedisService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private String secretKey = "16글자를넘겨야한다니정말로어렵군요흑흑빨리끝나라";

    @Value("${spring.jwt.blacklist.access-token}")
    private String blackListATPrefix;

    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

    private final UserDetailsService userDetailsService;
    private final RedisService redisService;


    // access token 생성
    public String createAccessToken(String email) {
        Long tokenValidTime = 1000L * 60 * 3; // 3분
        return this.createToken(email, tokenValidTime);
    }

    // refresh token 생성
    public String createRefreshToken(String email) {
        Long tokenValidTime = 1000L * 60 * 60 * 25; // 하루

        String refreshToken = this.createToken(email, tokenValidTime);
        redisService.setValues(email, refreshToken, Duration.ofMillis(tokenValidTime));
        return refreshToken;
    }

    // 토큰 생성
    public String createToken(String email, Long tokenValidTime) {

        Date now = new Date();
        Claims claims = Jwts.claims()
                .setSubject(email)
                .setIssuedAt(now) //생성일 설정
                .setExpiration(new Date(now.getTime() + tokenValidTime)); //만료일 설정

//		    claims.put("userId", userId); //담고 싶은 값

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 유효성 검사
    public boolean checkClaim(String jwt) {
        try {
            String expiredAT = redisService.getValues(blackListATPrefix + jwt);
            if (expiredAT != null) {
                throw new ExpiredJwtException(null, null, null);
            }

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key).build()
                    .parseClaimsJws(jwt).getBody();
            return true;

        } catch (ExpiredJwtException e) {   //Token이 만료된 경우 Exception이 발생한다.
            System.out.println("토큰 만료지롱");
            return false;

        } catch (JwtException e) {        //Token이 변조된 경우 Exception이 발생한다.
            System.out.println("변조된 토큰이지롱");
            return false;
        }
    }

    // token 정보 확인
    public Claims getJwtContents(String jwt) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(jwt).getBody();
        return claims;
    }

    // 토큰에서 회원정보 추출
    public String getUserPk(String jwt) {
        String info = this.getJwtContents(jwt).getSubject();
        return info;
    }

    // Request의 Header에서 token 값을 가져옵니다. "accessToken" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        String token = null;
        if (request.getHeader("Authorization") != null) token = request.getHeader("Authorization");
//	        Cookie cookie = WebUtils.getCookie(request, "accessToken");
//	        if(cookie != null) token = cookie.getValue();
        return token;
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public void checkRefreshToken(String email, String refreshToken) {
        String redisRT = redisService.getValues(email);
        if (!refreshToken.equals(redisRT)) {
            throw new BadRequestException("토큰이 만료되었습니다!");
        }
    }

    public void logout(String email, String accessToken) {
        Long expiredAccessTokenTime = getJwtContents(accessToken).getExpiration().getTime() - new Date().getTime();
        redisService.setValues(blackListATPrefix + accessToken, email, Duration.ofMillis(expiredAccessTokenTime));
        redisService.deleteValues(email);
    }
}
