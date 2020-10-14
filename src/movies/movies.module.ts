import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    // Dependency Injection
    // Nest가 알아서 Type을 Import 해준다.
    controllers: [MoviesController],
    providers: [MoviesService],
})
export class MoviesModule {}
