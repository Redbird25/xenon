package com.xenon.backend.course

import com.xenon.backend.entity.Course
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CourseRepository : JpaRepository<Course, Long> {
    fun findAllByOwnerEmail(email: String): List<Course>
}
