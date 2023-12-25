package com.arpitha.fundo.controller;

import com.arpitha.fundo.model.Notes;
import com.arpitha.fundo.model.User;
import com.arpitha.fundo.service.NotesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@Controller
@RestController
@RequestMapping("/api/notes")
public class NotesController {
    public NotesController(NotesServiceImpl notesService) {
        this.notesService = notesService;
    }

    @PostMapping("/addNotes")
    public ResponseEntity<Notes> addNotes(@RequestBody Notes notes, @RequestHeader(HttpHeaders.AUTHORIZATION) String id){
        notesService.addNotes(notes);
        return ResponseEntity.status(HttpStatus.CREATED).body(notes);
    }

    @GetMapping("/getNotes")
    public List<Notes> getNotes(@RequestHeader(HttpHeaders.AUTHORIZATION) String id){
        return notesService.getNotes(id);
    }

    @PostMapping("/updateNotes")
    public ResponseEntity<Notes> updateNotes(@RequestBody Notes notes){
        notesService.updateNotes(notes);
        return ResponseEntity.ok(notes);
    }

    @PostMapping("/archiveNotes")
    public ResponseEntity<Notes> archiveNotes(@RequestBody Notes notes){
        notesService.archiveNotes(notes);
        return ResponseEntity.ok(notes);
    }

    @PostMapping("/{noteId}/addCollaboratorsNotes")
    public ResponseEntity<Notes> addCollaborator(@RequestBody User user,@PathVariable String noteId){
        Notes notes = notesService.addCollaborator(user,noteId);
        return ResponseEntity.ok(notes);
    }

    @PostMapping("/changeNotesColor")
    public ResponseEntity<Notes> updateNotesColor(@RequestBody Notes notes){
        notesService.updateNotesColor(notes);
        return ResponseEntity.ok(notes);
    }

    @PostMapping("/trashNotes")
    public ResponseEntity<Notes> trashNotes(@RequestBody Notes notes){
        notesService.trashNotes(notes);
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/getArchivedNotes")
    public List<Notes> getArchivedNotes(@RequestHeader(HttpHeaders.AUTHORIZATION) String id){
        return notesService.getArchiveNotes(id);
    }

    @GetMapping("/getDeletedNotes")
    public List<Notes> getTrashedNotes(@RequestHeader(HttpHeaders.AUTHORIZATION) String id){
        return notesService.getTrashNotes(id);
    }

    @Autowired
    NotesServiceImpl notesService;
}
