import { useSearchParams } from "next/navigation";

export default function TransactionSuccessful() {
  const searchParams = useSearchParams();
  const txHash = searchParams.get("txHash");
  const chainId = searchParams.get("chainId");
  return (
    <div className="flex flex-col justify-center items-center text-center w-fit">
      <p className="fixed flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Transaction Successful
      </p>
      <p className="fixed flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        {chainId}:{txHash}
      </p>
    </div>
  );
}
