import { VerifierAction } from "lit_actions/src/types";

export const createSignableFormat = (presentation: object): VerifierAction[] => {

  return [
    {
      // verifyzk.action.js
      ipfsId: "QmcMtweCSaLS8TiAswcAVFcLUuSCcFgq5LktX8Ebz6Pvry",
      params: {
        presentation: JSON.stringify(presentation, Object.keys(presentation).sort()),
      },
    },
    {
      // youtubeviewcount.action.js
      ipfsId: "QmWU8ZUGaTp4LdstmXobZTL8TfuzpFgAojSADwYoxWKF1t",
      params: {
        videoId: "E35poTWzWZA",
        threshold: 10000,
      },
    },
  ]
};
/*

{
	"@context": [
		"https://www.w3.org/2018/credentials/v1",
		"https://w3id.org/citizenship/v1",
		"https://w3id.org/security/bbs/v1"
	],
	"id": "https://issuer.oidp.uscis.gov/credentials/83627465",
	"type": [
		"PermanentResidentCard",
		"VerifiableCredential"
	],
	"description": "Government of Example Permanent Resident Card.",
	"identifier": "83627465",
	"name": "Permanent Resident Card",
	"credentialSubject": {
		"id": "did:example:b34ca6cd37bbf23",
		"type": [
			"Person",
			"PermanentResident"
		],
		"familyName": "SMITH",
		"gender": "Male",
		"givenName": "JOHN"
	},
	"expirationDate": "2029-12-03T12:19:52Z",
	"issuanceDate": "2019-12-03T12:19:52Z",
	"issuer": "did:example:489398593",
	"proof": {
		"type": "BbsBlsSignatureProof2020",
		"created": "2023-04-14T08:41:49Z",
		"nonce": "pKJR/hQnu6bwl8+BgzJCt9TBOYycx/tmBMwo+bZU2k8F8rUdGwrKsPltcVyBSBQBXvs=",
		"proofPurpose": "assertionMethod",
		"proofValue": "ABkB/wbviDiysABN7kOP/gAtwx/Pus50renqPobOuwscNysM1XiyvNrO3j8GRbX7v7MnWcoAl6++0n6ARquOGPbAIJYT6s7GflZwE7mTuQ3/qeBagxHjtVSHbH0ca36UPd2vA6KQoGBiUlk9p25EafspfVsk182ulHhD39DGeBGtSgrzNNJjNHTXQd/UsEuHkrmj2HaEAAAAdLR/r7NKVoiJKGb3ebAvJHB3Vr28N8u7+DzW1GW8d6eaafq2Pr17adSRrRPs/2yAQAAAAAJQw3zDId4FM9d7j4Dyv2JEFNLvyMmnb4KH3SApFHhpNRGvF1LohRgZQXGK1ZUfPEK5Bm5FZU0BGMzyqsSJXEC6hgBBMQfCfcX+RtNM9FHbDrlzRtKNUGQupZp0mxIoVORrQGv6Tm1T6Z3M/M2eAmJvAAAACR3MpVcqqxK0K21NKZpXQliPvXmn39FG/v+WgS8m0ERbDGOI7G1pg0qq7R+/vrRJykNg0N0yrGsz9EcSIowuwFBEniujGoprlxNNFl9O9eNZebzu41dc063FU0k4wCJaUl2n8STFGuyFU6boA3tmLxyeMKUpEpIQScWaQOQ/JjktbxAJd/38u3em1BOug5ZiGy4R/PdT/epPzKQXy6chjfpbHHKztjAwVvlO2qSGS6M3Rfmyda8Sz1mLxMIKmep90BqAF175LQ3uN8jkPJFluLiJcjN6KK3pmIfo8l1qYAubM4IxzjuRRaJrdpL9RrzITjN1OrUAgKGXHgQJFL5JJ887t9OaKw9co6IruBQwUVzeSjf2ebhXZSAZt3F5F3fDtw==",
		"verificationMethod": "did:example:489398593#test"
	}
}

*/