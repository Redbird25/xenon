package com.xenon.backend.controller

import com.xenon.backend.security.JwtUtils
import com.xenon.backend.service.AuthService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.validation.Valid

data class LoginRequest(val email: String, val password: String)
data class RegisterRequest(val email: String, val password: String)
data class JwtResponse(val token: String, val type: String = "Bearer")

@RestController
@RequestMapping("/auth")
class AuthController(
    private val authService: AuthService,
    private val jwtUtils: JwtUtils
) {

    @PostMapping("/register")
    fun register(@Valid @RequestBody req: RegisterRequest): ResponseEntity<Any> {
        val user = authService.register(req.email, req.password)
        return ResponseEntity.ok(mapOf("id" to user.id, "email" to user.email))
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody req: LoginRequest): ResponseEntity<Any> {
        val user = authService.authenticate(req.email, req.password)
        val roles = user.roles.map { it.name }.toSet()
        val token = jwtUtils.generateJwtToken(user.email, roles)
        return ResponseEntity.ok(JwtResponse(token))
    }
}
