import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";
import {
  getCreator,
  getTransactionsByAccount,
  getTransactionDetails,
} from "../queries/queries";
import { ThreeDots } from "react-loader-spinner";

//TODO show date of oldest retrieved sale
//TODO show amount of royalties not paid
//TODO show the percentage of pay vs non pay

export const RequestRoyalties: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [totalRoyaltiesPaid, setTotalRoyaltiesPaid] = useState(0);
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    setLoading(true);
    let walletAddress: string = "";
    let totalPaid = 0;
    if (!publicKey) {
      console.log("error", "Wallet not connected!");
      notify({
        type: "error",
        message: "error",
        description: "Wallet not connected!",
      });
      return;
    } else {
      walletAddress = publicKey.toBase58();
      console.log(`walletAddress ${walletAddress}`);
    }

    try {
      const resp = await getTransactionsByAccount(walletAddress);
      console.log(resp.transactions);

      for (let transaction of resp.transactions) {
        if (transaction.buyer_address === walletAddress) {
          let updateAuthority = await getUpdateAuthority(
            transaction.nft.mint_address
          );
          if (updateAuthority !== "") {
            console.log(`updateAuthority ${updateAuthority}`);
            let details = await getDetails(transaction.transaction_signature);
            console.log(`details ${details}`);
            let royaltyFeePaid = getRoyaltyFee(details.events, updateAuthority);
            console.log(`royaltyFeePaid ${royaltyFeePaid}`);
            totalPaid += royaltyFeePaid;
          }
        }
      }

      setTotalRoyaltiesPaid(totalPaid);
      setLoading(false);
      notify({
        type: "success",
        message: "Royalties retrieved!",
      });
    } catch (error: any) {
      notify({
        type: "error",
        message: `Royalties retrieval failed!`,
        description: error?.message,
      });
      console.log("error", `Royalties retrieval failed! ${error?.message}`);
    }
  }, [publicKey, connection, totalRoyaltiesPaid]);

  const getDetails = async (tx: string) => {
    console.log("getDetails()");
    const resp = await getTransactionDetails(tx);
    console.log(resp);
    return resp;
  };

  const getRoyaltyFee = (details, updateAuthority) => {
    console.log("getRoyaltyFee()");

    let fee = 0;
    details.forEach((d) => {
      if (d.destination == updateAuthority) {
        fee = d.amount / LAMPORTS_PER_SOL;
        return fee;
      }
    });
    return fee;
  };

  const getUpdateAuthority = async (mint: string) => {
    console.log("getUpdateAuthority()");
    let updateAuthority = "";
    const resp = await getCreator(mint);
    console.log(resp);
    updateAuthority =
      Object.keys(resp).length === 0 ? "" : resp.updateAuthority;
    return updateAuthority;
  };

  return (
    <div>
      <button
        className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={onClick}
      >
        <span>Try Now</span>
      </button>
      <div className="flex flex-row px-4 justify-center">
        <ThreeDots
          height="120"
          width="120"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={loading}
        />
      </div>
      <div className="flex flex-row px-4 justify-center">
        <p className="text-lg">
          Total Royalties Paid = {totalRoyaltiesPaid} sol
        </p>
      </div>
    </div>
  );
};
