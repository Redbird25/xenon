package com.xenon.backend.controller

import com.xenon.backend.entity.Lesson
import com.xenon.backend.repository.LessonRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

data class LessonDetailResponse(
    val id: Long,
    val title: String,
    val content: String
)

@RestController
@RequestMapping("/lessons")
class LessonDetailController(
    private val lessonRepository: LessonRepository
) {
    @GetMapping("/{lessonId}")
    fun getLessonDetail(@PathVariable lessonId: Long): ResponseEntity<LessonDetailResponse> {
        val lesson: Lesson = lessonRepository.findById(lessonId)
            .orElseThrow { NoSuchElementException("Lesson $lessonId not found") }
        return ResponseEntity.ok(
            LessonDetailResponse(
                id      = lesson.id,
                title   = lesson.title,
                content = lesson.content
            )
        )
    }
}
