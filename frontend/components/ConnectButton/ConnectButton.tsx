import truncateAddress from "@/utils/truncateAddress";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import { FcCancel } from "react-icons/fc";

const ConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const connect = useConnect({
    connector: new InjectedConnector(),
  });
  const disconnect = useDisconnect();

  const acctIconRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (address && acctIconRef.current) {
      acctIconRef.current.innerHTML = "";
      acctIconRef.current.append(
        Jazzicon(16, parseInt(address.slice(2, 10), 16)),
      );
    }
  }, [address]);

  return (
    <>
      {address ? (
        <>
          <div className="flex items-center">
            <div ref={acctIconRef} className="rounded-full"></div>
            <div className="ml-2">{truncateAddress(address)}</div>
            <button className="ml-2" onClick={() => disconnect}>
              <FcCancel />
            </button>
          </div>
        </>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => connect}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default ConnectButton;
