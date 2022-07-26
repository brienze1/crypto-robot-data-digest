import { AnalysisDto } from '@/integration/dto/AnalysisDto';
import { AnalyzedData } from '@/domain/model/AnalyzedData';

export class AnalyzedDataDto {
    readonly interval: string;
    readonly timestamp: string;
    readonly summary: string;
    readonly analysis: AnalysisDto[] = [];

    constructor(analyzedData: AnalyzedData) {
        this.interval = analyzedData.interval.description;
        this.timestamp = analyzedData.timestamp;
        this.summary = analyzedData.summary;
        analyzedData.analysis.forEach((analysis) => this.analysis.push(new AnalysisDto(analysis)));
    }
}
