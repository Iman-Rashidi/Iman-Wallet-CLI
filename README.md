# Iman Wallet CLI

**Iman Wallet CLI** is maintained by **Iman Rashidi** ([Iman-Rashidi](https://github.com/Iman-Rashidi)). It began as a community-maintained fork of [limitpointinf0/iman-wallet-cli](https://github.com/limitpointinf0/pi-wallet-cli); this repository preserves upstream attribution while using its own project identity.

This command-line application uses a Stellar-compatible Horizon client and the configured Pi network endpoint. It is **experimental, unaudited wallet software**. It is not the official Pi Network wallet or the current Pi Apps Platform SDK.

## Important safety notice

- The inherited default configuration targets the Pi Testnet. Test-Pi has no monetary value and Testnet may be reset. Testnet and Mainnet are separate networks.
- Do not use a Mainnet wallet or real funds with this experimental fork. Blockchain transactions are irreversible.
- Never share a passphrase, mnemonic, private key, or generated secret seed with anyone, including in an issue, screenshot, terminal transcript, or chat.
- Secret input is hidden in the updated interactive commands. This does not make an infected machine or terminal session safe.
- Review every amount, destination, asset issuer, fee, network endpoint, and network passphrase independently before using any transaction feature.
- Creating a custom asset offers an optional issuer-lock operation. Locking the issuer can permanently remove its ability to sign further transactions; it is opt-in and should only be selected after reviewing the code and understanding the consequence.
- This software has not undergone a professional security audit. Use only disposable Testnet accounts for development and testing.

Network background: [Mainnet vs Testnet](https://developers.minepi.com/docs/concepts/MainVsTest) · [Pi Platform API](https://developers.minepi.com/docs/api-reference/Platform).

## Requirements

- Node.js 20 or newer
- npm

## Install

    git clone https://github.com/Iman-Rashidi/Iman-Wallet-CLI.git
    cd Iman-Wallet-CLI
    npm install
    npm test

To expose the CLI command locally:

    npm link

The package entry point is index.js and the installed executable is pi-wallet.

## Commands

The commands currently registered by the CLI are:

| Command | Purpose |
|---|---|
| config | Configure the Horizon endpoint, network passphrase, currency label, and base reserve |
| set / unset | Set or clear the default public account address |
| check | Read account balances |
| pay | Submit a payment |
| assets | Browse issued assets |
| orderbook | Inspect an asset order book |
| trust | Create a trustline |
| purchase / sell | Submit asset offers |
| createasset | Create a custom asset and configure its issuer |
| createacct | Create a new account |
| stream | Stream payment activity |
| upfile | Upload a file to an IPFS endpoint |
| info | Display CLI information |

Run pi-wallet with a command and follow the interactive prompts. The pay command is named pay (not transfer).

## Validation and tests

The maintained branch includes reusable validation for positive Stellar decimal amounts (up to 7 fractional digits and the signed int64 stroop ceiling) and UTF-8 text memos (maximum 28 bytes). Unit tests use Node.js built-in test runner and do not contact a network, load a wallet, or sign a transaction.

    npm test
    npm run check

## Attribution

- Original project and inherited implementation: [limitpointinf0/pi-wallet-cli](https://github.com/limitpointinf0/pi-wallet-cli)
- This maintained fork: [Iman-Rashidi/pi-wallet-cli](https://github.com/Iman-Rashidi/pi-wallet-cli)
- Fork maintenance and new validation/test work: Iman Rashidi ([Iman-Rashidi](https://github.com/Iman-Rashidi))
