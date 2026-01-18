export interface NoteProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Note {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: NoteProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: Omit<NoteProps, 'id' | 'createdAt' | 'updatedAt'> & { id: string }): Note {
    const now = new Date();
    return new Note({
      ...props,
      createdAt: now,
      updatedAt: now,
    });
  }

  update(props: Partial<Pick<NoteProps, 'title' | 'content'>>): Note {
    return new Note({
      id: this.id,
      title: props.title ?? this.title,
      content: props.content ?? this.content,
      createdAt: this.createdAt,
      updatedAt: new Date(),
    });
  }

  toJSON(): NoteProps {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
