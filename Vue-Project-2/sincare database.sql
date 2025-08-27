-- 데이터베이스 선택
CREATE DATABASE IF NOT EXISTS skincare CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE skincare;

-- 테이블 생성
CREATE TABLE IF NOT EXISTS skin_care_info (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'PK, 자동 증가',
    skin_type VARCHAR(50) NOT NULL COMMENT '피부 타입 (예: 일반, 건성, 지성 등)',
    features TEXT COMMENT '피부 타입 특징/설명',
    care_tips TEXT COMMENT '케어 팁 (일반적인 관리법)',
    morning_routine LONGTEXT COMMENT '아침 루틴',
    evening_routine LONGTEXT COMMENT '저녁 루틴',
    seasonal_routine LONGTEXT COMMENT '계절별 관리 루틴',
    recommended_products LONGTEXT COMMENT '추천 제품 이름 / 설명 (JSON 배열)',
    key_ingredients LONGTEXT COMMENT '제품 핵심 성분 (예: 히알루론산, 세라마이드 등, JSON 배열)',
    purchase_link LONGTEXT COMMENT '최저가 / 구매 링크 (JSON 배열)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '데이터 생성일',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '데이터 수정일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='피부 타입별 스킨케어 정보';

-- 지성, 복합성, 민감성 피부 타입 데이터 삽입
INSERT INTO skin_care_info (
    skin_type, features, care_tips, morning_routine, evening_routine,
    seasonal_routine, recommended_products, key_ingredients, purchase_link
) VALUES
('건성',
 '피부가 건조하고 쉽게 갈라짐',
 '수분 공급 필수, 미지근한 물 사용',
 '클렌저 → 세럼 → 보습제',
 '클렌저 → 세럼 → 보습제',
 '겨울: 진한 보습제, 여름: 가벼운 수분',
 '[{"name":"A크림","desc":"수분 공급 크림"}]',
 '["히알루론산","세라마이드"]',
 '[{"name":"A크림","link":"https://example.com"}]'
),
('지성',
 '피지 과다 분비, 모공이 크고 윤기 있음, 여드름/블랙헤드 가능',
 '오일프리 클렌저, 정기적 각질 제거, 비면포성 보습제, 자외선 차단제',
 '오일프리 클렌저 → 가벼운 수분제 → 자외선 차단제',
 '오일프리 클렌저 → 가벼운 수분제',
 '덥고 습한 날씨에 피지 조절 필요',
 '[{"name":"C겔","desc":"피지 조절 젤"}]',
 '["살리실산","과산화벤조일"]',
 '[{"name":"C겔","link":"https://example.com/cgel"}]'),

('복합성',
 'T존은 기름지고 볼은 건조, 부위별 관리 필요',
 '부위별 맞춤 제품 사용, T존: 오일 컨트롤, 볼: 수분 공급',
 'T존: 오일 컨트롤 → 볼: 수분제',
 'T존: 오일 컨트롤 → 볼: 수분제',
 '계절별 T존과 볼 관리 조정',
 '[{"name":"D크림","desc":"멀티태스킹 제품"}]',
 '["히알루론산","글리세린"]',
 '[{"name":"D크림","link":"https://example.com/dcream"}]'),

('민감성',
 '자극에 민감, 붉어짐, 가려움, 타는 느낌 가능',
 '무향/저자극 클렌저, 진정 보습제, 패치 테스트 필수',
 '저자극 클렌저 → 진정 보습제',
 '저자극 클렌저 → 진정 보습제',
 '날씨/환경 변화에 따라 민감성 관리',
 '[{"name":"E크림","desc":"진정 보습제"}]',
 '["알로에베라","카모마일","니아신아마이드"]',
 '[{"name":"E크림","link":"https://example.com/ecream"}]');
