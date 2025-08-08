package com.xenon.backend.entity

import jakarta.persistence.*

@Entity
@Table(name = "quizzes")
data class Quiz(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(columnDefinition = "TEXT")
    val question: String,
    @ElementCollection
    @CollectionTable(name = "quiz_choices", joinColumns = [JoinColumn(name = "quiz_id")])
    @Column(name = "choice")
    val choices: List<String>,
    val correctIndex: Int,
    val orderIndex: Int,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    val lesson: Lesson
)
