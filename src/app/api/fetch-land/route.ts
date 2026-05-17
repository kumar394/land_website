import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export interface LandRecord {
  ownerName: string;
  khataNo: string;
  plotNo: string;
  landArea: string;
  landType: string;
  mutationStatus: string;
  mutationNo?: string;
  district: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const district = searchParams.get("district") || "";
  const khataNo = searchParams.get("khataNo") || "";
  const plotNo = searchParams.get("plotNo") || "";

  if (!district) {
    return NextResponse.json({ error: "District is required" }, { status: 400 });
  }

  try {
    const baseUrl = "https://emutation.bihar.gov.in/biharBhumireport/MutationStatusNew";

    const response = await axios.post(
      baseUrl,
      new URLSearchParams({
        district,
        khataNo,
        plotNo,
        action: "search",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (compatible; BhumiAlert/1.0)",
          Referer: baseUrl,
        },
        timeout: 15000,
      }
    );

    const $ = cheerio.load(response.data as string);
    const records: LandRecord[] = [];

    // Try to parse table rows from the government portal response
    $("table tr").each((i, row) => {
      if (i === 0) return; // skip header
      const cells = $(row).find("td");
      if (cells.length >= 5) {
        records.push({
          district,
          ownerName: $(cells[1]).text().trim() || "-",
          khataNo: $(cells[2]).text().trim() || khataNo,
          plotNo: $(cells[3]).text().trim() || plotNo,
          landArea: $(cells[4]).text().trim() || "-",
          landType: $(cells[5])?.text().trim() || "-",
          mutationStatus: $(cells[6])?.text().trim() || "Pending",
          mutationNo: $(cells[0])?.text().trim() || "-",
        });
      }
    });

    if (records.length === 0) {
      return NextResponse.json({ records: [], message: "no_data" });
    }

    return NextResponse.json({ records });
  } catch {
    // Return demo data so the UI is always useful during development
    const demo: LandRecord[] = [
      {
        district,
        ownerName: "Ram Prasad Singh",
        khataNo: khataNo || "142",
        plotNo: plotNo || "35",
        landArea: "0.25 Acre",
        landType: "Agricultural",
        mutationStatus: "Approved",
        mutationNo: "MUT/2024/00432",
      },
      {
        district,
        ownerName: "Sunita Devi",
        khataNo: khataNo || "143",
        plotNo: plotNo || "36",
        landArea: "0.10 Acre",
        landType: "Residential",
        mutationStatus: "Pending",
        mutationNo: "MUT/2024/00433",
      },
    ];
    return NextResponse.json({ records: demo, demo: true });
  }
}
