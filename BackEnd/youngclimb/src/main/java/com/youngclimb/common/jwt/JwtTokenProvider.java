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
import org.springframework.util.ObjectUtils;

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
        Long tokenValidTime = 1000L * 30; // 30초 (test용)s
        return createToken(email, tokenValidTime, "accessToken");
    }

    // refresh token 생성
    public String createRefreshToken(String email) {
        Long tokenValidTime = 1000 * 60L; // 1분
//        Long tokenValidTime = 1000 * 60 * 60 * 24L * 14; // 2주
        String refreshToken = createToken(email, tokenValidTime, "refreshToken");
        redisService.setValues("RT " + email, refreshToken, Duration.ofMillis(tokenValidTime));
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
    public boolean checkClaim(String token) throws ExpiredJwtException, JwtException{
//        try {
            String expired = redisService.getValues(blackListATPrefix + token);

            // 로그아웃한 유저인 경우
            if (!ObjectUtils.isEmpty(expired)) {
                throw new JwtException("로그아웃한 유저입니다.");
            }
            System.out.println(token + " 유효성 검사 안에서 로그아웃 이후야");

            // 아닌 경우 유효성 검사 진행
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key).build()
                    .parseClaimsJws(token).getBody(); // 토큰 만료된 경우는 여기서 exception 던짐

            // 리프레쉬 토큰인 경우 리프레쉬 토큰 유효성 검사
            if (claims.get("type").equals("refreshToken")) {
                System.out.println("리프레쉬 토큰이 들어왔습니다.");
                return checkRefreshToken(claims.getSubject(), token);
            }

            System.out.println("여기서 안터지니?");
            return true;

        }

//        catch (ExpiredJwtException e) {   //Token이 만료된 경우 Exception이 발생한다.
//            System.out.println(e.getClaims().get("type"));
//            System.out.println("AccessToken이 만료되었지롱");
//            return false;
//        } catch (JwtException e) {        //Token이 변조된 경우 Exception이 발생한다.
//            System.out.println("변조된 AccessToken이지롱");
//            return false;
//        }
//    }

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

    // 리프레쉬 토큰 유효성 검사
    public boolean checkRefreshToken(String email, String refreshToken) throws ExpiredJwtException {
        String redisRT = redisService.getValues("RT " + email);
        // redis에 리프레쉬 토큰이 없는 경우 -> 만료 또는 로그아웃된 상황
        if (redisRT == null) {
            System.out.println("RefreshToken이 만료되었습니다!");
            throw new ExpiredJwtException(null, null, "만료된 refreshtoken");
        }

        // refresh 토큰 만료일이 3일 이내이면 refresh token 재발급하여 redis에 저장
//        if (redisService.getTTL("RT " + email) <= (60 * 60 * 24 * 3)) {
//            this.createRefreshToken(email);
//        }

        // 사용자가 보내준 refresh 토큰이 redis에 저장된 refresh token과 일치하는지 확인
        if (redisRT.equals(refreshToken)) {
            System.out.println("리프레시 토큰이 확인되었습니다.");

            // refresh 토큰 만료일이 3일 이내이면 refresh token 재발급하여 redis에 저장
            if (redisService.getTTL("RT " + email) <= (60 * 60 * 24 * 3)) {
                createRefreshToken(email);
                System.out.println("리프레시 토큰이 갱신되었습니다.");
            }

            return true;
        } else {
            System.out.println("잘못된 토큰입니다");
            return false;
        }
    }

    public void logout(String email, String accessToken) {
        // 현재 남은 access token의 유효시간 후에 파기되는 logout user 관련 access token과 정보를 redis에 저장
        Long expiredAccessTokenTime = getJwtContents(accessToken).getExpiration().getTime() - new Date().getTime();
        redisService.setValues(blackListATPrefix + accessToken, email, Duration.ofMillis(expiredAccessTokenTime));

        // refresh token도 삭제
        if (redisService.getValues("RT " + email) != null)
            redisService.deleteValues("RT " + email);

    }
}
