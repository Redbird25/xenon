package com.xenon.backend.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.nio.charset.StandardCharsets
import java.util.*

@Component
class JwtUtils(
    @Value("\${security.jwt.secret}") private val jwtSecret: String,
    @Value("\${security.jwt.expiration-ms}") private val jwtExpirationMs: Long
) {
    private val key by lazy {
        // создаём HMAC-ключ из байтов строки
        Keys.hmacShaKeyFor(jwtSecret.toByteArray(StandardCharsets.UTF_8))
    }

    fun generateJwtToken(username: String, roles: Set<String>): String {
        val now = Date()
        val expiry = Date(now.time + jwtExpirationMs)
        return Jwts.builder()
            .setSubject(username)
            .claim("roles", roles)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
    }

    fun getUserNameFromJwtToken(token: String): String =
        Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body
            .subject

    fun validateJwtToken(token: String): Boolean =
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }

    fun getRolesFromJwtToken(token: String): List<String> {
        val claims: Claims = Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token)
            .body
        @Suppress("UNCHECKED_CAST")
        return claims["roles"] as List<String>
    }
}
