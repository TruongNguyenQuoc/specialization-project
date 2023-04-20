package com.example.restapi.service.impl;

import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.repository.ColumnsRepository;
import com.example.restapi.service.ColumnsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColumnsServiceImpl implements ColumnsService {

    @Autowired
    private ColumnsRepository columnsRepository;

    @Override
    public List<Columns> findAll() {
        return columnsRepository.findAll();
    }

    @Override
    public Columns findById(long id) {
        return columnsRepository.findById(id).orElse(null);
    }

    @Override
    public List<Columns> findByBoard(Board board) {
        return columnsRepository.findByBoard(board);
    }
}
