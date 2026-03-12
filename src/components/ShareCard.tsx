"use client";

import { forwardRef } from "react";
import { Role, ROLE_LABELS, DOMAIN_INFO, ThemeScore, LeadershipCombo } from "@/types";
import { LEADERSHIP_TYPES } from "@/data/leadership-types";
import { ROLE_MAP } from "@/data/roles";

interface ShareCardProps {
  combo: LeadershipCombo;
  role: Role;
  top5: ThemeScore[];
  leadershipTypeId: string;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ combo, role, top5, leadershipTypeId }, ref) => {
    const leadershipType = LEADERSHIP_TYPES[leadershipTypeId as keyof typeof LEADERSHIP_TYPES];
    const roleInfo = ROLE_MAP[role];

    return (
      <div
        ref={ref}
        data-share-card
        style={{
          width: "1080px",
          height: "1080px",
          background: `linear-gradient(135deg, ${leadershipType?.color || '#8B5CF6'}15, ${roleInfo?.color || '#6366f1'}15)`,
          padding: "56px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Noto Sans KR, sans-serif",
          position: "relative",
        }}
      >
        {/* Top Color Bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: `linear-gradient(90deg, ${leadershipType?.color || '#8B5CF6'}, ${roleInfo?.color || '#6366f1'})`,
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: "50px",
              padding: "6px 24px 16px 24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <span style={{ fontSize: "20px", color: "#6b7280", fontWeight: 600, lineHeight: 1 }}>
              피트니스 강점 검사
            </span>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: roleInfo?.color || '#8B5CF6',
              borderRadius: "50px",
              padding: "4px 20px 14px 20px",
            }}
          >
            <span style={{ fontSize: "18px", color: "#fff", fontWeight: 600, lineHeight: 1 }}>
              {roleInfo?.nameKo}
            </span>
          </div>
        </div>

        {/* Character Image or Emoji */}
        <div style={{ textAlign: "center", marginBottom: "2px", marginTop: "-80px" }}>
          {combo.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={combo.image}
              alt={combo.comboTitle}
              style={{
                width: "500px",
                height: "500px",
                objectFit: "contain",
                margin: "0 auto",
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
              }}
            />
          ) : (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: `${leadershipType?.color || '#8B5CF6'}20`,
                marginBottom: "20px",
                fontSize: "56px",
              }}
            >
              {leadershipType?.emoji || '🔭'}
            </div>
          )}
        </div>

        {/* Leadership Type Label */}
        <div
          style={{
            fontSize: "36px",
            color: leadershipType?.color || '#8B5CF6',
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          {leadershipType?.nameKo} 리더
        </div>

        {/* Combo Title */}
        <h1
          style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            margin: "0 0 8px 0",
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          {combo.comboTitle}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "28px",
            color: "#6b7280",
            textAlign: "center",
            margin: "6px 0 36px 0",
          }}
        >
          {combo.tagline}
        </p>

        {/* Viral Quote */}
        <p
          style={{
            fontSize: "30px",
            color: "#1f2937",
            textAlign: "center",
            margin: "0 0 24px 0",
            lineHeight: 1.5,
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
            fontStyle: "italic",
          }}
        >
          &ldquo;{combo.slogan.split('. ').map((sentence, i, arr) => (
            <span key={i}>
              {sentence}{i < arr.length - 1 ? '.' : ''}
              {i < arr.length - 1 && <br />}
            </span>
          ))}&rdquo;
        </p>

        {/* TOP 5 */}
        <div style={{ marginTop: "auto", width: "100%" }}>
          <p
            style={{
              fontSize: "20px",
              color: "#6b7280",
              margin: "0 0 16px 0",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            TOP 5 강점
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            {top5.slice(0, 5).map((item) => {
              const domainInfo = DOMAIN_INFO[item.domain];
              return (
                <span
                  key={item.themeId}
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#fff",
                    backgroundColor: domainInfo.color,
                    padding: "2px 20px 18px 20px",
                    borderRadius: "50px",
                    lineHeight: 1,
                  }}
                >
                  {item.nameKo}({item.grade})
                </span>
              );
            })}
          </div>

          {/* Recommended Business */}
          <p
            style={{
              fontSize: "24px",
              color: "#111827",
              fontWeight: 700,
              margin: "0 0 16px 0",
              textAlign: "center",
            }}
          >
            <span style={{ color: "#EC4899" }}>★</span> 추천 비즈니스 모델<span style={{ marginLeft: "24px" }} />{combo.recommendedBusiness.map((biz, i) => (
              <span key={i}>
                {i > 0 && <span style={{ marginLeft: "20px" }} />}<span style={{ color: "#EC4899" }}>●</span><span style={{ marginLeft: "6px" }} />{biz}
              </span>
            ))}
          </p>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "12px 32px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ fontSize: "24px", color: "#374151", margin: 0, fontWeight: 600, letterSpacing: "0.5px" }}>
              나도 검사하기 &rarr;{" "}
              <span style={{ color: "#7C3AED", fontWeight: 700 }}>fitmindlab.vercel.app</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = "ShareCard";

export default ShareCard;
