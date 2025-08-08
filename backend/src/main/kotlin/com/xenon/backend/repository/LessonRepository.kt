package com.xenon.backend.repository

import com.xenon.backend.entity.Lesson
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface LessonRepository : JpaRepository<Lesson, Long> {
    fun findAllByModuleIdOrderByOrderIndex(moduleId: Long): List<Lesson>
}
