package com.stackroute.exception;

public class SlotCreationConflictException extends RuntimeException{

    public SlotCreationConflictException() {
    }

    public SlotCreationConflictException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "Slot Creation Conflict Exception...";
    }
}
