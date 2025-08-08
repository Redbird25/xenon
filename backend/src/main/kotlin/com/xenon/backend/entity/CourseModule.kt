package com.xenon.backend.entity

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "modules")
data class CourseModule(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val orderIndex: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    val course: Course,

    @Column(nullable = false, updatable = false)
    val createdAt: Instant = Instant.now()
)
