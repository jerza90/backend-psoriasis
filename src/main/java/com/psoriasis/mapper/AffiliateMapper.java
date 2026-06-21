package com.psoriasis.mapper;

import com.psoriasis.dto.response.AffiliateConversionResponse;
import com.psoriasis.dto.response.AffiliateConversionsResponse;
import com.psoriasis.dto.response.AffiliatePublicResponse;
import com.psoriasis.dto.response.AffiliateResponse;
import com.psoriasis.model.Affiliate;
import com.psoriasis.model.ReferralConversion;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AffiliateMapper {

    public AffiliateResponse toResponse(Affiliate affiliate, String referralLink) {
        AffiliateResponse response = new AffiliateResponse();
        response.setId(affiliate.getId());
        response.setName(affiliate.getName());
        response.setEmail(affiliate.getEmail());
        response.setReferralCode(affiliate.getReferralCode());
        response.setBio(affiliate.getBio());
        response.setPageTitle(affiliate.getPageTitle());
        response.setPageIntro(affiliate.getPageIntro());
        response.setStoryTitle(affiliate.getStoryTitle());
        response.setStorySummary(affiliate.getStorySummary());
        response.setStoryBody(affiliate.getStoryBody());
        response.setBlogTitle(affiliate.getBlogTitle());
        response.setBlogExcerpt(affiliate.getBlogExcerpt());
        response.setBlogUrl(affiliate.getBlogUrl());
        response.setBlogImageUrl(affiliate.getBlogImageUrl());
        response.setTipsTitle(affiliate.getTipsTitle());
        response.setTipsText(affiliate.getTipsText());
        response.setGuideTitle(affiliate.getGuideTitle());
        response.setGuideText(affiliate.getGuideText());
        response.setProgressTitle(affiliate.getProgressTitle());
        response.setProgressText(affiliate.getProgressText());
        response.setAvatarUrl(affiliate.getAvatarUrl());
        response.setSocialLinks(affiliate.getSocialLinks());
        response.setPaymentInfo(affiliate.getPaymentInfo());
        response.setCommissionRate(affiliate.getCommissionRate());
        response.setTotalEarned(affiliate.getTotalEarned());
        response.setTotalPaid(affiliate.getTotalPaid());
        response.setStatus(affiliate.getStatus());
        response.setReferralLink(referralLink);
        response.setCreatedAt(affiliate.getCreatedAt() != null ? affiliate.getCreatedAt().toString() : null);
        return response;
    }

    public AffiliatePublicResponse toPublicResponse(Affiliate affiliate, String referralLink) {
        AffiliatePublicResponse response = new AffiliatePublicResponse();
        response.setId(affiliate.getId());
        response.setName(affiliate.getName());
        response.setBio(affiliate.getBio());
        response.setPageTitle(affiliate.getPageTitle());
        response.setPageIntro(affiliate.getPageIntro());
        response.setStoryTitle(affiliate.getStoryTitle());
        response.setStorySummary(affiliate.getStorySummary());
        response.setStoryBody(affiliate.getStoryBody());
        response.setBlogTitle(affiliate.getBlogTitle());
        response.setBlogExcerpt(affiliate.getBlogExcerpt());
        response.setBlogUrl(affiliate.getBlogUrl());
        response.setBlogImageUrl(affiliate.getBlogImageUrl());
        response.setTipsTitle(affiliate.getTipsTitle());
        response.setTipsText(affiliate.getTipsText());
        response.setGuideTitle(affiliate.getGuideTitle());
        response.setGuideText(affiliate.getGuideText());
        response.setProgressTitle(affiliate.getProgressTitle());
        response.setProgressText(affiliate.getProgressText());
        response.setAvatarUrl(affiliate.getAvatarUrl());
        response.setSocialLinks(affiliate.getSocialLinks());
        response.setReferralCode(affiliate.getReferralCode());
        response.setReferralLink(referralLink);
        return response;
    }

    public AffiliateConversionsResponse toConversionsResponse(List<ReferralConversion> conversions) {
        List<AffiliateConversionResponse> items = conversions.stream()
                .map(this::toConversionResponse)
                .toList();
        return new AffiliateConversionsResponse(items.size(), items);
    }

    public AffiliateConversionResponse toConversionResponse(ReferralConversion conversion) {
        AffiliateConversionResponse response = new AffiliateConversionResponse();
        response.setId(conversion.getId());
        response.setOrderAmount(conversion.getOrderAmount());
        response.setCommissionAmount(conversion.getCommissionAmount());
        response.setStatus(conversion.getStatus());
        response.setCreatedAt(conversion.getCreatedAt() != null ? conversion.getCreatedAt().toString() : null);
        return response;
    }
}
