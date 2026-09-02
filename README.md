# Imm_dashboard
# 📊 HMIS Immunization Performance Dashboard

* **Dynamic Period Detection:** Automatically extracts the reporting period (e.g., *Apr to Jul 2026-27*) from cell `J179` of the input HMIS file and pro-rates target calculations accordingly.
* **Automated Metadata Extraction:** Dynamically parses and displays the exact HMIS download date stamp from cell `A2`.
* **National & State Filtering:** Instantly filter all metrics, KPI cards, charts, and tables by selecting any State/UT or viewing nationwide aggregates.
* **Unified Bar Chart Visualizations:**
  * Displays coverage rates across all 22 indicators or drills down state-by-state for individual vaccines.
  * Ensures every State/UT label is fully visible on the X-axis without skipping or truncation.
  * In-bar white data labels positioned neatly at the top of each bar for maximum legibility.
* **Dual Reporting Tables:**
  1. **Coverage (%) Table:** Calculates pro-rated coverage percentages against Infant and Pregnant Women (PW) targets.
  2. **Absolute Reported Numbers Table:** Displays actual dose counts reported alongside target populations.
* **Custom Excel Exports:** Download styled Excel spreadsheets complete with dark slate headers, light gray gridlines, formatted percentage/number strings, and automatic State/National summary rows.
