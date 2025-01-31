import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";
import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import {
	arbitrum,
	base,
	mainnet,
	optimism,
	polygon,
	sepolia,
} from "wagmi/chains";

const ganache = {
	id: 1337,
	name: "Ganache",
	iconUrl: "icons/ganache.png",
	iconBackground: "#fff",
	nativeCurrency: { name: "Ganache", symbol: "ETH", decimals: 18 },
	rpcUrls: {
		default: { http: ["http://localhost:8545"] },
	},
	blockExplorers: {
		default: { name: "GanacheScan", url: "http://localhost:8545" },
	},
} as const satisfies Chain;

// export const config = getDefaultConfig({
// 	appName: "RainbowKit demo",
// 	projectId: "YOUR_PROJECT_ID",
// 	chains: [
// 		mainnet,
// 		polygon,
// 		optimism,
// 		arbitrum,
// 		base,
// 		ganache,
// 		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
// 	],
// 	ssr: true,
// 	storage: createStorage({
// 		storage: cookieStorage,
// 	}),
// });

export function getConfig() {
	return createConfig({
		chains: [
			mainnet,
			polygon,
			optimism,
			arbitrum,
			base,
			ganache,
			...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
		],
		ssr: true,
		storage: createStorage({
			storage: cookieStorage,
		}),
		transports: {
			[mainnet.id]: http(),
			[polygon.id]: http(),
			[optimism.id]: http(),
			[arbitrum.id]: http(),
			[base.id]: http(),
			[ganache.id]: http(),
			[sepolia.id]: http(),
		},
	});
}
