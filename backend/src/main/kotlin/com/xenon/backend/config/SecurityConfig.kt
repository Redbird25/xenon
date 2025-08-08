package com.xenon.backend.config

import com.xenon.backend.repository.UserRepository
import com.xenon.backend.security.JwtAuthenticationFilter
import com.xenon.backend.security.JwtUtils
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
class SecurityConfig(
    private val jwtUtils: JwtUtils,
    private val userRepository: UserRepository
) {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            // мы работаем с токенами, CSRF можно выключить
            .csrf { it.disable() }
            // без сессий, только stateless JWT
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            // какие запросы кому разрешены
            .authorizeHttpRequests {
                it
                    .requestMatchers(HttpMethod.POST, "/auth/**").permitAll()
                    .anyRequest().authenticated()
            }
            // точка входа для неавторизованных
            .exceptionHandling {
                it.authenticationEntryPoint(restAuthenticationEntryPoint())
            }
            // наш фильтр JWT до стандартного UsernamePassword
            .addFilterBefore(jwtAuthTokenFilter(), UsernamePasswordAuthenticationFilter::class.java)

        return http.build()
    }

    @Bean
    fun restAuthenticationEntryPoint(): AuthenticationEntryPoint =
        AuthenticationEntryPoint { _: HttpServletRequest, response: HttpServletResponse, _: org.springframework.security.core.AuthenticationException ->
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Ошибка: неавторизован")
        }

    @Bean
    fun jwtAuthTokenFilter(): JwtAuthenticationFilter =
        JwtAuthenticationFilter(jwtUtils, userDetailsService())


    @Bean
    fun authenticationManager(authConfig: AuthenticationConfiguration): AuthenticationManager =
        authConfig.authenticationManager

    @Bean
    fun userDetailsService(): UserDetailsService = UserDetailsService { username ->
        val user = userRepository.findByEmail(username)
            .orElseThrow { UsernameNotFoundException("Пользователь не найден: $username") }
        // Spring Security User
        org.springframework.security.core.userdetails.User(
            user.email,
            user.password,
            user.roles.map { role -> org.springframework.security.core.authority.SimpleGrantedAuthority(role.name) }
        )
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

}
