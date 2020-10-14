import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {


    constructor(private readonly moviesService: MoviesService) {

    }

    // CRUD
    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    // Update
    // All - @Put, Section - @Patch
    @Patch('/:id')
    path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }

    
}
