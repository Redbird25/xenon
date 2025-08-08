package com.xenon.backend.controller

import com.xenon.backend.service.LessonService
import org.springframework.web.bind.annotation.*

data class LessonResponse(val id: Long, val title: String, val orderIndex: Int)

@RestController
@RequestMapping("/modules/{moduleId}/lessons")
class LessonController(
    private val lessonService: LessonService
) {
    @GetMapping
    fun list(@PathVariable moduleId: Long): List<LessonResponse> =
        lessonService.listByModule(moduleId).map { l ->
            LessonResponse(l.id, l.title, l.orderIndex)
        }
}
