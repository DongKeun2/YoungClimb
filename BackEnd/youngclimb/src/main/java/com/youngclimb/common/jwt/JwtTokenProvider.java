package com.youngclimb.common.jwt;

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
//        Long tokenValidTime = 1000L * 60 * 3; // 3분
//        Long tokenValidTime = 1000L * 60 * 60 * 24; // 24시간(refreshtoken 완성 전까지)
        Long tokenValidTime = 1000L * 30; // 30초 (testy6용)
        return this.createToken(email, tokenValidTime, "accessToken");
    }

    // refresh token 생성
    public String createRefreshToken(String email) {
        Long tokenValidTime = 60 * 60 * 24L; // 하루
        String refreshToken = this.createToken(email, tokenValidTime, "refreshToken");
        redisService.setValues("RT " + email, refreshToken, Duration.ofSeconds(tokenValidTime));
        return refreshToken;
    }

    // 토큰 생성
    public String createToken(String email, Long tokenValidTime, String type) {

        Date now = new Date();
        Claims claims = Jwts.claims()
                .setSubject(email)
                .setIssuedAt(now) //생성일 설정
                .setExpiration(new Date(now.getTime() + tokenValidTime)); //만료일 설정


        if (type.equals("accessToken")) {
            claims.put("role", "USER"); // 유저 타입 저장
            claims.put("type", "accessToken");
            return Jwts.builder()
                    .setHeaderParam("typ", "jwt")
                    .setClaims(claims)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
        } else {
            claims.put("type", "refreshToken");
            return Jwts.builder()
                    .setHeaderParam("typ", "jwt")
                    .setClaims(claims)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
        }
    }

    // 토큰 유효성 검사
    public boolean checkClaim(String token) {
        try {
//            String expiredAT = redisService.getValues(blackListATPrefix + jwt);
//            if (expiredAT != null) {
//                throw new ExpiredJwtException(null, null, null
//                );
//            }

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key).build()
                    .parseClaimsJws(token).getBody();

            if (claims.getExpiration().before(new Date())) {
                throw new ExpiredJwtException(null, claims, "AccessToken이 만료되었습니다");
            }

            if(claims.get("type").equals("refreshToken")) {
                System.out.println("리프레쉬 토큰이 들어왔습니다.");
               return this.checkRefreshToken(claims.getSubject(), token);
            };
                System.out.println("여기서 안터지니?");
            return true;

        }
//        catch (ExpiredJwtException e) {   //Token이 만료된 경우 Exception이 발생한다.
//            e.getClaims();
//            System.out.println("AccessToken이 만료되었지롱");
//            return false;
//
//        }
        catch (JwtException e) {        //Token이 변조된 경우 Exception이 발생한다.
            System.out.println("변조된 AccessToken이지롱");
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
        System.out.println(info);
        return info;
    }

    // Request의 Header에서 token 값을 가져옵니다. "accessToken" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {
        String token = null;

        if (request.getHeader("Authorization") != null) {
            token = request.getHeader("Authorization");
            token = token.substring(7);
            System.out.println(token);
        }
        return token;
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    public boolean checkRefreshToken(String email, String refreshToken) throws ExpiredJwtException {
        String redisRT = redisService.getValues("RT " + email);
        if (redisRT == null) {
            System.out.println("RefreshToken이 만료되었습니다!");
            throw new ExpiredJwtException(null, null, "RefreshToken이 만료되었습니다!");
        }

        if(redisService.getTTL("RT "+email) <= (60 * 60 * 24 * 3) ) {
            this.createRefreshToken(email);
        }
        System.out.println("리프레시 토큰이 확인되었습니다.");
        return true;
    }

    public void logout(String email, String accessToken) {
        Long expiredAccessTokenTime = getJwtContents(accessToken).getExpiration().getTime() - new Date().getTime();
        redisService.setValues(blackListATPrefix + accessToken, email, Duration.ofMillis(expiredAccessTokenTime));
        redisService.deleteValues("RT " + email);

    }
}
