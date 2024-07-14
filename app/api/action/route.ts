import { appURL } from "@/lib/utils";
import { ActionLinkType, EVMAction } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const isRecurring = searchParams.get("isRecurring");
  const campaignId = searchParams.get("campaignId");
  const depositAmount = searchParams.get("depositAmount");
  const donationTimes = searchParams.get("donationTimes");
  const donationIntervals = searchParams.get("donationIntervals");

  const targetUrl = new URL(`${appURL()}/api/tx`);
  targetUrl.searchParams.set("isRecurring", isRecurring!);
  targetUrl.searchParams.set("campaignId", campaignId!);
  targetUrl.searchParams.set("depositAmount", depositAmount!);
  targetUrl.searchParams.set("donationTimes", donationTimes!);
  targetUrl.searchParams.set("donationIntervals", donationIntervals!);

  const evmActionMetadata: EVMAction = {
    title: "Crowdfunding EVM Action",
    description:
      "This is a sample EVM Action for donating in a crowdfunding campaign.",
    image: `${appURL()}/landing.png`,
    links: [
      {
        targetUrl: targetUrl.toString(),
        postUrl: `${appURL()}/tx-success`, // this will be a GET HTTP call
        label: "Tx",
        type: ActionLinkType.TX,
      },
    ],
    label: "Join Campaign",
  };
  return NextResponse.json(evmActionMetadata);
};
