package com.intra.controller;

import com.intra.model.Student;
import com.intra.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService service;

    @PostMapping(path = "/student/addStudent")
        public Student saveStudent(@RequestBody Student student) {
           return service.saveStudent(student);
    }

    @GetMapping(path = "/student/getAllStudents")
        public List<Student> getAllStudents() {
            return service.getAllStudents();
    }

    @DeleteMapping(path = "/student/delete/{id}")
    public void deleteStudent(@PathVariable int id) {
        service.deleteStudent(id);
    }


}
