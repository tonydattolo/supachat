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
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FiUser, FiUserCheck, FiUserX } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import supabase from "@/utils/supabase";

const ConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, isLoading: connectWalletIsLoading } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();
  const {
    signMessage,
    error: signMessageError,
    data: signMessageData,
  } = useSignMessage();

  const [connectedToSupabase, setConnectedToSupabase] = useState("notchecked");

  const acctIconRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (address && acctIconRef.current) {
      acctIconRef.current.innerHTML = "";
      acctIconRef.current.append(
        Jazzicon(16, parseInt(address.slice(2, 10), 16)),
      );
    }
  }, [address]);

  const handleDisconnect = async () => {
    // deleteCookie("supabaseToken", { path: "/" });
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("error signing out", JSON.stringify(error, null, 2));
    }
    handleDeleteCookie();
    disconnect();
  };

  const handleTestUserConnected = async () => {
    const { data } = await supabase.from("users").select("*");
    console.log(`data from test user connection: ${JSON.stringify(data)}`);
    if (data.length > 0) {
      setConnectedToSupabase("connected");
    } else {
      setConnectedToSupabase("notconnected");
    }
  };

  const handleDeleteCookie = async () => {
    deleteCookie("supabaseToken", { path: "/" });
  };

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

    const { user } = await res2.json();
    console.log("user: ", user);
    // console.log("token: ", token);

    console.log(
      "client side cookie read: ",
      getCookie("supabaseToken", { path: "/" }),
    );

    const access_token = getCookie("supabaseToken", { path: "/" }).toString();

    // set authentication token in supabase for this user
    supabase.auth.setAuth(access_token);
  };

  useEffect(() => {
    if (signMessageData) {
      handleVerifyNonce();
    }
  }, [signMessageData]);

  useEffect(() => {
    if (address && isConnected) {
      if (
        Cookies.get("supabaseToken") === "undefined" ||
        Cookies.get("supabaseToken") === undefined
      ) {
        console.log("JWT cookie is not set");
        handleGrabNonce();
      } else {
        console.log("JWT cookie is set, ", getCookie("supabaseToken"));
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-3 px-2 h-9 rounded-md shadow-md transition duration-300 ease-in-out cursor-pointer"
          onClick={async () => connect()}
          disabled={isConnected || connectWalletIsLoading}
        >
          Connect Wallet
        </button>
      )}

      <div className="flex items-center mr-3 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-gray-500 hover:text-grey-700 px-2 h-9 transition duration-300 ease-in-out">
        <span
          className="flex text-red-500 hover:text-red-700 cursor-pointer"
          onClick={() => deleteCookie("supabaseToken", { path: "/" })}
        >
          <RiDeleteBin5Fill size="24" />
          del cookie
        </span>
      </div>
      <div className="flex items-center mr-3 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-gray-500 hover:text-grey-700 px-2 h-9 transition duration-300 ease-in-out">
        {connectedToSupabase === "notchecked" ? (
          <span
            className="flex text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => handleTestUserConnected()}
          >
            <FiUser size="24" />
            check supa
          </span>
        ) : connectedToSupabase === "connected" ? (
          <span
            className="flex text-green-500 hover:text-green-700 cursor-pointer"
            onClick={() => handleTestUserConnected()}
          >
            <FiUserCheck size="24" />
            check supa
          </span>
        ) : (
          <span
            className="flex text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => handleTestUserConnected()}
          >
            <FiUserX size="24" />
            check supa
          </span>
        )}
      </div>
    </>
  );
};

export default ConnectButton;
