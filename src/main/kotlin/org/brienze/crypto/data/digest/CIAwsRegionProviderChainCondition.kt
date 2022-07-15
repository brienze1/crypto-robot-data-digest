package org.brienze.crypto.data.digest

import io.micronaut.context.condition.Condition
import io.micronaut.context.condition.ConditionContext
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.File

/**
 * @see <a href="https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/region-selection.html">Default region provider chain</a>
 */
class CIAwsRegionProviderChainCondition : Condition {
    private val LOG : Logger = LoggerFactory.getLogger(CIAwsRegionProviderChainCondition::class.java)

    override fun matches(context: ConditionContext<*>?): Boolean {
        if (System.getenv("CI") == null) {
            LOG.info("CI environment variable not present - Condition fulfilled")
            return true
        }
        if (System.getProperty("aws.region") != null) {
            LOG.info("aws.region system property present - Condition fulfilled")
            return true
        }
        if (System.getenv("AWS_REGION") != null) {
            LOG.info("AWS_REGION environment variable present - Condition fulfilled");
            return true
        }
        val result = System.getenv("HOME") != null && File(System.getenv("HOME") + "/.aws/config").exists();
        if (result) {
            LOG.info("~/.aws/config file exists - Condition fulfilled");
        }
        return result
    }
}
