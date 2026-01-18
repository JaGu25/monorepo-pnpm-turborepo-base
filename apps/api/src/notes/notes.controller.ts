import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateNoteUseCase,
  DeleteNoteUseCase,
  GetNoteByIdUseCase,
  ListNotesUseCase,
  NoteNotFoundError,
  UpdateNoteUseCase,
} from '@repo/application';

import { CreateNoteDto, NoteResponseDto, UpdateNoteDto } from './dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly getNoteByIdUseCase: GetNoteByIdUseCase,
    private readonly listNotesUseCase: ListNotesUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiCreatedResponse({
    description: 'Note created successfully',
    type: NoteResponseDto,
  })
  async create(@Body() createNoteDto: CreateNoteDto): Promise<NoteResponseDto> {
    return this.createNoteUseCase.execute(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  @ApiOkResponse({
    description: 'List of notes',
    type: [NoteResponseDto],
  })
  async findAll(): Promise<NoteResponseDto[]> {
    return this.listNotesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by id' })
  @ApiOkResponse({
    description: 'Note found',
    type: NoteResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async findOne(@Param('id') id: string): Promise<NoteResponseDto> {
    try {
      return await this.getNoteByIdUseCase.execute({ id });
    } catch (error) {
      if (error instanceof NoteNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiOkResponse({
    description: 'Note updated successfully',
    type: NoteResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Note not found' })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto
  ): Promise<NoteResponseDto> {
    try {
      return await this.updateNoteUseCase.execute({ id, ...updateNoteDto });
    } catch (error) {
      if (error instanceof NoteNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a note' })
  @ApiNoContentResponse({ description: 'Note deleted successfully' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteNoteUseCase.execute({ id });
  }
}
