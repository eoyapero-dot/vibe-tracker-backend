package com.vibe.tracker.controller;

import com.vibe.tracker.model.Task;
import com.vibe.tracker.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Tells Spring this class handles web API requests (not visual web pages)
@RequestMapping("/api/tasks") // Sets the base URL for this whole file (localhost:8080/api/tasks)
public class TaskController {

    // This connects our receptionist (Controller) to the database bridge (Repository)
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // CREATE: This listens for POST requests to save new data
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        // @RequestBody takes the JSON data we send from Postman and turns it into a Java object
        return taskRepository.save(task);
    }

    // READ: This listens for GET requests to view data
    @GetMapping
    public List<Task> getAllTasks() {
        // Grabs every single task currently saved in the database
        return taskRepository.findAll();
    }
}