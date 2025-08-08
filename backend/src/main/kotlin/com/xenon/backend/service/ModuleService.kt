package com.xenon.backend.service

import com.xenon.backend.entity.CourseModule
import com.xenon.backend.repository.ModuleRepository
import org.springframework.stereotype.Service

@Service
class ModuleService(
    private val moduleRepository: ModuleRepository
) {
    /**
     * Вернуть все модули курса в порядке orderIndex
     */
    fun listByCourse(courseId: Long): List<CourseModule> =
        moduleRepository.findAllByCourseIdOrderByOrderIndex(courseId)
}
