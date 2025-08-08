package com.xenon.backend.controller

import com.xenon.backend.service.ModuleService
import org.springframework.web.bind.annotation.*

data class ModuleResponse(val id: Long, val title: String, val orderIndex: Int)

@RestController
@RequestMapping("/courses/{courseId}/modules")
class ModuleController(
    private val moduleService: ModuleService
) {
    @GetMapping
    fun list(@PathVariable courseId: Long): List<ModuleResponse> =
        moduleService.listByCourse(courseId).map { m ->
            ModuleResponse(m.id, m.title, m.orderIndex)
        }
}
