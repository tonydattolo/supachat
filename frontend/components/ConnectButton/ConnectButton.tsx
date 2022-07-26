import truncateAddress from "@/utils/truncateAddress";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import { FcCancel } from "react-icons/fc";

const ConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

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
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
};

export default ConnectButton;
