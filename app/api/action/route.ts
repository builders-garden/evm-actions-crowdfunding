import { appURL } from "@/lib/utils";
import { ActionLinkType, EVMAction } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const evmActionMetadata: EVMAction = {
    title: "Crowdfunding EVM Action",
    description:
      "This is a sample EVM Action for donating in a crowdfunding campaign.",
    image: `${appURL()}/landing.png`,
    links: [
      {
        targetUrl: `${appURL()}/api/tx`,
        postUrl: `${appURL()}/tx-success`, // this will be a GET HTTP call
        label: "Tx",
        type: ActionLinkType.TX,
      },
    ],
    label: "Join Campaign",
  };
  return NextResponse.json(evmActionMetadata);
};
