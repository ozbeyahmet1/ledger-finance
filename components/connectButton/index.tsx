import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './connectButton.module.css'

import Image from 'next/image'
function ConnectButtons() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                borderRadius:15,
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button onClick={openConnectModal} type="button" className={styles.connectButton}>
                    <Image 
                      src="https://res.cloudinary.com/droheqpxn/image/upload/v1660400109/ledger/1200px-MetaMask_Fox.svg_bojbaq.png"
                      width={35}
                      height={35}
              
                      />
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap:  12 }} >
                 
                  <button onClick={openAccountModal} type="button"  className={styles.accountWrapper}>
                  
                      <>
                     <h3 className={styles.accountText}>{account.displayName}</h3>
                      <h3 className={styles.accountBalance}> {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}</h3>
                      </>
                      :
                      <>
                       {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 40, height: 40,background:"white",padding:"5px",borderRadius:"5px" }}
                          />
                        )}
                      </>
                    
                   {/* {console.log(`${account.displayBalance}`)} */}
                  </button>
                  
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectButtons