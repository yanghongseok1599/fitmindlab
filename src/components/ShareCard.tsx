"use client";

import { forwardRef } from "react";
import { FitnessType, FitnessTypeCode, Role, ROLE_LABELS, KeywordScore, DOMAIN_INFO } from "@/types";

interface ShareCardProps {
  fitnessType: FitnessType;
  role: Role;
  topStrengths: KeywordScore[];
}

const TYPE_IMAGES: Record<FitnessTypeCode, string> = {
  LONE_WOLF: "/론울프.png",
  EMPIRE_BUILDER: "/제국건설자.png",
  RESULT_MACHINE: "/결과머신.png",
  HEALING_MASTER: "/힐링마스터.png",
  CREATOR: "/크리에이터.png",
  STRATEGIST: "/전략분석가.png",
  MASTER_MENTOR: "/멘토장인.png",
  ALL_ROUNDER: "/올라운더.png",
};

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ fitnessType, role, topStrengths }, ref) => {
    const imageUrl = TYPE_IMAGES[fitnessType.code];

    return (
      <div
        ref={ref}
        data-share-card
        style={{
          width: "1080px",
          height: "1080px",
          background: "#e8e8e8",
          padding: "56px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Noto Sans KR, sans-serif",
          position: "relative",
        }}
      >
        {/* Header Badge - Top Left */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            left: "56px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            borderRadius: "50px",
            padding: "16px 28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            height: "56px",
          }}
        >
          <span style={{ fontSize: "24px", color: "#6b7280", fontWeight: 600, lineHeight: 1, display: "flex", alignItems: "center" }}>
            피트니스 강점검사
          </span>
        </div>

        {/* Top - Character Image */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "40px",
            marginTop: "20px",
          }}
        >
          <img
            src={imageUrl}
            alt={fitnessType.nameKo}
            style={{
              width: "auto",
              height: "440px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Bottom Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Type Name */}
          <h1
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
              marginBottom: "12px",
              letterSpacing: "-2px",
            }}
          >
            {fitnessType.nameKo}
          </h1>

          {/* Role */}
          <p
            style={{
              fontSize: "32px",
              color: "#6b7280",
              margin: 0,
              marginBottom: "24px",
            }}
          >
            {ROLE_LABELS[role]}
          </p>

          {/* Main Message */}
          <p
            style={{
              fontSize: "34px",
              color: "#374151",
              margin: 0,
              marginTop: "16px",
              lineHeight: 1.5,
              marginBottom: "32px",
              maxWidth: "900px",
            }}
          >
            {fitnessType.mainMessage}
          </p>

          {/* TOP 5 Strengths */}
          <div style={{ marginTop: "auto", width: "100%" }}>
            <p
              style={{
                fontSize: "22px",
                color: "#6b7280",
                margin: 0,
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              TOP 5 강점
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px 36px",
                marginBottom: "28px",
              }}
            >
              {topStrengths.slice(0, 5).map((item, index) => {
                const domainInfo = DOMAIN_INFO[item.keyword.domain];
                return (
                  <span
                    key={item.keywordId}
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: domainInfo.color,
                    }}
                  >
                    {index + 1}. {item.keyword.nameKo}
                  </span>
                );
              })}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "32px",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "22px", color: "#9ca3af", margin: 0 }}>
                fitmindlab.kr
              </p>
              <p style={{ fontSize: "22px", color: "#9ca3af", margin: 0 }}>
                나도 검사하기
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = "ShareCard";

export default ShareCard;
