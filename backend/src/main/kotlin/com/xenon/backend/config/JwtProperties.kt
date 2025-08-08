package com.xenon.backend.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "security.jwt")
data class JwtProperties(
    var secret: String = "",
    var expirationMs: Long = 0
)
