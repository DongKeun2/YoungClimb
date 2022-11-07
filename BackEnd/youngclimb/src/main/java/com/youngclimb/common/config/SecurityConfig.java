package com.youngclimb.common.config;

import com.youngclimb.common.jwt.JWTAuthenticationFilter;
import com.youngclimb.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    // JWT 관련 친구들
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // 인증 또는 인가에 대한 설정
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws  Exception {
        // 로그인
        http.httpBasic().disable()
                .cors()
                .and()
                .csrf().disable()
                .exceptionHandling();

        http.authorizeRequests()
                .antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html",
                        "/**/*.css", "/**/*.js")
                .permitAll() // 특정 URL을 설정하며, permitAll은 해당 URL의 접근을 인증없이 허용한다는 의미
                // user - 로그인, 회원가입, 아이디 찾기, 비밀번호 찾기
//			    .antMatchers("/**").permitAll()	// 개발 기간 동안 모든 사이트 허용
                .antMatchers("/api/user/signup", "/api/user/login", "/api/user/email", "/api/user/nickname").permitAll()
                .antMatchers("/v3/api-docs", "/swagger-ui", "/swagger-resources/**").permitAll()
                .anyRequest().authenticated();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.logout()
                .disable();
//                .logoutUrl("/api/user/logout");

//		http
//			.oauth2Login()
//			.userInfoEndpoint()
//			.userService(oAuth2UserServiceImpl);

        http.addFilterBefore(new JWTAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}
