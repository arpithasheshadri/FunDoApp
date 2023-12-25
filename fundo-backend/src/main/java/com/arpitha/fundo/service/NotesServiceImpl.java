package com.arpitha.fundo.service;

import com.arpitha.fundo.model.Notes;
import com.arpitha.fundo.model.User;
import com.arpitha.fundo.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesServiceImpl implements NotesService {

    public NotesServiceImpl(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    public void addNotes(Notes notes){
        notesRepository.insert(notes);
    }


    public List<Notes> getNotes(String id){
        return notesRepository.findNotesByUserId(id);
    }

    public List<Notes> getTrashNotes(String id){
        return notesRepository.findIsDeletedByUserId(id);
    }

    public List<Notes> getArchiveNotes(String id){
        return notesRepository.findIsArchivedByUserId(id);
    }

    public Notes findNote(String id){
        return notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannot find notes by ID %s",id)
                ));
    }

    public void updateNotes(Notes notes){
        Notes savedNotes = findNote(notes.getId());
        savedNotes.setTitle(notes.getTitle());
        savedNotes.setDescription(notes.getDescription());
        notesRepository.save(savedNotes);
    }

    public void updateNotesColor(Notes notes) {
        Notes savedNotes = findNote(notes.getId());
        savedNotes.setColor(notes.getColor());
        notesRepository.save(savedNotes);
    }

    public void archiveNotes(Notes notes){
        Notes savedNotes = findNote(notes.getId());
        savedNotes.setArchived(true);
        notesRepository.save(savedNotes);
    }

    public void trashNotes(Notes notes){
        Notes savedNotes = findNote(notes.getId());
        savedNotes.setDeleted(true);
        notesRepository.save(savedNotes);
    }

    public Notes addCollaborator(User user, String id) {
        Notes notes = findNote(id);
        notes.getCollaberators().add(user);
        notesRepository.save(notes);
        return notes;
    }

    @Autowired
    NotesRepository notesRepository;



}
