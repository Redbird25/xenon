package com.xenon.backend.controller

import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

// импортируем наши классы
import com.xenon.backend.service.CourseService
import com.xenon.backend.entity.Course
import org.springframework.security.core.userdetails.User

data class CreateCourseRequest(val title: String, val description: String?)
data class CourseResponse(
    val id: Long,
    val title: String,
    val description: String?,
    val createdAt: String
)

@RestController
@RequestMapping("/courses")
class CourseController(
    private val courseService: CourseService
) {
    private fun currentUserEmail(): String =
        (SecurityContextHolder.getContext().authentication.principal as User)
            .username

    @PostMapping
    fun create(@RequestBody req: CreateCourseRequest): ResponseEntity<CourseResponse> {
        val email = currentUserEmail()
        // здесь явно указываем, что c — Course
        val c: Course = courseService.createCourse(email, req.title, req.description)
        return ResponseEntity.ok(
            CourseResponse(
                id = c.id,
                title = c.title,
                description = c.description,
                createdAt = c.createdAt.toString()
            )
        )
    }

    @GetMapping
    fun list(): ResponseEntity<List<CourseResponse>> {
        val email = currentUserEmail()
        val myCourses: List<Course> = courseService.listMyCourses(email)
        val responseList = myCourses.map { c: Course ->
            CourseResponse(
                id = c.id,
                title = c.title,
                description = c.description,
                createdAt = c.createdAt.toString()
            )
        }
        return ResponseEntity.ok(responseList)
    }
}
