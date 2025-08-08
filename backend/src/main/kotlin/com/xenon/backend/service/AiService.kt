package com.xenon.backend.service

import com.google.genai.Client
import com.google.genai.types.GenerateContentResponse
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

// DTO для модуля → уроки → квизы
data class AiCourseModule(
    val title: String,
    val lessons: List<AiLesson>
)
data class AiLesson(
    val title: String,
    val content: String,
    val quizzes: List<AiQuiz>
)
data class AiQuiz(
    val question: String,
    val choices: List<String>,
    val correctIndex: Int
)

@Service
class AiService(
    @Value("\${google.api.key}") private val apiKey: String
) {
    private val log = LoggerFactory.getLogger(AiService::class.java)
    private val client: Client = Client.builder()
        .apiKey(apiKey)
        .build()

    fun generateCourseStructure(
        title: String,
        description: String?
    ): List<AiCourseModule> {
        val prompt = buildString {
            append("Generate a JSON array of modules for an online course.\n")
            append("Course title: \"$title\".\n")
            description?.takeIf { it.isNotBlank() }?.let {
                append("Description: \"$it\".\n")
            }
            append(
                """
                Output must be valid JSON in this form:
                [
                  {
                    "title": "Module title",
                    "lessons": [
                      {
                        "title": "Lesson title",
                        "content": "Lesson content here...",
                        "quizzes": [
                          {
                            "question": "Question?",
                            "choices": ["A","B","C","D"],
                            "correctIndex": 0
                          }
                        ]
                      }
                    ]
                  }
                ]
                """.trimIndent()
            )
        }

        // Отправляем запрос в Gemini
        val response: GenerateContentResponse = client.models.generateContent(
            "gemini-2.5-flash",
            prompt,
            null
        )
        val raw = response.text()
        log.info("🔹 Raw Gemini response:\n{}", raw)

        // Очищаем markdown-ограждения и всё лишнее вокруг JSON
        val startIdx = raw.indexOfFirst { it == '[' || it == '{' }
        val endIdx = raw.lastIndexOf(']')  // если возвращается массив модулей
        if (startIdx == -1 || endIdx == -1 || endIdx <= startIdx) {
            throw IllegalStateException("Cannot extract JSON from AI response")
        }
        val json = raw.substring(startIdx, endIdx + 1)
        log.info("🔹 Cleaned JSON:\n{}", json)

        // Парсим чистый JSON
        return jacksonObjectMapper().readValue(json)
    }
}
