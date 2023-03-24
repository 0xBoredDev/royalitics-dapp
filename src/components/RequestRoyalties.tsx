import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js";
import { FC, useCallback, useState } from "react";
import bs58 from 'bs58';
import { notify } from "../utils/notifications";
import {
  getCreator,
  getTransactionsByAccount,
  getTransactionDetails,
} from "../queries/queries";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";

//TODO show amount of royalties not paid
//TODO show the percentage of pay vs non pay

export const RequestRoyalties: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [totalRoyaltiesPaid, setTotalRoyaltiesPaid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [lastDate, setLastDate] = useState(moment().format(""));

  const onClick = useCallback(async () => {
    setLoading(true);

    // const keypair = Keypair.fromSecretKey(
    //   bs58.decode(
    //     ""
    //   )
    // );
    // console.log(keypair);
    // setLoading(false);

    let walletAddress: string = "";
    let totalPaid = 0;
    let lastTransactionDate = "";
    if (!publicKey) {
      // console.log("error", "Wallet not connected!");
      notify({
        type: "error",
        message: "error",
        description: "Wallet not connected!",
      });
      return;
    } else {
      walletAddress = publicKey.toBase58();
      // console.log(`walletAddress ${walletAddress}`);
    }

    try {
      const resp = await getTransactionsByAccount(walletAddress);
      // console.log(resp.transactions);

      for (let transaction of resp.transactions) {
        if (transaction.buyer_address === walletAddress) {
          let updateAuthority = await getUpdateAuthority(
            transaction.nft.mint_address
          );
          if (updateAuthority !== "") {
            // console.log(`updateAuthority ${updateAuthority}`);
            let details = await getDetails(transaction.transaction_signature);
            // console.log(`details ${details}`);
            let royaltyFeePaid = getRoyaltyFee(details.events, updateAuthority);
            // console.log(`royaltyFeePaid ${royaltyFeePaid}`);
            totalPaid += royaltyFeePaid;
            lastTransactionDate = moment(transaction.transaction_date).format(
              "MMM, D, YYYY"
            );
          }
        }
      }

      setTotalRoyaltiesPaid(totalPaid);
      setLastDate(lastTransactionDate);
      setLoading(false);
      setSearched(true);
      notify({
        type: "success",
        message: "Royalties retrieved!",
      });
    } catch (error: any) {
      setLoading(false);
      notify({
        type: "error",
        message: `Royalties retrieval failed!`,
        description: error?.message,
      });
      console.log("error", `Royalties retrieval failed! ${error?.message}`);
    }
  }, [publicKey, connection, totalRoyaltiesPaid]);

  const getDetails = async (tx: string) => {
    // console.log("getDetails()");
    const resp = await getTransactionDetails(tx);
    // console.log(resp);
    return resp;
  };

  const getRoyaltyFee = (details, updateAuthority) => {
    // console.log("getRoyaltyFee()");

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
    // console.log("getUpdateAuthority()");
    let updateAuthority = "";
    const resp = await getCreator(mint);
    // console.log(resp);
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
          color="#9945FF"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={loading}
        />
      </div>
      {searched && (
        <div className="flex flex-col px-8 pt-4 justify-center">
          <p className="text-xl sm:text-3xl">
            Total Royalties Paid = {totalRoyaltiesPaid} sol
          </p>
          <p className="text-md sm:text-lg p-2">
            From {lastDate} - {moment().format("MMM D, YYYY")}
          </p>
        </div>
      )}
    </div>
  );
};
