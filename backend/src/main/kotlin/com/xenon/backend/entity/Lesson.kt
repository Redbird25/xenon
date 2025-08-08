package com.xenon.backend.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "lessons")
data class Lesson(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val title: String,

    @Column(columnDefinition = "TEXT")
    val content: String,

    @Column(nullable = false)
    val orderIndex: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    val module: CourseModule,    // <-- ссылка на CourseModule

    @Column(nullable = false, updatable = false)
    val createdAt: Instant = Instant.now()
)
