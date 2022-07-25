import { AnalysisEventAdapter } from '@/domain/adapter/AnalysisEventAdapter';
import AwsConfig from '@/application/config/AwsConfig';
import { AnalysisSummary } from '@/domain/model/AnalysisSummary';
import { CONFIG } from '@/application/config/Config';

class AnalysisEventSnsService implements AnalysisEventAdapter {
    async sendEvent(analysisSummary: AnalysisSummary): Promise<boolean> {
        await new AwsConfig.AWS.SNS().publish({
            Message: JSON.stringify(analysisSummary),
            TopicArn: CONFIG.SNS.ANALYSIS_SUMMARY.TOPIC_ARN,
        });

        return true;
    }
}

export default new AnalysisEventSnsService();
