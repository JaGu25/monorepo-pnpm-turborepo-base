export interface CreateNoteDto {
  title: string;
  content: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}

export interface NoteResponseDto {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function postNotesControllerCreate(
  createNoteDto: CreateNoteDto
): Promise<NoteResponseDto> {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createNoteDto),
  });
  return response.json();
}

export async function getNotesControllerFindAll(): Promise<NoteResponseDto[]> {
  const response = await fetch(`${API_BASE_URL}/notes`);
  return response.json();
}

export async function getNotesControllerFindOne(
  id: string
): Promise<NoteResponseDto> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`);
  return response.json();
}

export async function putNotesControllerUpdate(
  id: string,
  updateNoteDto: UpdateNoteDto
): Promise<NoteResponseDto> {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateNoteDto),
  });
  return response.json();
}

export async function deleteNotesControllerRemove(id: string): Promise<void> {
  await fetch(`${API_BASE_URL}/notes/${id}`, { method: 'DELETE' });
}
