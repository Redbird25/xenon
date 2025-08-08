package com.xenon.backend.repository

import com.xenon.backend.entity.CourseModule
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ModuleRepository : JpaRepository<CourseModule, Long> {
    fun findAllByCourseIdOrderByOrderIndex(courseId: Long): List<CourseModule>
}
