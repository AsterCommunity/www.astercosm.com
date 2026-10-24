import type { Lang } from "./ui";

/**
 * Connector 展示数据：名称与 bestFor 快照自 AsterDrive 仓库
 * docs/generated/storage-connectors.json（对应 v0.5.0-rc.1）；
 * badgeRgb 取自各 connector 的 Rust descriptor（src/storage/connectors/*.rs
 * 的 badge_rgb），与产品管理端徽章同源。同步约定见仓库根 README「素材同步约定」。
 */
export type Connector = {
	id: string;
	name: Record<Lang, string>;
	bestFor: Record<Lang, string>;
	/** 产品管理端徽章色（RGB 三通道） */
	badgeRgb: [number, number, number];
	/** 徽章内缩写（locale 无关） */
	glyph: string;
	/** 厂商 logo（public/connectors/）；无厂商的（本机/SFTP）为 undefined，回退徽章 */
	logo?: string;
};

export const connectors: Connector[] = [
	{
		id: "asterdrive.storage.local",
		name: { en: "Local", zh: "本机" },
		bestFor: {
			en: "Single machine, NAS, small teams, minimal dependencies",
			zh: "单机、NAS、小团队、最少依赖",
		},
		badgeRgb: [16, 185, 129],
		glyph: "L",
		logo: "/connectors/local-disk.svg",
	},
	{
		id: "asterdrive.storage.s3",
		name: { en: "S3", zh: "S3" },
		bestFor: {
			en: "S3-compatible object storage, external buckets, and large files",
			zh: "S3 兼容对象存储、外部桶和大文件",
		},
		badgeRgb: [59, 130, 246],
		glyph: "S3",
		logo: "/connectors/amazon-s3.svg",
	},
	{
		id: "asterdrive.storage.alibaba_oss",
		name: { en: "Alibaba Cloud OSS", zh: "阿里云 OSS" },
		bestFor: {
			en: "Alibaba Cloud OSS with native V4 signing, split endpoints, or CNAME",
			zh: "阿里云 OSS：原生 V4 签名、分离 endpoint 或 CNAME",
		},
		badgeRgb: [255, 106, 0],
		glyph: "OSS",
		logo: "/connectors/aliyun-oss.svg",
	},
	{
		id: "asterdrive.storage.tencent_cos",
		name: { en: "Tencent COS", zh: "腾讯云 COS" },
		bestFor: {
			en: "Tencent COS and per-policy COS CI processing",
			zh: "腾讯云 COS 与按策略的 COS CI 处理",
		},
		badgeRgb: [6, 182, 212],
		glyph: "COS",
		logo: "/connectors/tencent-cloud-cos.webp",
	},
	{
		id: "asterdrive.storage.qiniu",
		name: { en: "Qiniu Kodo", zh: "七牛云 Kodo" },
		bestFor: {
			en: "Qiniu Cloud Kodo S3 spaces with official endpoint diagnostics",
			zh: "七牛云 Kodo S3 空间与官方 endpoint 诊断",
		},
		badgeRgb: [0, 148, 255],
		glyph: "K",
		logo: "/connectors/qiniuyun-kodo.svg",
	},
	{
		id: "asterdrive.storage.azure_blob",
		name: { en: "Azure Blob", zh: "Azure Blob" },
		bestFor: {
			en: "Azure Storage accounts and Blob containers",
			zh: "Azure Storage 账号与 Blob 容器",
		},
		badgeRgb: [14, 165, 233],
		glyph: "Az",
		logo: "/connectors/azure-blob.svg",
	},
	{
		id: "asterdrive.storage.onedrive",
		name: { en: "OneDrive", zh: "OneDrive" },
		bestFor: {
			en: "Microsoft 365, OneDrive, SharePoint, and group drives",
			zh: "Microsoft 365、OneDrive、SharePoint 和群组驱动器",
		},
		badgeRgb: [59, 130, 246],
		glyph: "OD",
		logo: "/connectors/onedrive.svg",
	},
	{
		id: "asterdrive.storage.sftp",
		name: { en: "SFTP", zh: "SFTP" },
		bestFor: {
			en: "SSH/SFTP file servers and server-side streaming",
			zh: "SSH/SFTP 文件服务器与服务端流式传输",
		},
		badgeRgb: [139, 92, 246],
		glyph: "SF",
		logo: "/connectors/sftp-server.svg",
	},
	{
		id: "asterdrive.storage.remote",
		name: { en: "Remote node", zh: "远程节点" },
		bestFor: {
			en: "Objects stored by another AsterDrive follower node",
			zh: "由另一个 AsterDrive 从节点存储的对象",
		},
		badgeRgb: [245, 158, 11],
		glyph: "R",
		logo: "/connectors/asterfollower.svg",
	},
];
