import { useEffect, useRef, useState } from "react";

/**
 * 终端打字机：进入视口后逐字打出命令；prefers-reduced-motion 直接显示全文。
 * 终端配色与页面主题无关——终端就该是终端的样子。
 */
export function TerminalDemo({ lines }: { lines: string[] }) {
	const fullText = lines.join("\n");
	const [typed, setTyped] = useState(0);
	const [started, setStarted] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = rootRef.current;
		if (!el) return;
		if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setTyped(fullText.length);
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					setStarted(true);
					io.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [fullText.length]);

	useEffect(() => {
		if (!started || typed >= fullText.length) return;
		const timer = setInterval(() => {
			setTyped((n) => Math.min(n + 3, fullText.length));
		}, 24);
		return () => clearInterval(timer);
	}, [started, typed, fullText.length]);

	const done = typed >= fullText.length;

	return (
		<div
			ref={rootRef}
			className="overflow-hidden rounded-xl shadow-2xl shadow-black/20"
			style={{ backgroundColor: "oklch(0.14 0.005 65)" }}
		>
			<div
				className="flex items-center gap-1.5 px-4 py-3"
				style={{ backgroundColor: "oklch(0.18 0.006 65)" }}
			>
				<span
					className="size-2.5 rounded-full"
					style={{ backgroundColor: "oklch(0.63 0.19 25)" }}
				/>
				<span
					className="size-2.5 rounded-full"
					style={{ backgroundColor: "oklch(0.75 0.15 85)" }}
				/>
				<span
					className="size-2.5 rounded-full"
					style={{ backgroundColor: "oklch(0.72 0.17 150)" }}
				/>
				<span className="ml-3 text-xs" style={{ color: "oklch(0.6 0.01 75)" }}>
					terminal
				</span>
			</div>
			<pre
				className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed"
				style={{ color: "oklch(0.9 0.01 80)" }}
			>
				<span style={{ color: "oklch(0.67 0.18 259.815)" }}>$ </span>
				{fullText.slice(0, typed)}
				<span
					aria-hidden="true"
					className={done ? "" : "animate-pulse"}
					style={{ color: "oklch(0.67 0.18 259.815)" }}
				>
					{done ? "" : "▍"}
				</span>
				{done && (
					<span style={{ color: "oklch(0.72 0.17 150)" }}>
						{"\n"}# open http://127.0.0.1:3000
					</span>
				)}
			</pre>
		</div>
	);
}
