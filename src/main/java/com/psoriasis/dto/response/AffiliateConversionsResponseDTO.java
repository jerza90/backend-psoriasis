package com.psoriasis.dto.response;

import java.util.List;

public class AffiliateConversionsResponseDTO {
    private int count;
    private List<AffiliateConversionResponseDTO> conversions;

    public AffiliateConversionsResponseDTO() {}

    public AffiliateConversionsResponseDTO(int count, List<AffiliateConversionResponseDTO> conversions) {
        this.count = count;
        this.conversions = conversions;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<AffiliateConversionResponseDTO> getConversions() {
        return conversions;
    }

    public void setConversions(List<AffiliateConversionResponseDTO> conversions) {
        this.conversions = conversions;
    }
}
