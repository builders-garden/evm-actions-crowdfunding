import { erc20Abi } from "@/lib/contracts/erc20abi";
import { base, baseSepolia } from "viem/chains";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, encodeFunctionData, http, parseUnits } from "viem";
import { CROWDFUNDING_CONTRACT_ADDRESS, STANDARD_TOKEN_ADDRESS } from "@/lib/constants";
import { crowdfundingAbi } from "@/lib/contracts/crowdfundingAbi";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;
  const { searchParams } = new URL(req.url);

  // get the tokenAddress, toAddress, amount and chainId from the urls 
  const isRecurring = searchParams.get('isRecurring');
  const campaignId = searchParams.get('campaignId');
  const depositAmount = searchParams.get('depositAmount');
  const donationTimes = searchParams.get('donationTimes');
  const donationIntervals = searchParams.get('donationIntervals');

  // Get token decimals
  const publicClient = createPublicClient({ 
    chain: base,
    transport: http()
  })

  // Get the token address
  const tokenAddress = STANDARD_TOKEN_ADDRESS;
  const crowdfundingContractAddress = CROWDFUNDING_CONTRACT_ADDRESS;

  // check token decimals
  let decimals = 18;
  let isNativeToken = true;
  if (tokenAddress !== "0x0000000000000000000000000000000000000000") {
    decimals = await publicClient.readContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "decimals",
    });
    isNativeToken = false;
  }
  // Prepare amount to transfer
  const bigIntAmount = BigInt(parseUnits(depositAmount as string, decimals));
  const totalRecurringAmount = bigIntAmount * BigInt(donationTimes as string);
  const amountToApprove = isRecurring ? totalRecurringAmount : bigIntAmount;

  // Calculate calldata for token approval
  
  const approveCalldata = encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [crowdfundingContractAddress, amountToApprove],
  });
  

  // Calculate calldata depending if it's a single or recurring donation
  let donationCalldata;
  if(isRecurring) {
    donationCalldata = encodeFunctionData({
      abi: crowdfundingAbi,
      functionName: "depositFundsRecurring",
      args: [address, campaignId, bigIntAmount, donationTimes, donationIntervals],
    });
  } else {
    donationCalldata = encodeFunctionData({
      abi: crowdfundingAbi,
      functionName: "depositFunds",
      args: [campaignId, bigIntAmount],
    });
  }

  // Prepare Transactions
  const transactions = [
    {
      chainId: `${base.id}`, // Base Mainnet 8453 
      to: tokenAddress,
      data: approveCalldata,
      value: BigInt(0).toString(),
    },
    {
      chainId: `${base.id}`, // Base Mainnet 8453
      to: crowdfundingContractAddress,
      data: donationCalldata,
      value: BigInt(0).toString(),
    },
  ];

  return NextResponse.json({
    transactions: transactions,
  });
};
