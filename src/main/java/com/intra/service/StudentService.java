package com.intra.service;

import com.intra.model.Student;
import com.intra.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public Student saveStudent(Student student) {
        return repository.save(student);
    }
    public List<Student> getAllStudents(){
        return repository.findAll();
    }

    public void deleteStudent(int id) {
        repository.deleteById(id);
    }
}
