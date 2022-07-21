import { AnalysisEventAdapter } from '@/domain/adapter/AnalysisEventAdapter';

class AnalysisEventSnsService implements AnalysisEventAdapter {
    sendEvent(analysisSummary: any) {}
}

export default new AnalysisEventSnsService();
