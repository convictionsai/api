import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { QAResult } from '../Models/Search/QA/QAResult';

@Injectable()
export class SearchService {
    private readonly repository: Repository<QAResult>;

    public constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(QAResult);
    }

    public search() {}
}
