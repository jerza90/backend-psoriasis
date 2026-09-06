package com.psoriasis.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

@Component
@ConditionalOnProperty(name = "app.reconcile.enabled", havingValue = "true", matchIfMissing = true)
public class PaymentReconcileScheduler {

    private static final Logger log = LoggerFactory.getLogger(PaymentReconcileScheduler.class);

    private final ToyyibPayService toyyibPayService;
    private final AtomicBoolean running = new AtomicBoolean(false);

    public PaymentReconcileScheduler(ToyyibPayService toyyibPayService) {
        this.toyyibPayService = toyyibPayService;
    }

    @Scheduled(cron = "${app.reconcile.cron:0 0 3 * * *}")
    public void reconcilePaidOrders() {
        if (!running.compareAndSet(false, true)) {
            log.warn("Payment reconcile already running; skipping scheduled run");
            return;
        }
        try {
            var result = toyyibPayService.reconcilePendingOrders();
            log.info("Scheduled payment reconcile: total={}, paid={}, errors={}, skippedTests={}",
                    result.getTotal(), result.getPaid(), result.getErrors(), result.getSkippedTests());
        } catch (Exception e) {
            log.error("Scheduled payment reconcile failed", e);
        } finally {
            running.set(false);
        }
    }
}