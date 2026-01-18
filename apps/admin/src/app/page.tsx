'use client';

import { useCallback, useEffect, useState } from 'react';

import { formatDateTime } from '@repo/shared';
import { Button, Column, Input, Layout, Loading, Modal, Table, Textarea } from '@repo/ui';

import {
  deleteNotesControllerRemove,
  getNotesControllerFindAll,
  getNotesControllerFindOne,
  NoteResponseDto,
  postNotesControllerCreate,
  putNotesControllerUpdate,
} from '@/api/generated';

export default function AdminPage() {
  const [notes, setNotes] = useState<NoteResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteResponseDto | null>(null);
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
    setTitle('');
    setContent('');
    setIsCreateModalOpen(true);
  };

  const openEditModal = (note: NoteResponseDto) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditModalOpen(true);
  };

  const openViewModal = async (id: string) => {
    const note = await getNotesControllerFindOne(id);
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (note: NoteResponseDto) => {
    setSelectedNote(note);
    setIsDeleteModalOpen(true);
  };

  const closeAllModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await postNotesControllerCreate({ title, content });
    closeAllModals();
    fetchNotes();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNote || !title.trim() || !content.trim()) return;
    await putNotesControllerUpdate(selectedNote.id, { title, content });
    closeAllModals();
    fetchNotes();
  };

  const handleDelete = async () => {
    if (!selectedNote) return;
    await deleteNotesControllerRemove(selectedNote.id);
    closeAllModals();
    fetchNotes();
  };

  const columns: Column<NoteResponseDto>[] = [
    { key: 'title', header: 'Title' },
    {
      key: 'content',
      header: 'Content',
      render: (note) => (
        <span style={{ maxWidth: '300px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {note.content}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (note) => formatDateTime(new Date(note.createdAt)),
    },
    {
      key: 'updatedAt',
      header: 'Updated',
      render: (note) => formatDateTime(new Date(note.updatedAt)),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (note) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="secondary" onClick={() => openViewModal(note.id)}>
            View
          </Button>
          <Button variant="secondary" onClick={() => openEditModal(note)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => openDeleteModal(note)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <Layout title="Notes Admin">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="Notes Admin">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>
          Total: {notes.length} notes
        </span>
        <Button onClick={openCreateModal}>Create Note</Button>
      </div>

      <Table
        columns={columns}
        data={notes}
        keyExtractor={(note) => note.id}
        emptyMessage="No notes found. Create your first note!"
      />

      <Modal isOpen={isCreateModalOpen} onClose={closeAllModals} title="Create Note">
        <form onSubmit={handleCreate}>
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
            <Button type="button" variant="secondary" onClick={closeAllModals}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={closeAllModals} title="Edit Note">
        <form onSubmit={handleUpdate}>
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
            <Button type="button" variant="secondary" onClick={closeAllModals}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={closeAllModals} title="View Note">
        {selectedNote && (
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Title:</strong>
              <p>{selectedNote.title}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Content:</strong>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedNote.content}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Created:</strong>
              <p>{formatDateTime(new Date(selectedNote.createdAt))}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Updated:</strong>
              <p>{formatDateTime(new Date(selectedNote.updatedAt))}</p>
            </div>
            <div className="form-actions">
              <Button variant="secondary" onClick={closeAllModals}>
                Close
              </Button>
              <Button onClick={() => { closeAllModals(); openEditModal(selectedNote); }}>
                Edit
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeAllModals} title="Delete Note">
        {selectedNote && (
          <div>
            <p style={{ marginBottom: '1.5rem' }}>
              Are you sure you want to delete &quot;{selectedNote.title}&quot;? This action cannot be undone.
            </p>
            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={closeAllModals}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
}
