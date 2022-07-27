import truncateAddress from "@/utils/truncateAddress";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useSignMessage,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useEffect, useRef, useState } from "react";
import Jazzicon from "@metamask/jazzicon";
import { FcCancel } from "react-icons/fc";
import Cookies from "js-cookie";
import { FaLock, FaLockOpen } from "react-icons/fa";

const ConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();
  const {
    signMessage,
    error: signMessageError,
    data: signMessageData,
  } = useSignMessage();

  const acctIconRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (address && acctIconRef.current) {
      acctIconRef.current.innerHTML = "";
      acctIconRef.current.append(
        Jazzicon(16, parseInt(address.slice(2, 10), 16)),
      );
    }
  }, [address]);

  // check if the JWT cookie is set
  const [nonce, setNonce] = useState("");

  const handleGrabNonce = async () => {
    // grab the nonce from the server
    const res = await fetch("/api/auth/grabNonce", {
      method: "POST",
      body: JSON.stringify({
        address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { nonce } = await res.json();
    setNonce(nonce);
    console.log("nonce", nonce);

    // have user sign the nonce
    const signature = signMessage({ message: nonce });

    // console.log("signedMessageData: ", signature);

    // send the signature to the server for verification
  };

  const handleVerifyNonce = async () => {
    const res2 = await fetch("/api/auth/verifyNonce", {
      method: "POST",
      body: JSON.stringify({
        address,
        nonce,
        signature: signMessageData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { user, token } = await res2.json();
    console.log("user: ", user);
    console.log("token: ", token);
  };

  useEffect(() => {
    if (signMessageData) {
      handleVerifyNonce();
    }
  }, [signMessageData]);

  useEffect(() => {
    if (address && isConnected) {
      if (Cookies.get("mytoken")) {
        console.log("JWT cookie is set");
      } else {
        console.log("JWT cookie is not set");
        handleGrabNonce();
      }
    }
  }, [address, isConnected]);

  return (
    <>
      {address && isConnected ? (
        <>
          <div className="flex items-center mx-3 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-gray-500 px-2 h-9 transition duration-300 ease-in-out">
            <div ref={acctIconRef} className="rounded-full ml-2"></div>
            <div className="ml-2">
              {ensName ? <>{ensName}</> : <>{truncateAddress(address)}</>}
            </div>
            <button className="ml-2 mr-2" onClick={() => disconnect()}>
              <FcCancel size="22" />
            </button>
          </div>
        </>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-3 px-2 h-9 rounded-md shadow-md transition duration-300 ease-in-out"
          onClick={async () => connect()}
          // disabled={isConnected}
        >
          Connect Wallet
        </button>
      )}

      <div className="flex items-center mr-3 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-gray-500 px-2 h-9 transition duration-300 ease-in-out">
        {address && isConnected && signMessageError ? (
          <FaLock
            size="24"
            className="topnav-icon text-red-500 hover:text-blue-500"
            onClick={() => handleGrabNonce()}
          />
        ) : (
          <FaLockOpen
            size="24"
            className="topnav-icon text-green-500 hover:text-red-600"
          />
        )}
      </div>
    </>
  );
};

export default ConnectButton;
