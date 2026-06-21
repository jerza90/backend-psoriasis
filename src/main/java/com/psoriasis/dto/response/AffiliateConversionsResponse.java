package com.psoriasis.dto.response;

import java.util.List;

public class AffiliateConversionsResponse {
    private int count;
    private List<AffiliateConversionResponse> conversions;

    public AffiliateConversionsResponse() {}

    public AffiliateConversionsResponse(int count, List<AffiliateConversionResponse> conversions) {
        this.count = count;
        this.conversions = conversions;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<AffiliateConversionResponse> getConversions() {
        return conversions;
    }

    public void setConversions(List<AffiliateConversionResponse> conversions) {
        this.conversions = conversions;
    }
}
