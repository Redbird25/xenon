package com.xenon.backend.service

import com.xenon.backend.entity.Lesson
import com.xenon.backend.repository.LessonRepository
import org.springframework.stereotype.Service

@Service
class LessonService(
    private val lessonRepository: LessonRepository
) {
    /**
     * Вернуть все уроки модуля в порядке orderIndex
     */
    fun listByModule(moduleId: Long): List<Lesson> =
        lessonRepository.findAllByModuleIdOrderByOrderIndex(moduleId)
}
