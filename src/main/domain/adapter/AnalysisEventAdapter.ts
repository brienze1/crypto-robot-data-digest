import AnalysisEventSnsService from '@/integration/eventservice/AnalysisEventSnsService';
import { AnalysisSummary } from '@/domain/model/AnalysisSummary';

export interface AnalysisEventAdapter {
    sendEvent(analysisSummary: AnalysisSummary): void;
}

export const AnalysisEventService: AnalysisEventAdapter = AnalysisEventSnsService;
