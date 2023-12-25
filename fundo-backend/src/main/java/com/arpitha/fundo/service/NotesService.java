package com.arpitha.fundo.service;

import com.arpitha.fundo.model.Notes;

import java.util.List;

public interface NotesService {
    public void addNotes(Notes notes);

    public List<Notes> getNotes(String id);
    public List<Notes> getTrashNotes(String id);
    public List<Notes> getArchiveNotes(String id);
    public Notes findNote(String id);
    public void updateNotes(Notes notes);
    public void archiveNotes(Notes notes);
    public void trashNotes(Notes notes);
    public void updateNotesColor(Notes notes);
}
