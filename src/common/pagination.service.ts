import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export class PaginationService {
    async paginate<T>(
        model: Model<T>,
        page: number,
        limit: number,
        filter: Partial<Record<keyof T, any>> = {}, // Use schema keys as filters
        sort: string | { [key: string]: 1 | -1 } = {} // Accept sort options
    ): Promise<{ data: T[]; total: number }> {
        const skip = (page - 1) * limit;
        const total = await model.countDocuments(filter).exec(); // Count documents based on filter
        const data = await model.find(filter).skip(skip).limit(limit).sort(sort).exec(); // Apply filter and sort
        return { data, total }; // Return data and total as expected
    }
}
