import type { ExtractedRow, ColumnConfig } from "./models";

export interface ParsedNarrativeEmployee {
  period: string;
  caseNumber: string;
  employeeId: string;
  department: string;
  regularHours: string;
  baseRate: string;
  regularEarnings: string;
  overtimeHours: string;
  overtimeRate: string;
  overtimeEarnings: string;
  adjustment: string;
  grossEarnings: string;
  withholding: string;
  netPay: string;
}

/**
 * Detects if a document contains narrative payroll text instead of a standard tabular grid.
 */
export function isNarrativePayrollDocument(fullText: string): boolean {
  const hasCaseNotes = /case\s+note\s+\d+:/i.test(fullText);
  const hasEmployeeIdentifiers = /employee\s+identifier\s+[A-Z0-9-]+/i.test(fullText);
  const hasNarrativeHeader = /payroll\s+reconciliation\s+narrative/i.test(fullText);
  return (hasCaseNotes && hasEmployeeIdentifiers) || (hasNarrativeHeader && hasCaseNotes);
}

function cleanAmount(raw: string | undefined): string {
  if (!raw) return "0.00";
  return raw.trim().replace(/[.,;]+$/, "");
}

function cleanInt(raw: string | undefined): string {
  if (!raw) return "0";
  return raw.trim().replace(/[.,;]+$/, "");
}

/**
 * Parses narrative payroll text from PDF pages into structured records.
 */
export function parseNarrativePayrollText(
  pageTexts: { page: number; text: string }[],
): {
  employees: ParsedNarrativeEmployee[];
  summaryColumns: ColumnConfig[];
  summaryRows: ExtractedRow[];
  itemizedColumns: ColumnConfig[];
  itemizedRows: ExtractedRow[];
} {
  const employees: ParsedNarrativeEmployee[] = [];

  for (const { page, text } of pageTexts) {
    // 1. Extract Reporting Period (e.g. "January 2026")
    let period = "";
    const periodMatch = text.match(/reporting\s+period:\s*([A-Za-z]+\s+\d{4})/i);
    if (periodMatch) {
      period = periodMatch[1].trim();
    } else {
      const altPeriod = text.match(/(?:for the\s+)?([A-Za-z]+\s+\d{4})\s+(?:payroll period|cycle)/i);
      if (altPeriod) period = altPeriod[1].trim();
    }

    // 2. Strip administrative context / reconciliation notes to avoid picking up contextual numbers
    const cleanText = text
      .replace(/Administrative context:[\s\S]*?(?=(?:Case note|SYNTHETIC|$))/gi, "")
      .replace(/Reconciliation note:[\s\S]*?(?=(?:Case note|SYNTHETIC|$))/gi, "");

    // 3. Find all Case Notes
    const caseMatches = Array.from(
      cleanText.matchAll(/Case\s+note\s+(\d+):\s*employee\s+identifier\s+([A-Z0-9-]+)\s*-\s*([^\n\r]+)/gi),
    );

    for (let i = 0; i < caseMatches.length; i++) {
      const match = caseMatches[i];
      const caseNumber = match[1];
      const employeeId = match[2].trim();
      const department = match[3].trim();

      const startIndex = match.index! + match[0].length;
      const nextMatch = caseMatches[i + 1];
      const endIndex = nextMatch ? nextMatch.index : cleanText.length;
      const caseBody = cleanText.slice(startIndex, endIndex).replace(/\s+/g, " ");

      // Parse Regular Hours, Base Rate, Regular Earnings
      let regularHours = "0";
      let baseRate = "0.00";
      let regularEarnings = "0.00";

      const regP1 = caseBody.match(
        /(\d+)\s+regular hours at a base rate of \$([\d,.]+) per hour[^\$]*?regular earnings of \$([\d,.]+)/i,
      );
      if (regP1) {
        regularHours = cleanInt(regP1[1]);
        baseRate = cleanAmount(regP1[2]);
        regularEarnings = cleanAmount(regP1[3]);
      } else {
        const regP2 = caseBody.match(
          /\$([\d,.]+)\s+in ordinary earnings for\s+(\d+)\s+hours worked at\s+\$([\d,.]+)\s+hourly/i,
        );
        if (regP2) {
          regularEarnings = cleanAmount(regP2[1]);
          regularHours = cleanInt(regP2[2]);
          baseRate = cleanAmount(regP2[3]);
        } else {
          const regP3 = caseBody.match(
            /normal schedule accounts for\s+(\d+)\s+hours,\s*valued at\s+\$([\d,.]+)\s+per hour,\s*or\s+\$([\d,.]+)\s+in ordinary pay/i,
          );
          if (regP3) {
            regularHours = cleanInt(regP3[1]);
            baseRate = cleanAmount(regP3[2]);
            regularEarnings = cleanAmount(regP3[3]);
          } else {
            const regP4 = caseBody.match(
              /ordinary earnings of\s+\$([\d,.]+)\s+arising from\s+(\d+)\s+hours at\s+\$([\d,.]+)\s+per hour/i,
            );
            if (regP4) {
              regularEarnings = cleanAmount(regP4[1]);
              regularHours = cleanInt(regP4[2]);
              baseRate = cleanAmount(regP4[3]);
            }
          }
        }
      }

      // Parse Overtime Hours, Rate, Earnings
      let overtimeHours = "0";
      let overtimeRate = "0.00";
      let overtimeEarnings = "0.00";

      const otP1 = caseBody.match(
        /(\d+)\s+hours at\s+\$([\d,.]+) per hour,\s*yielding\s+\$([\d,.]+)\s+in overtime earnings/i,
      );
      if (otP1) {
        overtimeHours = cleanInt(otP1[1]);
        overtimeRate = cleanAmount(otP1[2]);
        overtimeEarnings = cleanAmount(otP1[3]);
      } else {
        const otP2 = caseBody.match(
          /(\d+)\s+hours of overtime,\s*compensated at\s+\$([\d,.]+);\s*the overtime contribution was\s+\$([\d,.]+)/i,
        );
        if (otP2) {
          overtimeHours = cleanInt(otP2[1]);
          overtimeRate = cleanAmount(otP2[2]);
          overtimeEarnings = cleanAmount(otP2[3]);
        } else {
          const otP3 = caseBody.match(
            /(\d+)\s+additional hours were paid at\s+\$([\d,.]+),\s*a total of\s+\$([\d,.]+)/i,
          );
          if (otP3) {
            overtimeHours = cleanInt(otP3[1]);
            overtimeRate = cleanAmount(otP3[2]);
            overtimeEarnings = cleanAmount(otP3[3]);
          } else {
            const otP4 = caseBody.match(
              /records\s+(\d+)\s+overtime hours and\s+\$([\d,.]+)\s+in overtime compensation,\s*using a rate of\s+\$([\d,.]+)/i,
            );
            if (otP4) {
              overtimeHours = cleanInt(otP4[1]);
              overtimeEarnings = cleanAmount(otP4[2]);
              overtimeRate = cleanAmount(otP4[3]);
            }
          }
        }
      }

      // Parse Adjustment / Allowance
      let adjustment = "0.00";
      const adjP1 = caseBody.match(/allowance\s*(?:or|\/)\s*adjustment\s*(?:of|was)\s*\$([\d,.]+)/i);
      if (adjP1) {
        adjustment = cleanAmount(adjP1[1]);
      } else {
        const adjP2 = caseBody.match(/adjustment entry of\s*\$([\d,.]+)\s*was approved/i);
        if (adjP2) {
          adjustment = cleanAmount(adjP2[1]);
        } else {
          const adjP3 = caseBody.match(/adjustment field contains\s*\$([\d,.]+)/i);
          if (adjP3) {
            adjustment = cleanAmount(adjP3[1]);
          }
        }
      }

      // Parse Gross Earnings
      let grossEarnings = "0.00";
      const grossP1 = caseBody.match(/gross earnings were listed as\s*\$([\d,.]+)/i);
      if (grossP1) {
        grossEarnings = cleanAmount(grossP1[1]);
      } else {
        const grossP2 = caseBody.match(/gross-pay figure[^\$]*?is\s*\$([\d,.]+)/i);
        if (grossP2) {
          grossEarnings = cleanAmount(grossP2[1]);
        } else {
          const grossP3 = caseBody.match(/reported gross total of\s*\$([\d,.]+)/i);
          if (grossP3) {
            grossEarnings = cleanAmount(grossP3[1]);
          } else {
            const grossP4 = caseBody.match(/gross amount is written as\s*\$([\d,.]+)/i);
            if (grossP4) {
              grossEarnings = cleanAmount(grossP4[1]);
            }
          }
        }
      }

      // Parse Withholding / Benefits Deduction
      let withholding = "0.00";
      const withP1 = caseBody.match(/withholding of\s*\$([\d,.]+)/i);
      if (withP1) {
        withholding = cleanAmount(withP1[1]);
      } else {
        const withP2 = caseBody.match(/With\s*\$([\d,.]+)\s*withheld for benefits and payroll deductions/i);
        if (withP2) {
          withholding = cleanAmount(withP2[1]);
        } else {
          const withP3 = caseBody.match(/total deduction was\s*\$([\d,.]+)/i);
          if (withP3) {
            withholding = cleanAmount(withP3[1]);
          }
        }
      }

      // Parse Net Pay / Take-home
      let netPay = "0.00";
      const netP1 = caseBody.match(/leaving net pay of\s*\$([\d,.]+)/i);
      if (netP1) {
        netPay = cleanAmount(netP1[1]);
      } else {
        const netP2 = caseBody.match(/resulting take-home amount is\s*\$([\d,.]+)/i);
        if (netP2) {
          netPay = cleanAmount(netP2[1]);
        } else {
          const netP3 = caseBody.match(/final net amount is\s*\$([\d,.]+)/i);
          if (netP3) {
            netPay = cleanAmount(netP3[1]);
          } else {
            const netP4 = caseBody.match(/amount payable after withholding was\s*\$([\d,.]+)/i);
            if (netP4) {
              netPay = cleanAmount(netP4[1]);
            }
          }
        }
      }

      employees.push({
        period: period || `Page ${page}`,
        caseNumber,
        employeeId,
        department,
        regularHours,
        baseRate,
        regularEarnings,
        overtimeHours,
        overtimeRate,
        overtimeEarnings,
        adjustment,
        grossEarnings,
        withholding,
        netPay,
      });
    }
  }

  // 1. Build Summary Table (1 Row per employee case, rich structured columns)
  const summaryColumns: ColumnConfig[] = [
    { id: "col_period", name: "Reporting Period", type: "text", originalIndex: 0, preserveAsText: true },
    { id: "col_id", name: "Employee ID", type: "text", originalIndex: 1, preserveAsText: true },
    { id: "col_dept", name: "Department", type: "text", originalIndex: 2, preserveAsText: true },
    { id: "col_reg_hrs", name: "Regular Hours", type: "number", originalIndex: 3, preserveAsText: false },
    { id: "col_base_rate", name: "Base Rate ($/hr)", type: "number", originalIndex: 4, preserveAsText: false },
    { id: "col_reg_pay", name: "Regular Earnings ($)", type: "number", originalIndex: 5, preserveAsText: false },
    { id: "col_ot_hrs", name: "Overtime Hours", type: "number", originalIndex: 6, preserveAsText: false },
    { id: "col_ot_rate", name: "Overtime Rate ($/hr)", type: "number", originalIndex: 7, preserveAsText: false },
    { id: "col_ot_pay", name: "Overtime Earnings ($)", type: "number", originalIndex: 8, preserveAsText: false },
    { id: "col_adj", name: "Adjustment ($)", type: "number", originalIndex: 9, preserveAsText: false },
    { id: "col_gross", name: "Gross Pay ($)", type: "number", originalIndex: 10, preserveAsText: false },
    { id: "col_withhold", name: "Withholding ($)", type: "number", originalIndex: 11, preserveAsText: false },
    { id: "col_net", name: "Net Pay ($)", type: "number", originalIndex: 12, preserveAsText: false },
  ];

  const summaryRows: ExtractedRow[] = employees.map((emp, idx) => ({
    id: `narrative_sum_${idx + 1}`,
    page: Math.floor(idx / 3) + 1,
    cells: [
      emp.period,
      emp.employeeId,
      emp.department,
      emp.regularHours,
      emp.baseRate,
      emp.regularEarnings,
      emp.overtimeHours,
      emp.overtimeRate,
      emp.overtimeEarnings,
      emp.adjustment,
      emp.grossEarnings,
      emp.withholding,
      emp.netPay,
    ],
  }));

  // 2. Build Itemized Pay Lines (Matching standard payroll report like 2nd PDF)
  // Columns: Employee ID, Code, Description, Hours, Amount
  const itemizedColumns: ColumnConfig[] = [
    { id: "col_item_period", name: "Pay Period", type: "text", originalIndex: 0, preserveAsText: true },
    { id: "col_item_emp_id", name: "Employee ID", type: "text", originalIndex: 1, preserveAsText: true },
    { id: "col_item_dept", name: "Department", type: "text", originalIndex: 2, preserveAsText: true },
    { id: "col_item_code", name: "Code", type: "text", originalIndex: 3, preserveAsText: true },
    { id: "col_item_desc", name: "Description", type: "text", originalIndex: 4, preserveAsText: true },
    { id: "col_item_hours", name: "Hours", type: "number", originalIndex: 5, preserveAsText: false },
    { id: "col_item_amount", name: "Amount", type: "number", originalIndex: 6, preserveAsText: false },
  ];

  const itemizedRows: ExtractedRow[] = [];
  let itemCounter = 1;

  for (const emp of employees) {
    // Regular Pay line
    if (parseFloat(emp.regularEarnings.replace(/,/g, "")) > 0 || parseFloat(emp.regularHours) > 0) {
      itemizedRows.push({
        id: `narrative_item_${itemCounter++}`,
        page: Math.floor((itemCounter - 1) / 15) + 1,
        cells: [emp.period, emp.employeeId, emp.department, "REG", "Regular Pay", emp.regularHours, emp.regularEarnings],
      });
    }

    // Overtime line
    if (parseFloat(emp.overtimeEarnings.replace(/,/g, "")) > 0 || parseFloat(emp.overtimeHours) > 0) {
      itemizedRows.push({
        id: `narrative_item_${itemCounter++}`,
        page: Math.floor((itemCounter - 1) / 15) + 1,
        cells: [emp.period, emp.employeeId, emp.department, "OT", "Overtime", emp.overtimeHours, emp.overtimeEarnings],
      });
    }

    // Adjustment / Bonus line
    if (parseFloat(emp.adjustment.replace(/,/g, "")) > 0) {
      itemizedRows.push({
        id: `narrative_item_${itemCounter++}`,
        page: Math.floor((itemCounter - 1) / 15) + 1,
        cells: [emp.period, emp.employeeId, emp.department, "ADJ", "Adjustment / Allowance", "0", emp.adjustment],
      });
    }

    // Withholding line (negative value)
    if (parseFloat(emp.withholding.replace(/,/g, "")) > 0) {
      const cleanWithhold = emp.withholding.startsWith("-") ? emp.withholding : `-${emp.withholding}`;
      itemizedRows.push({
        id: `narrative_item_${itemCounter++}`,
        page: Math.floor((itemCounter - 1) / 15) + 1,
        cells: [emp.period, emp.employeeId, emp.department, "DED", "Benefit / Payroll Withholding", "0", cleanWithhold],
      });
    }

    // Net pay line
    if (parseFloat(emp.netPay.replace(/,/g, "")) > 0) {
      itemizedRows.push({
        id: `narrative_item_${itemCounter++}`,
        page: Math.floor((itemCounter - 1) / 15) + 1,
        cells: [emp.period, emp.employeeId, emp.department, "NET", "Net Take-Home Pay", "0", emp.netPay],
      });
    }
  }

  return {
    employees,
    summaryColumns,
    summaryRows,
    itemizedColumns,
    itemizedRows,
  };
}
