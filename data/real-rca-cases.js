(function attachAutoGuardPublicWorkbench(root, factory) {
  const data = factory();
  if (typeof module === 'object' && module.exports) module.exports = data;
  if (root) root.AUTOGUARD_REAL_RCA_WORKBENCH = data;
})(typeof window !== 'undefined' ? window : null, function createAutoGuardPublicWorkbench() {
  return {
  "schema_version": "public-demo/v1",
  "source": {
    "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
    "synthetic": false,
    "case_count": 10,
    "source_audit_status": "PASSED",
    "raw_mcap_available": false,
    "attachment_body_available": false,
    "gold_labels_available": false,
    "publication_scope": "PUBLIC_DEMO_ONLY"
  },
  "metrics": {
    "case_count": 10,
    "function_domain_distribution": {
      "ACC": 3,
      "FCW": 2,
      "AEB/AWB": 2,
      "LCC": 3
    },
    "readiness_distribution": {
      "PARTIAL_WITH_GAPS": 4,
      "ALIGNMENT_BLOCKED": 6
    },
    "decision_distribution": {
      "candidate_supported_with_limits": 4,
      "insufficient_evidence": 6
    },
    "method_policy": "EVIDENCE_GRADED_V2",
    "analysis_state_distribution": {
      "LIMITED_CANDIDATES_READY": 4,
      "TERMINAL_STOP": 6
    },
    "evidence_tension_case_ids": [
      "RCA-EXT-004",
      "RCA-EXT-010"
    ],
    "safety_priority_case_ids": [
      "RCA-EXT-008"
    ],
    "evidence_item_count": 146,
    "derived_observation_count": 80,
    "observations_with_window": 73,
    "observations_without_window": 7,
    "event_bound_observation_count": 0,
    "human_review_pending": 10,
    "coverage_interpretation": "RULE_AND_WORKFLOW_COVERAGE_ONLY",
    "accuracy_claim_allowed": false
  },
  "boundaries": {
    "evidence_scope": "DEIDENTIFIED_DERIVED_OBSERVATIONS_ONLY",
    "raw_mcap_available": false,
    "attachment_body_available": false,
    "gold_labels_available": false,
    "ota_fact_status": "NOT_ASSESSED",
    "ota_causality_claim_allowed": false,
    "root_cause_claim_allowed": false,
    "accuracy_claim_allowed": false,
    "human_review_required": true,
    "vehicle_scope": "LOG_TRANSMISSION_ONLY",
    "publication_scope": "PUBLIC_DEMO_ONLY"
  },
  "cases": [
    {
      "case_id": "RCA-EXT-001",
      "title": "ACC-跟停前车静止车，车速65，刹车晚，有恐慌感",
      "domain": "ACC",
      "analysis_state": "LIMITED_CANDIDATES_READY",
      "evidence_tension_state": "NONE",
      "safety_route": "NORMAL",
      "readiness_state": "PARTIAL_WITH_GAPS",
      "decision_state": "candidate_supported_with_limits",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "ACC：跟停前车静止车，车速65，刹车晚，有恐慌感",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 4 条、未观察检查 3 条、字段不足 1 条。",
          "已识别企业问题所属功能域为 ACC，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前仅形成受限候选，仍不能确认生产根因或责任归属。",
        "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-001-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "exact_match",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "LEAD_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "LEAD_VEHICLE"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-001-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-CLAIM-004",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-CLAIM-005",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-CLAIM-006",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-001-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "object_kinematics_consistency",
            "check_pattern": "perception_object_kinematics_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "ego_longitudinal_oscillation",
            "check_pattern": "ego_longitudinal_oscillation",
            "domain": "CONTROL_LONGITUDINAL",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_jerk_spec",
            "check_pattern": "acc_request_oscillation",
            "domain": "ACC",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_heavy_decel_spec",
            "check_pattern": "acc_actual_decel_vs_ooi",
            "domain": "ACC",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_abnormal_exit_spec",
            "check_pattern": null,
            "domain": "ACC",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_ooi_target_switch_cut_in",
            "check_pattern": null,
            "domain": "ACC",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_dai_reminder",
            "check_pattern": null,
            "domain": "ACC",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_track_quality",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-001-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-001-MISSING-RAW-MCAP",
          "EV-RCA-EXT-001-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-001-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-001-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-001-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-001-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-001-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-001-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-001-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-001-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-001-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-001-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-001-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-001-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-001-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [
          {
            "candidate_id": "CAND-RCA-EXT-001-01",
            "mechanism_id": "perception_object_kinematics_anomaly",
            "mechanism_label": "目标运动学不一致",
            "support_evidence_ids": [
              "EV-RCA-EXT-001-OBS-001"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-001-OBS-008",
              "EV-RCA-EXT-001-MISSING-RAW-MCAP",
              "EV-RCA-EXT-001-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-001-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-001-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-001-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-001-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-001-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-001-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-001-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-001-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-001-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-001-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-001-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          },
          {
            "candidate_id": "CAND-RCA-EXT-001-02",
            "mechanism_id": "ego_longitudinal_oscillation",
            "mechanism_label": "自车纵向振荡",
            "support_evidence_ids": [
              "EV-RCA-EXT-001-OBS-002"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-001-OBS-008",
              "EV-RCA-EXT-001-MISSING-RAW-MCAP",
              "EV-RCA-EXT-001-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-001-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-001-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-001-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-001-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-001-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-001-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-001-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-001-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-001-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-001-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-001-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          },
          {
            "candidate_id": "CAND-RCA-EXT-001-03",
            "mechanism_id": "acc_request_oscillation",
            "mechanism_label": "ACC 请求振荡",
            "support_evidence_ids": [
              "EV-RCA-EXT-001-OBS-003"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-001-OBS-008",
              "EV-RCA-EXT-001-MISSING-RAW-MCAP",
              "EV-RCA-EXT-001-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-001-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-001-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-001-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-001-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-001-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-001-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-001-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-001-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-001-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-001-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-001-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          },
          {
            "candidate_id": "CAND-RCA-EXT-001-04",
            "mechanism_id": "acc_actual_decel_vs_ooi",
            "mechanism_label": "实际减速度与目标关系异常",
            "support_evidence_ids": [
              "EV-RCA-EXT-001-OBS-004"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-001-OBS-008",
              "EV-RCA-EXT-001-MISSING-RAW-MCAP",
              "EV-RCA-EXT-001-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-001-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-001-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-001-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-001-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-001-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-001-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-001-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-001-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-001-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-001-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-001-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-001-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          }
        ],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "candidate_supported_with_limits",
          "publication_terminal_class": "HUMAN_REVIEW_REQUIRED",
          "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-002",
      "title": "FCW-[LOCATION_REDACTED][PROJECT_OR_BUILD_REDACTED]车-自车直行遇到远处弯道临停小车-FCW误触发",
      "domain": "FCW",
      "analysis_state": "LIMITED_CANDIDATES_READY",
      "evidence_tension_state": "NONE",
      "safety_route": "NORMAL",
      "readiness_state": "PARTIAL_WITH_GAPS",
      "decision_state": "candidate_supported_with_limits",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "FCW：自车直行遇到远处弯道临停小车-FCW误触发",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 2 条、未观察检查 5 条、字段不足 1 条。",
          "已识别企业问题所属功能域为 FCW，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前仅形成受限候选，仍不能确认生产根因或责任归属。",
        "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-002-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "exact_match",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "DISTANT_STOPPED_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "DISTANT_STOPPED_VEHICLE"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-002-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-002-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "lane_geometry_quality",
            "check_pattern": "lane_geometry_anomaly",
            "domain": "PERCEPTION_LANE",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "ego_longitudinal_oscillation",
            "check_pattern": "ego_longitudinal_oscillation",
            "domain": "CONTROL_LONGITUDINAL",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_kinematics_consistency",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_track_quality",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "cipv_target_selection",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "aeb_confidence_or_range_speed_jump",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "aeb_target_class_jump",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "fcw_aeb_target_instability",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-002-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-002-MISSING-RAW-MCAP",
          "EV-RCA-EXT-002-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-002-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-002-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-002-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-002-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-002-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-002-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-002-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-002-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-002-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-002-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-002-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-002-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-002-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [
          {
            "candidate_id": "CAND-RCA-EXT-002-01",
            "mechanism_id": "lane_geometry_anomaly",
            "mechanism_label": "车道几何异常",
            "support_evidence_ids": [
              "EV-RCA-EXT-002-OBS-001"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-002-OBS-008",
              "EV-RCA-EXT-002-MISSING-RAW-MCAP",
              "EV-RCA-EXT-002-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-002-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-002-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-002-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-002-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-002-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-002-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-002-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-002-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-002-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-002-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-002-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-002-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-002-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          }
        ],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "candidate_supported_with_limits",
          "publication_terminal_class": "HUMAN_REVIEW_REQUIRED",
          "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-003",
      "title": "AWB-[LOCATION_REDACTED]-[VEHICLE_REDACTED]-大雨天气自车直行疑似误触发AWB",
      "domain": "AEB/AWB",
      "analysis_state": "TERMINAL_STOP",
      "evidence_tension_state": "NONE",
      "safety_route": "NORMAL",
      "readiness_state": "ALIGNMENT_BLOCKED",
      "decision_state": "insufficient_evidence",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "AEB/AWB：大雨天气自车直行疑似误触发AWB",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 3 条、未观察检查 5 条、字段不足 0 条。",
          "已识别企业问题所属功能域为 AEB/AWB，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前证据只能说明检查中出现了哪些派生观察，不能确认根因或责任归属。",
        "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-003-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "frame_id_exact_match",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-003-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-003-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "object_kinematics_consistency",
            "check_pattern": "perception_object_kinematics_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_geometry_quality",
            "check_pattern": "lane_geometry_anomaly",
            "domain": "PERCEPTION_LANE",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "cipv_target_selection",
            "check_pattern": "cipv_selection_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_track_quality",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "ego_longitudinal_oscillation",
            "check_pattern": null,
            "domain": "CONTROL_LONGITUDINAL",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "aeb_confidence_or_range_speed_jump",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "counter_evidence",
            "window_status": "PERMANENT_OBSERVABILITY_LIMIT",
            "temporal_binding": "UNBOUND",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "aeb_target_class_jump",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "counter_evidence",
            "window_status": "PERMANENT_OBSERVABILITY_LIMIT",
            "temporal_binding": "UNBOUND",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "aeb_ttc_threshold_not_met",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "counter_evidence",
            "window_status": "PERMANENT_OBSERVABILITY_LIMIT",
            "temporal_binding": "UNBOUND",
            "evidence_ids": [
              "EV-RCA-EXT-003-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-003-MISSING-RAW-MCAP",
          "EV-RCA-EXT-003-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-003-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-003-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-003-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-003-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-003-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-003-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-003-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-003-MISSING-ISSUE-ANCHOR",
          "EV-RCA-EXT-003-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-003-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-003-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-003-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-003-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-003-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "insufficient_evidence",
          "publication_terminal_class": "STOP_INSUFFICIENT_EVIDENCE",
          "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-004",
      "title": "ACC-ACC，跟停前面静止车辆，无刹车迹象",
      "domain": "ACC",
      "analysis_state": "TERMINAL_STOP",
      "evidence_tension_state": "EVIDENCE_TENSION",
      "safety_route": "NORMAL",
      "readiness_state": "ALIGNMENT_BLOCKED",
      "decision_state": "insufficient_evidence",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "ACC：ACC，跟停前面静止车辆，无刹车迹象",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 6 条、未观察检查 2 条、字段不足 0 条。",
          "已识别企业问题所属功能域为 ACC，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前证据只能说明检查中出现了哪些派生观察，不能确认根因或责任归属。",
        "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-004-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "frame_id_interpolated",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "LEAD_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "LEAD_VEHICLE"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-004-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-CLAIM-004",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-CLAIM-005",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-CLAIM-006",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-004-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "object_kinematics_consistency",
            "check_pattern": "perception_object_kinematics_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "cipv_target_selection",
            "check_pattern": "cipv_selection_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "ego_longitudinal_oscillation",
            "check_pattern": "ego_longitudinal_oscillation",
            "domain": "CONTROL_LONGITUDINAL",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_decel_heavy",
            "check_pattern": "actual_longitudinal_deceleration_heavy",
            "domain": "ACC",
            "status": "supporting_observation",
            "window_status": "PERMANENT_OBSERVABILITY_LIMIT",
            "temporal_binding": "UNBOUND",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_jerk",
            "check_pattern": "acc_request_or_actual_acceleration_jump",
            "domain": "ACC",
            "status": "supporting_observation",
            "window_status": "PERMANENT_OBSERVABILITY_LIMIT",
            "temporal_binding": "UNBOUND",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_ooi_target_switch_cut_in",
            "check_pattern": "acc_ooi_target_switch_cut_in_moderate_decel",
            "domain": "ACC",
            "status": "supporting_observation",
            "window_status": "PERMANENT_OBSERVABILITY_LIMIT",
            "temporal_binding": "UNBOUND",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_track_quality",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_abnormal_exit_spec",
            "check_pattern": null,
            "domain": "ACC",
            "status": "counter_evidence",
            "window_status": "PERMANENT_OBSERVABILITY_LIMIT",
            "temporal_binding": "UNBOUND",
            "evidence_ids": [
              "EV-RCA-EXT-004-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-004-MISSING-RAW-MCAP",
          "EV-RCA-EXT-004-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-004-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-004-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-004-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-004-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-004-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-004-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-004-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-004-MISSING-ISSUE-ANCHOR",
          "EV-RCA-EXT-004-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-004-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-004-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-004-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-004-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-004-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "insufficient_evidence",
          "publication_terminal_class": "STOP_INSUFFICIENT_EVIDENCE",
          "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-005",
      "title": "LCC-压合流线LCC未退出",
      "domain": "LCC",
      "analysis_state": "LIMITED_CANDIDATES_READY",
      "evidence_tension_state": "NONE",
      "safety_route": "NORMAL",
      "readiness_state": "PARTIAL_WITH_GAPS",
      "decision_state": "candidate_supported_with_limits",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "LCC：压合流线LCC未退出",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 1 条、未观察检查 1 条、字段不足 6 条。",
          "已识别企业问题所属功能域为 LCC，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前仅形成受限候选，仍不能确认生产根因或责任归属。",
        "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-005-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "exact_match",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "MERGE_LINE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "MERGE_LINE"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-005-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-CLAIM-004",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-005-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "lane_geometry_quality",
            "check_pattern": "lane_geometry_anomaly",
            "domain": "PERCEPTION_LANE",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_perception_lane2d_j2_deviation",
            "check_pattern": null,
            "domain": "LANE_PERCEPTION",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lcc_exit",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lcc_weaving",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_perception_lane1_lane2_jump",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane2d_j2_alignment_error",
            "check_pattern": null,
            "domain": "LANE_PERCEPTION",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "dnp_spp_lane_center_delta",
            "check_pattern": null,
            "domain": "DNP_SPP",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "dnp_spp_temporal_jump",
            "check_pattern": null,
            "domain": "DNP_SPP",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-005-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-005-MISSING-RAW-MCAP",
          "EV-RCA-EXT-005-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-005-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-005-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-005-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-005-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-005-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-005-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-005-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-005-MISSING-FUNCTION-DOMAIN-DECODE",
          "EV-RCA-EXT-005-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-005-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-005-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-005-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-005-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-005-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [
          {
            "candidate_id": "CAND-RCA-EXT-005-01",
            "mechanism_id": "lane_geometry_anomaly",
            "mechanism_label": "车道几何异常",
            "support_evidence_ids": [
              "EV-RCA-EXT-005-OBS-001"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-005-OBS-003",
              "EV-RCA-EXT-005-OBS-004",
              "EV-RCA-EXT-005-OBS-005",
              "EV-RCA-EXT-005-OBS-006",
              "EV-RCA-EXT-005-OBS-007",
              "EV-RCA-EXT-005-OBS-008",
              "EV-RCA-EXT-005-MISSING-RAW-MCAP",
              "EV-RCA-EXT-005-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-005-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-005-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-005-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-005-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-005-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-005-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-005-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-005-MISSING-FUNCTION-DOMAIN-DECODE",
              "EV-RCA-EXT-005-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-005-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-005-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-005-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-005-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-005-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          }
        ],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "candidate_supported_with_limits",
          "publication_terminal_class": "HUMAN_REVIEW_REQUIRED",
          "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-006",
      "title": "FCW-[LOCATION_REDACTED][PROJECT_OR_BUILD_REDACTED]车-雨天高速正常直行遇前方较远大车FCW触发，疑似误触发",
      "domain": "FCW",
      "analysis_state": "LIMITED_CANDIDATES_READY",
      "evidence_tension_state": "NONE",
      "safety_route": "NORMAL",
      "readiness_state": "PARTIAL_WITH_GAPS",
      "decision_state": "candidate_supported_with_limits",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "FCW：雨天高速正常直行遇前方较远大车FCW触发",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 2 条、未观察检查 3 条、字段不足 3 条。",
          "已识别企业问题所属功能域为 FCW，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前仅形成受限候选，仍不能确认生产根因或责任归属。",
        "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-006-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "exact_match",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "DISTANT_LARGE_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "DISTANT_LARGE_VEHICLE"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-006-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-006-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "object_kinematics_consistency",
            "check_pattern": "perception_object_kinematics_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "cipv_target_selection",
            "check_pattern": "cipv_selection_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_geometry_quality",
            "check_pattern": null,
            "domain": "PERCEPTION_LANE",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_track_quality",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "ego_longitudinal_oscillation",
            "check_pattern": null,
            "domain": "CONTROL_LONGITUDINAL",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "fcw_aeb_target_instability",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "aeb_confidence_or_range_speed_jump",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "aeb_vehicle_or_tw_range_speed_jump",
            "check_pattern": null,
            "domain": "AEB_FCW",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-006-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-006-MISSING-RAW-MCAP",
          "EV-RCA-EXT-006-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-006-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-006-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-006-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-006-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-006-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-006-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-006-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-006-MISSING-FUNCTION-DOMAIN-DECODE",
          "EV-RCA-EXT-006-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-006-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-006-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-006-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-006-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-006-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [
          {
            "candidate_id": "CAND-RCA-EXT-006-01",
            "mechanism_id": "perception_object_kinematics_anomaly",
            "mechanism_label": "目标运动学不一致",
            "support_evidence_ids": [
              "EV-RCA-EXT-006-OBS-001"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-006-OBS-006",
              "EV-RCA-EXT-006-OBS-007",
              "EV-RCA-EXT-006-OBS-008",
              "EV-RCA-EXT-006-MISSING-RAW-MCAP",
              "EV-RCA-EXT-006-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-006-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-006-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-006-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-006-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-006-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-006-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-006-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-006-MISSING-FUNCTION-DOMAIN-DECODE",
              "EV-RCA-EXT-006-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-006-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-006-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-006-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-006-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-006-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          },
          {
            "candidate_id": "CAND-RCA-EXT-006-02",
            "mechanism_id": "cipv_selection_anomaly",
            "mechanism_label": "CIPV 目标选择异常",
            "support_evidence_ids": [
              "EV-RCA-EXT-006-OBS-002"
            ],
            "counter_evidence_ids": [],
            "missing_evidence_ids": [
              "EV-RCA-EXT-006-OBS-006",
              "EV-RCA-EXT-006-OBS-007",
              "EV-RCA-EXT-006-OBS-008",
              "EV-RCA-EXT-006-MISSING-RAW-MCAP",
              "EV-RCA-EXT-006-MISSING-SAMPLING-RATE",
              "EV-RCA-EXT-006-MISSING-SIGNAL-UNITS",
              "EV-RCA-EXT-006-MISSING-MEASUREMENT-THRESHOLDS",
              "EV-RCA-EXT-006-MISSING-TIME-COORDINATE",
              "EV-RCA-EXT-006-MISSING-ALIAS-VALUES",
              "EV-RCA-EXT-006-MISSING-ENTITY-CONTINUITY",
              "EV-RCA-EXT-006-MISSING-HANDOVER-SEQUENCE",
              "EV-RCA-EXT-006-MISSING-ATTACHMENT-CONTENT",
              "EV-RCA-EXT-006-MISSING-FUNCTION-DOMAIN-DECODE",
              "EV-RCA-EXT-006-MISSING-GOLD-STANDARD",
              "EV-RCA-EXT-006-MISSING-OTA-CAMPAIGN-ID",
              "EV-RCA-EXT-006-MISSING-OTA-BEFORE-VERSION",
              "EV-RCA-EXT-006-MISSING-OTA-AFTER-VERSION",
              "EV-RCA-EXT-006-MISSING-OTA-ACTIVATION-TIME",
              "EV-RCA-EXT-006-MISSING-OTA-CHANGED-MODULES"
            ],
            "conclusion_level": "CANDIDATE_ONLY",
            "validation_allowed": false,
            "event_attribution_allowed": false
          }
        ],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "SUPPORTS_CANDIDATE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "LIMITS_CANDIDATE_SCOPE"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            },
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "candidate_supported_with_limits",
          "publication_terminal_class": "HUMAN_REVIEW_REQUIRED",
          "next_action": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-007",
      "title": "[PROJECT_OR_BUILD_REDACTED][LOCATION_REDACTED]-晴天山区正常行驶前方三轮车距离较远误触发",
      "domain": "AEB/AWB",
      "analysis_state": "TERMINAL_STOP",
      "evidence_tension_state": "NONE",
      "safety_route": "NORMAL",
      "readiness_state": "ALIGNMENT_BLOCKED",
      "decision_state": "insufficient_evidence",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "AEB/AWB：[PROJECT_OR_BUILD_REDACTED][LOCATION_REDACTED]-晴天山区正常行驶前方三轮车距离较远误触发",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 4 条、未观察检查 4 条、字段不足 0 条。",
          "已识别企业问题所属功能域为 AEB/AWB，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前证据只能说明检查中出现了哪些派生观察，不能确认根因或责任归属。",
        "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-007-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "unknown",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "DISTANT_THREE_WHEELER",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "DISTANT_THREE_WHEELER"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-007-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-007-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "object_kinematics_consistency",
            "check_pattern": "perception_object_kinematics_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_track_quality",
            "check_pattern": "perception_track_quality_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "op_target_range_jitter",
            "check_pattern": "op_range_measurement_jitter",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "op_target_lateral_jitter",
            "check_pattern": "op_lateral_measurement_jitter",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_geometry_quality",
            "check_pattern": null,
            "domain": "PERCEPTION_LANE",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "cipv_target_selection",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "ego_longitudinal_oscillation",
            "check_pattern": null,
            "domain": "CONTROL_LONGITUDINAL",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "op_target_velocity_jump",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-007-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-007-MISSING-RAW-MCAP",
          "EV-RCA-EXT-007-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-007-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-007-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-007-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-007-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-007-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-007-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-007-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-007-MISSING-ALIGNMENT",
          "EV-RCA-EXT-007-MISSING-ISSUE-ANCHOR",
          "EV-RCA-EXT-007-MISSING-FUNCTION-DOMAIN-DECODE",
          "EV-RCA-EXT-007-MISSING-DECODED-TOTAL",
          "EV-RCA-EXT-007-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-007-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-007-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-007-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-007-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-007-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "insufficient_evidence",
          "publication_terminal_class": "STOP_INSUFFICIENT_EVIDENCE",
          "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-008",
      "title": "LCC-跟随前车，双线变成单线车道，未延单线控车，撞向护栏",
      "domain": "LCC",
      "analysis_state": "TERMINAL_STOP",
      "evidence_tension_state": "NONE",
      "safety_route": "SAFETY_PRIORITY_REVIEW",
      "readiness_state": "ALIGNMENT_BLOCKED",
      "decision_state": "insufficient_evidence",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "LCC：跟随前车，双线变成单线车道，未延单线控车，撞向护栏",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 2 条、未观察检查 0 条、字段不足 6 条。",
          "已识别企业问题所属功能域为 LCC，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前证据只能说明检查中出现了哪些派生观察，不能确认根因或责任归属。",
        "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-008-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "unknown",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "LEAD_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "LANE_BOUNDARY",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "GUARDRAIL",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "LEAD_VEHICLE",
          "LANE_BOUNDARY",
          "GUARDRAIL"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-008-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-CLAIM-004",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-CLAIM-005",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-CLAIM-006",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-008-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "lane_geometry_quality",
            "check_pattern": "lane_geometry_anomaly",
            "domain": "PERCEPTION_LANE",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_perception_lane2d_j2_deviation",
            "check_pattern": "lane2d_j2_or_temporal_abnormal",
            "domain": "LANE_PERCEPTION",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lcc_exit",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lcc_weaving",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_perception_lane1_lane2_jump",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane2d_j2_alignment_error",
            "check_pattern": null,
            "domain": "LANE_PERCEPTION",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "dnp_spp_lane_center_delta",
            "check_pattern": null,
            "domain": "DNP_SPP",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "dnp_spp_temporal_jump",
            "check_pattern": null,
            "domain": "DNP_SPP",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-008-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-008-MISSING-RAW-MCAP",
          "EV-RCA-EXT-008-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-008-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-008-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-008-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-008-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-008-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-008-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-008-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-008-MISSING-ALIGNMENT",
          "EV-RCA-EXT-008-MISSING-ISSUE-ANCHOR",
          "EV-RCA-EXT-008-MISSING-FUNCTION-DOMAIN-DECODE",
          "EV-RCA-EXT-008-MISSING-DECODED-TOTAL",
          "EV-RCA-EXT-008-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-008-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-008-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-008-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-008-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-008-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "insufficient_evidence",
          "publication_terminal_class": "STOP_INSUFFICIENT_EVIDENCE",
          "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-009",
      "title": "LCC-LCC弯道偏左",
      "domain": "LCC",
      "analysis_state": "TERMINAL_STOP",
      "evidence_tension_state": "NONE",
      "safety_route": "NORMAL",
      "readiness_state": "ALIGNMENT_BLOCKED",
      "decision_state": "insufficient_evidence",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "LCC：LCC弯道偏左",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 2 条、未观察检查 0 条、字段不足 6 条。",
          "已识别企业问题所属功能域为 LCC，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前证据只能说明检查中出现了哪些派生观察，不能确认根因或责任归属。",
        "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-009-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "unknown",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "LANE_BOUNDARY",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "LANE_BOUNDARY"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-009-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-CLAIM-004",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-CLAIM-005",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-CLAIM-006",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-009-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "lane_geometry_quality",
            "check_pattern": "lane_geometry_anomaly",
            "domain": "PERCEPTION_LANE",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_perception_lane2d_j2_deviation",
            "check_pattern": "lane2d_j2_or_temporal_abnormal",
            "domain": "LANE_PERCEPTION",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lcc_exit",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lcc_weaving",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane_perception_lane1_lane2_jump",
            "check_pattern": null,
            "domain": "LCC",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "lane2d_j2_alignment_error",
            "check_pattern": null,
            "domain": "LANE_PERCEPTION",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "dnp_spp_lane_center_delta",
            "check_pattern": null,
            "domain": "DNP_SPP",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "dnp_spp_temporal_jump",
            "check_pattern": null,
            "domain": "DNP_SPP",
            "status": "missing_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-009-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-009-MISSING-RAW-MCAP",
          "EV-RCA-EXT-009-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-009-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-009-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-009-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-009-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-009-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-009-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-009-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-009-MISSING-ALIGNMENT",
          "EV-RCA-EXT-009-MISSING-ISSUE-ANCHOR",
          "EV-RCA-EXT-009-MISSING-FUNCTION-DOMAIN-DECODE",
          "EV-RCA-EXT-009-MISSING-DECODED-TOTAL",
          "EV-RCA-EXT-009-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-009-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-009-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-009-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-009-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-009-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "insufficient_evidence",
          "publication_terminal_class": "STOP_INSUFFICIENT_EVIDENCE",
          "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
        }
      }
    },
    {
      "case_id": "RCA-EXT-010",
      "title": "ACC-ACC拥堵跟车场景，前车缓慢刹停，自车靠近前车，减速顿错感强，车辆明显点头",
      "domain": "ACC",
      "analysis_state": "TERMINAL_STOP",
      "evidence_tension_state": "EVIDENCE_TENSION",
      "safety_route": "NORMAL",
      "readiness_state": "ALIGNMENT_BLOCKED",
      "decision_state": "insufficient_evidence",
      "review_status": "REVIEW_REQUIRED",
      "enterprise": {
        "problem": "ACC：ACC拥堵跟车场景，前车缓慢刹停，自车靠近前车，减速顿错感强，车辆明显点头",
        "confirmed_facts": [
          "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
          "已纳入 8 条脱敏派生观察，其中支持方向 5 条、未观察检查 3 条、字段不足 0 条。",
          "已识别企业问题所属功能域为 ACC，但未把问题描述中的数值当作已验证测量。"
        ],
        "missing_data": [
          "原始 MCAP 未提供，无法复算信号和物理量。",
          "附件正文未提供，无法核对现场媒体或补充描述。",
          "独立人工金标准未提供，当前不能计算诊断准确率。",
          "OTA 活动、版本和变更模块事实未提供，本轮不评估 OTA 因果。"
        ],
        "attribution_status": "当前证据只能说明检查中出现了哪些派生观察，不能确认根因或责任归属。",
        "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
      },
      "engineering": {
        "evidence_snapshot_id": "PUB-RCA-EXT-010-SNAPSHOT-V1",
        "content_hash": "PUBLIC-DEMO-REDACTED",
        "source_hashes": {
          "case_sha256": "PUBLIC-DEMO-REDACTED",
          "manifest_sha256": "PUBLIC-DEMO-REDACTED"
        },
        "alignment": {
          "method": "unknown",
          "confidence": "low",
          "entity_bindings": [
            {
              "role": "EGO_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            },
            {
              "role": "LEAD_VEHICLE",
              "binding_status": "ROLE_ONLY_ID_UNAVAILABLE",
              "continuity_status": "NOT_VERIFIABLE_WITH_CURRENT_DATA"
            }
          ]
        },
        "target_roles": [
          "EGO_VEHICLE",
          "LEAD_VEHICLE"
        ],
        "measurement_assessment": {
          "execution_status": "NOT_EXECUTABLE_WITH_CURRENT_DATA"
        },
        "evidence_items": [
          {
            "evidence_id": "EV-RCA-EXT-010-ISSUE",
            "source": "脱敏派生检查",
            "data_class": "REAL_CASE_DERIVED_DEIDENTIFIED",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-CLAIM-001",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-CLAIM-002",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-CLAIM-003",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-CLAIM-004",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-CLAIM-005",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-CLAIM-006",
            "source": "脱敏派生检查",
            "data_class": "REPORTED_CLAIM",
            "quality": "medium"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-METADATA",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_METADATA",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-001",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-002",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-003",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-004",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-005",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-006",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-007",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          },
          {
            "evidence_id": "EV-RCA-EXT-010-OBS-008",
            "source": "脱敏派生检查",
            "data_class": "DERIVED_OBSERVATION",
            "quality": "low"
          }
        ],
        "derived_observations": [
          {
            "evaluator": "object_kinematics_consistency",
            "check_pattern": "perception_object_kinematics_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-001"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "object_track_quality",
            "check_pattern": "perception_track_quality_anomaly",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-002"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "ego_longitudinal_oscillation",
            "check_pattern": "ego_longitudinal_oscillation",
            "domain": "CONTROL_LONGITUDINAL",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-003"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_heavy_decel_spec",
            "check_pattern": "acc_actual_decel_vs_ooi",
            "domain": "ACC",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-004"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "op_target_range_jitter",
            "check_pattern": "op_range_measurement_jitter",
            "domain": "PERCEPTION_OBJECT",
            "status": "supporting_observation",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-005"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "cipv_target_selection",
            "check_pattern": null,
            "domain": "PERCEPTION_OBJECT",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-006"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_abnormal_exit_spec",
            "check_pattern": null,
            "domain": "ACC",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-007"
            ],
            "measurement_status": "derived_observation_only"
          },
          {
            "evaluator": "acc_jerk_spec",
            "check_pattern": null,
            "domain": "ACC",
            "status": "counter_evidence",
            "window_status": "AVAILABLE",
            "temporal_binding": "COORDINATE_SYSTEM_UNDECLARED",
            "evidence_ids": [
              "EV-RCA-EXT-010-OBS-008"
            ],
            "measurement_status": "derived_observation_only"
          }
        ],
        "missing_evidence_ids": [
          "EV-RCA-EXT-010-MISSING-RAW-MCAP",
          "EV-RCA-EXT-010-MISSING-SAMPLING-RATE",
          "EV-RCA-EXT-010-MISSING-SIGNAL-UNITS",
          "EV-RCA-EXT-010-MISSING-MEASUREMENT-THRESHOLDS",
          "EV-RCA-EXT-010-MISSING-TIME-COORDINATE",
          "EV-RCA-EXT-010-MISSING-ALIAS-VALUES",
          "EV-RCA-EXT-010-MISSING-ENTITY-CONTINUITY",
          "EV-RCA-EXT-010-MISSING-HANDOVER-SEQUENCE",
          "EV-RCA-EXT-010-MISSING-ATTACHMENT-CONTENT",
          "EV-RCA-EXT-010-MISSING-ALIGNMENT",
          "EV-RCA-EXT-010-MISSING-ISSUE-ANCHOR",
          "EV-RCA-EXT-010-MISSING-FUNCTION-DOMAIN-DECODE",
          "EV-RCA-EXT-010-MISSING-DECODED-TOTAL",
          "EV-RCA-EXT-010-MISSING-GOLD-STANDARD",
          "EV-RCA-EXT-010-MISSING-OTA-CAMPAIGN-ID",
          "EV-RCA-EXT-010-MISSING-OTA-BEFORE-VERSION",
          "EV-RCA-EXT-010-MISSING-OTA-AFTER-VERSION",
          "EV-RCA-EXT-010-MISSING-OTA-ACTIVATION-TIME",
          "EV-RCA-EXT-010-MISSING-OTA-CHANGED-MODULES"
        ],
        "hypotheses": [],
        "causal_structure": {
          "claim_status": "NON_ATTRIBUTIVE_EVIDENCE_GRAPH",
          "attribution_allowed": false,
          "edges": [
            {
              "relation": "BLOCKS_ATTRIBUTION"
            }
          ]
        },
        "responsibility_boundary": {
          "status": "UNDETERMINED_WITH_CURRENT_DATA",
          "assignment_allowed": false
        },
        "decision": {
          "epistemic_state": "insufficient_evidence",
          "publication_terminal_class": "STOP_INSUFFICIENT_EVIDENCE",
          "next_action": "基于当前证据维持终止性停答；由人工复核停答边界和永久可观测性限制，不批准根因或责任归属。"
        }
      }
    }
  ]
};
});
