package com.lucasfturos.exception;

import java.io.Serial;

public class NotFoundExeception extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1;

    public NotFoundExeception(Long id, String name) {
        super(name + " não encontrado com o id: " + id);
    }

}
