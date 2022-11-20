package com.youngclimb.common.security;

import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
private final MemberRepository memberRepository;

    @Override
//    @Cacheable(value = CacheKey.USER, key = "#username", unless = "#result == null")
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));

        return UserPrincipal.create(member);
    }

}
