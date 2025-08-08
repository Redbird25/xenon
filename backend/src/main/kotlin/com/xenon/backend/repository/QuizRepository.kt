package com.xenon.backend.repository

import com.xenon.backend.entity.Quiz
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface QuizRepository : JpaRepository<Quiz, Long> {
    fun findAllByLessonIdOrderByOrderIndex(lessonId: Long): List<Quiz>
}
