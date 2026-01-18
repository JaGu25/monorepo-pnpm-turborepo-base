'use client';

import { useCallback, useEffect, useState } from 'react';

import { formatDateShort } from '@repo/shared';
import { Button, Card, Input, Layout, Loading, Modal, Textarea } from '@repo/ui';

import {
  deleteNotesControllerRemove,
  getNotesControllerFindAll,
  NoteResponseDto,
  postNotesControllerCreate,
  putNotesControllerUpdate,
} from '@/api/generated';

export default function Home() {
  const [notes, setNotes] = useState<NoteResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteResponseDto | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = useCallback(async () => {
    try {
      const data = await getNotesControllerFindAll();
      setNotes(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const openCreateModal = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setIsModalOpen(true);
  };

  const openEditModal = (note: NoteResponseDto) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setTitle('');
    setContent('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      await putNotesControllerUpdate(editingNote.id, { title, content });
    } else {
      await postNotesControllerCreate({ title, content });
    }

    closeModal();
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await deleteNotesControllerRemove(id);
    fetchNotes();
  };

  if (loading) {
    return (
      <Layout title="Notes">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="Notes">
      <div style={{ marginBottom: '1.5rem' }}>
        <Button onClick={openCreateModal}>Create Note</Button>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">No notes yet. Create your first note!</div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {notes.map((note) => (
            <Card key={note.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {note.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    {note.content}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    {formatDateShort(new Date(note.createdAt))}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="secondary" onClick={() => openEditModal(note)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(note.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingNote ? 'Edit Note' : 'Create Note'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />
          <Textarea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content"
            required
          />
          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingNote ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
