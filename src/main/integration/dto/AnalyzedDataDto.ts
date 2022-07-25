import { AnalysisDto } from '@/integration/dto/AnalysisDto';
import { AnalyzedData } from '@/domain/model/AnalyzedData';

export class AnalyzedDataDto {
    readonly interval: String;
    readonly timestamp: String;
    readonly summary: String;
    readonly analysis: AnalysisDto[] = [];

    constructor(analyzedData: AnalyzedData) {
        this.interval = analyzedData.interval.description;
        this.timestamp = analyzedData.timestamp;
        this.summary = analyzedData.summary;
        analyzedData.analysis.forEach((analysis) => this.analysis.push(new AnalysisDto(analysis)));
    }
}
