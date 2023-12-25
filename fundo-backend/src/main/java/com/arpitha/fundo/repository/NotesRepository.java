package com.arpitha.fundo.repository;

import com.arpitha.fundo.model.Notes;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Qualifier("notes")
@Repository
public interface NotesRepository extends MongoRepository<Notes, String> {

    @Query("{'userId':?0}")
    List<Notes> findNotesByUserId(String id);

    @Query("{'userId':?0,'isDeleted':true}")
    List<Notes> findIsDeletedByUserId(String id);

    @Query("{'userId':?0,'isArchived':true}")
    List<Notes> findIsArchivedByUserId(String id);

}
