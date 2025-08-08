package com.xenon.backend.service

import com.xenon.backend.auth.Role
import com.xenon.backend.entity.User
import com.xenon.backend.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    fun register(email: String, rawPassword: String): User {
        require(!userRepository.existsByEmail(email)) { "Email занят" }
        val user = User(
            email = email,
            password = passwordEncoder.encode(rawPassword),
            roles = setOf(Role.ROLE_STUDENT)
        )
        return userRepository.save(user)
    }

    fun authenticate(email: String, rawPassword: String): User {
        val user = userRepository.findByEmail(email)
            .orElseThrow { IllegalArgumentException("Пользователь не найден") }
        require(passwordEncoder.matches(rawPassword, user.password)) { "Неверный пароль" }
        return user
    }
}
