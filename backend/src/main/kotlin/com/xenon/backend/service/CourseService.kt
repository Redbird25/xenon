// src/main/kotlin/com/xenon/backend/course/CourseService.kt
package com.xenon.backend.service

import com.xenon.backend.course.CourseRepository
import com.xenon.backend.entity.Lesson
import com.xenon.backend.entity.Course
import com.xenon.backend.entity.CourseModule
import com.xenon.backend.entity.Quiz
import com.xenon.backend.repository.LessonRepository
import com.xenon.backend.repository.ModuleRepository
import com.xenon.backend.repository.QuizRepository
import com.xenon.backend.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CourseService(
    private val courseRepository: CourseRepository,
    private val userRepository: UserRepository,
    private val aiService: AiService,
    private val moduleRepository: ModuleRepository,
    private val lessonRepository: LessonRepository,
    private val quizRepository: QuizRepository
) {

    @Transactional
    fun createCourse(ownerEmail: String, title: String, description: String?): Course {
        // 1) Сохраняем Course
        val user = userRepository.findByEmail(ownerEmail).orElseThrow()
        val course = courseRepository.save(Course(title = title, description = description, owner = user))

        // 2) Генерируем структуру через AI
        val modules = aiService.generateCourseStructure(title, description)

        // 3) Сохраняем модули, уроки и квизы
        modules.forEachIndexed { modIdx, aiModule ->
            val module = moduleRepository.save(
                CourseModule(
                    title = aiModule.title,
                    orderIndex = modIdx,
                    course = course
                )
            )
            aiModule.lessons.forEachIndexed { lessonIdx, aiLesson ->
                val lesson = lessonRepository.save(
                    Lesson(
                        title = aiLesson.title,
                        content = aiLesson.content,
                        orderIndex = lessonIdx,
                        module = module  // <-- теперь привязка к Module
                    )
                )
                aiLesson.quizzes.forEachIndexed { quizIdx, aiQuiz ->
                    quizRepository.save(
                        Quiz(
                            question = aiQuiz.question,
                            choices = aiQuiz.choices,
                            correctIndex = aiQuiz.correctIndex,
                            orderIndex = quizIdx,
                            lesson = lesson
                        )
                    )
                }
            }
        }

        return course
    }

    fun listMyCourses(ownerEmail: String): List<Course> =
        courseRepository.findAllByOwnerEmail(ownerEmail)
}
