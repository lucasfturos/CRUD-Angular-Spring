package com.lucasfturos.exception;

public class NotFoundExeception extends RuntimeException {

    private static final long serialVersionUID = 1;

    public NotFoundExeception(Long id, String name) {
        super(name + " não encontrado com o id: " + id);
    }

}
