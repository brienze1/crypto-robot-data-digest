import AnalysisEventSnsService from '@/integration/eventservice/AnalysisEventSnsService';

export interface AnalysisEventAdapter {
    sendEvent(analysisSummary: any): void;
}

export const AnalysisEventService: AnalysisEventAdapter = AnalysisEventSnsService;
