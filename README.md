# dKeeper

Note: This project is created at ETHTokyo 2023 Hackathon and strongly WIP for now.

<img width="280" alt="logo" src="https://user-images.githubusercontent.com/5776910/232265777-af16377d-4afc-4376-b975-58a3fa353ce8.png">

## Ideal form of architecture (WIP)

![ideal-architecture](https://user-images.githubusercontent.com/5776910/232265719-67a3717b-c5d2-43ae-ab6d-6abc21e65a09.jpg)

## Description

A framework of access control in a dApp that utilizes signatures created by Lit Protocol. This allows for 2 types of verifications to manage access control for dApp users by privacy-concerened ways.

### Access control by W3C verifiable credentials

ZKP-compliant BBS BLS signature (provided by MATTR) for the VC by executing the Node.js codes via Lit Actions. Currently, a Lit Action requests to the server outside (AWS Lambda) and create signature by Lit nodes themselves.

### Real-time access control

Real-time access control to dApps, meaning that, for example, if a user has a designated role on a Discord channel or the user is YouTube video contributor with 1 million views and writes the user's signature on its description, lit protocol will check the role in real-time, and grant them permission to execute the dApp.
